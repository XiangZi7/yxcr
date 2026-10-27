## 解法




### 方法一：哈希表 + 双向链表



> **思考**
>
> $\textit{get}$ / $\textit{put}$ 都要 $O(1)$，淘汰最久未使用的键。哈希表能 $O(1)$ 查找，但不能单独维护使用顺序；数组或单向链表移动节点是 $O(n)$。调用次数达 $2\times 10^5$。
>
> 哈希表存键到节点，双向链表按「最近使用在头、最久在尾」排列。访问或更新时把节点摘下再插到头部；容量满时删掉尾部前驱。查找与调整指针都是 $O(1)$。



我们可以用“哈希表”和“双向链表”实现一个 LRU 缓存。

- 哈希表：用于存储 key 和对应的节点位置。
- 双向链表：用于存储节点数据，按照访问时间排序。

当访问一个节点时，如果节点存在，我们将其从原来的位置删除，并重新插入到链表头部。这样就能保证链表尾部存储的就是最近最久未使用的节点，当节点数量大于缓存最大空间时就淘汰链表尾部的节点。

当插入一个节点时，如果节点存在，我们将其从原来的位置删除，并重新插入到链表头部。如果不存在，我们首先检查缓存是否已满，如果已满，则删除链表尾部的节点，将新的节点插入链表头部。

时间复杂度 $O(1)$，空间复杂度 $O(\textit{capacity})$。




#### Python3


```python
class Node:
    def __init__(self, key: int = 0, val: int = 0):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None


class LRUCache:

    def __init__(self, capacity: int):
        self.size = 0
        self.capacity = capacity
        self.cache = {}
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        node = self.cache[key]
        self.remove_node(node)
        self.add_to_head(node)
        return node.val

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            node = self.cache[key]
            self.remove_node(node)
            node.val = value
            self.add_to_head(node)
        else:
            node = Node(key, value)
            self.cache[key] = node
            self.add_to_head(node)
            self.size += 1
            if self.size > self.capacity:
                node = self.tail.prev
                self.cache.pop(node.key)
                self.remove_node(node)
                self.size -= 1

    def remove_node(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def add_to_head(self, node):
        node.next = self.head.next
        node.prev = self.head
        self.head.next = node
        node.next.prev = node


# Your LRUCache object will be instantiated and called as such:
# obj = LRUCache(capacity)
# param_1 = obj.get(key)
# obj.put(key,value)
```


#### TypeScript


```ts
class Node {
    key: number;
    val: number;
    prev: Node | null;
    next: Node | null;

    constructor(key: number, val: number) {
        this.key = key;
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    private size: number;
    private capacity: number;
    private head: Node;
    private tail: Node;
    private cache: Map<number, Node>;

    constructor(capacity: number) {
        this.size = 0;
        this.capacity = capacity;
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
        this.cache = new Map();
    }

    get(key: number): number {
        if (!this.cache.has(key)) {
            return -1;
        }
        const node = this.cache.get(key)!;
        this.removeNode(node);
        this.addToHead(node);
        return node.val;
    }

    put(key: number, value: number): void {
        if (this.cache.has(key)) {
            const node = this.cache.get(key)!;
            this.removeNode(node);
            node.val = value;
            this.addToHead(node);
        } else {
            const node = new Node(key, value);
            this.cache.set(key, node);
            this.addToHead(node);
            if (++this.size > this.capacity) {
                const nodeToRemove = this.tail.prev!;
                this.cache.delete(nodeToRemove.key);
                this.removeNode(nodeToRemove);
                --this.size;
            }
        }
    }

    private removeNode(node: Node): void {
        if (!node) return;
        node.prev!.next = node.next;
        node.next!.prev = node.prev;
    }

    private addToHead(node: Node): void {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next!.prev = node;
        this.head.next = node;
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
```
