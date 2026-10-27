## 解法




### 方法一：栈



> **思考**
>
> 判断逗号分隔的先序序列是否对应一棵二叉树。结点有两个孩子，空孩子为 `#`。计数槽位可做，也可用栈归约。
>
> 遇到 `值 # #` 说明一棵叶子子树已完成，将其收成一个 `#`。反复归约后若只剩一个 `#`，则整棵树合法。非空结点后必须能配上两棵子树，否则栈无法收干净。



我们将字符串 `preorder` 按逗号分割成数组，然后遍历数组，如果遇到了连续两个 `'#'`，并且第三个元素不是 `'#'`，那么就将这三个元素替换成一个 `'#'`，这个过程一直持续到数组遍历结束。

最后，判断数组长度是否为 $1$，且数组唯一的元素是否为 `'#'` 即可。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为字符串 `preorder` 的长度。




#### Python3


```python
class Solution:
    def isValidSerialization(self, preorder: str) -> bool:
        stk = []
        for c in preorder.split(","):
            stk.append(c)
            while len(stk) > 2 and stk[-1] == stk[-2] == "#" and stk[-3] != "#":
                stk = stk[:-3]
                stk.append("#")
        return len(stk) == 1 and stk[0] == "#"
```


#### TypeScript


```ts
function isValidSerialization(preorder: string): boolean {
    const stk: string[] = [];
    for (const s of preorder.split(',')) {
        stk.push(s);
        while (stk.length >= 3 && stk.at(-1) === '#' && stk.at(-2) === '#' && stk.at(-3) !== '#') {
            stk.splice(-3, 3, '#');
        }
    }
    return stk.length === 1 && stk[0] === '#';
}
```
