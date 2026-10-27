LRU 在容量达到上限时淘汰最久未使用的项目。Map 保留插入顺序，可以通过删除再插入把一次访问移动到最近使用的位置。若要求严格最坏常数时间，一般结合哈希表与双向链表实现。

```javascript
class LRUCache {
  constructor(capacity) {
    if (!Number.isInteger(capacity) || capacity < 1) throw new RangeError('Invalid capacity')
    this.capacity = capacity
    this.values = new Map()
  }
  get(key) {
    if (!this.values.has(key)) return undefined
    const value = this.values.get(key)
    this.values.delete(key); this.values.set(key, value)
    return value
  }
  put(key, value) {
    this.values.delete(key); this.values.set(key, value)
    if (this.values.size > this.capacity) this.values.delete(this.values.keys().next().value)
  }
}

class Queue {
  constructor() { this.input = []; this.output = [] }
  push(value) { this.input.push(value) }
  pop() {
    if (!this.output.length) while (this.input.length) this.output.push(this.input.pop())
    return this.output.pop()
  }
}

class ListNode { constructor(value, next = null) { this.value = value; this.next = next } }
function reverseList(head) {
  let previous = null
  while (head) { const next = head.next; head.next = previous; previous = head; head = next }
  return previous
}
function reverseListRecursive(head) {
  if (!head?.next) return head
  const tail = reverseListRecursive(head.next)
  head.next.next = head; head.next = null
  return tail
}
function kthFromEnd(head, k) {
  if (!Number.isInteger(k) || k < 1) return null
  let fast = head, slow = head
  for (let i = 0; i < k; i++) { if (!fast) return null; fast = fast.next }
  while (fast) { fast = fast.next; slow = slow.next }
  return slow
}

class Trie {
  constructor() { this.root = new Map() }
  insert(word) {
    let node = this.root
    for (const char of word) { if (!node.has(char)) node.set(char, new Map()); node = node.get(char) }
    node.terminal = true
  }
  search(word) {
    let node = this.root
    for (const char of word) { if (!node.has(char)) return false; node = node.get(char) }
    return node.terminal === true
  }
}
```

两个栈组成队列时，每个元素最多进入和离开每个栈一次，因此均摊时间为常数。递归反转链表有调用栈开销，极长链表应优先使用迭代。字典树适合前缀检索，但需要权衡节点数量和字符范围。
