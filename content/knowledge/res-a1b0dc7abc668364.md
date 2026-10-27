## 解法




### 方法一：递归遍历



> **思考**
>
> 前序是「根、左、右」。树按递归定义，先记录根再递归左右即可。 $n\le 100$，递归栈可以接受。进阶才要求改成迭代。



我们先访问根节点，然后递归左子树和右子树。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 是二叉树的节点数，空间复杂度主要取决于递归调用的栈空间。




#### Python3


```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def preorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        def dfs(root):
            if root is None:
                return
            ans.append(root.val)
            dfs(root.left)
            dfs(root.right)

        ans = []
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

function preorderTraversal(root: TreeNode | null): number[] {
    const ans: number[] = [];
    const dfs = (root: TreeNode | null) => {
        if (!root) {
            return;
        }
        ans.push(root.val);
        dfs(root.left);
        dfs(root.right);
    };
    dfs(root);
    return ans;
}
```


### 方法二：栈实现非递归遍历



> **思考**
>
> 方法一已经得到正确序列，进阶要去掉系统递归。显式栈先压右再压左，弹出时先处理根，顺序与前序相同，空间仍为 $O(n)$。



栈实现非递归遍历的思路如下：

1. 定义一个栈 $stk$，先将根节点压入栈
1. 若栈不为空，每次从栈中弹出一个节点
1. 处理该节点
1. 先把节点右孩子压入栈，接着把节点左孩子压入栈（如果有孩子节点）
1. 重复 2-4
1. 返回结果

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 是二叉树的节点数，空间复杂度主要取决于栈空间。




#### Python3


```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def preorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        ans = []
        if root is None:
            return ans
        stk = [root]
        while stk:
            node = stk.pop()
            ans.append(node.val)
            if node.right:
                stk.append(node.right)
            if node.left:
                stk.append(node.left)
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

function preorderTraversal(root: TreeNode | null): number[] {
    const ans: number[] = [];
    if (!root) {
        return ans;
    }
    const stk: TreeNode[] = [root];
    while (stk.length) {
        const { left, right, val } = stk.pop();
        ans.push(val);
        right && stk.push(right);
        left && stk.push(left);
    }
    return ans;
}
```








### 方法三：Morris 实现前序遍历



> **思考**
>
> 方法二仍把空间留在 $O(h)$。Morris 把左子树最右空指针临时接到当前根，沿左链走下去，第一次到达时输出根，回来再拆掉。树自身的空指针充当栈，空间 $O(1)$。



Morris 遍历无需使用栈，空间复杂度为 $O(1)$。核心思想是：

遍历二叉树节点，

1. 若当前节点 `root` 的左子树为空，将当前节点值添加至结果列表 $ans$ 中，并将当前节点更新为 `root.right`
1. 若当前节点 `root` 的左子树不为空，找到左子树的最右节点 `pre`（也即是 `root` 节点在中序遍历下的前驱节点）：
    - 若前驱节点 `pre` 的右子树为空，将当前节点值添加至结果列表 $ans$ 中，然后将前驱节点的右子树指向当前节点 `root`，并将当前节点更新为 `root.left`。
    - 若前驱节点 `pre` 的右子树不为空，将前驱节点右子树指向空（即解除 `pre` 与 `root` 的指向关系），并将当前节点更新为 `root.right`。
1. 循环以上步骤，直至二叉树节点为空，遍历结束。

时间复杂度 $O(n)$，其中 $n$ 是二叉树的节点数。空间复杂度 $O(1)$。




#### Python3


```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def preorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        ans = []
        while root:
            if root.left is None:
                ans.append(root.val)
                root = root.right
            else:
                prev = root.left
                while prev.right and prev.right != root:
                    prev = prev.right
                if prev.right is None:
                    ans.append(root.val)
                    prev.right = root
                    root = root.left
                else:
                    prev.right = None
                    root = root.right
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

function preorderTraversal(root: TreeNode | null): number[] {
    const ans: number[] = [];
    while (root) {
        const { left, right, val } = root;
        if (!left) {
            ans.push(val);
            root = right;
        } else {
            let prev = left;
            while (prev.right && prev.right != root) {
                prev = prev.right;
            }
            if (!prev.right) {
                ans.push(val);
                prev.right = root;
                root = root.left;
            } else {
                prev.right = null;
                root = root.right;
            }
        }
    }
    return ans;
}
```
