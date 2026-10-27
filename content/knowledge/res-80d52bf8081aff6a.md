深度优先遍历使用递归或显式栈，广度优先遍历使用队列。前序、中序、后序的区别是根节点相对于左右子树的访问位置。二叉搜索树则额外满足键的有序关系，因此可以按比较结果选择下一条分支。

```javascript
function traverse(root, order = 'pre', result = []) {
  if (!root) return result
  if (order === 'pre') result.push(root.value)
  traverse(root.left, order, result)
  if (order === 'in') result.push(root.value)
  traverse(root.right, order, result)
  if (order === 'post') result.push(root.value)
  return result
}
function levelOrder(root) {
  if (!root) return []
  const queue = [root], result = []
  let head = 0
  while (head < queue.length) {
    const end = queue.length, level = []
    while (head < end) {
      const node = queue[head++]; level.push(node.value)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    result.push(level)
  }
  return result
}
function searchBST(root, value) {
  while (root && root.value !== value) root = value < root.value ? root.left : root.right
  return root
}
function listToTree(list) {
  const nodes = new Map(list.map(item => [item.id, { ...item, children: [] }]))
  const roots = []
  for (const item of list) {
    const node = nodes.get(item.id), parent = nodes.get(item.parentId)
    if (parent) parent.children.push(node)
    else roots.push(node)
  }
  return roots
}
function treeToList(roots) {
  const output = []
  function walk(node, parentId = null) {
    const { children = [], ...rest } = node
    output.push({ ...rest, parentId })
    children.forEach(child => walk(child, node.id))
  }
  roots.forEach(root => walk(root))
  return output
}
```

列表转换示例要求 id 唯一、父子关系无环。生产导入数据时，应先检查重复 id、孤儿节点和循环关系。递归遍历的空间开销取决于树高，而不是所有情况下都是 O(log n)；退化为链时可以达到 O(n)。
