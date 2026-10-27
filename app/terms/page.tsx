import Link from "next/link";
import { InfoPage } from "@/components/site/InfoPage";
import { pageMetadata } from "@/lib/seo";
import { author, site } from "@/lib/site";

const description = "使用 YXCR OS 学习内容、代码示例、笔记和自测功能前，请了解服务范围、合理使用规则与内容许可。";
export const metadata = pageMetadata("服务条款", description, "/terms");

export default function TermsPage() {
  return <InfoPage title="服务条款" description={description} path="/terms" sections={[
    { id: "service", title: "服务范围", content: <>
      <p>{site.name} 是由 {author.name} 维护的免费编程与 AI 学习网站，提供知识阅读、代码示例、学习笔记、收藏、计划与自测练习。使用本站时，请遵守本条款及适用法律。</p>
      <p>当前学习记录保存在你的浏览器中，没有账号、云端同步、付费订阅或在线 AI 服务。自测中的参考思路用于辅助学习，不属于正式测评或资格认证。</p>
    </> },
    { id: "use", title: "合理使用", content: <>
      <ul>
        <li>在适用许可范围内阅读、学习与使用内容，尊重原作者署名和许可条件。</li>
        <li>不得攻击网站、绕过访问限制、传播恶意代码，或以干扰正常服务的方式批量访问。</li>
        <li>不得利用本站侵害他人的隐私、知识产权或其他合法权益。</li>
        <li>使用代码示例前，请自行检查适用版本、安全性、依赖及运行条件。</li>
      </ul>
    </> },
    { id: "rights", title: "内容与用户数据的权利", content: <>
      <p>本站原创内容及界面设计的权利归相应权利人所有；开放许可内容继续适用其原有许可。浏览本站不代表获得对全部内容的统一商业授权，转载、分发与改编前请查看<Link href="/copyright">版权声明</Link>及对应资料的许可。</p>
      <p>你创建的私人笔记、练习回答和导入文档的权利仍归你或原权利人所有。现有功能不将这些内容公开发布，也不因本条款取得其再分发权。</p>
    </> },
    { id: "limits", title: "学习资料与责任边界", content: <>
      <p>我们会持续改进内容，但技术资料可能存在错误、遗漏或版本差异。代码示例和讲义仅用于学习参考，不保证适用于你的生产环境，也不承诺任何学习成绩、职业结果或收益。</p>
      <p>服务可能因维护、网络或第三方故障暂时中断。请自行备份本地笔记与记录；更换设备、清理浏览器或卸载应用可能导致数据丢失。</p>
      <p>在适用法律允许的范围内，本站按当前可用状态提供服务。本条款不排除或限制依法不得排除或限制的责任，也不影响你依法享有的权利。</p>
    </> },
    { id: "external", title: "外部链接与广告", content: <>
      <p>学习资料可能引用外部网站。第三方内容、服务、安全性和政策由各自运营者负责，本站链接不构成对其全部内容的认可。</p>
      <p>未来如启用广告，广告会与学习内容区分，广告出现不代表本站对产品或服务作出推荐或保证。请自主判断，相关隐私说明见<Link href="/cookies">Cookie 与广告</Link>。</p>
    </> },
    { id: "changes", title: "变更、反馈与争议", content: <>
      <p>我们可能调整内容和功能，并在条款更新时标注日期。涉及重要变化时会提供相应提示；需要另行同意的事项按适用规则处理。</p>
      <p>对于内容、服务或权利事项，请先通过 <a href={`mailto:${author.email}`}>{author.email}</a>联系维护者协商处理。协商未解决的争议，依适用法律由有管辖权的机构处理。</p>
    </> },
  ]} />;
}
