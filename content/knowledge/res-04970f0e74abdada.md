DOM 示例的重点是分清数据、节点与事件。文本内容使用 textContent，避免把未知字符串当成 HTML 执行。给大量子节点绑定同类事件时，可以把监听器放在容器上，由事件委托判断命中的目标。

```javascript
function domToJSON(element) {
  return {
    tag: element.tagName.toLowerCase(),
    attributes: Object.fromEntries([...element.attributes].map(attr => [attr.name, attr.value])),
    children: [...element.childNodes].map(node => node.nodeType === Node.TEXT_NODE ? node.textContent : node.nodeType === Node.ELEMENT_NODE ? domToJSON(node) : null).filter(node => node !== null)
  }
}
function render(node) {
  if (typeof node === 'string') return document.createTextNode(node)
  const element = document.createElement(node.tag)
  for (const [key, value] of Object.entries(node.attributes ?? {})) element.setAttribute(key, value)
  for (const child of node.children ?? []) element.appendChild(render(child))
  return element
}
function lazyImages(images) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src
      observer.unobserve(entry.target)
    }
  })
  images.forEach(image => observer.observe(image))
  return () => observer.disconnect()
}
async function renderChunks(container, items, create, chunkSize = 100) {
  for (let start = 0; start < items.length; start += chunkSize) {
    const fragment = document.createDocumentFragment()
    for (const item of items.slice(start, start + chunkSize)) fragment.appendChild(create(item))
    container.appendChild(fragment)
    await new Promise(requestAnimationFrame)
  }
}

function draggable(element) {
  const start = event => {
    element.setPointerCapture(event.pointerId)
    const left = event.clientX, top = event.clientY
    const move = current => { element.style.transform = `translate(${current.clientX - left}px, ${current.clientY - top}px)` }
    const stop = () => { element.removeEventListener('pointermove', move); element.removeEventListener('pointerup', stop); element.removeEventListener('pointercancel', stop) }
    element.addEventListener('pointermove', move)
    element.addEventListener('pointerup', stop)
    element.addEventListener('pointercancel', stop)
  }
  element.addEventListener('pointerdown', start)
  return () => element.removeEventListener('pointerdown', start)
}
```

分片渲染减少单次阻塞，但不减少最终节点数量；超长列表通常还需要虚拟化。拖拽示例从当前指针起点计算本次位移，没有实现累积位置、边界限制或键盘操作。生产控件还要处理这些交互和可访问性要求。
