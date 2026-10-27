## 解法




### 方法一：DFS



> **思考**
>
> 每条根到叶子路径表示一个整数，求这些整数之和。深度不超过 $10$，路径不多，但不必先把数字转成字符串。向下走时用 $s \times 10 + \textit{val}$ 累加当前数，到叶子把该数加入答案，左右子树的和相加即可。



我们可以设计一个函数 $dfs(root, s)$，表示从当前节点 $root$ 出发，且当前路径数字为 $s$，返回从当前节点到叶子节点的所有路径数字之和。那么答案就是 $dfs(root, 0)$。

函数 $dfs(root, s)$ 的计算如下：

- 如果当前节点 $root$ 为空，则返回 $0$。
- 否则，将当前节点的值加到 $s$ 中，即 $s = s \times 10 + root.val$。
- 如果当前节点是叶子节点，则返回 $s$。
- 否则，返回 $dfs(root.left, s) + dfs(root.right, s)$。

时间复杂度 $O(n)$，空间复杂度 $O(\log n)$。其中 $n$ 是二叉树的节点数。




#### Python3


```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def sumNumbers(self, root: Optional[TreeNode]) -> int:
        def dfs(root, s):
            if root is None:
                return 0
            s = s * 10 + root.val
            if root.left is None and root.right is None:
                return s
            return dfs(root.left, s) + dfs(root.right, s)

        return dfs(root, 0)
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

function sumNumbers(root: TreeNode | null): number {
    function dfs(root: TreeNode | null, s: number): number {
        if (!root) return 0;
        s = s * 10 + root.val;
        if (!root.left && !root.right) return s;
        return dfs(root.left, s) + dfs(root.right, s);
    }
    return dfs(root, 0);
}
```
