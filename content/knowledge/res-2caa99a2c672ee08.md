### watch

用法：监听一个值，当值发生变化的时候，可以执行一个函数。


**点击查看示例**


```html
<div>
      <p>FullName: {{fullName}}</p>
      <p>FirstName: <input type="text" v-model="firstName"></p>
</div>
```

```js
new Vue({
  el: '#root',
  data: {
    firstName: 'Dawei',
    lastName: 'Lou',
    fullName: ''
  },
  watch: {
    firstName(newName, oldName) {
      this.fullName = newName + ' ' + this.lastName;
// 监听firstName的值
// 方法中有两个参数，一个个是改变后的值，第二个是改变前的值
    }
  } 
})
```



**注意**


**不应该使用箭头函数来定义 watcher 函数** (例如 `searchQuery: newValue => this.updateAutocomplete(newValue)`)。理由是箭头函数绑定了父级作用域的上下文，所以 `this` 将不会按照期望指向 Vue 实例，`this.updateAutocomplete` 将是 undefined。


### computed

用法：当你想要在模板中多次引用此处的翻转字符串时，就会更加难以处理。

所以，对于任何复杂逻辑，你都应当使用**计算属性**。


**点击查看示例**


```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

```js
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
```



**注意**


计算属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。注意，如果某个依赖 (比如非响应式属性) 在该实例范畴之外，则计算属性是**不会**被更新的。


### methods

用法：`methods` 将被混入到 `Vue` 实例中。可以直接通过 `VM` 实例访问这些方法，或者在指令表达式中使用。方法中的 `this` 自动绑定为 `Vue` 实例。


**点击展开示例**


```js
var vm = new Vue({
  data: { a: 1 },
  methods: {
    plus: function () {
      this.a++
    }
  }
})
vm.plus()
vm.a // 2
```



**注意**


注意，**不应该使用箭头函数来定义 method 函数** (例如 `plus: () => this.a++`)。理由是箭头函数绑定了父级作用域的上下文，所以 `this` 将不会按照期望指向 Vue 实例，`this.a` 将是 undefined。


### 区别

`computed`是在`HTML` `DOM`加载后马上执行的，如赋值

`methods`则必须要有一定的触发条件才能执行，如点击事件

`watch`则是用于观察`Vue`实例上的数据变动。对应一个对象，键是观察表达式，值是对应回调。值也可以是方法名，或者是对象，包含选项。

所以他们的执行顺序为：默认加载的时候先`computed`再`watch`，不执行`methods`；等触发某一事件后，则是：先`methods`再`watch`。

`computed` vs `watched` ：Vue 确实提供了一种更通用的方式来观察和响应 `Vue` 实例上的数据变动：`watch` 属性。当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 `watch`，通常更好的想法是使用 `computed` 属性而不是命令式的 `watch` 回调。
