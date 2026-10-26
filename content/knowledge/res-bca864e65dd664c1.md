| 方法 | 是否占位 | 是否响应事件 | 说明 |
| --- | --- | --- | --- |
| `display: none` | 不占位 | 不响应 | 渲染树不包含该节点，触发重排 |
| `visibility: hidden` | 占位 | 不响应 | 仅视觉隐藏，触发重绘 |
| `opacity: 0` | 占位 | **响应** | 常用于淡入淡出动画 |
| `position: absolute` + 移出可视区 | 不占位 | 视情况 | 将元素移出屏幕 |
| `z-index: 负值` | 占位 | 不响应 | 被其他元素遮挡 |
| `clip-path: inset(0)` | 占位 | 不响应 | 裁剪隐藏 |
| `transform: scale(0)` | 占位 | 不响应 | 缩放为 0 |

> 面试常追问：`display:none` 与 `visibility:hidden` 的区别（是否占位、是否重排/重绘）。
