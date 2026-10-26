```js
/*
兼容低版本IE，ele为需要绑定事件的元素，
eventName为事件名(保持addEventListener语法，去掉on)，fun为事件响应函数
*/
// 定义一个自定义的事件绑定对象
function addEvent(ele,eventNmae, fun) {
    if (ele.addEventListener) {
        // 判断当前浏览器是否支持addEventListener函数
        ele.addEventListener(eventName, fun, false);
    } else {
        ele.attachEvent("on" + eventName, fun);
      // attachEvent 是IE浏览器兼容的事件绑定语法。但是事件名需要加上on
    }
}
```
