告诉服务端如何解析请求数据、告诉客户端如何解析响应数据。

- `application/x-www-form-urlencoded`：`key1=val1&key2=val2`，中文/特殊字符会 URL 编码，常用于表单提交，不支持文件。
- `application/json;charset=UTF-8`：当前最常用，序列化 JSON 字符串放入请求体。
- `multipart/form-data`：用于**文件上传**。
