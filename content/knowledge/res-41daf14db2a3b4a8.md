## 解法




### 方法一：哈希表 + 排序



> **思考**
>
> 记录数达 $10^5$，若对每名员工枚举所有长度为 $3$ 的时间三元组，在打卡集中时仍可能落到较大常数。题目要求的是「一小时内至少三次」，等价于排序后存在间隔至多为 $60$ 分钟的连续三次打卡。
>
> 按人聚合时间并把 $\texttt{HH:MM}$ 换成分钟数后排序，则只需检查 $\textit{ts}[i+2]-\textit{ts}[i] \le 60$。
>
> 哈希表 $d$ 收集每人的时间列表；次数不足三次者跳过，命中警报的姓名最后再按字典序排序。



我们先用哈希表 $d$ 记录每个员工的所有打卡时间。

然后遍历哈希表，对于每个员工，我们先判断员工的打卡次数是否大于等于 3，如果不是，则跳过该员工。否则，我们将该员工的所有打卡时间按照时间先后排序，然后遍历排序后的打卡时间，判断下标距离为 $2$ 的两个时间是否在同一小时内，如果是，则将该员工加入答案数组。

最后，将答案数组按照字典序排序，即可得到答案。

时间复杂度 $O(n \times \log n)$，空间复杂度 $O(n)$。其中 $n$ 是打卡记录的数量。




#### Python3


```python
class Solution:
    def alertNames(self, keyName: List[str], keyTime: List[str]) -> List[str]:
        d = defaultdict(list)
        for name, t in zip(keyName, keyTime):
            t = int(t[:2]) * 60 + int(t[3:])
            d[name].append(t)
        ans = []
        for name, ts in d.items():
            if (n := len(ts)) > 2:
                ts.sort()
                for i in range(n - 2):
                    if ts[i + 2] - ts[i] <= 60:
                        ans.append(name)
                        break
        ans.sort()
        return ans
```


#### TypeScript


```ts
function alertNames(keyName: string[], keyTime: string[]): string[] {
    const d: { [name: string]: number[] } = {};
    for (let i = 0; i < keyName.length; ++i) {
        const name = keyName[i];
        const t = keyTime[i];
        const minutes = +t.slice(0, 2) * 60 + +t.slice(3);
        if (d[name] === undefined) {
            d[name] = [];
        }
        d[name].push(minutes);
    }
    const ans: string[] = [];
    for (const name in d) {
        if (d.hasOwnProperty(name)) {
            const ts = d[name];
            if (ts.length > 2) {
                ts.sort((a, b) => a - b);
                for (let i = 0; i < ts.length - 2; ++i) {
                    if (ts[i + 2] - ts[i] <= 60) {
                        ans.push(name);
                        break;
                    }
                }
            }
        }
    }
    ans.sort();
    return ans;
}
```
