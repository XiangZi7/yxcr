## 解法




### 方法一：BFS



> **思考**
>
> 从右侧看，每层只看到最右边的节点。 $n\le 100$。层序时先把右孩子入队，则队头就是该层最右节点，记下后即可扫完本层。不必事后再取每层末尾。



我们可以使用广度优先搜索，定义一个队列 $\textit{q}$，将根节点放入队列中。每次从队列中取出当前层的所有节点，对于当前节点，我们先判断右子树是否存在，若存在则将右子树放入队列中；再判断左子树是否存在，若存在则将左子树放入队列中。这样每次取出队列中的第一个节点即为该层的右视图节点。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为二叉树节点个数。




#### Python3


```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        ans = []
        if root is None:
            return ans
        q = deque([root])
        while q:
            ans.append(q[0].val)
            for _ in range(len(q)):
                node = q.popleft()
                if node.right:
                    q.append(node.right)
                if node.left:
                    q.append(node.left)
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

function rightSideView(root: TreeNode | null): number[] {
    const ans: number[] = [];
    if (!root) {
        return ans;
    }
    const q: TreeNode[] = [root];
    while (q.length > 0) {
        ans.push(q[0].val);
        const nq: TreeNode[] = [];
        for (const { left, right } of q) {
            if (right) {
                nq.push(right);
            }
            if (left) {
                nq.push(left);
            }
        }
        q.length = 0;
        q.push(...nq);
    }
    return ans;
}
```


### 方法二：DFS



> **思考**
>
> 方法一用队列。先递归右子树再左子树，并带上深度：某深度第一次到达时记下的就是该层最右节点，空间随高度而不是宽度。



使用 DFS 深度优先遍历二叉树，每次先遍历右子树，再遍历左子树，这样每层第一个遍历到的节点即为该层的右视图节点。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为二叉树节点个数。




#### Python3


```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        def dfs(root: Optional[TreeNode], depth: int) -> None:
            if root is None:
                return
            if len(ans) == depth:
                ans.append(root.val)
            dfs(root.right, depth + 1)
            dfs(root.left, depth + 1)

        ans = []
        dfs(root, 0)
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

function rightSideView(root: TreeNode | null): number[] {
    const ans = [];
    const dfs = (root: TreeNode | null, depth: number) => {
        if (!root) {
            return;
        }
        if (ans.length == depth) {
            ans.push(root.val);
        }
        dfs(root.right, depth + 1);
        dfs(root.left, depth + 1);
    };
    dfs(root, 0);
    return ans;
}
```
