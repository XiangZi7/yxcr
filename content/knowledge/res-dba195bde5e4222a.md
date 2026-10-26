`$nextTick`可以让我们在下次 `DOM` 更新循环结束之后执行延迟回调，用于获得更新后的 `DOM`

我们可以看这样的例子：


**展开代码详情**


```html
<div class="app">
  <div ref="msgDiv">{{msg}}</div>
  <div v-if="msg1">Message got outside $nextTick: {{msg1}}</div>
  <div v-if="msg2">Message got inside $nextTick: {{msg2}}</div>
  <div v-if="msg3">Message got outside $nextTick: {{msg3}}</div>
  <button @click="changeMsg">
    Change the Message
  </button>
</div>
```

```js
new Vue({
  el: '.app',
  data: {
    msg: 'Hello Vue.',
    msg1: '',
    msg2: '',
    msg3: ''
  },
  methods: {
    changeMsg() {
      this.msg = "Hello world."
      this.msg1 = this.$refs.msgDiv.innerHTML
      this.$nextTick(() => {
        this.msg2 = this.$refs.msgDiv.innerHTML
      })
      this.msg3 = this.$refs.msgDiv.innerHTML
    }
  }
})
```


**改变前**

![img](http://cdn.bingkele.cc/FuFq5h6n30LbgTyknJTK36-7y8CX)

**改变后**

![](http://cdn.bingkele.cc/FhyJA8l354gVU7-2hEQnlxkBdLEP)

可以得知：`msg1`和`msg3`显示的内容还是变换之前的，而`msg2`显示的内容是变换之后的。其根本原因是因为`Vue`中`DOM`更新是异步的

### 应用场景

- 在Vue生命周期的`created()`钩子函数进行的`DOM`操作一定要放在`this.$nextTick()`的回调函数中
- 在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的`DOM`结构的时候，这个操作都应该放进`this.$nextTick()`的回调函数中。
