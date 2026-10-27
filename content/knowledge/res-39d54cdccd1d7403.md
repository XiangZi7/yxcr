## 解法




### 方法一：枚举 + DFS



> **思考**
>
> 直径是任意两点路径的最长边数。枚举所有点对再求路径不现实。任一直径必经过某节点，等于该节点左右子树高度之和。
>
> DFS 返回子树高度，并在回溯时用 $l+r$ 更新全局答案，同时向父节点返回 $1+\max(l,r)$。每个节点只访问一次，高度与直径一起算出。



我们可以枚举二叉树的每个节点，以该节点为根节点，计算其左右子树的最大深度 $\textit{l}$ 和 $\textit{r}$，则该节点的直径为 $\textit{l} + \textit{r}$。取所有节点的直径的最大值即为二叉树的直径。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为二叉树的节点个数。




#### Python3


```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def diameterOfBinaryTree(self, root: TreeNode) -> int:
        def dfs(root):
            if root is None:
                return 0
            nonlocal ans
            left, right = dfs(root.left), dfs(root.right)
            ans = max(ans, left + right)
            return 1 + max(left, right)

        ans = 0
        dfs(root)
        return ans
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

function diameterOfBinaryTree(root: TreeNode | null): number {
    let ans = 0;
    const dfs = (root: TreeNode | null): number => {
        if (!root) {
            return 0;
        }
        const [l, r] = [dfs(root.left), dfs(root.right)];
        ans = Math.max(ans, l + r);
        return 1 + Math.max(l, r);
    };
    dfs(root);
    return ans;
}
```
