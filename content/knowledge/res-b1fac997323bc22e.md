## 解法




### 方法一：维护坐标



> **思考**
>
> 判断移动序列是否回到原点，只需净位移为零。
>
> 维护坐标 $(x,y)$，按 `UDLR` 加减，最后看是否都为 $0$。



我们可以维护一个坐标 $(x, y)$，分别表示机器人在水平方向和竖直方向上的移动。

遍历字符串 $\textit{moves}$，根据当前字符的不同，更新坐标 $(x, y)$：

- 如果当前字符是 `'U'`，则 $y$ 加 $1$；
- 如果当前字符是 `'D'`，则 $y$ 减 $1$；
- 如果当前字符是 `'L'`，则 $x$ 减 $1$；
- 如果当前字符是 `'R'`，则 $x$ 加 $1$。

最后，判断 $x$ 和 $y$ 是否都为 $0$ 即可。

时间复杂度 $O(n)$，其中 $n$ 为字符串 $\textit{moves}$ 的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def judgeCircle(self, moves: str) -> bool:
        x = y = 0
        for c in moves:
            match c:
                case "U":
                    y += 1
                case "D":
                    y -= 1
                case "L":
                    x -= 1
                case "R":
                    x += 1
        return x == 0 and y == 0
```


#### TypeScript


```ts
function judgeCircle(moves: string): boolean {
    let [x, y] = [0, 0];
    for (const c of moves) {
        if (c === 'U') {
            y++;
        } else if (c === 'D') {
            y--;
        } else if (c === 'L') {
            x--;
        } else {
            x++;
        }
    }
    return x === 0 && y === 0;
}
```
