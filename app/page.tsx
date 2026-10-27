import Link from "next/link";
import { ArrowRight, BookOpen, Code2, Network, NotebookPen, Sparkles } from "lucide-react";
import { BrandMark } from "@/components/brand/BrandMark";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "编程与 AI 学习",
  "从一个知识点开始，系统学习前端、Python、计算机网络与 AI 应用。阅读原理、动手实践、记录笔记，用自己的节奏持续成长。",
  "/",
);

const directions = [
  { title: "前端开发", icon: Code2, href: "/topics/frontend", text: "从 JavaScript 的语言机制出发，连接浏览器、组件框架与工程实践。", topics: "JavaScript · TypeScript · Vue · React" },
  { title: "计算机基础", icon: Network, href: "/topics/network", text: "理解一次请求如何到达服务器，把协议、缓存与系统运行串起来。", topics: "HTTP · TCP/IP · 浏览器 · 操作系统" },
  { title: "Python 与后端", icon: BookOpen, href: "/topics/backend", text: "通过语言基础与接口示例，练习数据处理和服务端开发。", topics: "Python · FastAPI · 数据处理" },
  { title: "AI 应用", icon: Sparkles, href: "/topics/ai-llm", text: "从检索增强到工具调用，逐步理解大模型应用的构建与评估。", topics: "RAG · MCP · Skills · Agent" },
];

export default function Home() {
  return (
    <main className="learning-home">
      <section className="learning-hero" aria-labelledby="learning-title">
        <div className="learning-hero-copy">
          <p className="info-eyebrow">LEARN. PRACTICE. GROW.</p>
          <h1 id="learning-title">每天理解多一点，<br />让知识慢慢连成体系。</h1>
          <p className="learning-hero-intro">一个安静的编程与 AI 学习空间。从原理解析到代码实践，用笔记留下思考，用自测发现盲区，按照自己的节奏持续成长。</p>
          <div className="learning-hero-actions">
            <Link href="/library" className="solid-button">开始探索知识 <ArrowRight size={16} /></Link>
            <Link href="/overview" className="outline-button">我的学习概览</Link>
          </div>
          <p className="learning-hero-note">免费阅读 · 无需注册 · 学习记录保存在当前浏览器</p>
        </div>
        <div className="learning-hero-art" aria-hidden="true">
          <BrandMark size={88} id="learning-home-mark" />
          <span>从好奇开始</span>
          <div><b>理解</b><i /><b>实践</b><i /><b>积累</b></div>
          <p>Build your knowledge, one idea at a time.</p>
        </div>
      </section>
      <section className="learning-directions" aria-labelledby="directions-title">
        <div className="learning-section-heading"><div><p className="info-eyebrow">找到你的方向</p><h2 id="directions-title">从感兴趣的主题开始</h2></div><Link href="/library">浏览全部知识 <ArrowRight size={14} /></Link></div>
        <div className="learning-direction-grid">
          {directions.map(({ title, icon: Icon, href, text, topics }) => (
            <Link className="learning-direction" href={href} key={title}>
              <Icon size={23} aria-hidden="true" />
              <h3>{title}<ArrowRight size={16} /></h3>
              <p>{text}</p><span>{topics}</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="learning-method" aria-labelledby="method-title">
        <div><p className="info-eyebrow">把读过变成学会</p><h2 id="method-title">一个问题，三步学扎实</h2><p>不必一次读完所有内容。每次留下自己的解释、可运行的例子，以及一个值得继续追问的问题。</p><Link href="/today">安排今天的学习 <ArrowRight size={14} /></Link></div>
        <ol>
          <li><span>01</span><div><h3>先理解它解决什么问题</h3><p>从一个具体场景出发，找到概念的作用，再看原理与适用条件。</p></div></li>
          <li><span>02</span><div><h3>写一个最小可运行的例子</h3><p>改变参数与边界条件，观察结果，用实验验证自己的判断。</p></div></li>
          <li><span>03</span><div><h3>合上资料，再解释一遍</h3><p>用自己的语言记录理解。说不清楚的部分，就是下次学习的起点。</p></div></li>
        </ol>
      </section>
      <section className="learning-start" aria-labelledby="start-title">
        <div><NotebookPen size={22} aria-hidden="true" /><h2 id="start-title">今天就留下一个新的理解</h2><p>读一篇讲解、做一次自测，或写一段自己的笔记。</p></div>
        <nav aria-label="学习工具"><Link href="/learn/vue-reactivity">阅读一篇讲解</Link><Link href="/practice">开始自测练习</Link><Link href="/notes">写下学习笔记</Link></nav>
      </section>
    </main>
  );
}
