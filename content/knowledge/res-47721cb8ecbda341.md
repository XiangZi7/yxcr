## 解法




### 方法一：自底向上的递归



> **思考**
>
> 若对每个节点单独再算一遍左右高度，同一子树会被重复访问，最坏 $O(n^2)$； $n \le 5000$ 偏紧。
>
> 平衡性可以由高度顺便判定：自底向上返回高度，若某棵子树已不平衡则向上传递失败标记。一次后序遍历即可同时得到高度与是否平衡。



定义函数 $height(root)$ 计算二叉树的高度，处理逻辑如下：

- 如果二叉树 $root$ 为空，返回 $0$。
- 否则，递归计算左右子树的高度，分别为 $l$ 和 $r$。如果 $l$ 或 $r$ 为 $-1$，或者 $l$ 和 $r$ 的差的绝对值大于 $1$，则返回 $-1$，否则返回 $max(l, r) + 1$。

那么，如果函数 $height(root)$ 返回的是 $-1$，则说明二叉树 $root$ 不是平衡二叉树，否则是平衡二叉树。

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
    def isBalanced(self, root: Optional[TreeNode]) -> bool:
        def height(root):
            if root is None:
                return 0
            l, r = height(root.left), height(root.right)
            if l == -1 or r == -1 or abs(l - r) > 1:
                return -1
            return 1 + max(l, r)

        return height(root) >= 0
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

function isBalanced(root: TreeNode | null): boolean {
    const dfs = (root: TreeNode | null) => {
        if (root == null) {
            return 0;
        }
        const left = dfs(root.left);
        const right = dfs(root.right);
        if (left === -1 || right === -1 || Math.abs(left - right) > 1) {
            return -1;
        }
        return 1 + Math.max(left, right);
    };
    return dfs(root) > -1;
}
```
