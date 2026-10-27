## 解法




### 方法一：一次遍历



> **思考**
>
> 按原相对顺序把奇下标结点接到偶下标结点之前。额外数组重串即可，但题目希望 $O(1)$ 空间。
>
> 用 $a$、 $b$ 分别钉住奇、偶链尾， $c$ 记下偶链头。反复把 $b$ 的后继接到 $a$ 后、再把新的后继接到 $b$ 后，直到偶链耗尽。最后 $a.next=c$ 接回偶链。



我们可以用两个指针 $a$ 和 $b$ 分别表示奇数节点和偶数节点的尾节点。初始时，指针 $a$ 指向链表的头节点 $head$，指针 $b$ 指向链表的第二个节点 $head.next$。另外，我们用一个指针 $c$ 指向偶数节点的头节点 $head.next$，即指针 $b$ 的初始位置。

遍历链表，我们将指针 $a$ 指向 $b$ 的下一个节点，即 $a.next = b.next$，然后将指针 $a$ 向后移动一位，即 $a = a.next$；将指针 $b$ 指向 $a$ 的下一个节点，即 $b.next = a.next$，然后将指针 $b$ 向后移动一位，即 $b = b.next$。继续遍历，直到 $b$ 到达链表的末尾。

最后，我们将奇数节点的尾节点 $a$ 指向偶数节点的头节点 $c$，即 $a.next = c$，然后返回链表的头节点 $head$ 即可。

时间复杂度 $O(n)$，其中 $n$ 是链表的长度，需要遍历链表一次。空间复杂度 $O(1)$。只需要维护有限的指针。




#### Python3


```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def oddEvenList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if head is None:
            return None
        a = head
        b = c = head.next
        while b and b.next:
            a.next = b.next
            a = a.next
            b.next = a.next
            b = b.next
        a.next = c
        return head
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

function oddEvenList(head: ListNode | null): ListNode | null {
    if (!head) {
        return null;
    }
    let [a, b, c] = [head, head.next, head.next];
    while (b && b.next) {
        a.next = b.next;
        a = a.next;
        b.next = a.next;
        b = b.next;
    }
    a.next = c;
    return head;
}
```
