JSON 的语法包含对象、数组、字符串、数字、true、false 和 null。手写解析器应按字符推进游标，并验证所有输入已经消耗，不能用 eval 执行未知文本。下面的解析器演示严格数字格式、字符串转义与递归结构。

```javascript
function parseJSON(text) {
  let i = 0
  const fail = () => { throw new SyntaxError(`Invalid JSON at ${i}`) }
  const space = () => { while (/[\t\n\r ]/.test(text[i] ?? '') && i < text.length) i++ }
  function string() {
    if (text[i++] !== '"') fail()
    let result = ''
    while (i < text.length) {
      const char = text[i++]
      if (char === '"') return result
      if (char === '\\') {
        const escaped = text[i++]
        const escapes = { '"': '"', '\\': '\\', '/': '/', b: '\b', f: '\f', n: '\n', r: '\r', t: '\t' }
        if (escaped === 'u') {
          const hex = text.slice(i, i + 4)
          if (!/^[0-9a-fA-F]{4}$/.test(hex)) fail()
          result += String.fromCharCode(parseInt(hex, 16)); i += 4
        } else if (Object.hasOwn(escapes, escaped)) result += escapes[escaped]
        else fail()
      } else { if (char.charCodeAt(0) < 32) fail(); result += char }
    }
    fail()
  }
  function value() {
    space()
    const char = text[i]
    if (char === '"') return string()
    if (char === '[') {
      i++; space(); const result = []
      if (text[i] === ']') { i++; return result }
      while (true) {
        result.push(value()); space()
        const separator = text[i++]
        if (separator === ']') return result
        if (separator !== ',') fail()
      }
    }
    if (char === '{') {
      i++; space(); const result = {}
      if (text[i] === '}') { i++; return result }
      while (true) {
        space(); if (text[i] !== '"') fail()
        const key = string(); space(); if (text[i++] !== ':') fail()
        Object.defineProperty(result, key, { value: value(), writable: true, enumerable: true, configurable: true })
        space(); const separator = text[i++]
        if (separator === '}') return result
        if (separator !== ',') fail()
      }
    }
    for (const [literal, result] of [['true', true], ['false', false], ['null', null]]) {
      if (text.startsWith(literal, i)) { i += literal.length; return result }
    }
    const number = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/.exec(text.slice(i))
    if (!number) fail()
    i += number[0].length
    return Number(number[0])
  }
  const result = value(); space()
  if (i !== text.length) fail()
  return result
}

function stringifyJSON(input) {
  const ancestors = new Set()
  const quote = text => '"' + text.replace(/["\\\u0000-\u001f\ud800-\udfff]/g, char => {
    if (char === '"' || char === '\\') return '\\' + char
    return '\\u' + char.charCodeAt(0).toString(16).padStart(4, '0')
  }) + '"'
  function encode(value) {
    if (value === null) return 'null'
    if (typeof value === 'string') return quote(value)
    if (typeof value === 'number') return Number.isFinite(value) ? String(value) : 'null'
    if (typeof value === 'boolean') return String(value)
    if (typeof value === 'bigint') throw new TypeError('BigInt is not JSON')
    if (typeof value !== 'object') return undefined
    if (ancestors.has(value)) throw new TypeError('Circular structure')
    ancestors.add(value)
    let result
    if (Array.isArray(value)) result = '[' + Array.from(value, item => encode(item) ?? 'null').join(',') + ']'
    else result = '{' + Object.keys(value).flatMap(key => {
      const encoded = encode(value[key])
      return encoded === undefined ? [] : [quote(key) + ':' + encoded]
    }).join(',') + '}'
    ancestors.delete(value)
    return result
  }
  return encode(input)
}
```

解析器未提供 reviver，也没有限制恶意输入的嵌套深度；序列化器以普通 JSON 数据为范围，不实现 toJSON、replacer 与缩进选项。真实业务优先使用原生 JSON API。这里的递归结构用于解释语法与边界，不能用它声称替代完整标准实现。
