## 解法




### 方法一：模拟



> **思考**
>
> 题目已经将个位放在链表头部，按位逆序存放，本质上就是竖式加法。若先把链表转成整数再相加，反而绕开了这一结构，也需要处理大整数。
>
> 两条链的长度可能不同，最高位还可能产生额外进位。每一位都是「当前两位数字（缺省为 $0$）与进位 $carry$ 之和」，再拆出个位和新的进位。从哑节点依次接上答案节点，两个指针同步前进；循环条件应为 $l_1$、 $l_2$ 或 $carry$ 仍未结束，否则像 $[9] + [1]$ 这样的情况会丢失最后的进位。



我们同时遍历两个链表 $l_1$ 和 $l_2$，并使用变量 $carry$ 表示当前是否有进位。

每次遍历时，我们取出对应链表的当前位，计算它们与进位 $carry$ 的和，然后更新进位的值，最后将当前位的值加入答案链表。如果两个链表都遍历完了，并且进位为 $0$ 时，遍历结束。

最后我们返回答案链表的头节点即可。

时间复杂度 $O(\max(m, n))$，其中 $m$ 和 $n$ 分别为两个链表的长度。我们需要遍历两个链表的全部位置，而处理每个位置只需要 $O(1)$ 的时间。忽略答案的空间消耗，空间复杂度 $O(1)$。




#### Python3


```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def addTwoNumbers(
        self, l1: Optional[ListNode], l2: Optional[ListNode]
    ) -> Optional[ListNode]:
        dummy = ListNode()
        carry, curr = 0, dummy
        while l1 or l2 or carry:
            s = (l1.val if l1 else 0) + (l2.val if l2 else 0) + carry
            carry, val = divmod(s, 10)
            curr.next = ListNode(val)
            curr = curr.next
            l1 = l1.next if l1 else None
            l2 = l2.next if l2 else None
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

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const dummy = new ListNode();
    let cur = dummy;
    let sum = 0;
    while (l1 != null || l2 != null || sum !== 0) {
        if (l1 != null) {
            sum += l1.val;
            l1 = l1.next;
        }
        if (l2 != null) {
            sum += l2.val;
            l2 = l2.next;
        }
        cur.next = new ListNode(sum % 10);
        cur = cur.next;
        sum = Math.floor(sum / 10);
    }
    return dummy.next;
}
```
