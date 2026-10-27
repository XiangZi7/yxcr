## 解法




### 方法一：BFS



> **思考**
>
> 需要恰好 $\textit{level}$ 跳的好友所看视频，并按出现次数、名称排序。沿好友关系盲目深搜难以卡在精确层数，也容易重复访问。从 $\textit{id}$ 做 $\textit{level}$ 轮广度优先，第 $\textit{level}$ 轮结束时队列里恰为该层好友。
>
> 再用计数表统计这些人所看视频，按 $(\textit{cnt}[v], v)$ 排序后输出名称。访问集合避免同一人进入多层。



我们可以使用广度优先搜索的方法，从 $\textit{id}$ 出发，找到所有距离为 $\textit{level}$ 的好友，然后统计这些好友观看的视频。

具体地，我们可以使用一个队列 $\textit{q}$ 来存储当前层的好友，初始时将 $\textit{id}$ 加入队列 $\textit{q}$ 中，用一个哈希表或者布尔数组 $\textit{vis}$ 来记录已经访问过的好友，然后进行 $\textit{level}$ 次循环，每次循环将队列中的所有好友出队，并将他们的好友加入队列，直到找到所有距禒为 $\textit{level}$ 的好友。

然后，我们使用一个哈希表 $\textit{cnt}$ 来统计这些好友观看的视频及其频率，最后将哈希表中的键值对按照频率升序排序，如果频率相同，则按照视频名称升序排序。最后返回排序后的视频名称列表。

时间复杂度 $O(n + m + v \times \log v)$，空间复杂度 $O(n + v)$。其中 $n$ 和 $m$ 分别是数组 $\textit{watchedVideos}$ 和 $\textit{friends}$ 的长度，而 $v$ 是所有好友观看的视频数量。




#### Python3


```python
class Solution:
    def watchedVideosByFriends(
        self,
        watchedVideos: List[List[str]],
        friends: List[List[int]],
        id: int,
        level: int,
    ) -> List[str]:
        q = deque([id])
        vis = {id}
        for _ in range(level):
            for _ in range(len(q)):
                i = q.popleft()
                for j in friends[i]:
                    if j not in vis:
                        vis.add(j)
                        q.append(j)
        cnt = Counter()
        for i in q:
            for v in watchedVideos[i]:
                cnt[v] += 1
        return sorted(cnt.keys(), key=lambda k: (cnt[k], k))
```


#### TypeScript


```ts
function watchedVideosByFriends(
    watchedVideos: string[][],
    friends: number[][],
    id: number,
    level: number,
): string[] {
    let q: number[] = [id];
    const n: number = friends.length;
    const vis: boolean[] = Array(n).fill(false);
    vis[id] = true;
    while (level-- > 0) {
        const nq: number[] = [];
        for (const i of q) {
            for (const j of friends[i]) {
                if (!vis[j]) {
                    vis[j] = true;
                    nq.push(j);
                }
            }
        }
        q = nq;
    }
    const cnt: { [key: string]: number } = {};
    for (const i of q) {
        for (const v of watchedVideos[i]) {
            cnt[v] = (cnt[v] || 0) + 1;
        }
    }
    const ans: string[] = Object.keys(cnt);
    ans.sort((a, b) => {
        if (cnt[a] === cnt[b]) {
            return a.localeCompare(b);
        }
        return cnt[a] - cnt[b];
    });
    return ans;
}
```
