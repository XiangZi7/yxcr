DNS 预解析让浏览器提前查询一个域名的地址，减少后续真正请求时的等待。页面已经知道将使用某个第三方域名时，可以提供 `dns-prefetch` 提示。

```html
<link rel="dns-prefetch" href="//static.example.com">
```

它只涉及域名解析，不保证完成 TCP 或 TLS 连接。确实需要提前建立连接时可以考虑 `preconnect`，但不要对大量未必使用的域名同时预热，否则会浪费资源。
