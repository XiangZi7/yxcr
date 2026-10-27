## 解法




### 方法一：递归



> **思考**
>
> 表达式含并、连接与多层花括号，求展开后的去重有序集合。表达式长 $\le 60$，可递归把最内层花括号展开后拼回再处理。
>
> 找到第一个 `}` 及其匹配的 `{`，前缀 $a$、选项 $b_i$、后缀 $c$ 拼成 $a+b_i+c$ 继续递归；不再含括号则加入集合。
>
> 集合去重后排序输出。



我们设计一个递归函数 $dfs(exp)$，用于处理表达式 $exp$，并将结果存入集合 $s$ 中。

对于表达式 $exp$，我们首先找到第一个右花括号的位置 $j$，如果找不到，说明 $exp$ 中没有右花括号，即 $exp$ 为单一元素，直接将 $exp$ 加入集合 $s$ 中即可。

否则，我们从位置 $j$ 开始往左找到第一个左花括号的位置 $i$，此时 $exp[:i]$ 和 $exp[j + 1:]$ 分别为 $exp$ 的前缀和后缀，记为 $a$ 和 $c$。而 $exp[i + 1: j]$ 为 $exp$ 中花括号内的部分，即 $exp$ 中的子表达式，我们将其按照逗号分割成多个字符串 $b_1, b_2, \cdots, b_k$，然后对每个 $b_i$，我们将 $a + b_i + c$ 拼接成新的表达式，递归调用 $dfs$ 函数处理新的表达式，即 $dfs(a + b_i + c)$。

最后，我们将集合 $s$ 中的元素按照字典序排序，即可得到答案。

时间复杂度 $O(3^{n/6})$，空间复杂度 $O(n \times 3^{n/7})$，其中 $n$ 为表达式 $expression$ 的长度。最坏时间出现在 $\{\ldots\{a,b,c\},a,b\}$ 这种逐层套上三路并集的表达式上：每增加 $6$ 个字符，递归树就大约变成原来的 $3$ 倍，各层字符串长度之和为 $\Theta(3^{n/6})$。连续拼接的 $\{a,b,c\}$ 会生成 $\Theta(3^{n/7})$ 个长度为 $O(n)$ 的字符串，去重后的结果集占 $O(n \times 3^{n/7})$ 空间，排序它们的开销是 $O(n^2 \times 3^{n/7})$，仍低于上面的时间上界。递归栈深度为 $O(n)$，栈上字符串共 $O(n^2)$。




#### Python3


```python
class Solution:
    def braceExpansionII(self, expression: str) -> List[str]:
        def dfs(exp):
            j = exp.find('}')
            if j == -1:
                s.add(exp)
                return
            i = exp.rfind('{', 0, j)
            a, c = exp[:i], exp[j + 1 :]
            for b in exp[i + 1 : j].split(','):
                dfs(a + b + c)

        s = set()
        dfs(expression)
        return sorted(s)
```


#### TypeScript


```ts
function braceExpansionII(expression: string): string[] {
    const dfs = (exp: string) => {
        const j = exp.indexOf('}');
        if (j === -1) {
            s.add(exp);
            return;
        }
        const i = exp.lastIndexOf('{', j);
        const a = exp.substring(0, i);
        const c = exp.substring(j + 1);
        for (const b of exp.substring(i + 1, j).split(',')) {
            dfs(a + b + c);
        }
    };
    const s: Set<string> = new Set();
    dfs(expression);
    return Array.from(s).sort();
}
```


### 方法二：语法分析



> **思考**
>
> 方法一每选中一个选项，就把还没展开的后缀再复制一份递归处理。像 $\{\ldots\{a,b,c\},a,b\}$ 这样层层嵌套时，同一段后缀被重复扫描，时间达到 $O(3^{n/6})$，不同单词却可能只有常数个。
>
> 逗号只出现在花括号里，表示并；括号外相邻的因子表示连接。按这个文法从左到右解析，每个子表达式只求一次集合。
>
> 因子是一段连续小写字母，或一对花括号中的表达式。连接把当前集合与因子集合做笛卡尔积，逗号把若干连接结果取并。哈希集合负责去重，全部解析完再按字典序排序。



记表达式为 $s$。从下标 $i$ 出发定义两个函数。

$\textit{expr}(i)$ 解析若干个 $\textit{term}$ 的并集：先解析一个 $\textit{term}$，若后面是逗号，就跳过逗号再解析下一个 $\textit{term}$，把集合并进去，直到遇到 `}` 或结尾。

$\textit{term}(i)$ 解析若干个因子的连接，初始集合为 $\{\varepsilon\}$。若当前字符是 `{`，则递归解析内部的 $\textit{expr}$ 并跳过匹配的 `}`；否则读出一段连续小写字母。然后把当前集合与该因子的集合做笛卡尔积。遇到逗号、`}` 或结尾时返回。

最后对 $\textit{expr}(0)$ 的结果按字典序排序。同一段子表达式只解析一次，方法一里把后缀复制到每一支再重扫的开销不再出现。

时间复杂度 $O(n^2 \times 3^{n/7})$，空间复杂度 $O(n \times 3^{n/7})$，其中 $n$ 为表达式长度。最坏情况是连续拼接的 `{a,b,c}`，需要生成 $\Theta(3^{n/7})$ 个长度为 $O(n)$ 的字符串；构造这些字符串是 $O(n \times 3^{n/7})$，排序是 $O(n^2 \times 3^{n/7})$。嵌套的三路并集在本方法里每层集合大小为 $O(1)$，时间只需 $O(n)$。




#### Python3


```python
class Solution:
    def braceExpansionII(self, expression: str) -> List[str]:
        def expr(i: int):
            res, i = term(i)
            while i < len(expression) and expression[i] == ',':
                other, i = term(i + 1)
                res |= other
            return res, i

        def term(i: int):
            res = {''}
            while i < len(expression) and expression[i] not in ',}':
                if expression[i] == '{':
                    cur, i = expr(i + 1)
                    i += 1
                else:
                    j = i + 1
                    while j < len(expression) and expression[j].islower():
                        j += 1
                    cur = {expression[i:j]}
                    i = j
                res = {a + b for a in res for b in cur}
            return res, i

        ans, _ = expr(0)
        return sorted(ans)
```


#### TypeScript


```ts
function braceExpansionII(expression: string): string[] {
    let i = 0;
    const expr = (): Set<string> => {
        const res = term();
        while (i < expression.length && expression[i] === ',') {
            ++i;
            for (const w of term()) {
                res.add(w);
            }
        }
        return res;
    };
    const term = (): Set<string> => {
        let res = new Set<string>(['']);
        while (i < expression.length && expression[i] !== ',' && expression[i] !== '}') {
            let cur: Set<string>;
            if (expression[i] === '{') {
                ++i;
                cur = expr();
                ++i;
            } else {
                let j = i + 1;
                while (j < expression.length && expression[j] >= 'a' && expression[j] <= 'z') {
                    ++j;
                }
                cur = new Set([expression.slice(i, j)]);
                i = j;
            }
            const nxt = new Set<string>();
            for (const a of res) {
                for (const b of cur) {
                    nxt.add(a + b);
                }
            }
            res = nxt;
        }
        return res;
    };
    return Array.from(expr()).sort();
}
```
