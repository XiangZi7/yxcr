- 为什么会出现跨域？

> 首先了解下浏览器的同源策略 同源策略 SOP（Same origin policy）是一种约定，由 Netscape 公司 1995 年引入浏览器，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到 XSS、CSFR 等攻击。所谓同源是指"**协议**+**域名**+**端口**"三者相同，即便两个不同的域名指向同一个 ip 地址，也非同源

- 什么是 CORS?

> CORS 是一个 W3C 标准，全称是"跨域资源共享"（Cross-origin resource sharing）。 它允许浏览器向跨源服务器，发出 XMLHttpRequest 请求,从而克服了 AJAX 只能同源使用的限制。

**解决办法**

- jsonp

  - 原理

    因为`script`标签引入的文件不受跨域的限制，所以我们利用在页面中创建`script`节点的方法向不同域提交 HTTP 请求的方法称为 `jsonp`，这项技术可以解决跨域提交 `Ajax` 请求的问题。

  - 优点

    它不像 `XMLHttpRequest` 对象实现的 `Ajax` 请求那样受到同源策略的限制；它的兼容性更好，在更加古老的浏览器中都可以运行，不需要 `XMLHttpRequest` 或 `ActiveX` 的支持；并且在请求完毕后可以通过调用 `callback` 的方式回传结果。

  - 缺点

    它只支持 `GET` 请求而不支持 `POST` 等其它类型的 `HTTP` 请求；它只支持跨域 `HTTP` 请求这种情况，不能解决不同域的两个页面之间如何进行 `JavaScript` 调用的问题。

  - 代码

  ```js
  var script = document.createElement('script')
  script.type = 'text/javascript'
  
  // 传参并指定回调执行函数为onBack
  script.src = 'http://www.....:8080/login?user=admin&callback=onBack'
  document.head.appendChild(script)
  
  // 回调执行函数
  function onBack(res) {
    alert(JSON.stringify(res))
  }
  ```

* 反向代理

  `nginx` 服务内部配置 `Access-Control-Allow-Origin \*`

* iframe 标签
