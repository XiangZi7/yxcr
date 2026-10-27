"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronRight, Sparkles } from "lucide-react";
import type { Article } from "@/lib/interview/types";
import { Modal } from "@/components/ui/Modal";

const helpItems = [
  {
    title: "找到自己的学习方向",
    text: "在学习概览查看知识版图，前往全部知识库按方向、掌握状态与关键词筛选题目。按 Ctrl K / ⌘ K 可以快速打开顶部搜索。",
  },
  {
    title: "给今天安排一点新知识",
    text: "今日学习支持调整每日目标、管理学习任务与标记掌握状态。收藏值得复习的题目，把还不熟悉的内容加入错题本。",
  },
  {
    title: "把理解写成自己的笔记",
    text: "我的笔记支持导入 .md 文件，以及阅读、编辑和分屏预览。修改完成后点击保存，也可以将文档导出为 Markdown。",
  },
  {
    title: "在表达中检验理解",
    text: "自测练习提供技术方向、题数、时长和练习模式设置。当前支持本地自测、参考思路和作答复盘，尚未连接在线 AI 服务。",
  },
];

export function WorkspaceDialog({
  panel,
  onClose,
  article,
  question = "",
}: {
  panel: "help" | "practice";
  onClose: () => void;
  article: Article;
  question?: string;
}) {
  const [answer, setAnswer] = useState("");
  const [showReference, setShowReference] = useState(false);
  const reference = question.includes("ref")
    ? "ref 可包装基本类型或对象，通过 .value 访问；reactive 返回对象的 Proxy 代理。ref 在模板中通常会自动解包，而 reactive 解构后可能失去响应式联系，可以使用 toRefs 保留属性引用。"
    : question.includes("简单") && article.slug === "vue-3"
      ? "用 Proxy 拦截 get 与 set，通过 WeakMap 按对象与属性保存 effect 集合。读取时 track 收集当前 effect，写入时 trigger 执行依赖，并处理依赖去重与副作用清理。"
      : article.summary;
  return (
    <Modal
      title={panel === "help" ? "让学习更有方向" : "拓展思考练习"}
      onClose={onClose}
    >
      {panel === "help" ? (
        <>
          <div className="space-y-6">
            {helpItems.map((item) => (
              <section key={item.title}>
                <h3 className="mb-2 text-sm font-semibold">{item.title}</h3>
                <p className="text-sm leading-7 text-muted">{item.text}</p>
              </section>
            ))}
          </div>
          <p className="mt-6 border-t border-line pt-4 text-xs leading-6 text-muted">
            笔记、收藏和学习记录保存在当前浏览器中。可以在个人学习档案中导出一份记录。
          </p>
        </>
      ) : (
        <>
          <span className="practice-label mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs">
            <Sparkles size={14} />
            自主练习 · {article.topic}
          </span>
          <h3 className="mb-4 text-lg font-semibold leading-8">
            {question || article.title}
          </h3>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setShowReference(true);
            }}
          >
            <label
              htmlFor="practice-answer"
              className="mb-2 block text-sm text-muted"
            >
              先试着用自己的语言回答
            </label>
            <textarea
              id="practice-answer"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              className="practice-input w-full resize-y"
              rows={6}
              placeholder="从核心概念、实现过程和应用场景展开…"
              required
              minLength={10}
            />
            <p className="mb-4 mt-2 text-xs text-muted">
              至少输入 10 个字，再对照答题思路复盘。
            </p>
            <button className="solid-button" type="submit">
              查看答题思路
              <ChevronRight size={15} />
            </button>
          </form>
          {showReference && (
            <div className="reference-answer mt-5">
              <h4 className="mb-2 font-semibold">答题思路</h4>
              <p className="text-sm leading-7">{reference}</p>
              <Link
                href={`/practice?topic=${article.slug}`}
                onClick={onClose}
                className="subtle-link mt-4 inline-flex"
              >
                进入完整模拟练习
                <ArrowUpRight size={13} />
              </Link>
            </div>
          )}
        </>
      )}
    </Modal>
  );
}
