## 解法




### 方法一：递归



> **思考**
>
> 普通二叉树没有有序性，不能按值决定方向。LCA 是同时覆盖 $p$ 与 $q$ 的最深结点。
>
> 后序递归：子树中找到目标则上送该结点；左右都非空则当前根为 LCA，否则上送非空一侧。



我们递归遍历二叉树：

如果当前节点为空或者等于 $p$ 或者 $q$，则返回当前节点；

否则，我们递归遍历左右子树，将返回的结果分别记为 $left$ 和 $right$。如果 $left$ 和 $right$ 都不为空，则说明 $p$ 和 $q$ 分别在左右子树中，因此当前节点即为最近公共祖先；如果 $left$ 和 $right$ 中只有一个不为空，返回不为空的那个。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为二叉树节点个数。




#### Python3


```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None


class Solution:
    def lowestCommonAncestor(
        self, root: "TreeNode", p: "TreeNode", q: "TreeNode"
    ) -> "TreeNode":
        if root in (None, p, q):
            return root
        left = self.lowestCommonAncestor(root.left, p, q)
        right = self.lowestCommonAncestor(root.right, p, q)
        return root if left and right else (left or right)
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

function lowestCommonAncestor(
    root: TreeNode | null,
    p: TreeNode | null,
    q: TreeNode | null,
): TreeNode | null {
    if (!root || root === p || root === q) {
        return root;
    }
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    return left && right ? root : left || right;
}
```
