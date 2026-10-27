## 解法




### 方法一：DFS



> **思考**
>
> 两棵树是否相同，取决于对应位置的结构与取值是否一致。若先各自遍历再比较序列，还要额外约定空位编码，实现更绕。节点数不超过 $100$，递归深度可以接受。
>
> 树由根与左右子树递归定义，因此只需比较当前一对节点：同为空则相同，仅一方为空或值不同则不同，否则分别递归左右孩子。



我们可以使用 DFS 递归的方法来解决这个问题。

首先判断两个二叉树的根节点是否相同，如果两个根节点都为空，则两个二叉树相同，如果两个根节点中有且只有一个为空，则两个二叉树一定不同。如果两个根节点都不为空，则判断它们的值是否相同，如果不相同则两个二叉树一定不同，如果相同，则分别判断两个二叉树的左子树是否相同以及右子树是否相同。当以上所有条件都满足时，两个二叉树才相同。

时间复杂度 $O(\min(m, n))$，空间复杂度 $O(\min(m, n))$。其中 $m$ 和 $n$ 分别是两个二叉树的节点个数。空间复杂度主要取决于递归调用的层数，递归调用的层数不会超过较小的二叉树的节点个数。




#### Python3


```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        if p == q:
            return True
        if p is None or q is None or p.val != q.val:
            return False
        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)
```


#### TypeScript


```ts
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    if (p == null && q == null) {
        return true;
    }
    if (p == null || q == null || p.val !== q.val) {
        return false;
    }
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
```


### 方法二：BFS



> **思考**
>
> 方法一已经给出结果，代价是系统递归栈。若改为迭代，需要按相同顺序同步访问两棵树。层序队列可以成对取出节点比较取值与孩子是否存在，再把对应孩子成对入队，不再使用递归。



我们也可以使用 BFS 迭代的方法来解决这个问题。

首先将两个二叉树的根节点分别加入两个队列。每次从两个队列各取出一个节点，进行如下比较操作。如果两个节点的值不相同，则两个二叉树的结构一定不同，如果两个节点的值相同，则判断两个节点的子节点是否为空，如果只有一个节点的左子节点为空，则两个二叉树的结构一定不同，如果只有一个节点的右子节点为空，则两个二叉树的结构一定不同，如果左右子节点的结构相同，则将两个节点的左子节点和右子节点分别加入两个队列，对于下一次迭代，将从两个队列各取出一个节点进行比较。当两个队列同时为空时，说明我们已经比较完了所有节点，两个二叉树的结构完全相同。

时间复杂度 $O(\min(m, n))$，空间复杂度 $O(\min(m, n))$。其中 $m$ 和 $n$ 分别是两个二叉树的节点个数。空间复杂度主要取决于队列中的元素个数，队列中的元素个数不会超过较小的二叉树的节点个数。




#### Python3


```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isSameTree(self, p: TreeNode, q: TreeNode) -> bool:
        if p == q:
            return True
        if p is None or q is None:
            return False
        q1, q2 = deque([p]), deque([q])
        while q1 and q2:
            a, b = q1.popleft(), q2.popleft()
            if a.val != b.val:
                return False
            la, ra = a.left, a.right
            lb, rb = b.left, b.right
            if (la and not lb) or (lb and not la):
                return False
            if (ra and not rb) or (rb and not ra):
                return False
            if la:
                q1.append(la)
                q2.append(lb)
            if ra:
                q1.append(ra)
                q2.append(rb)
        return True
```


#### TypeScript


```ts
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    const queue = [];
    p && queue.push(p);
    q && queue.push(q);
    if (queue.length === 1) {
        return false;
    }
    while (queue.length !== 0) {
        const node1 = queue.shift();
        const node2 = queue.shift();
        if (node1.val !== node2.val) {
            return false;
        }
        if (
            (node1.left == null && node2.left != null) ||
            (node1.left != null && node2.left == null)
        ) {
            return false;
        }
        if (
            (node1.right == null && node2.right != null) ||
            (node1.right != null && node2.right == null)
        ) {
            return false;
        }

        if (node1.left != null) {
            queue.push(node1.left);
            queue.push(node2.left);
        }
        if (node1.right != null) {
            queue.push(node1.right);
            queue.push(node2.right);
        }
    }
    return true;
}
```
