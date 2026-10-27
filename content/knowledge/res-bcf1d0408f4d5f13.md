## 解法




### 方法一：数学



> **思考**
>
> 若干分数相加减，分母在 $2$ 到 $10$。通分后再约分即可，不必用分数类。
>
> 取 $2$ 到 $10$ 的最小公倍数 $y$ 作公共分母，扫描带符号的 $a/b$ 累加到分子 $x$。最后与 $y$ 求 gcd 约分。表达式若不以符号开头则先补 `+`，便于统一解析。






#### Python3


```python
class Solution:
    def fractionAddition(self, expression: str) -> str:
        x, y = 0, 6 * 7 * 8 * 9 * 10
        if expression[0].isdigit():
            expression = '+' + expression
        i, n = 0, len(expression)
        while i < n:
            sign = -1 if expression[i] == '-' else 1
            i += 1
            j = i
            while j < n and expression[j] not in '+-':
                j += 1
            s = expression[i:j]
            a, b = s.split('/')
            x += sign * int(a) * y // int(b)
            i = j
        z = gcd(x, y)
        x //= z
        y //= z
        return f'{x}/{y}'
```


#### JavaScript


```js
/**
 * @param {string} expression
 * @return {string}
 */
var fractionAddition = function (expression) {
    let x = 0,
        y = 1;

    if (!expression.startsWith('-') && !expression.startsWith('+')) {
        expression = '+' + expression;
    }

    let i = 0;
    const n = expression.length;

    while (i < n) {
        const sign = expression[i] === '-' ? -1 : 1;
        i++;

        let j = i;
        while (j < n && expression[j] !== '+' && expression[j] !== '-') {
            j++;
        }

        const [a, b] = expression.slice(i, j).split('/').map(Number);
        x = x * b + sign * a * y;
        y *= b;
        i = j;
    }

    const gcd = (a, b) => {
        while (b !== 0) {
            [a, b] = [b, a % b];
        }
        return Math.abs(a);
    };

    const z = gcd(x, y);
    x = Math.floor(x / z);
    y = Math.floor(y / z);

    return `${x}/${y}`;
};
```
