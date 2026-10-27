## 解法




### 方法一：位运算



> **思考**
>
> 求二进制中两个相邻 $1$ 的最大距离。 $n\le 10^9$，移位扫描全部比特即可，不必转成字符串。
>
> 记下上一个 $1$ 的位次，再遇到 $1$ 时用间距更新答案。没有两个 $1$ 则间距保持为 $0$。



我们用两个指针 $\textit{pre}$ 和 $\textit{cur}$ 分别表示上一个和当前的 $1$ 的位置，初始时 $\textit{pre} = 100$, $\textit{cur} = 0$，然后遍历 $n$ 的二进制表示，当遇到 $1$ 时，计算当前位置和上一个 $1$ 的位置之间的距离，并更新答案。

时间复杂度 $O(\log n)$，其中 $n$ 是题目给定的整数。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def binaryGap(self, n: int) -> int:
        ans = 0
        pre, cur = inf, 0
        while n:
            if n & 1:
                ans = max(ans, cur - pre)
                pre = cur
            cur += 1
            n >>= 1
        return ans
```


#### TypeScript


```ts
function binaryGap(n: number): number {
    let ans = 0;
    for (let pre = 100, cur = 0; n; n >>= 1) {
        if (n & 1) {
            ans = Math.max(ans, cur - pre);
            pre = cur;
        }
        ++cur;
    }
    return ans;
}
```
