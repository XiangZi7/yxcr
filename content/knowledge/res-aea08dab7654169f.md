## 解法




### 方法一：多源  BFS



> **思考**
>
> 多米诺同时向左右倒，相向作用会抵消。 $n\le 10^5$，模拟每一秒全体倾倒偏慢。力从已倒下的牌向外传播，等价于多源 BFS。
>
> 初始所有 $L$、 $R$ 入队。某格只在同一时刻收到一种力才倒下；同时收到左右力则保持竖直。按时间分层扩展即可得到最终状态。



把所有初始受到推力的骨牌（`L`  或  `R`）视作 **源点**，它们会同时向外扩散各自的力。用队列按时间层级（0, 1, 2 …）进行  BFS：

我们定义 $\text{time[i]}$  记录第  _i_  张骨牌第一次受力的时刻，`-1`  表示尚未受力，定义 $\text{force[i]}$  是一个长度可变的列表，存放该骨牌在同一时刻收到的方向（`'L'`、`'R'`）。初始时把所有  `L/R`  的下标压入队列，并将它们的时间置  0。

当弹出下标  _i_ 时，若  $\text{force[i]}$  只有一个方向，骨牌就会倒向该方向  $f$。设下一张骨牌下标为

$$
j =
\begin{cases}
i - 1, & f = L,\\
i + 1, & f = R.
\end{cases}
$$

若  $0 \leq j < n$：

- 若 $\text{time[j]}=-1$，说明  _j_  从未受力，记录 $\text{time[j]}=\text{time[i]}+1$ 并入队，同时把  $f$ 写入  $\text{force[j]}$。
- 若 $\text{time[j]}=\text{time[i]}+1$，说明它在同一“下一刻”已受过另一股力，此时只把  $f$ 追加到  $\text{force[j]}$，形成对冲；后续因  `len(force[j])==2`，它将保持竖直。

队列清空后，所有  $\text{force[i]}$  长度为  1  的位置倒向对应方向；长度为  2  的位置保持  `.`。最终将字符数组拼接为答案。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 是骨牌的数量。




#### Python3


```python
class Solution:
    def pushDominoes(self, dominoes: str) -> str:
        n = len(dominoes)
        q = deque()
        time = [-1] * n
        force = defaultdict(list)
        for i, f in enumerate(dominoes):
            if f != '.':
                q.append(i)
                time[i] = 0
                force[i].append(f)
        ans = ['.'] * n
        while q:
            i = q.popleft()
            if len(force[i]) == 1:
                ans[i] = f = force[i][0]
                j = i - 1 if f == 'L' else i + 1
                if 0 <= j < n:
                    t = time[i]
                    if time[j] == -1:
                        q.append(j)
                        time[j] = t + 1
                        force[j].append(f)
                    elif time[j] == t + 1:
                        force[j].append(f)
        return ''.join(ans)
```


#### TypeScript


```ts
function pushDominoes(dominoes: string): string {
    const n = dominoes.length;
    const q: number[] = [];
    const time: number[] = Array(n).fill(-1);
    const force: string[][] = Array.from({ length: n }, () => []);

    for (let i = 0; i < n; i++) {
        const f = dominoes[i];
        if (f !== '.') {
            q.push(i);
            time[i] = 0;
            force[i].push(f);
        }
    }

    const ans: string[] = Array(n).fill('.');
    let head = 0;
    while (head < q.length) {
        const i = q[head++];
        if (force[i].length === 1) {
            const f = force[i][0];
            ans[i] = f;
            const j = f === 'L' ? i - 1 : i + 1;
            if (j >= 0 && j < n) {
                const t = time[i];
                if (time[j] === -1) {
                    q.push(j);
                    time[j] = t + 1;
                    force[j].push(f);
                } else if (time[j] === t + 1) {
                    force[j].push(f);
                }
            }
        }
    }
    return ans.join('');
}
```
