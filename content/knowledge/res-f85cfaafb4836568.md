## 解法




### 方法一：排序 + 前缀树



> **思考**
>
> 每多输入一个字母，要给出当前前缀下字典序最小的三个商品。商品数 $1000$，可先排序再插入前缀树，使每个节点按插入顺序最多留下三个下标，它们即该前缀的前三名。
>
> 沿 $searchWord$ 走树，把途经节点上的下标表映射回商品名。排序保证插入顺序即字典序，前缀树保证按前缀定位。



题目要求在输入 `searchWord` 的每一个字母后，推荐 `products` 数组中前缀与 `searchWord` 相同的最多三个产品。如果前缀相同的可推荐产品超过三个，按字典序返回最小的三个。

找前缀相同的产品，可以使用前缀树；而要返回字典序最小的三个产品，我们可以先对 `products` 数组进行排序，然后将排序后的数组下标存入前缀树中。

前缀树的每个节点维护以下信息：

- `children`：这是一个长度为 $26$ 的数组，用于存储当前节点的子节点，`children[i]` 表示当前节点的子节点中字符为 `i + 'a'` 的节点。
- `v`：这是一个数组，用于存储当前节点的子节点中的字符在 `products` 数组中的下标，最多存储三个下标。

搜索时，我们从前缀树的根节点开始，找到每一个前缀对应的下标数组，将其存入结果数组中。最后只需要将每个下标数组中的下标对应到 `products` 数组中即可。

时间复杂度 $O(L \times \log n + m)$，空间复杂度 $O(L)$。其中 $L$ 是 `products` 数组所有字符串的长度之和，而 $n$ 和 $m$ 分别是 `products` 数组的长度和 `searchWord` 的长度。




#### Python3


```python
class Trie:
    def __init__(self):
        self.children: List[Union[Trie, None]] = [None] * 26
        self.v: List[int] = []

    def insert(self, w, i):
        node = self
        for c in w:
            idx = ord(c) - ord('a')
            if node.children[idx] is None:
                node.children[idx] = Trie()
            node = node.children[idx]
            if len(node.v) < 3:
                node.v.append(i)

    def search(self, w):
        node = self
        ans = [[] for _ in range(len(w))]
        for i, c in enumerate(w):
            idx = ord(c) - ord('a')
            if node.children[idx] is None:
                break
            node = node.children[idx]
            ans[i] = node.v
        return ans


class Solution:
    def suggestedProducts(
        self, products: List[str], searchWord: str
    ) -> List[List[str]]:
        products.sort()
        trie = Trie()
        for i, w in enumerate(products):
            trie.insert(w, i)
        return [[products[i] for i in v] for v in trie.search(searchWord)]
```
