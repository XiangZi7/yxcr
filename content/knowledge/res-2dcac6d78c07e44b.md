WebSocket 是面向消息的双向通信协议，适合在持续连接中交换文本和二进制数据。浏览器可以监听 open、message、error 和 close 等事件来管理连接。

```javascript
const socket = new WebSocket('wss://example.com/events')
socket.addEventListener('message', event => {
  console.log(event.data)
})
socket.addEventListener('close', () => {
  console.log('连接关闭，按策略恢复订阅')
})
```

生产实现还应设置连接生命周期、消息校验和有界重连策略，并在页面不再需要连接时主动清理。
