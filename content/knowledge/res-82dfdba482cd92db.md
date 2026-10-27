## 解法




### 方法一：双倍字符串



> **思考**
>
> 判断 $s$ 是否由某一真前缀重复而成。枚举前缀长度并比较是 $O(n^2)$。
>
> 构造 $s+s$，从下标 $1$ 起查找 $s$：若第一次出现的位置小于 $n$，说明 $s$ 在拼接串内部对齐，即存在周期。
>
> 查找从 $1$ 开始是为了避开开头的平凡匹配；位置等于 $n$ 表示只在正中间对齐，没有更小周期。



若长度为 $n$ 的字符串 $s$ 由 $m$ 个重复子串组成，将 $s$ 拼接在自身上，得到字符串 $ss$，长度为 $2n$，此时若从下标 $1$ 开始查找 $s$，那么查找到的下标一定小于 $s$ 的长度。

若长度为 $n$ 的字符串 $s$ 不由重复子串组成，将 $s$ 拼接在自身上，得到字符串 $ss$，长度为 $2n$，此时若从下标 $1$ 开始查找 $s$，那么查找到的下标一定等于 $s$ 的长度。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为字符串 $s$ 的长度。




#### Python3


```python
class Solution:
    def repeatedSubstringPattern(self, s: str) -> bool:
        return (s + s).index(s, 1) < len(s)
```


#### TypeScript


```ts
function repeatedSubstringPattern(s: string): boolean {
    return (s + s).slice(1, (s.length << 1) - 1).includes(s);
}
```
