import type { Article } from "./types";
import { knowledgePath } from "../resources/links";

export const vueArticle: Article = {
  slug: "vue-3",
  topic: "Vue 3",
  category: "前端",
  title: "Vue 3 中的响应式原理是什么？",
  description:
    "Vue 3 采用了 Proxy 作为响应式的核心实现，相比 Vue 2 的 Object.defineProperty 具有更好的性能和更全面的拦截能力。请详细说明 Vue 3 的响应式实现原理。",
  tags: ["Vue 3", "响应式", "原理", "高频"],
  related: [
    "Vue 3",
    "响应式原理",
    "Proxy",
    "Object.defineProperty",
    "响应式系统",
  ],
  introduction:
    "Vue 3 的响应式系统基于 Proxy 实现，通过拦截对象的 get 和 set 操作来实现数据的响应式。当数据发生变化时，会触发相应的副作用函数（如组件更新、computed 重新计算等）。",
  sections: [
    {
      title: "创建响应式对象",
      text: "Vue 3 使用 reactive() 函数将普通对象转换为响应式对象。它会创建一个 Proxy 实例，拦截对象的属性访问和修改。",
      code: "import { reactive } from 'vue'\n\nconst state = reactive({\n  count: 0,\n  name: 'Vue 3'\n})\n\nconsole.log(state.count) // 0\nstate.count++ // 触发响应式更新",
    },
    {
      title: "依赖收集与派发更新",
      text: "当访问响应式对象的属性时，Vue 3 会收集当前的副作用函数（如组件渲染函数、watch 回调等）。当属性值发生变化时，会遍历依赖列表，执行相应的副作用函数。",
      code: "import { effect } from 'vue'\n\nconst runner = effect(() => {\n  console.log(`count: ${state.count}`)\n})\nstate.count++ // 会触发 effect 重新执行",
    },
  ],
  followups: [
    "Vue 3 中的 ref 和 reactive 有什么区别？",
    "如何实现一个简单的响应式系统？",
    "Vue 3 的响应式系统有哪些优势？",
  ],
  comparison:
    "Vue 2 使用 Object.defineProperty 逐个劫持已有属性，需要额外处理新增属性、删除属性和数组变化。Vue 3 使用 Proxy 代理整个对象，可以拦截 get、set、deleteProperty、has 和 ownKeys 等操作，并在访问嵌套对象时按需创建代理。",
  summary:
    "回答时沿着「Proxy 拦截 → track 收集依赖 → trigger 触发更新 → effect 执行副作用」展开。ref 通过 .value 封装值，reactive 代理对象；两者共同连接数据变化与视图更新。",
};

