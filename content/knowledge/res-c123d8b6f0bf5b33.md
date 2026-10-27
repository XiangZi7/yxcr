## 解法




### 方法一：排序



> **思考**
>
> 任意子数组翻转等价于可以任意重排。 $n\le 1000$，两数组排序后相等当且仅当能互变。



如果两个数组排序后相等，那么它们可以通过翻转子数组变成相等的数组。

因此，我们只需要对两个数组进行排序，然后判断排序后的数组是否相等即可。

时间复杂度 $O(n \times \log n)$，空间复杂度 $O(\log n)$。其中 $n$ 是数组 $arr$ 的长度。




#### Python3


```python
class Solution:
    def canBeEqual(self, target: List[int], arr: List[int]) -> bool:
        return sorted(target) == sorted(arr)
```


#### TypeScript


```ts
function canBeEqual(target: number[], arr: number[]): boolean {
    target.sort();
    arr.sort();
    return target.every((x, i) => x === arr[i]);
}
```


### 方法二：计数



> **思考**
>
> 方法一花费 $O(n\log n)$。值域仅为 $1$～ $1000$，比较频次即可，线性判定。



我们注意到，题目中给出的数组元素的范围是 $1 \sim 1000$，因此我们可以使用两个长度为 $1001$ 的数组 `cnt1` 和 `cnt2` 分别记录数组 `target` 和 `arr` 中每个元素出现的次数。最后判断两个数组是否相等即可。

我们也可以只用一个数组 `cnt`，遍历数组 `target` 和 `arr`，对于 `target[i]`，我们将 `cnt[target[i]]` 加一，对于 `arr[i]`，我们将 `cnt[arr[i]]` 减一。最后判断数组 `cnt` 中的所有元素是否都为 $0$。

时间复杂度 $O(n + M)$，空间复杂度 $O(M)$。其中 $n$ 是数组 $arr$ 的长度，而 $M$ 是数组元素的范围，本题中 $M = 1001$。




#### Python3


```python
class Solution:
    def canBeEqual(self, target: List[int], arr: List[int]) -> bool:
        return Counter(target) == Counter(arr)
```


#### TypeScript


```ts
function canBeEqual(target: number[], arr: number[]): boolean {
    const n = target.length;
    const cnt = Array(1001).fill(0);
    for (let i = 0; i < n; i++) {
        cnt[target[i]]++;
        cnt[arr[i]]--;
    }
    return cnt.every(v => !v);
}
```
