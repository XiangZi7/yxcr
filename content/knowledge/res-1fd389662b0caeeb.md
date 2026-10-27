## 解法




### 方法一：数组 + 二分查找



> **思考**
>
> 每次 `snap` 若复制整个数组，空间与快照次数、长度之积成正比。每个下标只记录「快照编号 $\to$ 值」的变更历史，`set` 追加当前快照号与新值。`get` 在该下标的有序历史上二分到 $\le snap\_id$ 的最后一次修改；若无修改则默认为 $0$。



我们维护一个长度为 $\textit{length}$ 的数组，数组中的每个元素是一个列表，用来存储每次设置的值以及对应的快照 ID。

调用 `set` 方法时，将值和快照 ID 添加到对应索引的列表中。时间复杂度 $O(1)$。

调用 `snap` 方法时，我们先将快照 ID 加一，然后返回快照 ID 减一。时间复杂度 $O(1)$。

调用 `get` 方法时，我们使用二分查找找到对应位置的第一个快照 ID 大于 `snap_id` 的值，然后返回前一个的值。如果找不到，则返回 0。时间复杂度 $O(\log n)$。

空间复杂度 $O(n)$。




#### Python3


```python
class SnapshotArray:

    def __init__(self, length: int):
        self.arr = [[] for _ in range(length)]
        self.i = 0

    def set(self, index: int, val: int) -> None:
        self.arr[index].append((self.i, val))

    def snap(self) -> int:
        self.i += 1
        return self.i - 1

    def get(self, index: int, snap_id: int) -> int:
        i = bisect_left(self.arr[index], (snap_id, inf)) - 1
        return 0 if i < 0 else self.arr[index][i][1]


# Your SnapshotArray object will be instantiated and called as such:
# obj = SnapshotArray(length)
# obj.set(index,val)
# param_2 = obj.snap()
# param_3 = obj.get(index,snap_id)
```


#### TypeScript


```ts
class SnapshotArray {
    private arr: [number, number][][];
    private i: number = 0;
    constructor(length: number) {
        this.arr = Array.from({ length }, () => []);
    }

    set(index: number, val: number): void {
        this.arr[index].push([this.i, val]);
    }

    snap(): number {
        return this.i++;
    }

    get(index: number, snap_id: number): number {
        let [l, r] = [0, this.arr[index].length];
        while (l < r) {
            const mid = (l + r) >> 1;
            if (this.arr[index][mid][0] > snap_id) {
                r = mid;
            } else {
                l = mid + 1;
            }
        }
        --l;
        return l < 0 ? 0 : this.arr[index][l][1];
    }
}

/**
 * Your SnapshotArray object will be instantiated and called as such:
 * var obj = new SnapshotArray(length)
 * obj.set(index,val)
 * var param_2 = obj.snap()
 * var param_3 = obj.get(index,snap_id)
 */
```
