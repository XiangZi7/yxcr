Blob 是带 MIME 类型的不可变二进制对象；ArrayBuffer 是定长原始内存，需要通过 TypedArray 或 DataView 读取；Base64 是编码规则，得到的是字符串。它们分别对应文件内容、内存表示和文本表示。

Base64 编码后的正文通常约为原始字节数的四分之三倒数，即约 4/3，还可能有前缀和字符串内存开销。Blob URL 则是浏览器对对象的临时引用，使用完应调用 `URL.revokeObjectURL()`，它不等于 Base64。
