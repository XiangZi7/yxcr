## 解法




### 方法一：模拟



> **思考**
>
> 棋盘按字母行列排列，目标是从上一字母走到下一字母并输出路径。普通格子四向皆可，但 `z` 只有上方邻居，若先向下或向右可能走出棋盘。
>
> 对每步按「左、上、右、下」的次序移动：先消掉需要左移、上移的量，再右移、下移，从而在到达 `z` 之前先离开危险方向，最后追加 `!`。



从起点 $(0, 0)$ 出发，模拟每一步的移动，将每一步的移动结果拼接到答案中。注意移动的方向遵循“左、上、右、下”的顺序。

时间复杂度 $O(n)$，其中 $n$ 是字符串 $target$ 的长度，需要遍历字符串 $target$ 中的每一个字符。忽略答案的空间消耗，空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def alphabetBoardPath(self, target: str) -> str:
        i = j = 0
        ans = []
        for c in target:
            v = ord(c) - ord("a")
            x, y = v // 5, v % 5
            while j > y:
                j -= 1
                ans.append("L")
            while i > x:
                i -= 1
                ans.append("U")
            while j < y:
                j += 1
                ans.append("R")
            while i < x:
                i += 1
                ans.append("D")
            ans.append("!")
        return "".join(ans)
```
