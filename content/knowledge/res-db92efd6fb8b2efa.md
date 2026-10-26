**流程：**

1. 客户端用用户名/密码登录。
2. 服务端验证通过后签发 token 返回客户端。
3. 客户端存储 token（localStorage 或 Cookie）。
4. 每次请求在 Header（`Authorization: Bearer <token>`）中携带。
5. 服务端验证 token，通过则返回数据。

**优点：** 支持跨域（token 不依赖 Cookie）、适合移动端/非浏览器、无状态（服务器无需存 session）。

**缺点：** token 一旦签发难撤销（无状态双刃剑）、体积较大。
