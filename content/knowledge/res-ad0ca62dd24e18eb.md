CommonJS 模块在函数包装中执行，通过 module.exports 导出结果。缓存应在执行模块之前放入，这样循环依赖可以取得另一个模块正在初始化的导出对象；执行失败时移除缓存，以免留下损坏状态。

```javascript
// Node.js 教学实现：只支持显式路径的 .js 模块
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const cache = new Map()

function loadCommonJS(filename) {
  const resolved = path.resolve(filename)
  if (cache.has(resolved)) return cache.get(resolved).exports
  const module = { exports: {} }
  cache.set(resolved, module)
  try {
    const code = fs.readFileSync(resolved, 'utf8')
    const wrapped = vm.runInThisContext(`(function(exports, require, module, __filename, __dirname) {\n${code}\n})`, { filename: resolved })
    const localRequire = request => {
      if (!request.startsWith('.')) return require(request)
      let target = path.resolve(path.dirname(resolved), request)
      if (!path.extname(target)) target += '.js'
      return loadCommonJS(target)
    }
    wrapped(module.exports, localRequire, module, resolved, path.dirname(resolved))
    return module.exports
  } catch (error) { cache.delete(resolved); throw error }
}
```

此示例不实现完整的 Node 模块解析、package.json 导出条件与 ESM 互操作。vm.runInThisContext 也不是用于执行不可信代码的安全隔离环境。业务需要动态加载模块时，应优先采用 Node 已有的加载 API。
