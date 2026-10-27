## 解法




### 方法一：排序 + 遍历



> **思考**
>
> 判断数组能否重排成等差数列，一种直接做法是枚举所有排列再检查公差，排列数为 $n!$，即便 $n$ 只有一千也会过大。重排后相邻差必须相同，因此只需确定一种规范顺序。
>
> 将数组排序后，公差只能是相邻两项之差。从左到右核验每一对相邻差是否等于首项差即可。排序代价可接受，随后一次线性扫描便能判定。



我们可以先将数组 $\textit{arr}$ 排序，然后计算前两项的差值 $d$，接着遍历数组，判断相邻两项的差是否等于 $d$。

时间复杂度 $O(n \times \log n)$，空间复杂度 $O(\log n)$。其中 $n$ 为数组 $\textit{arr}$ 的长度。




#### Python3


```python
class Solution:
    def canMakeArithmeticProgression(self, arr: List[int]) -> bool:
        arr.sort()
        d = arr[1] - arr[0]
        return all(b - a == d for a, b in pairwise(arr))
```


#### TypeScript


```ts
function canMakeArithmeticProgression(arr: number[]): boolean {
    arr.sort((a, b) => a - b);
    const n = arr.length;
    const d = arr[1] - arr[0];
    for (let i = 2; i < n; i++) {
        if (arr[i] - arr[i - 1] !== d) {
            return false;
        }
    }
    return true;
}
```


### 方法二：哈希表 + 数学



> **思考**
>
> 方法一依赖排序，时间为 $O(n\log n)$。若等差数列存在，则公差由最小值 $a$ 与最大值 $b$ 唯一确定为 $d=(b-a)/(n-1)$，且须为整数。将元素放入哈希表后，只需检查 $a, a+d, \ldots, a+(n-1)d$ 是否均出现，从而在线性时间内完成判定。



我们先找出数组 $\textit{arr}$ 中的最小值 $a$ 和最大值 $b$，如果数组 $\textit{arr}$ 可以重排成等差数列，那么公差 $d = \frac{b - a}{n - 1}$ 必须为整数。

我们可以用哈希表来记录数组 $\textit{arr}$ 中的所有元素，然后遍历 $i \in [0, n)$，判断 $a + d \times i$ 是否在哈希表中，如果不在，说明数组 $\textit{arr}$ 不能重排成等差数列，返回 `false`。否则遍历完数组后，返回 `true`。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为数组 $\textit{arr}$ 的长度。




#### Python3


```python
class Solution:
    def canMakeArithmeticProgression(self, arr: List[int]) -> bool:
        a = min(arr)
        b = max(arr)
        n = len(arr)
        if (b - a) % (n - 1):
            return False
        d = (b - a) // (n - 1)
        s = set(arr)
        return all(a + d * i in s for i in range(n))
```


#### TypeScript


```ts
function canMakeArithmeticProgression(arr: number[]): boolean {
    const n = arr.length;
    const a = Math.min(...arr);
    const b = Math.max(...arr);

    if ((b - a) % (n - 1) !== 0) {
        return false;
    }

    const d = (b - a) / (n - 1);
    const s = new Set(arr);

    for (let i = 0; i < n; ++i) {
        if (!s.has(a + d * i)) {
            return false;
        }
    }
    return true;
}
```
