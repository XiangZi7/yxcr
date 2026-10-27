## 解法




### 方法一：DFS



> **思考**
>
> 同值路径可以在某节点拐弯，长度按边计。只做根到叶会漏掉「左右拼起来」的路径。
>
> DFS 返回向下延伸的最长同值边数：孩子同值才加一，否则置 $0$。用 $l+r$ 更新全局答案，向上只传 $\max(l,r)$。



我们设计一个函数 $\textit{dfs}(root)$，表示以 $\textit{root}$ 节点作为路径的其中一个端点，向下延伸的最长同值路径长度。

在 $\textit{dfs}(root)$ 中，我们首先递归调用 $\textit{dfs}(root.\textit{left})$ 和 $\textit{dfs}(root.\textit{right})$，得到两个返回值 $\textit{l}$ 和 $\textit{r}$。这两个返回值分别代表了以 $\textit{root}$ 节点的左孩子和右孩子为路径的其中一个端点，向下延伸的最长同值路径长度。

如果 $\textit{root}$ 存在左孩子且 $\textit{root}.\textit{val} = \textit{root}.\textit{left}.\textit{val}$，那么在 $\textit{root}$ 的左孩子为路径的其中一个端点，向下延伸的最长同值路径长度应为 $\textit{l} + 1$；否则，这个长度为 $0$。如果 $\textit{root}$ 存在右孩子且 $\textit{root}.\textit{val} = \textit{root}.\textit{right}.\textit{val}$，那么在 $\textit{root}$ 的右孩子为路径的其中一个端点，向下延伸的最长同值路径长度应为 $\textit{r} + 1$；否则，这个长度为 $0$。

在递归调用完左右孩子之后，我们更新答案为 $\max(\textit{ans}, \textit{l} + \textit{r})$，即以 $\textit{root}$ 为端点的路径经过 $\textit{root}$ 的最长同值路径长度。

最后， $\textit{dfs}(root)$ 函数返回以 $\textit{root}$ 为端点的向下延伸的最长同值路径长度，即 $\max(\textit{l}, \textit{r})$。

在主函数中，我们调用 $\textit{dfs}(root)$，即可得到答案。

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
    def longestUnivaluePath(self, root: Optional[TreeNode]) -> int:
        def dfs(root: Optional[TreeNode]) -> int:
            if root is None:
                return 0
            l, r = dfs(root.left), dfs(root.right)
            l = l + 1 if root.left and root.left.val == root.val else 0
            r = r + 1 if root.right and root.right.val == root.val else 0
            nonlocal ans
            ans = max(ans, l + r)
            return max(l, r)

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

function longestUnivaluePath(root: TreeNode | null): number {
    let ans: number = 0;
    const dfs = (root: TreeNode | null): number => {
        if (!root) {
            return 0;
        }
        let [l, r] = [dfs(root.left), dfs(root.right)];
        l = root.left && root.left.val === root.val ? l + 1 : 0;
        r = root.right && root.right.val === root.val ? r + 1 : 0;
        ans = Math.max(ans, l + r);
        return Math.max(l, r);
    };
    dfs(root);
    return ans;
}
```
