## 解法




### 方法一：哈希表



> **思考**
>
> 各换一盒使两人糖数相等。设爱丽丝拿出 $a$、鲍勃拿出 $b$，则 $a-b$ 等于总差的一半。 $n\le 10^4$，对每个 $a$ 扫描鲍勃会平方。
>
> 把鲍勃的盒重放入集合，枚举 $a$ 查 $a-\textit{diff}$ 是否存在。题目保证有解。



我们可以先计算出爱丽丝和鲍勃的糖果总数之差，除以二得到需要交换的糖果数之差 $\textit{diff}$，用一个哈希表 $\textit{s}$ 存储鲍勃的糖果盒中的糖果数，然后遍历爱丽丝的糖果盒，对于每个糖果数 $\textit{a}$，我们判断 $\textit{a} - \textit{diff}$ 是否在哈希表 $\textit{s}$ 中，如果存在，说明找到了一组答案，返回即可。

时间复杂度 $O(m + n)$，空间复杂度 $O(n)$。其中 $m$ 和 $n$ 分别是爱丽丝和鲍勃的糖果盒的数量。




#### Python3


```python
class Solution:
    def fairCandySwap(self, aliceSizes: List[int], bobSizes: List[int]) -> List[int]:
        diff = (sum(aliceSizes) - sum(bobSizes)) >> 1
        s = set(bobSizes)
        for a in aliceSizes:
            if (b := (a - diff)) in s:
                return [a, b]
```


#### TypeScript


```ts
function fairCandySwap(aliceSizes: number[], bobSizes: number[]): number[] {
    const s1 = aliceSizes.reduce((acc, cur) => acc + cur, 0);
    const s2 = bobSizes.reduce((acc, cur) => acc + cur, 0);
    const diff = (s1 - s2) >> 1;
    const s = new Set(bobSizes);
    for (const a of aliceSizes) {
        const b = a - diff;
        if (s.has(b)) {
            return [a, b];
        }
    }
    return [];
}
```
