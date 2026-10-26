在 Next.js 中，**`next/script`** 是一个经常被忽略、但在性能和工程质量上非常关键的组件。它专门用于**安全、可控、性能友好地加载第三方脚本**（如统计、监控、广告、SDK 等）。

## 一、为什么不能直接用 `
```

但在 **Next.js（尤其是 App Router / SSR 场景）** 中，这种写法存在明显问题：

### 1️⃣ 阻塞页面渲染

- 默认 script 会阻塞 HTML 解析
- 影响 **首屏性能（FCP / LCP）**

### 2️⃣ 执行时机不可控

- SSR / Hydration 阶段容易出现
  - `window is not defined`
  - 客户端、服务端不一致

### 3️⃣ 无法被 Next.js 优化

- 无法参与 Script 调度
- 无法延迟 / 优先级控制

👉 **Next.js Script 的存在，本质就是为了解决这些问题。**

## 二、什么是 `next/script`？

```ts
import Script from "next/script";
```

`Script` 是 Next.js 提供的一个**高级 Script 管理组件**，具备：

- ✅ 不阻塞渲染
- ✅ 精准控制加载与执行时机
- ✅ SSR / CSR 安全
- ✅ 自动去重
- ✅ 性能优化（preload / defer）

## 三、基本引入 vs 全局引入（非常容易混淆）

在使用 `next/script` 时，**很多人其实不是不会用 strategy，而是没想清楚：脚本应该“在哪引入”**。

我们先把这个问题讲清楚，再进入 strategy。

### 3.1 什么是「基本引入」（页面级 / 组件级）？

👉 **只在某一个页面或组件中使用 Script**。

**示例：仅在详情页引入**

```tsx
// app/detail/page.tsx
import Script from "next/script";

export default function DetailPage() {
  return (
    <>
      
```
