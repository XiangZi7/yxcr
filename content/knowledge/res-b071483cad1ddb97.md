## 解法




### 方法一：数学分析



> **思考**
>
> 第 $i$ 步必须走 $i$，方向自选，求到达 $\textit{target}$ 的最少步数。目标可达 $10^9$，搜索步数序列不可行。
>
> 方向关于原点对称，可先取绝对值。连续向右走 $k$ 步到达三角数 $s$；若 $s-\textit{target}$ 为偶数，把其中 $\frac{s-\textit{target}}{2}$ 这一步反向即可，步数不变。
>
> 增大 $k$ 直到 $s\ge \textit{target}$ 且差为偶数。 $k$ 为 $O(\sqrt{|\textit{target}|})$。



由于对称性，每次可以选择向左或向右移动，因此，我们可以将 $\textit{target}$ 统一取绝对值。

定义 $s$ 表示当前所处的位置，用变量 $k$ 记录移动的次数。初始时 $s$ 和 $k$ 均为 $0$。

我们将 $s$ 一直循环累加，直到满足 $s\ge \textit{target}$ 并且 $(s-\textit{target}) \bmod 2 = 0$，此时的移动次数 $k$ 就是答案，直接返回。

为什么？因为如果 $s\ge \textit{target}$ 且 $(s-\textit{target})\mod 2 = 0$，我们只需要把前面 $\frac{s-\textit{target}}{2}$ 这个正整数变为负数，就能使得 $s$ 与 $\textit{target}$ 相等。正整数变负数的过程，实际上是将移动的方向改变，但实际移动次数仍然不变。

时间复杂度 $O(\sqrt{\left | \textit{target} \right | })$，空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def reachNumber(self, target: int) -> int:
        target = abs(target)
        s = k = 0
        while 1:
            if s >= target and (s - target) % 2 == 0:
                return k
            k += 1
            s += k
```


#### JavaScript


```js
/**
 * @param {number} target
 * @return {number}
 */
var reachNumber = function (target) {
    target = Math.abs(target);
    let [s, k] = [0, 0];
    while (1) {
        if (s >= target && (s - target) % 2 == 0) {
            return k;
        }
        ++k;
        s += k;
    }
};
```
