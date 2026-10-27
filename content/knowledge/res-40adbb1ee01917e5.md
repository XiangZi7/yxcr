## 解法




### 方法一：模拟



> **思考**
>
> 可以把 $[left, right]$ 整段切出、反转后再接回去，但 $left = 1$ 时头结点会被换掉，还要同时记住多个断点，容易写漏。进阶要求一趟扫描完成。
>
> 若把区间内的结点依次头插到区间前驱之后，即可就地反转，不必单独再拼接。虚拟头挡住 $left = 1$ 的边界：先走到第 $left-1$ 个结点，再把头插做 $right - left + 1$ 次。



定义一个虚拟头结点 `dummy`，指向链表的头结点 `head`，然后定义一个指针 `pre` 指向 `dummy`，从虚拟头结点开始遍历链表，遍历到第 `left` 个结点时，将 `pre` 指向该结点，然后从该结点开始遍历 `right - left + 1` 次，将遍历到的结点依次插入到 `pre` 的后面，最后返回 `dummy.next` 即可。

时间复杂度 $O(n)$，空间复杂度 $O(1)$。其中 $n$ 为链表的长度。




#### Python3


```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseBetween(
        self, head: Optional[ListNode], left: int, right: int
    ) -> Optional[ListNode]:
        if head.next is None or left == right:
            return head
        dummy = ListNode(0, head)
        pre = dummy
        for _ in range(left - 1):
            pre = pre.next
        p, q = pre, pre.next
        cur = q
        for _ in range(right - left + 1):
            t = cur.next
            cur.next = pre
            pre, cur = cur, t
        p.next = pre
        q.next = cur
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

function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
    const n = right - left;
    if (n === 0) {
        return head;
    }

    const dummy = new ListNode(0, head);
    let pre = null;
    let cur = dummy;
    for (let i = 0; i < left; i++) {
        pre = cur;
        cur = cur.next;
    }
    const h = pre;
    pre = null;
    for (let i = 0; i <= n; i++) {
        const next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    h.next.next = cur;
    h.next = pre;
    return dummy.next;
}
```