const otherTopics = [
  {
    slug: "javascript",
    topic: "JavaScript",
    category: "前端",
    title: "JavaScript 的事件循环是如何工作的？",
    core: "JavaScript 通过事件循环协调同步任务、微任务与异步任务。同步代码执行完成后，清空微任务队列，再执行下一个任务，浏览器会在合适的时机渲染页面。",
    code: "console.log('start')\n\nsetTimeout(() => console.log('task'), 0)\nPromise.resolve().then(() => {\n  console.log('microtask')\n})\n\nconsole.log('end')",
    second: "优先理解任务的执行顺序",
    secondCode: "// 输出顺序\n// start\n// end\n// microtask\n// task",
    tags: ["事件循环", "异步", "高频"],
  },
  {
    slug: "typescript",
    topic: "TypeScript",
    category: "前端",
    title: "TypeScript 中 type 和 interface 有什么区别？",
    core: "interface 主要描述对象的结构，支持声明合并和 extends。type 可以描述对象、联合类型、交叉类型与基础类型别名。两者都支持泛型，并在编译时提供类型检查。",
    code: "interface User {\n  id: number\n  name: string\n}\n\ntype Status = 'loading' | 'success' | 'error'\ntype Admin = User & { role: 'admin' }",
    second: "根据表达能力选择类型",
    secondCode:
      "function greet(user: User): string {\n  return `Hello, ${user.name}`\n}\n\nconst status: Status = 'success'",
    tags: ["类型系统", "interface", "高频"],
  },
  {
    slug: "react",
    topic: "React",
    category: "前端",
    title: "React Hooks 的工作原理是什么？",
    core: "Hooks 让函数组件拥有状态和副作用。React 按调用顺序将 Hook 与组件对应，并在重新渲染时读取同一位置的状态，因此不能在条件或循环中调用 Hook。",
    code: "import { useState } from 'react'\n\nfunction Counter() {\n  const [count, setCount] = useState(0)\n  return (\n    <button onClick={() => setCount(c => c + 1)}>\n      {count}\n    </button>\n  )\n}",
    second: "区分状态与副作用",
    secondCode:
      "useEffect(() => {\n  const onResize = () => console.log(innerWidth)\n  window.addEventListener('resize', onResize)\n  return () => window.removeEventListener('resize', onResize)\n}, [])",
    tags: ["Hooks", "状态管理", "高频"],
  },
  {
    slug: "browser",
    topic: "浏览器与网络",
    category: "前端",
    title: "从输入 URL 到页面展示发生了什么？",
    core: "浏览器解析 URL 后进行域名解析、连接建立和 HTTP 请求。收到响应后解析 HTML 与 CSS，构建 DOM 和样式信息，经过布局、绘制与合成，最终将页面显示在屏幕上。",
    code: "// 网络阶段\n// URL → DNS → TCP / TLS → HTTP\n\n// 渲染阶段\n// HTML → DOM\n// CSS → CSSOM\n// Layout → Paint → Composite",
    second: "理解性能优化的切入点",
    secondCode:
      "// 减少不必要的阻塞资源\n// 合理使用缓存和资源预加载\n// 减少布局抖动和重复绘制\n// 按需加载非首屏内容",
    tags: ["浏览器", "HTTP", "高频"],
  },
  {
    slug: "engineering",
    topic: "工程化",
    category: "前端",
    title: "如何设计可维护的前端项目架构？",
    core: "前端架构需要围绕业务边界组织页面、组件和数据服务。复用成熟工具，统一类型、代码规范和构建流程，并避免在需求尚不明确时进行过度抽象。",
    code: "// 按职责组织目录\napp/          // 路由与页面入口\ncomponents/   // 业务组件与通用 UI\nlib/          // 数据、工具与业务模型\npublic/       // 静态资源",
    second: "用自动化保障交付质量",
    secondCode: "// 提交前检查\npnpm lint\npnpm exec tsc --noEmit\npnpm build",
    tags: ["项目架构", "构建", "规范"],
  },
  {
    slug: "python",
    topic: "Python",
    category: "后端",
    title: "Python 生成器与迭代器有什么区别？",
    core: "迭代器实现 __iter__ 和 __next__ 协议，按需返回元素。生成器通过 yield 创建，是实现迭代器的简洁方式，能够暂停与恢复执行，适合处理流式数据。",
    code: "def numbers(limit):\n    for number in range(limit):\n        yield number\n\niterator = numbers(3)\nprint(next(iterator))  # 0\nprint(list(iterator))  # [1, 2]",
    second: "通过惰性求值节省内存",
    secondCode:
      "# 不必一次性创建所有数据\nsquares = (n * n for n in range(1000))\n\nfor value in squares:\n    print(value)",
    tags: ["生成器", "迭代器", "高频"],
  },
  {
    slug: "fastapi",
    topic: "FastAPI",
    category: "后端",
    title: "FastAPI 如何进行请求参数校验？",
    core: "FastAPI 使用 Python 类型注解和 Pydantic 模型定义请求结构，自动解析并校验参数。无效输入会返回结构化错误信息，同时自动生成 OpenAPI 文档。",
    code: "from fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nclass Item(BaseModel):\n    name: str\n    price: float",
    second: "用模型定义明确的请求边界",
    secondCode:
      "@app.post('/items')\nasync def create_item(item: Item):\n    return {'name': item.name, 'price': item.price}",
    tags: ["参数校验", "API", "Pydantic"],
  },
  {
    slug: "rag",
    topic: "RAG",
    category: "AI / LLM",
    title: "RAG 的核心流程是什么？",
    core: "检索增强生成将知识检索与大语言模型结合。系统先对文档切分和编码，在用户提问时检索相关片段，重排并组织上下文，再由模型生成基于证据的回答。",
    code: "// 离线索引\n// 文档 → 清洗 → 切分 → Embedding → 向量库\n\n// 在线问答\n// 问题 → 检索 → 重排 → 上下文 → LLM → 回答",
    second: "分别评估检索和生成质量",
    secondCode:
      "// 检索：召回率、相关性、排序质量\n// 生成：忠实性、完整性、引用准确性\n// 系统：响应时延、成本与更新频率",
    tags: ["检索增强", "向量数据库", "高频"],
  },
  {
    slug: "mcp",
    topic: "MCP",
    category: "AI / LLM",
    title: "MCP 如何连接模型与外部工具？",
    core: "Model Context Protocol 使用统一协议连接 AI 应用与外部数据和工具。Host 管理应用和权限，Client 与 Server 建立会话，Server 公开工具、资源和提示词等能力。",
    code: "// Host：AI 应用\n// Client：协议连接\n// Server：能力提供者\n\n// 初始化 → 能力协商 → 发现工具 → 调用工具",
    second: "明确工具边界与用户授权",
    secondCode:
      "// 校验工具输入和输出\n// 只开放必要的能力\n// 处理超时、取消和结构化错误\n// 对有影响的操作进行授权检查",
    tags: ["工具协议", "AI 应用", "上下文"],
  },
  {
    slug: "agent",
    topic: "Agent",
    category: "AI / LLM",
    title: "如何设计一个可靠的 AI Agent？",
    core: "Agent 将模型决策、工具调用和执行反馈组成循环。可靠的系统需要明确任务范围、可验证的完成条件，以及对错误恢复、执行预算和工具权限的控制。",
    code: "// Agent 执行循环\n// 理解目标 → 制定行动 → 调用工具\n// 观察结果 → 调整行动 → 验证完成\n\n// 为每一步设置预算和退出条件",
    second: "用反馈与评估控制质量",
    secondCode:
      "// 对关键行为记录可追踪日志\n// 通过工具结果检查行动是否成功\n// 对失败设置重试上限\n// 用真实任务评估成功率",
    tags: ["工具调用", "规划", "可靠性"],
  },
  {
    slug: "inference",
    topic: "模型推理",
    category: "AI / LLM",
    title: "大语言模型推理有哪些优化方式？",
    core: "大语言模型推理通常包含预填充和自回归解码两个阶段。KV Cache 避免重复计算，批处理提升吞吐，量化减少显存开销，推测解码可以降低生成延迟。",
    code: "// Prefill：并行处理输入 Token\n// Decode：逐步生成下一个 Token\n\n// 核心指标\n// 首 Token 时延、每 Token 时延、吞吐量",
    second: "根据实际负载选择优化策略",
    secondCode:
      "// KV Cache：减少重复计算\n// Continuous Batching：提升设备利用率\n// Quantization：降低内存占用\n// Speculative Decoding：加速解码",
    tags: ["推理优化", "KV Cache", "性能"],
  },
];

