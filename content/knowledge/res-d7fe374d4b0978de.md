原生 HTML 表单按照 action、method 和 enctype 组织提交。GET 通常把字段放入查询字符串；POST 根据编码方式把字段放入请求体。普通键值表单常用 `application/x-www-form-urlencoded`，包含文件时常用 `multipart/form-data`。

用 FormData 配合 fetch 上传时，让浏览器生成 multipart 的 boundary，不要手动写一个缺少 boundary 的 Content-Type。服务端仍需校验字段、文件大小和访问权限，前端校验不能替代这些检查。
