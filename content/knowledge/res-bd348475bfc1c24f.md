## 解法




### 方法一：树形 DP



> **思考**
>
> 树上相邻结点不能同时偷。若对每个结点分别计算「偷/不偷」再重复遍历子树，同一子树会被多次展开。
>
> 后序返回二元组：偷根、不偷根。偷根则左右只能取不偷；不偷根则左右各自取较大者。根处再取二者最大。每个结点只访问一次。



我们定义一个函数 $dfs(root)$，表示偷取以 $root$ 为根的二叉树的最大金额。该函数返回一个二元组 $(a, b)$，其中 $a$ 表示偷取 $root$ 节点时能得到的最大金额，而 $b$ 表示不偷取 $root$ 节点时能得到的最大金额。

函数 $dfs(root)$ 的计算过程如下：

如果 $root$ 为空，那么显然有 $dfs(root) = (0, 0)$。

否则，我们首先计算出左右子节点的结果，即 $dfs(root.left)$ 和 $dfs(root.right)$，这样就得到了两对值 $(l_a, l_b)$ 以及 $(r_a, r_b)$。对于 $dfs(root)$ 的结果，我们可以分为两种情况：

- 如果偷取 $root$ 节点，那么不能偷取其左右子节点，结果为 $root.val + l_b + r_b$；
- 如果不偷取 $root$ 节点，那么可以偷取其左右子节点，结果为 $\max(l_a, l_b) + \max(r_a, r_b)$。

在主函数中，我们可以直接返回 $dfs(root)$ 的较大值，即 $\max(dfs(root))$。

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
    def rob(self, root: Optional[TreeNode]) -> int:
        def dfs(root: Optional[TreeNode]) -> (int, int):
            if root is None:
                return 0, 0
            la, lb = dfs(root.left)
            ra, rb = dfs(root.right)
            return root.val + lb + rb, max(la, lb) + max(ra, rb)

        return max(dfs(root))
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

function rob(root: TreeNode | null): number {
    const dfs = (root: TreeNode | null): [number, number] => {
        if (!root) {
            return [0, 0];
        }
        const [la, lb] = dfs(root.left);
        const [ra, rb] = dfs(root.right);
        return [root.val + lb + rb, Math.max(la, lb) + Math.max(ra, rb)];
    };
    return Math.max(...dfs(root));
}
```
