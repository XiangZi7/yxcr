## 解法




### 方法一：递归



> **思考**
>
> 两条链表均已按非递减排列。若取出全部节点值再排序并重建，时间复杂度为 $O((m+n)\log(m+n))$，且没有利用有序这一条件。
>
> 合并时，答案的下一个节点必为当前两个头结点中的较小者。选定之后，剩余部分仍是两条有序链表，与原问题同构；若其中一侧已空，则另一侧整段即为剩余结果。
>
> 因此问题具有最优子结构，可以用递归求解：每次留下较小的头，再合并两条剩余链表。递归深度与节点总数同阶，本题长度不超过 $50$，额外空间 $O(m+n)$ 可以接受。



我们先判断链表 $l_1$ 和 $l_2$ 是否为空，若其中一个为空，则返回另一个链表。否则，我们比较 $l_1$ 和 $l_2$ 的头节点：

- 若 $l_1$ 的头节点的值小于等于 $l_2$ 的头节点的值，则递归调用函数 $mergeTwoLists(l_1.next, l_2)$，并将 $l_1$ 的头节点与返回的链表头节点相连，返回 $l_1$ 的头节点。
- 否则，递归调用函数 $mergeTwoLists(l_1, l_2.next)$，并将 $l_2$ 的头节点与返回的链表头节点相连，返回 $l_2$ 的头节点。

时间复杂度 $O(m + n)$，空间复杂度 $O(m + n)$。其中 $m$ 和 $n$ 分别为两个链表的长度。




#### Python3


```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeTwoLists(
        self, list1: Optional[ListNode], list2: Optional[ListNode]
    ) -> Optional[ListNode]:
        if list1 is None or list2 is None:
            return list1 or list2
        if list1.val <= list2.val:
            list1.next = self.mergeTwoLists(list1.next, list2)
            return list1
        else:
            list2.next = self.mergeTwoLists(list1, list2.next)
            return list2
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

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    if (list1 == null || list2 == null) {
        return list1 || list2;
    }
    if (list1.val < list2.val) {
        list1.next = mergeTwoLists(list1.next, list2);
        return list1;
    } else {
        list2.next = mergeTwoLists(list1, list2.next);
        return list2;
    }
}
```


### 方法二：迭代



> **思考**
>
> 方法一已经在线性时间内完成合并，但递归栈与节点数同阶。我们可以用常数额外空间完成同一选择过程。
>
> 注意到每一步仍是比较两个头、接上较小者。设置虚拟头与尾指针，在循环中反复执行这一选择，直至某一条耗尽，再把另一条剩余部分接到尾部即可。时间复杂度与方法一相同，空间降至 $O(1)$。



我们也可以用迭代的方式来实现两个排序链表的合并。

我们先定义一个虚拟头节点 $dummy$，然后循环遍历两个链表，比较两个链表的头节点，将较小的节点添加到 $dummy$ 的末尾，直到其中一个链表为空，然后将另一个链表的剩余部分添加到 $dummy$ 的末尾。

最后返回 $dummy.next$ 即可。

时间复杂度 $O(m + n)$，其中 $m$ 和 $n$ 分别为两个链表的长度。忽略答案链表的空间消耗，空间复杂度 $O(1)$。




#### Python3


```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeTwoLists(
        self, list1: Optional[ListNode], list2: Optional[ListNode]
    ) -> Optional[ListNode]:
        dummy = ListNode()
        curr = dummy
        while list1 and list2:
            if list1.val <= list2.val:
                curr.next = list1
                list1 = list1.next
            else:
                curr.next = list2
                list2 = list2.next
            curr = curr.next
        curr.next = list1 or list2
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

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    const dummy = new ListNode(0);
    let cur = dummy;
    while (list1 != null && list2 != null) {
        if (list1.val < list2.val) {
            cur.next = list1;
            list1 = list1.next;
        } else {
            cur.next = list2;
            list2 = list2.next;
        }
        cur = cur.next;
    }
    cur.next = list1 || list2;
    return dummy.next;
}
```
