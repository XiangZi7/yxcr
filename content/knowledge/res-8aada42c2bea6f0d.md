## 解法




### 方法一：队列 + 模拟



> **思考**
>
> 参议员按顺序行使「禁止下一名对方」的权利，直到一方清空。直接在字符串里反复删人，最坏接近平方。
>
> 两队下标分别入队。队首较小者先手，把对方弹出，自己下标加 $n$ 回到队尾表示下一轮。一队空即胜。



我们创建两个队列 $qr$ 和 $qd$，分别记录天辉和夜魇阵营的参议员的下标。然后我们开始进行模拟，每一轮各从队首取出一位参议员，然后根据他的阵营进行不同的操作：

- 如果天辉阵营的参议员编号小于夜魇阵营的参议员编号，那么该天辉阵营的参议员就可以将夜魇阵营的参议员票权永久取消，我们将天辉阵营的参议员的下标加 $n$ 后重新放回队尾，表示该参议员会参与下一轮的投票。
- 如果夜魇阵营的参议员编号小于天辉阵营的参议员编号，那么该夜魇阵营的参议员就可以将天辉阵营的参议员票权永久取消，我们将夜魇阵营的参议员的下标加 $n$ 后重新放回队尾，表示该参议员会参与下一轮的投票。

最后当队列中只剩一种阵营的参议员时，该阵营的参议员获胜。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为参议员的数量。




#### Python3


```python
class Solution:
    def predictPartyVictory(self, senate: str) -> str:
        qr = deque()
        qd = deque()
        for i, c in enumerate(senate):
            if c == "R":
                qr.append(i)
            else:
                qd.append(i)
        n = len(senate)
        while qr and qd:
            if qr[0] < qd[0]:
                qr.append(qr[0] + n)
            else:
                qd.append(qd[0] + n)
            qr.popleft()
            qd.popleft()
        return "Radiant" if qr else "Dire"
```


#### TypeScript


```ts
function predictPartyVictory(senate: string): string {
    const n = senate.length;
    const qr: number[] = [];
    const qd: number[] = [];
    for (let i = 0; i < n; ++i) {
        if (senate[i] === 'R') {
            qr.push(i);
        } else {
            qd.push(i);
        }
    }
    while (qr.length > 0 && qd.length > 0) {
        const r = qr.shift()!;
        const d = qd.shift()!;
        if (r < d) {
            qr.push(r + n);
        } else {
            qd.push(d + n);
        }
    }
    return qr.length > 0 ? 'Radiant' : 'Dire';
}
```
