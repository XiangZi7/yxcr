发布订阅通过一个事件通道解耦发送者与接收者；观察者模式通常由被观察对象持有订阅者。无论使用哪种形式，都需要明确订阅的生命周期、重复订阅、取消订阅以及监听器执行中修改订阅集合的行为。

```javascript
class EventEmitter {
  constructor() { this.events = new Map() }
  on(name, listener) {
    if (!this.events.has(name)) this.events.set(name, new Set())
    this.events.get(name).add(listener)
    return () => this.off(name, listener)
  }
  off(name, listener) {
    const listeners = this.events.get(name)
    listeners?.delete(listener)
    if (listeners?.size === 0) this.events.delete(name)
  }
  once(name, listener) {
    const off = this.on(name, (...args) => { off(); listener(...args) })
    return off
  }
  emit(name, ...args) {
    for (const listener of [...(this.events.get(name) ?? [])]) listener(...args)
  }
}

class Subject {
  constructor() { this.observers = new Set() }
  subscribe(observer) { this.observers.add(observer); return () => this.observers.delete(observer) }
  next(value) { for (const observer of [...this.observers]) observer(value) }
}
```

上例明确采用同步通知，监听器抛错会中断本次通知链。如果业务要求隔离监听器错误，应分别捕获并报告。Vue 事件总线本质也是类似通道，但组件卸载时必须取消订阅；复杂全局状态更适合有明确更新与追踪能力的状态管理方案。
