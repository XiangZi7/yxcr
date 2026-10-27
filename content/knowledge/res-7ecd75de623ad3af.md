## 解法




### 方法一：动态规划（树形 DP）



> **思考**
>
> 摄像头覆盖自身、父与子，求最少个数。每个结点的最优依赖于子树状态，需区分“本结点有摄像头 / 被子覆盖 / 未被覆盖”。树形 DP 自底向上返回三种最小值，根不能处于未被覆盖状态。



对于每个节点，我们定义三种状态：

- `a`：当前节点有摄像头
- `b`：当前节点无摄像头，但被子节点监控
- `c`：当前节点无摄像头，也没被子节点监控

接下来，我们设计一个函数 $dfs(root)$，它将返回一个长度为 3 的数组，表示以 `root` 为根的子树中，三种状态下的最小摄像头数量。那么答案就是 $\min(dfs(root)[0], dfs(root)[1])$。

函数 $dfs(root)$ 的计算过程如下：

如果 `root` 为空，则返回 $[inf, 0, 0]$，其中 `inf` 表示一个很大的数，它用于表示不可能的情况。

否则，我们递归计算 `root` 的左右子树，分别得到 $[la, lb, lc]$ 和 $[ra, rb, rc]$。

- 如果当前节点有摄像头，那么它的左右节点必须都是被监控的状态，即 $a = \min(la, lb, lc) + \min(ra, rb, rc) + 1$。
- 如果当前节点无摄像头，但被子节点监控，那么子节点可以是其中之一或者两个都有摄像头，即 $b = \min(la + rb, lb + ra, la + ra)$。
- 如果当前节点无摄像头，也没被子节点监控，那么子节点必须被其子节点监控，即 $c = lb + rb$。

最后，我们返回 $[a, b, c]$。

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
    def minCameraCover(self, root: Optional[TreeNode]) -> int:
        def dfs(root):
            if root is None:
                return inf, 0, 0
            la, lb, lc = dfs(root.left)
            ra, rb, rc = dfs(root.right)
            a = min(la, lb, lc) + min(ra, rb, rc) + 1
            b = min(la + rb, lb + ra, la + ra)
            c = lb + rb
            return a, b, c

        a, b, _ = dfs(root)
        return min(a, b)
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

function minCameraCover(root: TreeNode | null): number {
    const dfs = (root: TreeNode | null): number[] => {
        if (!root) {
            return [1 << 29, 0, 0];
        }
        const [la, lb, lc] = dfs(root.left);
        const [ra, rb, rc] = dfs(root.right);
        const a = 1 + Math.min(la, lb, lc) + Math.min(ra, rb, rc);
        const b = Math.min(la + ra, la + rb, lb + ra);
        const c = lb + rb;
        return [a, b, c];
    };
    const [a, b, _] = dfs(root);
    return Math.min(a, b);
}
```








### 方法二：显式栈上的树形 DP



> **思考**
>
> 摄像头覆盖自身、父结点与子结点，最少个数取决于每个结点怎么放置。自底向上区分三种状态：本结点有摄像头、被子结点覆盖、未被覆盖。在较短的树上，递归返回这三种最小值，根不能停在未被覆盖的状态。
>
> 结点个数可达 $1000$。左链使这次后序遍历按结点个数递归，调用栈会溢出。
>
> 每个结点的三种状态只由左右子树的三种状态决定，所以必须先处理孩子，再处理父亲。
>
> 因此用显式栈做后序遍历。进入结点时压入退出标记和左右孩子，退出时按原来的三个式子写入该结点的状态。根的答案取前两个状态的较小值。



对于每个节点，我们定义三种状态：

- `a`：当前节点有摄像头
- `b`：当前节点无摄像头，但被子节点监控
- `c`：当前节点无摄像头，也没被子节点监控

空结点对应 $(inf, 0, 0)$，其中 $inf$ 是一个很大的数，表示不可能的情况。

我们用显式栈对二叉树做后序遍历。进入结点时压入退出标记，再压入右孩子和左孩子；退出时，左右子树的状态已经记下，记为 $[la, lb, lc]$ 和 $[ra, rb, rc]$。

- 如果当前节点有摄像头，那么它的左右节点必须都是被监控的状态，即 $a = \min(la, lb, lc) + \min(ra, rb, rc) + 1$。
- 如果当前节点无摄像头，但被子节点监控，那么子节点可以是其中之一或者两个都有摄像头，即 $b = \min(la + rb, lb + ra, la + ra)$。
- 如果当前节点无摄像头，也没被子节点监控，那么子节点必须被其子节点监控，即 $c = lb + rb$。

根结点不能处于未被覆盖的状态，答案是 $\min(a, b)$。

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
    def minCameraCover(self, root: Optional[TreeNode]) -> int:
        if root is None:
            return 0
        stk = [(root, 0)]
        sub = {}
        while stk:
            node, state = stk.pop()
            if node is None:
                continue
            if state == 0:
                stk.append((node, 1))
                stk.append((node.right, 0))
                stk.append((node.left, 0))
                continue
            la, lb, lc = sub[id(node.left)] if node.left is not None else (inf, 0, 0)
            ra, rb, rc = sub[id(node.right)] if node.right is not None else (inf, 0, 0)
            a = min(la, lb, lc) + min(ra, rb, rc) + 1
            b = min(la + rb, lb + ra, la + ra)
            c = lb + rb
            sub[id(node)] = (a, b, c)
        a, b, _ = sub[id(root)]
        return min(a, b)
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

function minCameraCover(root: TreeNode | null): number {
    if (!root) {
        return 0;
    }
    const inf = 1 << 29;
    const sub = new Map<TreeNode, number[]>();
    const stk: [TreeNode, number][] = [[root, 0]];
    while (stk.length) {
        const [node, state] = stk.pop()!;
        if (state === 0) {
            stk.push([node, 1]);
            if (node.right) {
                stk.push([node.right, 0]);
            }
            if (node.left) {
                stk.push([node.left, 0]);
            }
            continue;
        }
        const l = node.left ? sub.get(node.left)! : [inf, 0, 0];
        const r = node.right ? sub.get(node.right)! : [inf, 0, 0];
        const a = 1 + Math.min(l[0], l[1], l[2]) + Math.min(r[0], r[1], r[2]);
        const b = Math.min(l[0] + r[0], l[0] + r[1], l[1] + r[0]);
        const c = l[1] + r[1];
        sub.set(node, [a, b, c]);
    }
    const ans = sub.get(root)!;
    return Math.min(ans[0], ans[1]);
}
```
