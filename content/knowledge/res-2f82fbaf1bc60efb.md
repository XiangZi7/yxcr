## 解法




### 方法一：翻转



> **思考**
>
> 链表高位在前，不能像「两数相加」那样直接从头部进位。先反转再加需要再反转回来，改指针较多。
>
> 把两条链的值依次压栈，从栈顶（低位）弹出相加，新结点头插到答案前面，进位留到下一轮。栈空仍有进位则再插一位。
>
> 栈把低位变成先处理的一端，头插自动得到高位在前的结果，无需三次反转链表。



手动翻转链表 `l1` 与 `l2`，将此题转换为 [2. 两数相加](https://leetcode.cn/problems/add-two-numbers/)，相加过程一致。对于最后返回的结果链表也需要进行翻转，共计三次。




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
        s1, s2 = [], []
        while l1:
            s1.append(l1.val)
            l1 = l1.next
        while l2:
            s2.append(l2.val)
            l2 = l2.next
        dummy = ListNode()
        carry = 0
        while s1 or s2 or carry:
            s = (0 if not s1 else s1.pop()) + (0 if not s2 else s2.pop()) + carry
            carry, val = divmod(s, 10)
            # node = ListNode(val, dummy.next)
            # dummy.next = node
            dummy.next = ListNode(val, dummy.next)
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
    const s1: number[] = [];
    const s2: number[] = [];
    for (; l1; l1 = l1.next) {
        s1.push(l1.val);
    }
    for (; l2; l2 = l2.next) {
        s2.push(l2.val);
    }
    const dummy = new ListNode();
    let carry = 0;
    while (s1.length || s2.length || carry) {
        const s = (s1.pop() ?? 0) + (s2.pop() ?? 0) + carry;
        // const node = new ListNode(s % 10, dummy.next);
        // dummy.next = node;
        dummy.next = new ListNode(s % 10, dummy.next);
        carry = Math.floor(s / 10);
    }
    return dummy.next;
}
```


### 方法二：栈



> **思考**
>
> 方法一已经用两个栈从低位加到高位。方法二是同一结构的完整叙述：弹出、求和、头插，直到两栈与进位都耗尽。



我们可以使用两个栈 $s1$ 和 $s2$ 分别存储两个链表元素，然后同时遍历两个栈，并使用变量 $carry$ 表示当前是否有进位。

遍历时，我们弹出对应栈的栈顶元素，计算它们与进位 $carry$ 的和，然后更新进位的值，并创建一个链表节点，插入答案链表的头部。如果两个栈都遍历结束，并且进位为 $0$ 时，遍历结束。

最后我们返回答案链表的头节点即可。

时间复杂度 $O(\max(m, n))$，空间复杂度 $O(m + n)$。其中 $m$ 和 $n$ 分别为两个链表的长度。
