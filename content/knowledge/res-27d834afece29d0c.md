## 解法




### 方法一：逆向计算



> **思考**
>
> 从 $(sx,sy)$ 只能做 $(x,x+y)$ 或 $(x+y,y)$，终点坐标可以很大，正向搜索分支无法收敛。逆运算是从较大维减去若干个较小维，即取模。
>
> 当两维都还大于起点且不相等时，把大的对小的取模，相当于一次走完能减的步。落到某一维已对齐后，另一维若能被该维整除地减到起点，则可达。
>
> 相等且等于起点则成功；两维都对不上则失败。取模避免逐次减法。



从 `(tx, ty)` 开始逆向计算，判断是否可以到达状态 `(sx, sy)`。由于逆向计算是将 tx, ty 中的较大值减少，因此当 `tx > ty` 时可以直接将 tx 的值更新为 `tx % ty`，当 `tx < ty` 时可以将 ty 的值更新为 `ty % tx`。逆向计算需要满足 `tx > sx && ty > sy && tx != ty`。

当条件不成立时，根据此时 tx 和 ty 判断是否可以从起点转换到终点。

- 如果 `tx == sx && ty == sy`，说明此时已经到达起点状态，返回 true；
- 如果 `tx == sx`，若 `ty > sy && (ty - sy) % tx == 0`，返回 true，否则返回 false；
- 如果 `ty == sy`，若 `tx > sx && (tx - sx) % ty == 0`，返回 true，否则返回 false；
- 如果 `tx ≠ sx && ty ≠ sy`，则不可以从起点转换到终点。




#### Python3


```python
class Solution:
    def reachingPoints(self, sx: int, sy: int, tx: int, ty: int) -> bool:
        while tx > sx and ty > sy and tx != ty:
            if tx > ty:
                tx %= ty
            else:
                ty %= tx
        if tx == sx and ty == sy:
            return True
        if tx == sx:
            return ty > sy and (ty - sy) % tx == 0
        if ty == sy:
            return tx > sx and (tx - sx) % ty == 0
        return False
```
