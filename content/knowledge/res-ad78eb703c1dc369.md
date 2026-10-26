---

## 一、为什么需要 IntersectionObserver？

在传统的 Web 开发中，要实现"元素进入视口"检测，通常需要：

1. 监听`scroll`事件
2. 在事件处理程序中循环检查每个元素的位置
3. 使用`getBoundingClientRect()`计算元素位置

这种方法存在明显问题：

- **性能开销大**：滚动事件触发频繁，容易造成性能瓶颈
- **布局抖动**：频繁读取布局属性导致浏览器反复重排
- **代码复杂**：需要手动计算各种边界情况

`IntersectionObserver` 完美解决了这些问题！


**什么是 IntersectionObserver？**


`IntersectionObserver` 是一个现代的浏览器 API，它提供了一种**高效、异步**的方法来检测目标元素与祖先元素或视口（viewport）的交叉状态（intersection）变化。

当其监听到目标元素的可见部分（的比例）超过了一个或多个阈值（threshold）时，会执行指定的回调函数。


## 二、基本用法

### 2.1 创建观察者

```javascript
const observer = new IntersectionObserver(callback, options);
```

### 2.2 观察目标元素

```javascript
const target = document.getElementById("target");
observer.observe(target);
```

### 2.3 停止观察

```javascript
// 停止观察特定元素
observer.unobserve(target);

// 停止所有观察并销毁观察者
observer.disconnect();
```

### 2.4 配置选项

`IntersectionObserver` 接受一个配置对象：

```javascript
const options = {
  root: null, // 根元素，null表示视口
  rootMargin: "0px", // 根元素的外边距
  threshold: 0.5 // 交叉比例的阈值
};
```

### 2.5 threshold 详解

- `0`：目标刚进入/离开根元素时触发
- `1`：目标完全进入根元素时触发
- `[0, 0.25, 0.5, 0.75, 1]`：在多个比例点触发

### 2.6 回调函数

当观察的元素交叉状态发生变化时，会触发回调函数：

```javascript
function callback(entries, observer) {
  entries.forEach((entry) => {
    // entry提供目标元素的交叉信息
    console.log(entry.isIntersecting); // 是否交叉
    console.log(entry.intersectionRatio); // 交叉比例
  });
}
```

## 三、IntersectionObserver 的优势

1. **高性能**：异步执行，不阻塞主线程
2. **精确控制**：可配置阈值和根元素
3. **简化代码**：无需手动计算元素位置
4. **节能**：非激活状态的标签页会自动暂停检测

## 四、实际应用场景和案例

1. **懒加载**：图片、视频等资源进入视口时再加载
2. **无限滚动**：检测何时需要加载更多内容
3. **动画触发**：元素进入视口时执行动画
4. **广告曝光统计**：统计广告是否被用户看到
5. **阅读进度指示**：跟踪用户在页面中的阅读进度

### 4.1 图片懒加载示例

**实现效果：**

![图片懒加载优化](https://raw.githubusercontent.com/gouxinjie/gouxinjie.github.io/main/docs/column/JS/images/IntersectionObserver-1.gif)

**代码如下：**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>IntersectionObserver - 图片懒加载优化</title>
    
  </head>
  <body>
    <div class="progress-container">
      <div class="progress-bar" id="progressBar"></div>
    </div>

    <div class="container">
      <header>
        <h1>IntersectionObserver 图片懒加载</h1>
        <p>滚动页面查看图片懒加载效果，图片将在进入视口时加载</p>
      </header>

      <div class="image-grid" id="imageContainer">
        
      </div>

      <div class="stats">已加载图片: <span id="loadedCount">0</span> / <span id="totalCount">0</span></div>
    </div>

    <footer>
      <p>IntersectionObserver API 演示 - 图片懒加载优化示例</p>
    </footer>

    
  </body>
</html>
```

### 4.2 用户消息顶部粘性定位

当前实现的功能是用户消息的粘性定位实现。  
**当用户滚动时**，当前消息的底部与下一个消息的顶部相交时，移除上一个消息的粘性效果，并为当前消息添加粘性效果。依次交替实现。

**效果如下：**

![用户消息顶部粘性定位](https://raw.githubusercontent.com/gouxinjie/gouxinjie.github.io/main/docs/column/JS/images/IntersectionObserver-2.gif)

**主要代码如下：**

```js
.  /** 当用户滚动时，当前消息的底部与下一个消息的顶部相交时，移除上一个消息的粘性效果，并为当前消息添加粘性效果。依次交替实现。 */
  useEffect(() => {

    if (isMobile) return;

    const observers: IntersectionObserver[] = [];

    // 获取所有 AI 消息元素
    const aiMessages = document.querySelectorAll(".message-ai");
    aiMessages.forEach((aiMessage) => {
      // 获取前一个用户消息元素
      const prevUserMessage = aiMessage.previousElementSibling;
      if (!prevUserMessage || !prevUserMessage.classList.contains("message-user")) {
        return;
      }

      // 计算用户消息的高度 50是消除之间的间隔
      const userChatHeight = prevUserMessage.clientHeight - 50;

      // 创建独立的 IntersectionObserver
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              prevUserMessage.classList.add("sticky-user-chat");
            } else {
              prevUserMessage.classList.remove("sticky-user-chat");
            }
          });
        },
        {
          root: chatContainerRef.current,
          rootMargin: `-${userChatHeight}px 0px 0px 0px`, // 动态设置
          threshold: [0, 1] // 离开时触发顺序相反
        }
      );

      observer.observe(aiMessage);
      observers.push(observer); // 存储观察者以便清理
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [chatHistory, isMobile]);
```
