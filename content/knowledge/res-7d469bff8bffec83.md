## 解法




### 方法一



> **思考**
>
> 加热器覆盖半径要覆盖所有房子，求最小半径。枚举半径再检查， $n$ 与坐标都大，但可行性关于半径单调。
>
> 排序后二分半径 $r$：双指针让每个加热器覆盖 $[h-r,h+r]$，房子落在左侧则失败，落在右侧则换下一个加热器。
>
> 房子与加热器都有序，指针只前进，一次检查是线性的。






#### Python3


```python
class Solution:
    def findRadius(self, houses: List[int], heaters: List[int]) -> int:
        houses.sort()
        heaters.sort()

        def check(r):
            m, n = len(houses), len(heaters)
            i = j = 0
            while i < m:
                if j >= n:
                    return False
                mi = heaters[j] - r
                mx = heaters[j] + r
                if houses[i] < mi:
                    return False
                if houses[i] > mx:
                    j += 1
                else:
                    i += 1
            return True

        left, right = 0, int(1e9)
        while left < right:
            mid = (left + right) >> 1
            if check(mid):
                right = mid
            else:
                left = mid + 1
        return left
```


#### TypeScript


```ts
function findRadius(houses: number[], heaters: number[]): number {
    houses.sort((a, b) => a - b);
    heaters.sort((a, b) => a - b);
    const check = (r: number): boolean => {
        const m = houses.length;
        const n = heaters.length;
        let i = 0;
        let j = 0;
        while (i < m) {
            if (j >= n) {
                return false;
            }
            const mi = heaters[j] - r;
            const mx = heaters[j] + r;
            if (houses[i] < mi) {
                return false;
            }
            if (houses[i] > mx) {
                ++j;
            } else {
                ++i;
            }
        }
        return true;
    };
    let left = 0;
    let right = 1e9;
    while (left < right) {
        const mid = (left + right) >> 1;
        if (check(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
}
```
