## 解法




### 方法一：递归



> **思考**
>
> 后序是「左、右、根」。递归先走完左右再记录根。 $n\le 100$，递归栈可以接受。进阶要求迭代。



我们先递归左右子树，然后再访问根节点。

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
    def postorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        def dfs(root):
            if root is None:
                return
            dfs(root.left)
            dfs(root.right)
            ans.append(root.val)

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

function postorderTraversal(root: TreeNode | null): number[] {
    const ans: number[] = [];
    const dfs = (root: TreeNode | null) => {
        if (!root) {
            return;
        }
        dfs(root.left);
        dfs(root.right);
        ans.push(root.val);
    };
    dfs(root);
    return ans;
}
```


### 方法二：栈实现后序遍历



> **思考**
>
> 方法一依赖递归。注意到「根、右、左」恰是前序交换左右孩子，再反转即得「左、右、根」。用栈按这个顺序遍历后整体倒序，不必判断节点是否第二次访问。



先序遍历的顺序是：根、左、右，如果我们改变左右孩子的顺序，就能将顺序变成：根、右、左。最后再将结果反转一下，就得到了后序遍历的结果。

因此，栈实现非递归遍历的思路如下：

1. 定义一个栈 $stk$，先将根节点压入栈
1. 若栈不为空，每次从栈中弹出一个节点
1. 处理该节点
1. 先把节点左孩子压入栈，接着把节点右孩子压入栈（如果有孩子节点）
1. 重复 2-4
1. 将结果反转，得到后序遍历的结果

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
    def postorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        ans = []
        if root is None:
            return ans
        stk = [root]
        while stk:
            node = stk.pop()
            ans.append(node.val)
            if node.left:
                stk.append(node.left)
            if node.right:
                stk.append(node.right)
        return ans[::-1]
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

function postorderTraversal(root: TreeNode | null): number[] {
    const ans: number[] = [];
    if (!root) {
        return ans;
    }
    const stk: TreeNode[] = [root];
    while (stk.length) {
        const { left, right, val } = stk.pop();
        ans.push(val);
        left && stk.push(left);
        right && stk.push(right);
    }
    ans.reverse();
    return ans;
}
```








### 方法三：Morris 实现后序遍历



> **思考**
>
> 方法二仍要 $O(n)$ 栈与一次反转。Morris 按「根、右、左」穿针，最后再反转结果，额外空间降为 $O(1)$。



Morris 遍历无需使用栈，空间复杂度为 $O(1)$。核心思想是：

遍历二叉树节点，

1. 若当前节点 `root` 的右子树为空，将当前节点值添加至结果列表 $ans$ 中，并将当前节点更新为 `root.left`
1. 若当前节点 `root` 的右子树不为空，找到右子树的最左节点 `next`（也即是 `root` 节点在中序遍历下的后继节点）：
    - 若后继节点 `next` 的左子树为空，将当前节点值添加至结果列表 $ans$ 中，然后将后继节点的左子树指向当前节点 `root`，并将当前节点更新为 `root.right`。
    - 若后继节点 `next` 的左子树不为空，将后继节点左子树指向空（即解除 `next` 与 `root` 的指向关系），并将当前节点更新为 `root.left`。
1. 循环以上步骤，直至二叉树节点为空，遍历结束。
1. 最后返回结果列表的逆序即可。

> Morris 后序遍历跟 Morris 前序遍历思路一致，只是将前序的“根左右”变为“根右左”，最后逆序结果即可变成“左右根”。

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
    def postorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        ans = []
        while root:
            if root.right is None:
                ans.append(root.val)
                root = root.left
            else:
                next = root.right
                while next.left and next.left != root:
                    next = next.left
                if next.left != root:
                    ans.append(root.val)
                    next.left = root
                    root = root.right
                else:
                    next.left = None
                    root = root.left
        return ans[::-1]
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

function postorderTraversal(root: TreeNode | null): number[] {
    const ans: number[] = [];
    while (root !== null) {
        const { val, left, right } = root;
        if (right === null) {
            ans.push(val);
            root = left;
        } else {
            let next = right;
            while (next.left !== null && next.left !== root) {
                next = next.left;
            }
            if (next.left === null) {
                ans.push(val);
                next.left = root;
                root = right;
            } else {
                next.left = null;
                root = left;
            }
        }
    }
    return ans.reverse();
}
```
