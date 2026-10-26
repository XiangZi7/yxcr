import type { Article } from "@/lib/interview/types";
import { CodeBlock } from "./CodeBlock";

export function ArticleContent({
  article,
  expanded,
}: {
  article: Article;
  expanded: boolean;
}) {
  return (
    <div className="article-body">
      <section id="core" className="article-section">
        <h2>一、核心概念</h2>
        <p>{article.introduction}</p>
      </section>
      <section
        id="implementation"
        className="article-section implementation-section"
      >
        <h2>二、实现原理</h2>
        {article.sections.map((section, index) => (
          <section
            id={`implementation-${index + 1}`}
            className="implementation-step"
            key={section.title}
          >
            <h3>
              {index + 1}.&nbsp; {section.title}
            </h3>
            <p>{section.text}</p>
            <CodeBlock
              code={section.code}
              language={
                article.topic === "Python" || article.topic === "FastAPI"
                  ? "PY"
                  : "TS"
              }
            />
          </section>
        ))}
        {expanded && (
          <section id="implementation-3" className="implementation-step">
            <h3>3.&nbsp; 作用域与副作用</h3>
            <p>
              {article.slug === "vue-3"
                ? "effect 会记录它依赖的响应式属性，effectScope 可以将一组副作用统一管理。组件卸载或作用域停止时，应清理不再需要的副作用，避免重复执行和内存泄漏。"
                : "明确数据和副作用的生命周期，对事件监听、定时器和异步任务进行必要清理。通过局部状态保持数据流清晰，避免不必要的全局耦合。"}
            </p>
          </section>
        )}
      </section>
      {expanded && (
        <>
          <section id="comparison" className="article-section">
            <h2>
              三、
              {article.slug === "vue-3" ? "与 Vue 2 的对比" : "实践与方案对比"}
            </h2>
            <p>{article.comparison}</p>
          </section>
          <section id="summary" className="article-section">
            <h2>四、总结</h2>
            <p>{article.summary}</p>
          </section>
        </>
      )}
    </div>
  );
}
