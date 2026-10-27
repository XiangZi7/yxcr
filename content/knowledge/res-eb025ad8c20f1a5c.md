请求头中，Host 或 HTTP/2 的对应伪首部标识目标站点，Accept 描述可接受的响应格式，Content-Type 描述所发送正文的格式，Authorization 携带认证信息。Origin 和相关 CORS 头参与跨源访问判断。

响应头中，Content-Type 告知浏览器如何解释正文，Cache-Control、ETag 等控制缓存，Set-Cookie 设置 Cookie，Location 配合重定向指示目标地址。排查问题时要同时检查请求、响应与中间代理对头部的处理。
