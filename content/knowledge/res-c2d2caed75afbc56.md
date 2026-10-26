1. 未清理的**定时器**（`setInterval`/`setTimeout`）。
2. **未移除的事件监听器**（`addEventListener` 持有目标引用）。
3. 不恰当使用**闭包**导致变量无法回收。
4. 全局变量/`window` 上的临时引用。
5. `Map`/`Set` 中保存已无用的对象（可用 `WeakMap`/`WeakSet` 避免）。
6. 分离的 DOM 节点仍被 JS 引用。
