有以下三种方法。

- 使用内联
- 使用`onclick`的方式
- 使用事件监听`addEventListener`的方式

### 使用内联

```html
<input type="button" value="按钮" onclick="alert(1);">
```

这种方式就是在一个元素上面直接绑定了一个点击`onclick`事件，此事件为**DOM 0级标准**。同时，这个事件的优先级是最高的。

### 使用on事件名的方式

```html
<input type="button" value="按钮">


```

使用这种形式也是可以给一个`DOM`元素添加上一个事件，这个也是**DOM 0级标准**。

**弊端**

以上两种方式都是存在一个弊端的，就是一个元素只能添加一个事件。

### addEventListener

```html
<input type="button" value="按钮">


```

上面的方式就可以给一个DOM对象绑定一个或者是多个事件。**强烈推荐使用这一种绑定事件的方式**。

`addEventListener`有三个参数

1. 事件类型，**不需要**添加上`on`
2. 事件函数
3. 是否开启事件捕获（布尔值），默认是`false`，即不捕获，那就是事件冒泡。

#### 取消绑定

取消一个使用`addEventListener`绑定的事件函数，可以使用`removeEventListener`。
