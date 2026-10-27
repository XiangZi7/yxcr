import Link from "next/link";
import { InfoPage } from "@/components/site/InfoPage";
import { pageMetadata } from "@/lib/seo";
import { author } from "@/lib/site";

const description = "了解 YXCR OS 原创与开放许可学习内容的来源、署名、修改记录、许可条件和权利反馈渠道。";
export const metadata = pageMetadata("版权声明", description, "/copyright");

export default function CopyrightPage() {
  return <InfoPage title="版权声明" description={description} path="/copyright" sections={[
    { id: "ownership", title: "尊重每一份知识的来源", content: <>
      <p>本站包含独立编写的学习内容，以及根据开放许可整理、改编的技术文档。第三方作品的版权归原作者或相应权利人所有；本站不会因收录或改编而取得其全部权利。</p>
      <p>不同内容适用不同许可，请勿把本站全部页面视为统一许可。未另行声明授权的原创讲解、界面和视觉资产，使用前请联系相应权利人。</p>
    </> },
    { id: "sources", title: "开放许可来源与使用条件", content: <>
      <ul>
        <li><a href="https://github.com/gouxinjie/gouxinjie.github.io" target="_blank" rel="noopener noreferrer">gouxinjie/gouxinjie.github.io</a>：适用 <a href="/licenses/Apache-2.0.txt">Apache License 2.0</a>。</li>
        <li><a href="https://github.com/hcer1999/vitepress_blog" target="_blank" rel="noopener noreferrer">hcer1999/vitepress_blog</a>：适用 <a href="/licenses/MIT.txt">MIT License</a>。</li>
        <li><a href="https://github.com/doocs/leetcode" target="_blank" rel="noopener noreferrer">Doocs contributors · doocs/leetcode</a>：适用 <a href="/licenses/CC-BY-SA-4.0.txt">CC BY-SA 4.0</a>；对应改编算法内容继续遵循该许可。</li>
      </ul>
      <p>本页仅为概要，具体权利和义务以原许可文本为准。使用或再分发相关内容时，请保留要求的署名、版权与许可通知，说明所作修改，并遵守适用的相同方式共享等条件。</p>
    </> },
    { id: "records", title: "修改与来源记录", content: <>
      <p>整理可能包括 Markdown 规范化、章节提取、内部链接调整、语言筛选、学习表述与排版修改。算法资料保留选定题解与代码，不复制完整题目描述。</p>
      <p>你可以查看<a href="/licenses/NOTICE.txt">许可通知</a>与<a href="/licenses/knowledge-attribution.json">逐篇来源清单</a>，核对原仓库、原文件路径、作者、许可和修改标记。来源路径保留原始命名，便于追溯。</p>
      <p>第三方引用、图片、商标或外链可能具有单独的使用条件。相邻文档采用开放许可，不代表其中一切被引用素材都自动适用该许可。</p>
    </> },
    { id: "requests", title: "权利反馈与内容纠错", content: <>
      <p>如果你认为本站内容存在署名缺失、许可不符或侵权，请发送邮件至 <a href={`mailto:${author.email}`}>{author.email}</a>，提供涉及的本站地址、原作品地址、权利依据、具体诉求及可回复的联系方式。</p>
      <p>我们会核实相关材料，并根据情况补充署名、纠正许可、调整或移除内容。技术错误和链接失效也欢迎通过<Link href="/contact">联系我们</Link>反馈。请勿提交与事项无关的敏感个人信息。</p>
    </> },
  ]} />;
}
