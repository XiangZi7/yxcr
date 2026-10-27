## 解法




### 方法一：脑筋急转弯



> **思考**
>
> 每轮比较队首两个数，大者赢得一场并回到队首， $k$ 可达 $10^9$，不能真的模拟那么多轮。
>
> 无论谁赢，下一轮都是「当前胜者」对阵尚未出场的下一个元素。连续获胜 $k$ 场者即为答案；若扫完整列仍无人达到 $k$，胜者只能是全局最大值，因为它之后再不会输。



我们注意到，每次会比较数组的前两个元素，不管结果怎么样，下一次的比较，一定是轮到了数组中的下一个元素和当前的胜者进行比较。因此，如果循环了 $n-1$ 次，那么最后的胜者一定是数组中的最大元素。否则，如果某个元素连续胜出了 $k$ 次，那么这个元素就是最后的胜者。

时间复杂度 $O(n)$，其中 $n$ 是数组的长度。空间复杂度 $O(1)$。

相似题目：

- [3175. 找到连续赢 K 场比赛的第一位玩家](https://github.com/doocs/leetcode/blob/main/solution/3100-3199/3175.Find%20The%20First%20Player%20to%20win%20K%20Games%20in%20a%20Row/README.md)




#### Python3


```python
class Solution:
    def getWinner(self, arr: List[int], k: int) -> int:
        mx = arr[0]
        cnt = 0
        for x in arr[1:]:
            if mx < x:
                mx = x
                cnt = 1
            else:
                cnt += 1
            if cnt == k:
                break
        return mx
```


#### TypeScript


```ts
function getWinner(arr: number[], k: number): number {
    let mx = arr[0];
    let cnt = 0;
    for (const x of arr.slice(1)) {
        if (mx < x) {
            mx = x;
            cnt = 1;
        } else {
            ++cnt;
        }
        if (cnt === k) {
            break;
        }
    }
    return mx;
}
```
