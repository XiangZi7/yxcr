## 解法




### 方法一：递归



> **思考**
>
> 需要在二叉搜索树中插入一个尚未出现的值，并返回新的根。节点数不超过 $10^4$，任意正确的插入路径都可以通过。
>
> 插入位置由 BST 的有序性唯一确定：沿比较路径走到空位，在该处挂上新节点即可，无需旋转或重构。空树则新节点自身即为根。
>
> 因此按当前值与 $\textit{val}$ 的大小递归进入左或右子树，并把返回的子树根接回当前节点。最坏沿一条链下降，时间与栈空间均为 $O(n)$。



如果根节点为空，我们直接创建一个新节点，值为 $\textit{val}$，并返回。

如果根节点的值大于 $\textit{val}$，我们递归地将 $\textit{val}$ 插入到左子树中，并将左子树的根节点更新为返回后的根节点。

如果根节点的值小于 $\textit{val}$，我们递归地将 $\textit{val}$ 插入到右子树中，并将右子树的根节点更新为返回后的根节点。

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
    def insertIntoBST(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:
        if root is None:
            return TreeNode(val)
        if root.val > val:
            root.left = self.insertIntoBST(root.left, val)
        else:
            root.right = self.insertIntoBST(root.right, val)
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

function insertIntoBST(root: TreeNode | null, val: number): TreeNode | null {
    if (!root) {
        return new TreeNode(val);
    }
    if (root.val > val) {
        root.left = insertIntoBST(root.left, val);
    } else {
        root.right = insertIntoBST(root.right, val);
    }
    return root;
}
```
