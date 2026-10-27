## 解法




### 方法一：枚举



> **思考**
>
> 第 $k$ 个排列不必先列出前面的 $k-1$ 个。若生成全部 $n!$ 种排列再按下标取值， $n \le 9$ 时可以枚举完，但其余排列都用不上。
>
> 确定某一位后，剩余数字的排列恰好占 $(n-i-1)!$ 种。用 $k$ 与这个块大小比较，即可知道当前位应取第几个尚未使用的数字，并一次性跳过整块。
>
> 为此从左到右填每一位，用阶乘定位、用 $\textit{vis}$ 记录已用数字，时间 $O(n^2)$。



我们知道，集合 $[1,2,..n]$ 一共有 $n!$ 种排列，如果我们确定首位，那剩余位能组成的排列数量为 $(n-1)!$。

因此，我们枚举每一位 $i$，如果此时 $k$ 大于当前位置确定后的排列数量，那么我们可以直接减去这个数量；否则，说明我们找到了当前位置的数。

对于每一位 $i$，其中 $0 \leq i \lt n$，剩余位能组成的排列数量为 $(n-i-1)!$，我们记为 $fact$。过程中已使用的数记录在 `vis` 中。

时间复杂度 $O(n^2)$，空间复杂度 $O(n)$。




#### Python3


```python
class Solution:
    def getPermutation(self, n: int, k: int) -> str:
        ans = []
        vis = [False] * (n + 1)
        for i in range(n):
            fact = 1
            for j in range(1, n - i):
                fact *= j
            for j in range(1, n + 1):
                if not vis[j]:
                    if k > fact:
                        k -= fact
                    else:
                        ans.append(str(j))
                        vis[j] = True
                        break
        return ''.join(ans)
```


#### TypeScript


```ts
function getPermutation(n: number, k: number): string {
    let ans = '';
    const vis = Array.from({ length: n + 1 }, () => false);
    for (let i = 0; i < n; i++) {
        let fact = 1;
        for (let j = 1; j < n - i; j++) {
            fact *= j;
        }
        for (let j = 1; j <= n; j++) {
            if (!vis[j]) {
                if (k > fact) {
                    k -= fact;
                } else {
                    ans += j;
                    vis[j] = true;
                    break;
                }
            }
        }
    }
    return ans;
}
```
