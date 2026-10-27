## 解法




### 方法一：递归



> **思考**
>
> 对应节点相加，缺的一侧整棵保留。结构与递归定义一致。
>
> 一侧为空则返回另一侧；否则新建节点，值为两节点之和，再递归合并左右子树。



递归合并两棵树的节点。

- 如果其中一棵树的当前节点为空，则返回另一棵树的当前节点作为合并后节点。
- 如果两棵树的当前节点都不为空，则将它们的值相加作为合并后节点的新值，然后递归合并它们的左右子节点。

时间复杂度 $O(m)$，空间复杂度 $O(m)$。其中 $m$ 是两棵树的节点数的最小值。




#### Python3


```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def mergeTrees(
        self, root1: Optional[TreeNode], root2: Optional[TreeNode]
    ) -> Optional[TreeNode]:
        if root1 is None:
            return root2
        if root2 is None:
            return root1
        node = TreeNode(root1.val + root2.val)
        node.left = self.mergeTrees(root1.left, root2.left)
        node.right = self.mergeTrees(root1.right, root2.right)
        return node
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

function mergeTrees(root1: TreeNode | null, root2: TreeNode | null): TreeNode | null {
    if (root1 === null && root2 === null) return null;
    if (root1 === null) return root2;
    if (root2 === null) return root1;
    const left = mergeTrees(root1.left, root2.left);
    const right = mergeTrees(root1.right, root2.right);
    return new TreeNode(root1.val + root2.val, left, right);
}
```
