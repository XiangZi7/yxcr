## 解法




### 方法一：拓扑排序



> **思考**
>
> 状态为（鼠位、猫位、轮到谁）， $n\le 50$，正向搜索难以及时判定平局。从终局反推：鼠入洞则鼠胜，同格则猫胜。
>
> 上一状态若轮到的一方能走进己方必胜，则记为该方胜；否则将出度减一，减尽后记为对方胜。按此拓扑序扫完后读取初始状态 $(1,2,\text{鼠回合})$。



根据题目描述，游戏中的状态由老鼠的位置、猫的位置和移动方决定。当状态为以下情况，可以直接确定胜负：

- 当猫和老鼠的位置相同时，猫获胜，这是猫的必胜状态，老鼠的必败状态。
- 当老鼠位于洞时，老鼠获胜，这是老鼠的必胜状态，猫的必败状态。

为了得到初始状态的游戏结果，需要从边界状态开始遍历所有的状态。每个状态包含老鼠的位置、猫的位置和移动方，根据当前状态可以得到上一轮的所有可能状态，上一轮状态的移动方和当前状态的移动方相反，上一轮状态的移动方在上一轮状态的位置和当前状态的位置不同。

我们用元组 $(m, c, t)$ 表示本轮的状态，用 $(pm, pc, pt)$ 表示上一轮可能的状态，那么上一轮的所有可能状态有：

- 如果本轮的移动方是老鼠，那么上一轮的移动方是猫，上一轮的老鼠位置是本轮老鼠位置，上一轮的猫位置是本轮猫位置的所有邻接点。
- 如果本轮的移动方是猫，那么上一轮的移动方是老鼠，上一轮的猫位置是本轮猫位置，上一轮的老鼠位置是本轮老鼠位置的所有邻接点。

初始时，除了边界状态以外，其他所有状态的结果都是未知的。我们从边界状态开始，对于每个状态，得到上一轮的所有可能状态并更新结果，更新的逻辑如下：

1. 如果上一轮的移动方与本轮的获胜方相同，那么上一轮的移动方可以到达当前状态并获胜，直接更新上一轮的状态为本轮的获胜方。
1. 如果上一轮的移动方与本轮的获胜方不同，且上一轮的移动方可以到达的所有状态都是上一轮的移动方的必败状态，那么我们将上一轮的状态更新为本轮的获胜方。

对于第 $2$ 个更新逻辑，我们需要记录每个状态的度。初始时，每个状态的度表示该状态的移动方可以移动到的结点数，即移动方所在节点的相邻结点数，如果移动方是猫且所在结点与洞相邻则需要将该状态的度减 $1$。

当所有状态的结果都更新完毕时，初始状态的结果即为最终结果。

时间复杂度 $O(n^3)$，空间复杂度 $O(n^2)$。其中 $n$ 是图中的结点数。




#### Python3


