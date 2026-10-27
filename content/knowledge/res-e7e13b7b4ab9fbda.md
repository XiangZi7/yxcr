## 解法




### 方法一：递归



> **思考**
>
> 需要删去所有不含 $1$ 的子树。自顶向下无法在见到子树之前判断，应先递归处理左右孩子，再根据子树是否已被清空决定当前结点是否保留。
>
> 后序返回后，若结点值为 $0$ 且左右皆空，则整棵子树可删。结点至多 $200$ 个，一次 DFS 即可。



我们首先判断当前节点是否为空，如果为空则直接返回空节点。

否则，我们递归地对左右子树进行剪枝，并将剪枝后的左右子树重新赋值给当前节点的左右子节点。然后判断当前节点的值是否为 0 且左右子节点都为空，如果是则返回空节点，否则返回当前节点。

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
    def pruneTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if root is None:
            return root
        root.left = self.pruneTree(root.left)
        root.right = self.pruneTree(root.right)
        if root.val == 0 and root.left == root.right:
            return None
        return root
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

function pruneTree(root: TreeNode | null): TreeNode | null {
    if (!root) {
        return root;
    }
    root.left = pruneTree(root.left);
    root.right = pruneTree(root.right);
    if (root.val === 0 && root.left === root.right) {
        return null;
    }
    return root;
}
```
