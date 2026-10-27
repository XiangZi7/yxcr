## 解法




### 方法一：哈希表 + 模拟



> **思考**
>
> 实体最长为 $7$ 个字符，且种类固定。 $n\le 10^5$ 时，从每个位置尝试匹配长度为 $1$～ $7$ 的前缀即可，无需通用解析器。
>
> 用哈希表保存实体到字符的映射。扫描时若 $s[i:i+\ell]$ 命中某实体则替换并跳过，否则输出当前字符。这样 `&amp;gt;` 会按最长（实为先匹配到的实体）正确拆成 `&` 与 `gt;`。



我们可以使用哈希表来存储每个字符实体对应的字符，然后遍历字符串，当遇到字符实体时，我们就将其替换为对应的字符。

时间复杂度 $O(n \times l)$，空间复杂度 $O(l)$。其中 $n$ 是字符串的长度，而 $l$ 是字符实体的总长度。




#### Python3


```python
class Solution:
    def entityParser(self, text: str) -> str:
        d = {
            '&quot;': '"',
            '&apos;': "'",
            '&amp;': "&",
            "&gt;": '>',
            "&lt;": '<',
            "&frasl;": '/',
        }
        i, n = 0, len(text)
        ans = []
        while i < n:
            for l in range(1, 8):
                j = i + l
                if text[i:j] in d:
                    ans.append(d[text[i:j]])
                    i = j
                    break
            else:
                ans.append(text[i])
                i += 1
        return ''.join(ans)
```


#### TypeScript


```ts
function entityParser(text: string): string {
    const d: Record<string, string> = {
        '&quot;': '"',
        '&apos;': "'",
        '&amp;': '&',
        '&gt;': '>',
        '&lt;': '<',
        '&frasl;': '/',
    };

    let ans: string = '';
    let i: number = 0;
    const n: number = text.length;

    while (i < n) {
        let found: boolean = false;
        for (let l: number = 1; l < 8; ++l) {
            const j: number = i + l;
            if (j <= n) {
                const t: string = text.substring(i, j);
                if (d.hasOwnProperty(t)) {
                    ans += d[t];
                    i = j;
                    found = true;
                    break;
                }
            }
        }

        if (!found) {
            ans += text[i++];
        }
    }

    return ans;
}
```








### 方法二：正则替换



> **思考**
>
> 方法一手工枚举前缀长度，实现略繁。实体集合很小，把所有键拼成正则，一次 `replace` 即可完成同样的映射，逻辑与方法一相同，只是匹配交给引擎。



用哈希表保存字符实体到字符的映射，再构造正则一次性替换所有实体。

时间复杂度 $O(n)$，空间复杂度 $O(l)$。其中 $n$ 是字符串的长度，而 $l$ 是字符实体的总长度。




#### TypeScript


```ts
function entityParser(text: string): string {
    const d: { [key: string]: string } = {
        '&quot;': '"',
        '&apos;': "'",
        '&amp;': '&',
        '&gt;': '>',
        '&lt;': '<',
        '&frasl;': '/',
    };

    const pattern = new RegExp(Object.keys(d).join('|'), 'g');
    return text.replace(pattern, match => d[match]);
}
```