```python
HOLE, MOUSE_START, CAT_START = 0, 1, 2
MOUSE_TURN, CAT_TURN = 0, 1
MOUSE_WIN, CAT_WIN, TIE = 1, 2, 0


class Solution:
    def catMouseGame(self, graph: List[List[int]]) -> int:
        def get_prev_states(state):
            m, c, t = state
            pt = t ^ 1
            pre = []
            if pt == CAT_TURN:
                for pc in graph[c]:
                    if pc != HOLE:
                        pre.append((m, pc, pt))
            else:
                for pm in graph[m]:
                    pre.append((pm, c, pt))
            return pre

        n = len(graph)
        ans = [[[0, 0] for _ in range(n)] for _ in range(n)]
        degree = [[[0, 0] for _ in range(n)] for _ in range(n)]
        for i in range(n):
            for j in range(1, n):
                degree[i][j][MOUSE_TURN] = len(graph[i])
                degree[i][j][CAT_TURN] = len(graph[j])
            for j in graph[HOLE]:
                degree[i][j][CAT_TURN] -= 1
        q = deque()
        for j in range(1, n):
            ans[0][j][MOUSE_TURN] = ans[0][j][CAT_TURN] = MOUSE_WIN
            q.append((0, j, MOUSE_TURN))
            q.append((0, j, CAT_TURN))
        for i in range(1, n):
            ans[i][i][MOUSE_TURN] = ans[i][i][CAT_TURN] = CAT_WIN
            q.append((i, i, MOUSE_TURN))
            q.append((i, i, CAT_TURN))
        while q:
            state = q.popleft()
            t = ans[state[0]][state[1]][state[2]]
            for prev_state in get_prev_states(state):
                pm, pc, pt = prev_state
                if ans[pm][pc][pt] == TIE:
                    win = (t == MOUSE_WIN and pt == MOUSE_TURN) or (
                        t == CAT_WIN and pt == CAT_TURN
                    )
                    if win:
                        ans[pm][pc][pt] = t
                        q.append(prev_state)
                    else:
                        degree[pm][pc][pt] -= 1
                        if degree[pm][pc][pt] == 0:
                            ans[pm][pc][pt] = t
                            q.append(prev_state)
        return ans[MOUSE_START][CAT_START][MOUSE_TURN]
```


#### TypeScript


```ts
function catMouseGame(graph: number[][]): number {
    const [HOLE, MOUSE_START, CAT_START] = [0, 1, 2];
    const [MOUSE_TURN, CAT_TURN] = [0, 1];
    const [MOUSE_WIN, CAT_WIN, TIE] = [1, 2, 0];

    function get_prev_states(state: [number, number, number]): [number, number, number][] {
        const [m, c, t] = state;
        const pt = t ^ 1;
        const pre = [] as [number, number, number][];

        if (pt === CAT_TURN) {
            for (const pc of graph[c]) {
                if (pc !== HOLE) {
                    pre.push([m, pc, pt]);
                }
            }
        } else {
            for (const pm of graph[m]) {
                pre.push([pm, c, pt]);
            }
        }
        return pre;
    }

    const n = graph.length;
    const ans: number[][][] = Array.from({ length: n }, () =>
        Array.from({ length: n }, () => [TIE, TIE]),
    );
    const degree: number[][][] = Array.from({ length: n }, () =>
        Array.from({ length: n }, () => [0, 0]),
    );

    for (let i = 0; i < n; i++) {
        for (let j = 1; j < n; j++) {
            degree[i][j][MOUSE_TURN] = graph[i].length;
            degree[i][j][CAT_TURN] = graph[j].length;
        }
        for (const j of graph[HOLE]) {
            degree[i][j][CAT_TURN] -= 1;
        }
    }

    const q: [number, number, number][] = [];

    for (let j = 1; j < n; j++) {
        ans[0][j][MOUSE_TURN] = ans[0][j][CAT_TURN] = MOUSE_WIN;
        q.push([0, j, MOUSE_TURN], [0, j, CAT_TURN]);
    }
    for (let i = 1; i < n; i++) {
        ans[i][i][MOUSE_TURN] = ans[i][i][CAT_TURN] = CAT_WIN;
        q.push([i, i, MOUSE_TURN], [i, i, CAT_TURN]);
    }

    while (q.length > 0) {
        const state = q.shift()!;
        const [m, c, t] = state;
        const result = ans[m][c][t];

        for (const prev_state of get_prev_states(state)) {
            const [pm, pc, pt] = prev_state;
            if (ans[pm][pc][pt] === TIE) {
                const win =
                    (result === MOUSE_WIN && pt === MOUSE_TURN) ||
                    (result === CAT_WIN && pt === CAT_TURN);
                if (win) {
                    ans[pm][pc][pt] = result;
                    q.push(prev_state);
                } else {
                    degree[pm][pc][pt] -= 1;
                    if (degree[pm][pc][pt] === 0) {
                        ans[pm][pc][pt] = result;
                        q.push(prev_state);
                    }
                }
            }
        }
    }

    return ans[MOUSE_START][CAT_START][MOUSE_TURN];
}
```
