## 解法




### 方法一：哈希表



> **思考**
>
> 判断链表是否有环。 $n\le 10^4$。走过的节点放进哈希表，再次出现即有环；走到空则无环。实现直接，空间 $O(n)$。进阶要求常数空间。



我们可以遍历链表，用一个哈希表 $s$ 记录每个节点。当某个节点二次出现时，则表示存在环，直接返回 `true`。否则链表遍历结束，返回 `false`。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 是链表中的节点数。




#### Python3


```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None


class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        s = set()
        while head:
            if head in s:
                return True
            s.add(head)
            head = head.next
        return False
```


#### TypeScript


```ts
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function hasCycle(head: ListNode | null): boolean {
    const s: Set<ListNode> = new Set();
    for (; head; head = head.next) {
        if (s.has(head)) {
            return true;
        }
        s.add(head);
    }
    return false;
}
```








### 方法二：快慢指针



> **思考**
>
> 方法一要用线性额外空间。快指针每次两步、慢指针一步，有环则两者必在环内相遇，无环则快指针先到末尾。只需两个指针。



我们定义快慢指针 $fast$ 和 $slow$，初始时均指向 $head$。

快指针每次走两步，慢指针每次走一步，不断循环。当快慢指针相遇时，说明链表存在环。如果循环结束依然没有相遇，说明链表不存在环。

时间复杂度 $O(n)$，其中 $n$ 是链表中的节点数。空间复杂度 $O(1)$。




#### Python3


```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None


class Solution:
    def hasCycle(self, head: ListNode) -> bool:
        slow = fast = head
        while fast and fast.next:
            slow, fast = slow.next, fast.next.next
            if slow == fast:
                return True
        return False
```


#### TypeScript


```ts
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function hasCycle(head: ListNode | null): boolean {
    let slow = head;
    let fast = head;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            return true;
        }
    }
    return false;
}
```
