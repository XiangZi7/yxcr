可以在main.js里进行全局注册

```js
Vue.prototype.fun = function (){
    console.log('这是一个全局方法')
}
```

在其他组件内，可以通过`this.fun`来调用。
