Content-Type 描述请求体的媒体类型，而不是限制 POST 唯一采用哪种格式。常见选择有 JSON、表单键值编码、包含文件的 multipart 和纯文本。

客户端发送的格式必须与服务端解析器约定一致。JSON 请求应真实序列化为 JSON；文件上传使用 FormData 时让浏览器设置 multipart 边界。跨源场景下，自定义头和部分媒体类型还可能触发 CORS 预检。
