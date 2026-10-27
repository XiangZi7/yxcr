## 解法




### 方法一：优先队列（小根堆）



> **思考**
>
> 若将 $k$ 条链表依次两两合并，总节点 $n \le 10^4$ 时最坏时间 $O(nk)$。在 $k \le 10^4$ 的范围下无法通过。全部取出排序再建表虽为 $O(n\log n)$，却没有利用每条链表已经有序这一条件。
>
> 任意时刻，下一步该接到答案上的节点只可能是各链表当前的头。若每次线性扫描这 $k$ 个候选，乘上 $n$ 个节点便回到 $O(nk)$。
>
> 因此用小根堆维护至多 $k$ 个候选头：每次取出最小者接到结果尾部，再把它的后继（若存在）入堆。每个节点进出堆各一次，时间 $O(n\log k)$。



我们可以创建一个小根堆来 $pq$ 维护所有链表的头节点，每次从小根堆中取出值最小的节点，添加到结果链表的末尾，然后将该节点的下一个节点加入堆中，重复上述步骤直到堆为空。

时间复杂度 $O(n \times \log k)$，空间复杂度 $O(k)$。其中 $n$ 是所有链表节点数目的总和，而 $k$ 是题目给定的链表数目。




#### Python3


```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        setattr(ListNode, "__lt__", lambda a, b: a.val < b.val)
        pq = [head for head in lists if head]
        heapify(pq)
        dummy = cur = ListNode()
        while pq:
            node = heappop(pq)
            if node.next:
                heappush(pq, node.next)
            cur.next = node
            cur = cur.next
        return dummy.next
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

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    const pq = new PriorityQueue<ListNode>((a, b) => a.val - b.val);
    lists.filter(head => head).forEach(head => pq.enqueue(head));
    const dummy: ListNode = new ListNode();
    let cur: ListNode = dummy;
    while (!pq.isEmpty()) {
        const node = pq.dequeue();
        cur.next = node;
        cur = cur.next;
        if (node.next) {
            pq.enqueue(node.next);
        }
    }
    return dummy.next;
}
```
