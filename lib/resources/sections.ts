import config from "../../content/resources/sources.json" with { type: "json" };

export const topicCategories = [
  { slug: "frontend", category: "前端", title: "前端开发", description: "系统学习 HTML、CSS、JavaScript、TypeScript 与组件框架，结合浏览器原理、代码示例和工程实践建立 Web 开发基础。" },
  { slug: "backend", category: "后端", title: "Python 与后端开发", description: "从 Python 语言与服务端基础出发，理解接口设计、数据处理、参数校验和运行机制，通过实例连接概念与应用。" },
  { slug: "network", category: "计算机网络", title: "计算机网络", description: "沿着一次网络请求理解 HTTP、TCP/IP、连接、缓存与安全传输，结合原理解析和实验排查常见网络问题。" },
  { slug: "algorithms", category: "算法", title: "算法与数据结构", description: "按数据结构与解题方法学习数组、链表、树、图和动态规划，结合复杂度分析、边界条件与代码实现巩固理解。" },
  { slug: "ai-llm", category: "AI / LLM", title: "AI 与大模型应用", description: "理解大模型、RAG、MCP、Agent 与应用工程，逐步学习检索、工具调用、执行反馈与评估方法。" },
] as const;

export interface LearningTopic { slug: string; category: string; title: string; description: string; query?: string; icon?: string }
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
  { slug: "html", category: "前端", title: "HTML 学习", query: "HTML", icon: "html5", description: "学习 HTML 语义、表单、文档结构与浏览器解析，构建可访问的网页基础。" },
  { slug: "css", category: "前端", title: "CSS 学习", query: "CSS", icon: "css", description: "从盒模型、选择器到布局和动画，理解 CSS 的层叠机制与页面样式。" },
  { slug: "angular", category: "前端", title: "Angular 学习", query: "Angular", icon: "angular", description: "学习 Angular 的组件、依赖注入、模板与应用开发方式。" },
  { slug: "nextjs", category: "前端", title: "Next.js 学习", query: "Next.js", icon: "nextdotjs", description: "学习 Next.js 的路由、渲染、缓存与全栈应用开发。" },
  { slug: "web-browser", category: "前端", title: "浏览器原理学习", query: "浏览器", icon: "browser", description: "理解浏览器进程、渲染流水线、缓存与页面生命周期。" },
  { slug: "frontend-engineering", category: "前端", title: "前端工程化学习", query: "工程", icon: "vite", description: "学习构建工具、模块组织、自动化流程与可维护的前端工程实践。" },
  { slug: "web-performance", category: "前端", title: "性能优化学习", query: "性能", icon: "workflow", description: "围绕加载、渲染和运行性能学习测量方法与优化策略。" },
  { slug: "nodejs", category: "后端", title: "Node.js 学习", query: "Node", icon: "nodedotjs", description: "理解 Node.js 的异步运行时、模块、网络服务与服务端实践。" },
  { slug: "linux", category: "后端", title: "Linux 学习", query: "Linux", icon: "linux", description: "学习 Linux 文件、进程、权限与命令行操作，掌握服务运行基础。" },
  { slug: "docker", category: "后端", title: "Docker 学习", query: "Docker", icon: "docker", description: "理解镜像、容器、网络与部署流程，学习容器化应用的组织方式。" },
  { slug: "nginx", category: "后端", title: "Nginx 学习", query: "Nginx", icon: "nginx", description: "学习 Nginx 配置、反向代理、静态资源服务与流量转发。" },
  { slug: "databases", category: "后端", title: "数据库学习", query: "数据库", icon: "database", description: "学习数据库查询、索引、事务与数据建模，理解持久化系统的基本机制。" },
  { slug: "mysql", category: "后端", title: "MySQL 学习", query: "MySQL", icon: "mysql", description: "理解 MySQL 的索引、事务、锁与查询优化，在实例中学习关系数据库。" },
  { slug: "http", category: "计算机网络", title: "HTTP 学习", query: "HTTP", icon: "globe", description: "学习 HTTP 请求、响应、状态码与版本演进，理解 Web 通信协议。" },
  { slug: "https", category: "计算机网络", title: "HTTPS 与 TLS 学习", query: "HTTPS", icon: "shield", description: "理解 HTTPS 的握手、证书与加密机制，学习安全传输的工作原理。" },
  { slug: "tcp", category: "计算机网络", title: "TCP 学习", query: "TCP", icon: "network", description: "学习 TCP 连接、可靠传输、拥塞控制和连接关闭的过程。" },
  { slug: "udp", category: "计算机网络", title: "UDP 学习", query: "UDP", icon: "workflow", description: "理解 UDP 数据报、传输特点与实时通信中的应用取舍。" },
  { slug: "dns", category: "计算机网络", title: "DNS 学习", query: "DNS", icon: "network", description: "学习域名解析、缓存与请求路径，理解网络访问的第一步。" },
  { slug: "websocket", category: "计算机网络", title: "WebSocket 学习", query: "WebSocket", icon: "messages", description: "学习 WebSocket 握手与双向通信，理解实时应用的连接管理。" },
  { slug: "network-security", category: "计算机网络", title: "网络安全学习", query: "安全", icon: "shield", description: "理解认证、跨域、会话与常见攻击，学习网络应用的安全边界。" },
  { slug: "network-cache", category: "计算机网络", title: "网络缓存学习", query: "缓存", icon: "layers", description: "学习 HTTP 缓存、缓存验证与内容分发，理解数据复用与一致性。" },
  { slug: "arrays", category: "算法", title: "数组学习", query: "数组", icon: "cards", description: "围绕下标、双指针与区间操作学习数组题，分析时间与空间成本。" },
  { slug: "strings", category: "算法", title: "字符串学习", query: "字符串", icon: "code", description: "学习字符串匹配、窗口和字符处理，通过例题理解常见解题模式。" },
  { slug: "linked-lists", category: "算法", title: "链表学习", query: "链表", icon: "workflow", description: "学习链表遍历、反转、快慢指针与节点操作，掌握引用边界。" },
  { slug: "stacks", category: "算法", title: "栈学习", query: "栈", icon: "layers", description: "理解后进先出、单调栈与括号匹配，学习如何维护处理顺序。" },
  { slug: "queues", category: "算法", title: "队列学习", query: "队列", icon: "cards", description: "学习队列、双端队列与广度优先遍历，理解先进先出的处理方式。" },
  { slug: "trees", category: "算法", title: "二叉树学习", query: "二叉树", icon: "network", description: "围绕遍历、递归、搜索和层次关系学习二叉树问题。" },
  { slug: "graphs", category: "算法", title: "图算法学习", query: "图", icon: "network", description: "学习图的表示、搜索与连通关系，理解节点和边组成的问题。" },
  { slug: "sorting", category: "算法", title: "排序学习", query: "排序", icon: "workflow", description: "理解排序算法、稳定性与复杂度，根据数据特点选择方案。" },
  { slug: "binary-search", category: "算法", title: "二分查找学习", query: "二分", icon: "compass", description: "学习二分区间、不变量与边界收缩，在有序和单调问题中定位答案。" },
  { slug: "dynamic-programming", category: "算法", title: "动态规划学习", query: "动态规划", icon: "shapes", description: "从状态、转移与初始条件出发，学习如何复用子问题的结果。" },
  { slug: "backtracking", category: "算法", title: "回溯学习", query: "回溯", icon: "route", description: "围绕选择、撤销和剪枝学习组合搜索，理解搜索树中的状态管理。" },
  { slug: "hash-tables", category: "算法", title: "哈希表学习", query: "哈希", icon: "boxes", description: "学习按键查找、计数和集合操作，理解哈希表的适用场景。" },
  { slug: "llm-basics", category: "AI / LLM", title: "大模型基础学习", query: "大模型", icon: "brain", description: "了解大语言模型的基本能力、上下文与应用边界，为工程实践建立基础。" },
  { slug: "skills", category: "AI / LLM", title: "Skills 学习", query: "Skill", icon: "sparkles", description: "学习技能的编写、组织与调用，将可复用的工作方式接入 AI 应用。" },
  { slug: "prompting", category: "AI / LLM", title: "提示词学习", query: "提示", icon: "messages", description: "学习提示组织、指令与上下文设计，用明确的输入改善模型输出。" },
  { slug: "tokens", category: "AI / LLM", title: "Token 与上下文学习", query: "Token", icon: "code", description: "理解 Token、上下文长度与缓存，分析模型交互的成本和效率。" },
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
