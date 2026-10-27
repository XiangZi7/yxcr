import Link from "next/link";
import { InfoPage } from "@/components/site/InfoPage";
import { pageMetadata } from "@/lib/seo";
import { author } from "@/lib/site";

const description = "联系 YXCR OS 维护者，反馈内容错误、页面问题、版权事项、隐私请求或合作建议。";
export const metadata = pageMetadata("联系我们", description, "/contact");

function email(subject: string) {
  return `mailto:${author.email}?subject=${encodeURIComponent(`YXCR OS · ${subject}`)}`;
}

export default function ContactPage() {
  return <InfoPage title="联系我们" description={description} path="/contact" sections={[
    { id: "email", title: "直接发一封邮件", content: <>
      <p>本站由 {author.name} 维护，统一联系邮箱为：</p>
      <a className="contact-email" href={email("站点反馈")}>{author.email}</a>
      <p>点击邮箱可调用你设备上的邮件应用；也可以复制邮箱后自行发送。本站没有在线提交表单，点击邮件链接本身不会向本站提交消息。我们会根据问题复杂程度与维护安排回复，不承诺固定回复时限。</p>
    </> },
    { id: "topics", title: "按事项联系，更容易处理", content: <>
      <div className="contact-topics">
        <a href={email("内容纠错")}><strong>内容纠错</strong><span>附上页面地址、具体段落、问题说明与参考资料。</span></a>
        <a href={email("功能反馈")}><strong>功能反馈</strong><span>说明设备、浏览器、操作步骤和遇到的现象。</span></a>
        <a href={email("隐私请求")}><strong>隐私请求</strong><span>说明请求范围与可回复的联系方式。</span></a>
        <a href={email("版权事项")}><strong>版权事项</strong><span>提供权利说明、原始作品和涉及的本站页面。</span></a>
        <a href={email("合作咨询")}><strong>合作咨询</strong><span>介绍合作内容、相关主体及联系方式。</span></a>
      </div>
    </> },
    { id: "privacy", title: "反馈时保护你的信息", content: <>
      <p>请只提供处理问题必需的信息。截图与日志请先遮盖密码、访问密钥、身份证件、支付信息和他人隐私。排查学习记录问题时，也不需要发送整份私人笔记。</p>
      <p>联系邮件会通过邮件服务处理。我们仅为沟通、核实请求及处理问题使用你主动提供的内容，详见<Link href="/privacy">隐私政策</Link>。</p>
    </> },
    { id: "elsewhere", title: "其他公开主页", content: <>
      <ul>
        <li><a href={author.github} target="_blank" rel="noopener noreferrer">{author.name} 的 GitHub</a></li>
        <li><a href={author.bilibili} target="_blank" rel="noopener noreferrer">{author.name} 的哔哩哔哩主页</a></li>
      </ul>
      <p>这些平台独立运营，访问或发送私信时适用相应平台的服务条款与隐私政策。涉及个人信息或版权证明的事项，请优先使用邮箱。</p>
    </> },
  ]} />;
}
