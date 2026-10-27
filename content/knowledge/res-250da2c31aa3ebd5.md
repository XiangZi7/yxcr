TCP 位于传输层，负责在端点之间提供可靠字节流；HTTP 位于应用层，规定请求、响应及资源交互语义。HTTP/1.x 和通常的 HTTP/2 部署使用 TCP，HTTPS 还通过 TLS 保护内容。

HTTP/3 使用 QUIC，底层基于 UDP，因此“HTTP 一定基于 TCP”并不准确。同样，TCP 也能承载很多其他应用层协议，不专属于 HTTP。
