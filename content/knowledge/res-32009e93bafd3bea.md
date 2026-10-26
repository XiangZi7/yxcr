**原理：** 攻击者诱导用户点击，利用用户已登录的 Cookie 向目标站点发起请求。

**防御：**

- 校验 `Referer`/`Origin`。
- 使用 **CSRF Token**（请求携带服务端签发的随机 token）。
- Cookie 设置 `SameSite`。
- 双重 Cookie 校验。