export const articles: Article[] = [
  vueArticle,
  ...otherTopics.map((item): Article => ({
    slug: item.slug,
    topic: item.topic,
    category: item.category,
    title: item.title,
    description: `${item.core}请结合实际场景说明其原理与应用。`,
    tags: [item.topic, ...item.tags],
    related: [item.topic, ...item.tags],
    introduction: item.core,
    sections: [
      { title: "理解核心机制", text: item.core, code: item.code },
      {
        title: item.second,
        text: "从实际执行过程出发，关注输入、输出与边界条件，并用一个简洁的例子解释关键概念。",
        code: item.secondCode,
      },
    ],
    followups: [
      `${item.topic} 在实际项目中有哪些常见应用？`,
      "如何处理边界条件与异常情况？",
      "你会如何验证实现的正确性？",
    ],
    comparison:
      "选择方案时，需要结合项目规模、维护成本、性能需求和团队经验，解释方案的适用边界，并通过实际场景说明取舍。",
    summary: `${item.core}学习时，先理解核心概念，再梳理执行流程，最后结合实际案例与边界条件验证。`,
  })),
];

export const navigationGroups = [
  {
    title: "前端",
    icon: "frontend",
    topics: [
      "JavaScript",
      "TypeScript",
      "Vue 3",
      "React",
      "浏览器与网络",
      "工程化",
    ],
  },
  { title: "后端", icon: "backend", topics: ["Python", "FastAPI"] },
  {
    title: "计算机网络",
    icon: "network",
    topics: ["计算机网络专题", "HTTP"],
  },
  {
    title: "AI / LLM",
    icon: "ai",
    topics: ["RAG", "MCP", "Agent", "模型推理", "AI 工程实战"],
  },
] as const;

export function articleHref(slug: string) {
  return knowledgePath(slug) ?? `/library?q=${encodeURIComponent(slug)}`;
}
