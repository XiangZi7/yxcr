**Set（类数组，值唯一）：** `add` / `has` / `delete` / `clear` / `size`，可 `for...of` / `forEach` 迭代。

**Map（任意类型键）：** `set` / `get` / `has` / `delete` / `clear` / `size`。

**对象与 Map 的区别：**

| 对比项 | Object | Map |
| --- | --- | --- |
| 键类型 | 字符串/Symbol | 任意类型 |
| 迭代 | 需 `Object.keys()` 等 | 可直接 `for...of` |
| 键顺序 | 不保证 | 保持插入顺序 |
| JSON | 支持 | 不支持（序列化后为空对象） |
| 场景 | 普通对象/JSON | 频繁增删、复杂键 |
