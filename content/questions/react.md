## 一、核心概念

Hooks 让函数组件拥有状态和副作用。React 按调用顺序将 Hook 与组件对应，并在重新渲染时读取同一位置的状态，因此不能在条件或循环中调用 Hook。

## 二、实现原理

### 1. 理解核心机制

Hooks 让函数组件拥有状态和副作用。React 按调用顺序将 Hook 与组件对应，并在重新渲染时读取同一位置的状态，因此不能在条件或循环中调用 Hook。

```tsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount(c => c + 1)}>
      {count}
    </button>
  )
}
```

### 2. 区分状态与副作用

从实际执行过程出发，关注输入、输出与边界条件，并用一个简洁的例子解释关键概念。

```tsx
useEffect(() => {
  const onResize = () => console.log(innerWidth)
  window.addEventListener('resize', onResize)
  return () => window.removeEventListener('resize', onResize)
}, [])
```

### 3. 作用域与副作用

明确事件监听、异步请求和资源的生命周期，及时清理不再需要的副作用。

## 三、实践与方案对比

选择方案时，需要结合项目规模、维护成本、性能需求和团队经验，解释方案的适用边界，并通过实际场景说明取舍。

## 四、总结

Hooks 让函数组件拥有状态和副作用。React 按调用顺序将 Hook 与组件对应，并在重新渲染时读取同一位置的状态，因此不能在条件或循环中调用 Hook。学习时，先理解核心概念，再梳理执行流程，最后结合实际案例与边界条件验证。
