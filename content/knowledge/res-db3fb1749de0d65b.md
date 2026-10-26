**watch 监听的作用**


- 计算属性允许我们声明性地计算衍生值。然而在有些情况下，我们需要在状态变化时执行一些“副作用”；  
- 例如更改`DOM`，或是根据异步操作的结果去修改另一处的状态。组合式 `API` 中，我们可以使用 `watch` 函数在每次响应式状态发生变化时触发回调函数从而来进行一些其它的操作；  
- 可以在页面使用多次；


## 1，可以监听什么数据？

`watch` 监听的第一个参数可以是不同形式的“数据源”：它可以是一个` ref` (包括计算属性)、一个响应式对象、一个 `getter` 函数、或多个数据源组成的数组；

## 2，使用监听

```javascript


<template>
  <div class="watch">
    <h3>watch监听演示</h3>
    <p>Message is: {{ message }}</p>
    <input v-model="message" placeholder="请输入123触发其它监听" />
  </div>
</template>



```

## 3，监听器里面可以进行异步操作

触发监听后可以`立即执行异步`的请求操作；这解决了计算属性不能操作异步的弊端；因为`计算属性(computed)`是通过 return 返回值传递参数 异步操作的时候 `return` 是没有意义的；

```javascript


<template>
  <p>
    Ask a yes/no question:
    <input v-model="question" />
  </p>
  <p>{{ answer }}</p>
</template>

```

## 4，不能直接监听响应式对象的属性值

```javascript
const obj = reactive({ count: 0 });
// 错误，因为 watch() 得到的参数是一个 number
watch(obj.count, (count) => {
  console.log(`count is: ${count}`);
});
```

解决方法：需要使用一个函数返回这个属性值

```javascript
// 提供一个 getter 函数
watch(
  () => obj.count,
  (count) => {
    console.log(`count is: ${count}`);
  }
);
```

## 5，watchEffect 与 watch 的区别(细节)

`watch` 和 `watchEffect` 都能响应式地执行有副作用的回调。它们之间的主要区别是追踪响应式依赖的方式：

- `watch` **只追踪明确侦听的数据源**。它不会追踪任何在回调中访问到的东西。另外，仅在数据源确实改变时才会触发回调。`watch` 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机。
- `watchEffect`，**则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式属性**。这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确。

**`watchEffects` 使用如下：**

侦听器的回调使用与源完全相同的响应式状态是很常见的。

如下代码，在每当 `todoId` 的引用发生变化时使用侦听器来加载一个远程资源：加载资源时并用到了 todoId

```js
const todoId = ref(1);
const data = ref(null);
watch(
  todoId,
  async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId.value}`);
    data.value = await response.json();
  },
  { immediate: true }
);
```

特别是注意侦听器是如何两次使用 `todoId` 的，一次是作为源，另一次是在回调中。

我们可以用 [`watchEffect` 函数](https://cn.vuejs.org/api/reactivity-core.html#watcheffect) 来简化上面的代码。`watchEffect()` 允许我们**自动跟踪回调的响应式依赖**。上面的侦听器可以重写为：

```js
watchEffect(async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId.value}`);
  data.value = await response.json();
});
```

## 6，监听器回调的触发时机

如果想在侦听器回调中能访问被 Vue 更新**之后**的所属组件的 DOM，你需要指明 `flush: 'post'` 或直接使用简写：watchPostEffect（）

设置 `flush: 'post'` 将会使侦听器延迟到组件渲染之后再执行

```js
watch(source, callback, {
  flush: "post"
});
watchEffect(callback, {
  flush: "post"
});
```

你还可以创建一个同步触发的侦听器，它会在 Vue 进行任何更新之前触发：别名 `watchSyncEffect()`

```js
watch(source, callback, {
  flush: "sync"
});
watchEffect(callback, {
  flush: "sync"
});
```

## 7，停止侦听器

在 `setup()` 或 `
```

要手动停止一个侦听器，请调用 `watch` 或 `watchEffect` 返回的函数

```js
const unwatch = watchEffect(() => {});
// ...当该侦听器不再需要时
unwatch();
```
