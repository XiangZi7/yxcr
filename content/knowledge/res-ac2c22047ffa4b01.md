跨源请求携带 Cookie 需要客户端和服务端共同满足相关规则。fetch 通常要使用 `credentials: 'include'`；服务端需要允许凭证并返回明确允许的来源，不能在带凭证读取场景中使用任意来源通配符。

```javascript
fetch('https://api.example.com/profile', {
  credentials: 'include'
})
```

此外还要检查 Cookie 的 SameSite、Secure、Domain 等属性，以及浏览器对第三方 Cookie 的策略。允许跨源读取不等于允许任意来源执行敏感操作，仍需设计 CSRF 防护。
