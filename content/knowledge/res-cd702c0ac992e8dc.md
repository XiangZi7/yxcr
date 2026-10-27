## 解法




### 方法一：哈希表 + 模拟



> **思考**
>
> 复制带随机指针的链表。随机指针可能指向任意节点或空，先复制 $\textit{next}$ 再复制 $\textit{random}$ 时，目标节点可能尚未建出。 $n\le 1000$。
>
> 第一遍沿 $\textit{next}$ 建新链，并用哈希表记下原节点到副本的映射；第二遍按映射接好 $\textit{random}$。



我们可以定义一个虚拟头节点 $\textit{dummy}$，用一个指针 $\textit{tail}$ 指向虚拟头节点，然后遍历链表，将链表中的每个节点都复制一份，并将每个节点及其复制节点的对应关系存储在哈希表 $\textit{d}$ 中，同时连接好复制节点的 $\textit{next}$ 指针。

接下来再遍历链表，根据哈希表中存储的对应关系，将复制节点的 $\textit{random}$ 指针连接好。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为链表的长度。




#### Python3


```python
"""
# Definition for a Node.
class Node:
    def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
        self.val = int(x)
        self.next = next
        self.random = random
"""


class Solution:
    def copyRandomList(self, head: "Optional[Node]") -> "Optional[Node]":
        d = {}
        dummy = tail = Node(0)
        cur = head
        while cur:
            node = Node(cur.val)
            tail.next = node
            tail = tail.next
            d[cur] = node
            cur = cur.next
        cur = head
        while cur:
            d[cur].random = d[cur.random] if cur.random else None
            cur = cur.next
        return dummy.next
```


#### TypeScript


```ts
/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     next: _Node | null
 *     random: _Node | null
 *
 *     constructor(val?: number, next?: _Node, random?: _Node) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *         this.random = (random===undefined ? null : random)
 *     }
 * }
 */

function copyRandomList(head: _Node | null): _Node | null {
    const d: Map<_Node, _Node> = new Map();
    const dummy = new _Node();
    let tail = dummy;
    for (let cur = head; cur; cur = cur.next) {
        const node = new _Node(cur.val);
        tail.next = node;
        tail = node;
        d.set(cur, node);
    }
    for (let cur = head; cur; cur = cur.next) {
        d.get(cur)!.random = cur.random ? d.get(cur.random)! : null;
    }
    return dummy.next;
}
```


### 方法二：模拟（空间优化）



> **思考**
>
> 方法一的哈希表是 $O(n)$ 空间。把每个副本插在原节点后面，原节点与副本在链上相邻， $\textit{random}$ 的对应关系变为 $\textit{cur.random.next}$。拆链后得到复制链表，不再需要哈希表。



在方法一中，我们使用了额外的哈希表来存储原节点和复制节点的对应关系，我们也可以不使用额外的空间，具体做法如下：

1. 遍历原链表，对于每个节点，复制一个新节点并将其插入到原节点和原节点的下一个节点之间。
2. 再次遍历链表，根据原节点的 $\textit{random}$ 指针，设置新节点的 $\textit{random}$ 指针。
3. 最后将链表拆分为原链表和复制链表。

时间复杂度 $O(n)$，其中 $n$ 为链表的长度。忽略答案链表的空间占用，空间复杂度 $O(1)$。




#### Python3


```python
"""
# Definition for a Node.
class Node:
    def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
        self.val = int(x)
        self.next = next
        self.random = random
"""


class Solution:
    def copyRandomList(self, head: "Optional[Node]") -> "Optional[Node]":
        if head is None:
            return None
        cur = head
        while cur:
            node = Node(cur.val, cur.next)
            cur.next = node
            cur = node.next
        cur = head
        while cur:
            cur.next.random = cur.random.next if cur.random else None
            cur = cur.next.next
        cur = head
        ans = head.next
        while cur.next:
            node = cur.next
            cur.next = node.next
            cur = node
        return ans
```


#### TypeScript


```ts
/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     next: _Node | null
 *     random: _Node | null
 *
 *     constructor(val?: number, next?: _Node, random?: _Node) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *         this.random = (random===undefined ? null : random)
 *     }
 * }
 */

function copyRandomList(head: _Node | null): _Node | null {
    if (head === null) {
        return null;
    }
    let cur = head;
    while (cur !== null) {
        const node = new _Node(cur.val);
        node.next = cur.next;
        cur.next = node;
        cur = node.next;
    }
    cur = head;
    while (cur !== null) {
        cur.next.random = cur.random === null ? null : cur.random.next;
        cur = cur.next.next;
    }
    cur = head;
    const ans = head.next;
    while (cur.next !== null) {
        const node = cur.next;
        cur.next = node.next;
        cur = node;
    }
    return ans;
}
```
