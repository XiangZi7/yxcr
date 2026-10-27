## 解法




### 方法一



> **思考**
>
> 在数字间插入 $+,-,*$ 或拼接多位，需枚举切分且乘法优先于加减。拼接时禁止前导零。
>
> DFS 记录上一操作数 $prev$ 与当前值 $curr$：加减直接改 $curr$，乘法则用 $curr-prev+prev\times\textit{next}$ 回退上一加法再改乘。






#### Python3


```python
class Solution:
    def addOperators(self, num: str, target: int) -> List[str]:
        ans = []

        def dfs(u, prev, curr, path):
            if u == len(num):
                if curr == target:
                    ans.append(path)
                return
            for i in range(u, len(num)):
                if i != u and num[u] == '0':
                    break
                next = int(num[u : i + 1])
                if u == 0:
                    dfs(i + 1, next, next, path + str(next))
                else:
                    dfs(i + 1, next, curr + next, path + "+" + str(next))
                    dfs(i + 1, -next, curr - next, path + "-" + str(next))
                    dfs(
                        i + 1,
                        prev * next,
                        curr - prev + prev * next,
                        path + "*" + str(next),
                    )

        dfs(0, 0, 0, "")
        return ans
```
