## 解法




### 方法一：哈希表 + 递归



> **思考**
>
> 后序的最后一个元素是根，中序同样给出左右子树的分界。每次线性查找根的位置仍可能 $O(n^2)$。值互不相同，因此先把中序下标放入哈希表。当前后序区间的末元素为根，中序中该值左侧长度即左子树规模，据此切分两段后序并递归。



后序遍历的最后一个节点是根节点，我们可以根据这个特点找到根节点在中序遍历中的位置，然后递归地构造左右子树。

具体地，我们先用一个哈希表 $d$ 存储中序遍历中每个节点的位置。然后我们设计一个递归函数 $dfs(i, j, n)$，其中 $i$ 和 $j$ 分别表示中序遍历和后序遍历的起点，而 $n$ 表示子树包含的节点数。函数的逻辑如下：

- 如果 $n \leq 0$，说明子树为空，返回空节点。
- 否则，取出后序遍历的最后一个节点 $v$，然后我们在哈希表 $d$ 中找到 $v$ 在中序遍历中的位置，设为 $k$。那么左子树包含的节点数为 $k - i$，右子树包含的节点数为 $n - k + i - 1$。
- 递归构造左子树 $dfs(i, j, k - i)$ 和右子树 $dfs(k + 1, j + k - i, n - k + i - 1)$，并连接到根节点上，最后返回根节点。

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
    def buildTree(self, inorder: List[int], postorder: List[int]) -> Optional[TreeNode]:
        def dfs(i: int, j: int, n: int) -> Optional[TreeNode]:
            if n <= 0:
                return None
            v = postorder[j + n - 1]
            k = d[v]
            l = dfs(i, j, k - i)
            r = dfs(k + 1, j + k - i, n - k + i - 1)
            return TreeNode(v, l, r)

        d = {v: i for i, v in enumerate(inorder)}
        return dfs(0, 0, len(inorder))
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

function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
    const n = inorder.length;
    const d: Record<number, number> = {};
    for (let i = 0; i < n; i++) {
        d[inorder[i]] = i;
    }
    const dfs = (i: number, j: number, n: number): TreeNode | null => {
        if (n <= 0) {
            return null;
        }
        const v = postorder[j + n - 1];
        const k = d[v];
        const l = dfs(i, j, k - i);
        const r = dfs(k + 1, j + k - i, n - 1 - (k - i));
        return new TreeNode(v, l, r);
    };
    return dfs(0, 0, n);
}
```
