## 解法




### 方法一：哈希表



> **思考**
>
> 规则只作用于 `@` 左侧：忽略 `.`，并丢掉第一个 `+` 及其后内容。规范化后相同的地址应只计一次。对每个邮箱按规则改写本地名，再与域名拼回，放入集合，集合大小即为答案。



我们可以用一个哈希表 $s$ 来存储所有的电子邮件地址，然后遍历数组 $\textit{emails}$，对于每个电子邮件地址，我们将其分为本地名和域名两部分，然后对本地名进行处理，去掉所有的点号和加号后面的字符，最后将处理后的本地名和域名拼接起来，加入哈希表 $s$ 中。

最后返回哈希表 $s$ 的大小即可。

时间复杂度 $O(L)$，空间复杂度 $O(L)$，其中 $L$ 为所有电子邮件地址的长度之和。




#### Python3


```python
class Solution:
    def numUniqueEmails(self, emails: List[str]) -> int:
        s = set()
        for email in emails:
            local, domain = email.split("@")
            t = []
            for c in local:
                if c == ".":
                    continue
                if c == "+":
                    break
                t.append(c)
            s.add("".join(t) + "@" + domain)
        return len(s)
```


#### TypeScript


```ts
function numUniqueEmails(emails: string[]): number {
    const s = new Set<string>();
    for (const email of emails) {
        const [local, domain] = email.split('@');
        let t = '';
        for (const c of local) {
            if (c === '.') {
                continue;
            }
            if (c === '+') {
                break;
            }
            t += c;
        }
        s.add(t + '@' + domain);
    }
    return s.size;
}
```
