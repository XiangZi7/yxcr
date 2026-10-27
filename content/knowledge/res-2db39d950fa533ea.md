## 解法




### 方法一：快速选择



> **思考**
>
> 全排序后取第 $k$ 大可行，但多做了对其余位置的排序。快速选择只关心第 $k$ 大所在的那一侧。
>
> 每次按基准划分后，仅递归包含目标名次的区间。实现上将第 $k$ 大转为第 $n-k$ 小。



快速选择算法是一种在未排序的数组中查找第 `k` 个最大元素或最小元素的算法。它的基本思想是每次选择一个基准元素，将数组分为两部分，一部分的元素都比基准元素小，另一部分的元素都比基准元素大，然后根据基准元素的位置，决定继续在左边还是右边查找，直到找到第 `k` 个最大元素。

时间复杂度 $O(n)$，空间复杂度 $O(\log n)$。其中 $n$ 为数组 $\textit{nums}$ 的长度。




#### Python3


```python
class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        def quick_sort(l: int, r: int) -> int:
            if l == r:
                return nums[l]
            i, j = l - 1, r + 1
            x = nums[(l + r) >> 1]
            while i < j:
                while 1:
                    i += 1
                    if nums[i] >= x:
                        break
                while 1:
                    j -= 1
                    if nums[j] <= x:
                        break
                if i < j:
                    nums[i], nums[j] = nums[j], nums[i]
            if j < k:
                return quick_sort(j + 1, r)
            return quick_sort(l, j)

        n = len(nums)
        k = n - k
        return quick_sort(0, n - 1)
```


#### TypeScript


```ts
function findKthLargest(nums: number[], k: number): number {
    const n = nums.length;
    k = n - k;
    const quickSort = (l: number, r: number): number => {
        if (l === r) {
            return nums[l];
        }
        let [i, j] = [l - 1, r + 1];
        const x = nums[(l + r) >> 1];
        while (i < j) {
            while (nums[++i] < x);
            while (nums[--j] > x);
            if (i < j) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
            }
        }
        if (j < k) {
            return quickSort(j + 1, r);
        }
        return quickSort(l, j);
    };
    return quickSort(0, n - 1);
}
```


### 方法二：优先队列（小根堆）



> **思考**
>
> 快速选择平均线性，最坏可达平方。若只需第 $k$ 大，可维护大小为 $k$ 的小根堆。
>
> 扫过数组后堆中为最大的 $k$ 个数，堆顶即第 $k$ 大，时间为 $O(n\log k)$。



我们可以维护一个大小为 $k$ 的小根堆 $\textit{minQ}$，然后遍历数组 $\textit{nums}$，将数组中的元素依次加入到小根堆中，当小根堆的大小超过 $k$ 时，我们将堆顶元素弹出，这样最终小根堆中的 $k$ 个元素就是数组中的 $k$ 个最大元素，堆顶元素就是第 $k$ 个最大元素。

时间复杂度 $O(n\log k)$，空间复杂度 $O(k)$。其中 $n$ 为数组 $\textit{nums}$ 的长度。




#### Python3


```python
class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        return nlargest(k, nums)[-1]
```


#### TypeScript


```ts
function findKthLargest(nums: number[], k: number): number {
    const minQ = new MinPriorityQueue<number>();
    for (const x of nums) {
        minQ.enqueue(x);
        if (minQ.size() > k) {
            minQ.dequeue();
        }
    }
    return minQ.front();
}
```


### 方法三：计数排序



> **思考**
>
> 堆仍有对数因子。值域有界时，先统计每个值的出现次数，再从大到小累加次数，直到凑满 $k$。
>
> 时间与数组长度及值域上界成正比，无需比较排序。



我们可以使用计数排序的思想，统计数组 $\textit{nums}$ 中每个元素出现的次数，记录在哈希表 $\textit{cnt}$ 中，然后从大到小遍历元素 $i$，每次减去出现的次数 $\textit{cnt}[i]$，直到 $k$ 小于等于 $0$，此时的元素 $i$ 就是数组中的第 $k$ 个最大元素。

时间复杂度 $O(n + m)$，空间复杂度 $O(n)$。其中 $n$ 为数组 $\textit{nums}$ 的长度，而 $m$ 为数组 $\textit{nums}$ 中元素的最大值。




#### Python3


```python
class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        cnt = Counter(nums)
        for i in count(max(cnt), -1):
            k -= cnt[i]
            if k <= 0:
                return i
```


#### TypeScript


```ts
function findKthLargest(nums: number[], k: number): number {
    const cnt: Record<number, number> = {};
    for (const x of nums) {
        cnt[x] = (cnt[x] || 0) + 1;
    }
    const m = Math.max(...nums);
    for (let i = m; ; --i) {
        k -= cnt[i] || 0;
        if (k <= 0) {
            return i;
        }
    }
}
```
