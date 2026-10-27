## 解法




### 方法一：遍历



> **思考**
>
> 数字长度 $n \le 4$，答案至多 $4^n$ 种，枚举全部组合在复杂度上可以接受。本质是若干字母集合的笛卡尔积；若手写 $n$ 层循环，则 $n$ 不固定时无法写出。
>
> 从空串出发，每读入一位数字，就把当前所有前缀与该位对应字母再拼接一遍，得到新的前缀表。这相当于按层展开笛卡尔积。因此用数组保存数字到字母的映射，从只含空串的列表出发逐位扩展；输入为空时返回空列表。



我们先用一个数组或者哈希表存储每个数字对应的字母，然后遍历每个数字，将其对应的字母与之前的结果进行组合，得到新的结果。

时间复杂度 $O(4^n)$。空间复杂度 $O(4^n)$。其中 $n$ 是输入数字的长度。




#### Python3


```python
class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        if not digits:
            return []
        d = ["abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"]
        ans = [""]
        for i in digits:
            s = d[int(i) - 2]
            ans = [a + b for a in ans for b in s]
        return ans
```


#### TypeScript


```ts
function letterCombinations(digits: string): string[] {
    if (digits.length === 0) {
        return [];
    }
    const ans: string[] = [''];
    const d = ['abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
    for (const i of digits) {
        const s = d[+i - 2];
        const t: string[] = [];
        for (const a of ans) {
            for (const b of s) {
                t.push(a + b);
            }
        }
        ans.splice(0, ans.length, ...t);
    }
    return ans;
}
```


### 方法二：DFS



> **思考**
>
> 方法一已经能枚举全部答案，但每一层都新开一张前缀表，中间字符串占用的空间始终是 $O(4^n)$。
>
> 若只沿一条路径向下走、走完再回溯，额外空间可以压到 $O(n)$，即递归深度与路径长度。为此按下标深度优先搜索：选定当前数字的一个字母后推进，返回时撤销选择。答案集合不变，只是生成方式从按层扩展改为一条路径走到底。



我们可以使用深度优先搜索的方法，枚举所有可能的字母组合。假设当前已经产生了一部分字母组合，但是还有一些数字没有被穷举到，此时我们取出下一个数字所对应的字母，然后依次枚举这个数字所对应的每一个字母，将它们添加到前面已经产生的字母组合后面，形成所有可能的组合。

时间复杂度 $O(4^n)$。空间复杂度 $O(n)$。其中 $n$ 是输入数字的长度。




#### Python3


```python
class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        def dfs(i: int):
            if i >= len(digits):
                ans.append("".join(t))
                return
            for c in d[int(digits[i]) - 2]:
                t.append(c)
                dfs(i + 1)
                t.pop()

        if not digits:
            return []
        d = ["abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"]
        ans = []
        t = []
        dfs(0)
        return ans
```


#### TypeScript


```ts
function letterCombinations(digits: string): string[] {
    if (digits.length === 0) {
        return [];
    }
    const ans: string[] = [];
    const t: string[] = [];
    const d = ['abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
    const dfs = (i: number) => {
        if (i >= digits.length) {
            ans.push(t.join(''));
            return;
        }
        const s = d[+digits[i] - 2];
        for (const c of s) {
            t.push(c);
            dfs(i + 1);
            t.pop();
        }
    };
    dfs(0);
    return ans;
}
```
