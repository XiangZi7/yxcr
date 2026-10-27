## 解法




### 方法一：逐行遍历 + 排序



> **思考**
>
> 每行选一个数求和， $n^m$ 种组合而 $k\le 200$。只需保留前 $k$ 小的部分和。行已有序，与下一行相加时只需用到该行前 $k$ 个元素。
>
> 设 $pre$ 为已处理行的前 $k$ 小和，与当前行做笛卡尔加后排序截断前 $k$ 项。处理完所有行后 $pre[k-1]$ 即为答案。



根据题目描述，我们需要找出前 $m$ 行的所有可能数组中的第 $k$ 个最小数组和。

如果我们能够找出前 $m - 1$ 行的所有可能数组中的前 $k$ 个最小数组和，那么我们可以将第 $m$ 行的每个元素与前 $m - 1$ 行的前 $k$ 个最小数组和相加，将得到的所有结果排序后，取前 $k$ 个最小值，即为前 $m$ 行的所有可能数组中的前 $k$ 个最小值。

因此，我们可以定义一个数组 $pre$，用于存储此前遍历到的行的前 $k$ 个最小数组和，初始时 $pre$ 只有一个元素 $0$。

然后，我们遍历 $mat$ 的每一行 $cur$，将 $cur$ 中的每个元素与 $pre$ 中的每个元素相加，将得到的所有结果排序后，取前 $k$ 个最小值作为新的 $pre$。继续遍历下一行，直到遍历完所有行。

最后返回 $pre$ 中的第 $k$ 个数（下标 $k-1$）即可。

时间复杂度 $O(m \times n \times k \times \log (n \times k))$，空间复杂度 $O(n \times k)$。其中 $m$ 和 $n$ 分别是矩阵的行数和列数。




#### Python3


```python
class Solution:
    def kthSmallest(self, mat: List[List[int]], k: int) -> int:
        pre = [0]
        for cur in mat:
            pre = sorted(a + b for a in pre for b in cur[:k])[:k]
        return pre[-1]
```


#### TypeScript


```ts
function kthSmallest(mat: number[][], k: number): number {
    let pre: number[] = [0];
    for (const cur of mat) {
        const next: number[] = [];
        for (const a of pre) {
            for (const b of cur) {
                next.push(a + b);
            }
        }
        pre = next.sort((a, b) => a - b).slice(0, k);
    }
    return pre[k - 1];
}
```
