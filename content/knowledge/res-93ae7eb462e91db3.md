## 解法




### 方法一：自定义排序



> **思考**
>
> 字母日志按内容再按标识符排序，数字日志保持原相对顺序且整体在后。用稳定的自定义键：字母日志键为 $(0,\textit{content},\textit{id})$，数字日志键为 $(1,)$，一次排序即可。



我们可以使用自定义排序的方法，将日志分为两类：字母日志和数字日志。

对于字母日志，我们需要按照题目要求进行排序，即先按内容排序，再按标识符排序。

对于数字日志，我们只需要保留原来的相对顺序。

时间复杂度 $O(n \times \log n)$，空间复杂度 $O(n)$。其中 $n$ 是日志的数量。




#### Python3


```python
class Solution:
    def reorderLogFiles(self, logs: List[str]) -> List[str]:
        def f(log: str):
            id_, rest = log.split(" ", 1)
            return (0, rest, id_) if rest[0].isalpha() else (1,)

        return sorted(logs, key=f)
```


#### TypeScript


```ts
function reorderLogFiles(logs: string[]): string[] {
    return logs.sort((log1, log2) => {
        const [id1, content1] = log1.split(/ (.+)/);
        const [id2, content2] = log2.split(/ (.+)/);

        const isLetter1 = isNaN(Number(content1[0]));
        const isLetter2 = isNaN(Number(content2[0]));

        if (isLetter1 && isLetter2) {
            const cmp = content1.localeCompare(content2);
            if (cmp !== 0) {
                return cmp;
            }
            return id1.localeCompare(id2);
        }

        return isLetter1 ? -1 : isLetter2 ? 1 : 0;
    });
}
```
