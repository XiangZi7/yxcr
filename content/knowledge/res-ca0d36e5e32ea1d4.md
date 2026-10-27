浏览器缓存的具体实现可能使用内存和磁盘等存储，开发者工具中的 memory cache、disk cache 描述的是实现中的命中路径。协议中的新鲜期、验证器和缓存控制与这些存储位置不是同一维度。

Service Worker 的 Cache Storage 也是独立机制，由应用脚本显式管理。排查缓存时需要确认请求究竟被 HTTP 缓存、Service Worker、CDN 还是应用自己的数据缓存处理。
