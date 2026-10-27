## 解法




### 方法一：计数



> **思考**
>
> 公牛是同位置同数字，母牛是数字出现但位置不同。先统计同位置匹配数 $x$，对其余位置分别计数。
>
> 每个数字对母牛的贡献为两侧计数的最小值，求和得 $y$。



我们创建两个计数器 $cnt1$ 和 $cnt2$，分别用来统计秘密数字和朋友猜测的数字中每个数字出现的次数。同时，我们创建一个变量 $x$ 来统计公牛的数量。

然后我们遍历秘密数字和朋友猜测的数字，如果当前数字相同，我们就将 $x$ 加一。否则，我们分别将秘密数字和朋友猜测的数字中的当前数字的计数加一。

最后，我们遍历 $cnt1$ 中的每个数字，取 $cnt1$ 和 $cnt2$ 中当前数字的计数的最小值，然后将这个最小值加到变量 $y$ 中。

最后，我们返回 $x$ 和 $y$ 的值。

时间复杂度 $O(n)$，其中 $n$ 是秘密数字和朋友猜测的数字的长度。空间复杂度 $O(|\Sigma|)$，其中 $|\Sigma|$ 是字符集的大小，本题中字符集为数字，所以 $|\Sigma| = 10$。




#### Python3


```python
class Solution:
    def getHint(self, secret: str, guess: str) -> str:
        cnt1, cnt2 = Counter(), Counter()
        x = 0
        for a, b in zip(secret, guess):
            if a == b:
                x += 1
            else:
                cnt1[a] += 1
                cnt2[b] += 1
        y = sum(min(cnt1[c], cnt2[c]) for c in cnt1)
        return f"{x}A{y}B"
```


#### TypeScript


```ts
function getHint(secret: string, guess: string): string {
    const cnt1: number[] = Array(10).fill(0);
    const cnt2: number[] = Array(10).fill(0);
    let x: number = 0;
    for (let i = 0; i < secret.length; ++i) {
        if (secret[i] === guess[i]) {
            ++x;
        } else {
            ++cnt1[+secret[i]];
            ++cnt2[+guess[i]];
        }
    }
    let y: number = 0;
    for (let i = 0; i < 10; ++i) {
        y += Math.min(cnt1[i], cnt2[i]);
    }
    return `${x}A${y}B`;
}
```
