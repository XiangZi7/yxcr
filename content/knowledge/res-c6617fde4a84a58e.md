- **Options API**：Vue2 风格，按 `data/computed/methods/watch` 分类。逻辑分散，组件复杂时"按逻辑横切"不便复用。
- **Composition API**：Vue3 引入，在 `setup` 中按**逻辑关注点**组织代码。配合 `ref/reactive/computed/watch`，可封装自定义 Hook（`composables`）实现逻辑复用。

**setup 执行时机：** 在 `beforeCreate` 之前执行，`this` 不可用（指向 undefined）。

```js
import { ref, onMounted } from 'vue';

function useUser() {
  const name = ref('');
  const load = async () => { name.value = 'Tom'; };
  onMounted(load);
  return { name };
}
```
