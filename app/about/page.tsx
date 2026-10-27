import Link from "next/link";
import { InfoPage } from "@/components/site/InfoPage";
import { pageMetadata } from "@/lib/seo";
import { author, site } from "@/lib/site";

const description =
  "了解 YXCR OS 的学习理念、内容来源，以及维护者 XiangZi7。一起把编程与 AI 知识变成可实践的能力。";
export const metadata = pageMetadata("关于我们", description, "/about");

export default function AboutPage() {
  return (
    <InfoPage
      title="关于我们"
      description={description}
      path="/about"
      sections={[
        {
          id: "who",
          title: "一个持续积累的学习空间",
          content: (
            <>
              <p>
                {site.name} 是由 {author.name} 个人维护的编程与 AI
                学习网站。我们希望把分散的技术知识组织成容易阅读、可以实践、值得反复回看的学习内容。
              </p>
              <p>
                这里关注前端开发、计算机网络、Python、工程实践与 AI
                应用。无论你正在学习一个新概念，还是想把已有知识连成体系，都可以从一个小问题开始。
              </p>
            </>
          ),
        },
        {
          id: "learn",
          title: "从理解走向实践",
          content: (
            <>
              <ul>
                <li>
                  <strong>知识学习：</strong>
                  按主题阅读原理解析、代码示例与专题讲义。
                </li>
                <li>
                  <strong>自测练习：</strong>
                  先独立思考，再对照参考思路检查理解，练习功能目前在本地运行。
                </li>
                <li>
                  <strong>学习笔记：</strong>
                  记录自己的解释、实验与疑问，支持导入和导出 Markdown。
                </li>
                <li>
                  <strong>复习计划：</strong>
                  用收藏、掌握状态与每日目标，建立适合自己的学习节奏。
                </li>
              </ul>
              <p>
                <Link href="/library">探索知识库</Link>，或先从
                <Link href="/learn/vue-reactivity">理解 Vue 的响应式系统</Link>开始。
              </p>
            </>
          ),
        },
        {
          id: "editorial",
          title: "我们如何整理内容",
          content: (
            <>
              <p>
                本站包含独立编写的技术讲解，以及依据开放许可整理、改编的学习文档。我们按照知识主题组织内容，并保留改编文档的作者、来源、许可及修改记录，不将第三方内容声明为本站原创。
              </p>
              <p>
                技术工具与 API
                会持续变化。阅读时请结合文中适用条件，运行示例并对照对应版本的官方文档。发现错误或过时内容，可以通过
                <Link href="/contact">联系我们</Link>提交具体页面与修改建议。
              </p>
              <p>
                完整的来源与使用规则请查看
                <Link href="/copyright">版权声明</Link>。
              </p>
            </>
          ),
        },
        {
          id: "maintainer",
          title: "认识维护者",
          content: (
            <>
              <p>
                本站维护者为 {author.name}。你可以通过{" "}
                <a
                  href={author.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub 主页
                </a>
                与
                <a
                  href={author.bilibili}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  哔哩哔哩主页
                </a>
                了解作者，或发送邮件至{" "}
                <a href={`mailto:${author.email}`}>{author.email}</a>。
              </p>
              <p>
                本站目前提供免费学习内容，没有付费课程、订阅或在线 AI
                服务。未来如引入广告或新增数据处理方式，我们会同步更新相关说明。
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
