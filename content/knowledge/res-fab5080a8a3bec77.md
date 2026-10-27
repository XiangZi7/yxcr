## 解法




### 方法一：从任意起点开始遍历



> **思考**
>
> 问能否走完一圈以及从哪一站出发。 $n\le 10^5$，从每个起点模拟一圈是 $O(n^2)$。总油量小于总消耗则无解。
>
> 从某站出发油量为负，说明起点必须更靠前才能「补贴」这段亏空。代码从末站起向前扩起点、向后扩终点，亏空时把 $i$ 左移补油，每个站进出一次，最后看剩余是否非负。



我们用 $i$, $j$ 分别标记起点和终点，用 $s$ 表示当前剩余汽油，而 $cnt$ 表示当前行驶过的加油站数量。初始时，我们将起点设在最后一个位置，即 $i=n-1$。

开始行驶，移动 $j$。若发现当前剩余汽油小于 $0$，说明当前 $i$ 作为起点不符合要求，我们将起点 $i$ 循环左移，并且更新剩余汽油，直至剩余汽油是非负数。

当行驶过的加油站数量达到 $n$ 时，结束行驶过程。若此时剩余汽油 $s$ 仍然小于 $0$，说明不存在这样的起点，返回 $-1$。否则，返回起点 $i$。

时间复杂度 $O(n)$，其中 $n$ 表示加油站的数量。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int:
        n = len(gas)
        i = j = n - 1
        cnt = s = 0
        while cnt < n:
            s += gas[j] - cost[j]
            cnt += 1
            j = (j + 1) % n
            while s < 0 and cnt < n:
                i -= 1
                s += gas[i] - cost[i]
                cnt += 1
        return -1 if s < 0 else i
```


#### TypeScript


```ts
function canCompleteCircuit(gas: number[], cost: number[]): number {
    const n = gas.length;
    let i = n - 1;
    let j = n - 1;
    let s = 0;
    let cnt = 0;
    while (cnt < n) {
        s += gas[j] - cost[j];
        ++cnt;
        j = (j + 1) % n;
        while (s < 0 && cnt < n) {
            --i;
            s += gas[i] - cost[i];
            ++cnt;
        }
    }
    return s < 0 ? -1 : i;
}
```
