## 解法




### 方法一：递归



> **思考**
>
> 镜像对称要求左子树与右子树互为镜像，而不是各自与自身相同。进阶同时要求递归与迭代都能做； $n \le 1000$，一次遍历即可。
>
> 一对节点对称，当且仅当取值相同，且一方的左孩子与另一方的右孩子对称、一方的右孩子与另一方的左孩子对称。因此从根的左右孩子出发做交叉递归即可。



我们设计一个函数 $\textit{dfs}(\textit{root1}, \textit{root2})$，用于判断两个二叉树是否对称。答案即为 $\textit{dfs}(\textit{root.left}, \textit{root.right})$。

函数 $\textit{dfs}(\textit{root1}, \textit{root2})$ 的逻辑如下：

- 如果 $\textit{root1}$ 和 $\textit{root2}$ 都为空，则两个二叉树对称，返回 `true`；
- 如果 $\textit{root1}$ 和 $\textit{root2}$ 中只有一个为空，或者 $\textit{root1.val} \neq \textit{root2.val}$
- 否则，判断 $\textit{root1}$ 的左子树和 $\textit{root2}$ 的右子树是否对称，以及 $\textit{root1}$ 的右子树和 $\textit{root2}$ 的左子树是否对称，这里使用了递归。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 是二叉树的节点数。




#### Python3


```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isSymmetric(self, root: Optional[TreeNode]) -> bool:
        def dfs(root1: Optional[TreeNode], root2: Optional[TreeNode]) -> bool:
            if root1 == root2:
                return True
            if root1 is None or root2 is None or root1.val != root2.val:
                return False
            return dfs(root1.left, root2.right) and dfs(root1.right, root2.left)

        return dfs(root.left, root.right)
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

function isSymmetric(root: TreeNode | null): boolean {
    const dfs = (root1: TreeNode | null, root2: TreeNode | null): boolean => {
        if (root1 === root2) {
            return true;
        }
        if (!root1 || !root2 || root1.val !== root2.val) {
            return false;
        }
        return dfs(root1.left, root2.right) && dfs(root1.right, root2.left);
    };
    return dfs(root.left, root.right);
}
```
