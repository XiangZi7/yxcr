## 解法




### 方法一：DFS



> **思考**
>
> 从起点把四连通的同色像素改成目标色。网格规模有限，一次遍历即可。起点颜色已是目标色时不应再走，否则会无限重入。
>
> 连通块是图上的四邻域，深度优先把每个仍为原色 $\textit{oc}$ 的邻居改掉即可，改色本身兼作访问标记。
>
> 先记下 $\textit{oc}$，仅当它与 $\textit{color}$ 不同时从 $(\textit{sr},\textit{sc})$ 递归。时间与连通块大小成正比。



我们记初始像素的颜色为 $\textit{oc}$，如果 $\textit{oc}$ 不等于目标颜色 $\textit{color}$，我们就从 $(\textit{sr}, \textit{sc})$ 开始深度优先搜索，将所有符合条件的像素点的颜色都更改成目标颜色。

时间复杂度 $O(m \times n)$，空间复杂度 $O(m \times n)$。其中 $m$ 和 $n$ 分别为二维数组 $\textit{image}$ 的行数和列数。




#### Python3


```python
class Solution:
    def floodFill(
        self, image: List[List[int]], sr: int, sc: int, color: int
    ) -> List[List[int]]:
        def dfs(i: int, j: int):
            image[i][j] = color
            for a, b in pairwise(dirs):
                x, y = i + a, j + b
                if 0 <= x < len(image) and 0 <= y < len(image[0]) and image[x][y] == oc:
                    dfs(x, y)

        oc = image[sr][sc]
        if oc != color:
            dirs = (-1, 0, 1, 0, -1)
            dfs(sr, sc)
        return image
```


#### TypeScript


```ts
function floodFill(image: number[][], sr: number, sc: number, color: number): number[][] {
    const [m, n] = [image.length, image[0].length];
    const oc = image[sr][sc];
    if (oc === color) {
        return image;
    }

    const dirs = [-1, 0, 1, 0, -1];

    const dfs = (i: number, j: number): void => {
        image[i][j] = color;
        for (let k = 0; k < 4; k++) {
            const [x, y] = [i + dirs[k], j + dirs[k + 1]];
            if (x >= 0 && x < m && y >= 0 && y < n && image[x][y] === oc) {
                dfs(x, y);
            }
        }
    };

    dfs(sr, sc);
    return image;
}
```


### 方法二：BFS



> **思考**
>
> 方法一用递归，连通块很大时栈深与网格同阶。同一连通只需改层序扩展。
>
> 队列从起点出发，弹出后把仍为 $\textit{oc}$ 的四邻改色入队。渐近复杂度相同，避免递归栈。



我们首先判断初始像素的颜色是否等于目标颜色，如果等于，直接返回原图像。否则，我们可以使用广度优先搜索的方法，从 $(\textit{sr}, \textit{sc})$ 开始，将所有符合条件的像素点的颜色都更改成目标颜色。

具体地，我们定义一个队列 $\textit{q}$，将初始像素 $(\textit{sr}, \textit{sc})$ 加入队列。然后我们不断从队列中取出像素点 $(i, j)$，将其颜色更改成目标颜色，并将其上下左右四个方向上与初始像素的原始颜色相同的像素点加入队列。直到队列为空，我们就完成了图像的渲染。

时间复杂度 $O(m \times n)$，空间复杂度 $O(m \times n)$。其中 $m$ 和 $n$ 分别为二维数组 $\textit{image}$ 的行数和列数。




#### Python3


```python
class Solution:
    def floodFill(
        self, image: List[List[int]], sr: int, sc: int, color: int
    ) -> List[List[int]]:
        if image[sr][sc] == color:
            return image
        q = deque([(sr, sc)])
        oc = image[sr][sc]
        image[sr][sc] = color
        dirs = (-1, 0, 1, 0, -1)
        while q:
            i, j = q.popleft()
            for a, b in pairwise(dirs):
                x, y = i + a, j + b
                if 0 <= x < len(image) and 0 <= y < len(image[0]) and image[x][y] == oc:
                    q.append((x, y))
                    image[x][y] = color
        return image
```


#### TypeScript


```ts
function floodFill(image: number[][], sr: number, sc: number, color: number): number[][] {
    if (image[sr][sc] === color) {
        return image;
    }

    const oc = image[sr][sc];
    image[sr][sc] = color;

    const q: [number, number][] = [];
    q.push([sr, sc]);

    const dirs = [-1, 0, 1, 0, -1];
    const [m, n] = [image.length, image[0].length];

    while (q.length > 0) {
        const [a, b] = q.shift()!;
        for (let k = 0; k < 4; ++k) {
            const x = a + dirs[k];
            const y = b + dirs[k + 1];
            if (x >= 0 && x < m && y >= 0 && y < n && image[x][y] === oc) {
                q.push([x, y]);
                image[x][y] = color;
            }
        }
    }

    return image;
}
```
