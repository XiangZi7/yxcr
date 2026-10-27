import config from "../../content/resources/sources.json" with { type: "json" };

export const topicCategories = [
  { slug: "frontend", category: "前端", title: "前端开发", description: "系统学习 HTML、CSS、JavaScript、TypeScript 与组件框架，结合浏览器原理、代码示例和工程实践建立 Web 开发基础。" },
  { slug: "backend", category: "后端", title: "Python 与后端开发", description: "从 Python 语言与服务端基础出发，理解接口设计、数据处理、参数校验和运行机制，通过实例连接概念与应用。" },
  { slug: "network", category: "计算机网络", title: "计算机网络", description: "沿着一次网络请求理解 HTTP、TCP/IP、连接、缓存与安全传输，结合原理解析和实验排查常见网络问题。" },
  { slug: "algorithms", category: "算法", title: "算法与数据结构", description: "按数据结构与解题方法学习数组、链表、树、图和动态规划，结合复杂度分析、边界条件与代码实现巩固理解。" },
  { slug: "ai-llm", category: "AI / LLM", title: "AI 与大模型应用", description: "理解大模型、RAG、MCP、Agent 与应用工程，逐步学习检索、工具调用、执行反馈与评估方法。" },
] as const;

export interface LearningTopic { slug: string; category: string; title: string; description: string; query?: string }
export const learningTopics: LearningTopic[] = [
  ...topicCategories,
  { slug: "javascript", category: "前端", title: "JavaScript 学习", query: "JavaScript", description: "从作用域、原型链和异步机制学习 JavaScript，结合事件循环、手写实现和代码示例验证语言行为。" },
  { slug: "typescript", category: "前端", title: "TypeScript 学习", query: "TypeScript", description: "理解类型、接口、泛型与类型推导，通过示例学习如何为 JavaScript 项目建立清楚的类型边界。" },
  { slug: "vue", category: "前端", title: "Vue 学习", query: "Vue", description: "学习 Vue 的响应式、组件、状态和工程实践，从核心原理走向可维护的页面实现。" },
  { slug: "react", category: "前端", title: "React 学习", query: "React", description: "围绕组件、Hooks、状态与渲染机制学习 React，结合代码示例理解副作用和应用架构。" },
  { slug: "python", category: "后端", title: "Python 学习", query: "Python", description: "学习 Python 的语言机制、迭代、生成器和数据处理，通过小例子理解服务端程序的组织方式。" },
  { slug: "fastapi", category: "后端", title: "FastAPI 学习", query: "FastAPI", description: "从路由、类型注解和数据校验入手，学习使用 FastAPI 构建边界明确的 HTTP 接口。" },
  { slug: "rag", category: "AI / LLM", title: "RAG 学习", query: "RAG", description: "学习检索增强生成的索引、召回、重排与生成流程，理解如何评估检索质量和回答依据。" },
  { slug: "mcp", category: "AI / LLM", title: "MCP 学习", query: "MCP", description: "理解 MCP 中的工具、资源与客户端协作，学习连接模型应用和外部能力时的协议边界。" },
  { slug: "agent", category: "AI / LLM", title: "Agent 学习", query: "Agent", description: "从执行循环、工具调用和记忆机制理解 Agent，结合权限、反馈与评估构建可靠的 AI 应用。" },
  { slug: "inference", category: "AI / LLM", title: "模型推理学习", query: "推理", description: "理解大模型预填充、解码与缓存，从延迟、吞吐和资源成本评估推理优化方案。" },
];

// Keep upstream collection IDs for saved filters; use clear public paths.
const collectionNames: Record<string, string> = {
  "network-interview": "computer-network", "ai-future": "ai-engineering",
  frequent: "core-concepts", experience: "learning-methods", yearly: "learning-review",
};
export function collectionSlug(id: string) { return collectionNames[id] || id; }
export function collectionHref(id: string) { return `/library/${collectionSlug(id)}`; }
export function getCollectionBySlug(slug: string) {
  return config.collections.find((item) => collectionSlug(item.id) === slug);
}
export function categoryHref(category: string) {
  const topic = topicCategories.find((item) => item.category === category);
  return topic ? `/topics/${topic.slug}` : "/library";
}
export function getCategoryBySlug(slug: string) { return learningTopics.find((item) => item.slug === slug); }

const topicColumns: Record<string, string> = {
  JavaScript: "base", TypeScript: "advanced", "Vue 3": "principles", React: "frontend-system",
  "浏览器与网络": "network-interview", "工程化": "frontend-system", Python: "comprehensive",
  FastAPI: "comprehensive", RAG: "ai-future", MCP: "ai-future", Agent: "ai-future", "模型推理": "ai-future",
};
export function topicHref(topic: string) {
  const direct: Record<string, string> = { JavaScript: "javascript", TypeScript: "typescript", "Vue 3": "vue", React: "react", Python: "python", FastAPI: "fastapi", RAG: "rag", MCP: "mcp", Agent: "agent", "模型推理": "inference" };
  if (direct[topic]) return `/topics/${direct[topic]}`;
  return topicColumns[topic] ? collectionHref(topicColumns[topic]) : "/library";
}
