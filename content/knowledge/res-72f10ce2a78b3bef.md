状态容器维护当前状态，通过 reducer 计算下一状态，再通知订阅者。中间件包裹 dispatch，使日志、异步动作等能力在约定位置扩展，而不需要把这些逻辑写进 reducer。

```javascript
function createStore(reducer, initialState) {
  let state = initialState
  const listeners = new Set()
  const store = {
    getState: () => state,
    subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener) },
    dispatch(action) {
      state = reducer(state, action)
      for (const listener of [...listeners]) listener()
      return action
    }
  }
  store.dispatch({ type: '@@init' })
  return store
}
function applyMiddleware(store, ...middlewares) {
  let dispatch = store.dispatch
  const api = { getState: store.getState, dispatch: action => dispatch(action) }
  dispatch = middlewares.map(middleware => middleware(api)).reduceRight((next, wrap) => wrap(next), store.dispatch)
  return { ...store, dispatch }
}
const thunk = ({ dispatch, getState }) => next => action => typeof action === 'function' ? action(dispatch, getState) : next(action)

function singleton(factory) {
  let created = false, instance
  return (...args) => {
    if (!created) { instance = factory(...args); created = true }
    return instance
  }
}
```

Reducer 应保持可预测，不在计算状态时直接发网络请求。上例用于理解容器与中间件组合，不包含 Redux 的全部输入校验与重入约束。单例缓存的是某个创建结果，模块、浏览器标签页与服务器请求之间是否共享，则取决于运行环境。
