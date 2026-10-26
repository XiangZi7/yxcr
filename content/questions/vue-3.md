## 一、核心概念

Vue 3 的响应式系统基于 **Proxy** 实现，通过拦截对象的 `get` 和 `set` 操作来追踪数据变化。当数据更新时，触发对应的副作用，例如组件渲染、`computed` 重新计算和 `watch` 回调。

> 记住这条主线：**读取时收集依赖，修改时触发更新。**

## 二、实现原理

### 1. 创建响应式对象

`reactive()` 将普通对象转换为响应式代理，拦截属性的读取、新增、修改和删除。嵌套对象会在访问时按需转换为响应式对象。

```typescript
import { reactive } from "vue";

const state = reactive({
  count: 0,
  name: "Vue 3",
});

console.log(state.count); // 读取属性，收集依赖
state.count++; // 修改属性，触发更新
```

### 2. 依赖收集与派发更新

执行副作用时，`track()` 将当前副作用与读取的属性建立联系。属性变化后，`trigger()` 找到对应的依赖，并由调度器安排更新。

```typescript
import { effect } from "vue";

const runner = effect(() => {
  console.log(`count: ${state.count}`);
});

state.count++; // effect 重新执行，输出更新后的值
```

这个过程可以拆成三个步骤：

1. 使用 `WeakMap` 保存对象到属性依赖表的映射。
2. 通过 `Map` 按属性维护副作用集合。
3. 使用 `Set` 去重，避免同一副作用被重复收集。

### 3. 作用域与副作用

使用 `effectScope()` 将相关副作用归为同一作用域，在组件卸载或业务结束时统一停止。

```typescript
import { effectScope, watchEffect } from "vue";

const scope = effectScope();

scope.run(() => {
  watchEffect(() => console.log(state.count));
});

scope.stop(); // 清理作用域中的副作用
```

## 三、与 Vue 2 的对比

| 对比维度       | Vue 2                 | Vue 3                         |
| -------------- | --------------------- | ----------------------------- |
| 核心机制       | Object.defineProperty | Proxy                         |
| 代理范围       | 对象的已有属性        | 整个对象                      |
| 新增与删除属性 | 通常需要额外 API      | 可以直接追踪                  |
| 数组与集合     | 需要特殊处理          | 对数组、Map、Set 提供对应处理 |
| 嵌套对象       | 初始化时递归处理      | 访问时按需代理                |

需要注意，解构响应式对象的基本类型属性，可能失去与原对象的响应式联系。可以使用 `toRef()` 或 `toRefs()` 保留属性引用。

## 四、总结

面试时可以按下面的顺序回答：

- [x] 说明 Proxy 如何拦截对象操作。
- [x] 解释 `track → trigger → effect` 的依赖更新过程。
- [x] 对比 `ref` 与 `reactive` 的使用边界。
- [ ] 准备一个依赖清理与调度器的进阶例子。

**一句话回答：** Vue 3 通过 Proxy 追踪对象访问，将数据变化与副作用连接起来，再由调度器组织高效更新。
