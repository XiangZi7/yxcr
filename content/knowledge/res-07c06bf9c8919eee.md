## 解法




### 方法一：递归



> **思考**
>
> 翻转整棵树即交换每个结点的左右孩子，并对其子树做同样操作。树规模允许一次递归遍历。
>
> 先递归翻转左右子树，再交换两棵子树的根指针。



我们首先判断 $\textit{root}$ 是否为空，若为空则直接返回 $\text{null}$。然后递归地对树的左右子树进行翻转，将翻转后的右子树作为新的左子树，将翻转后的左子树作为新的右子树，返回 $\textit{root}$。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 是二叉树的节点个数。




#### Python3


```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if root is None:
            return None
        l, r = self.invertTree(root.left), self.invertTree(root.right)
        root.left, root.right = r, l
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

function invertTree(root: TreeNode | null): TreeNode | null {
    if (!root) {
        return root;
    }
    const l = invertTree(root.left);
    const r = invertTree(root.right);
    root.left = r;
    root.right = l;
    return root;
}
```
