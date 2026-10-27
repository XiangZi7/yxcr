## 解法




### 方法一



> **思考**
>
> 累加数由至少三个数拼接而成，且从第三项起每项等于前两项之和。数字串长度有限，前两个加数的划分一旦确定，其后序列便被唯一决定。
>
> 枚举前两个数的结束位置，跳过含前导零的划分，再递归验证剩余前缀是否恰为二者之和。若某次切分匹配，则滚动到下一对继续；串耗尽则成立。长度约束使枚举规模可接受。






#### Python3


```python
class Solution:
    def isAdditiveNumber(self, num: str) -> bool:
        def dfs(a, b, num):
            if not num:
                return True
            if a + b > 0 and num[0] == '0':
                return False
            for i in range(1, len(num) + 1):
                if a + b == int(num[:i]):
                    if dfs(b, a + b, num[i:]):
                        return True
            return False

        n = len(num)
        for i in range(1, n - 1):
            for j in range(i + 1, n):
                if i > 1 and num[0] == '0':
                    break
                if j - i > 1 and num[i] == '0':
                    continue
                if dfs(int(num[:i]), int(num[i:j]), num[j:]):
                    return True
        return False
```
