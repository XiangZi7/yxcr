import Link from "next/link";
import { InfoPage } from "@/components/site/InfoPage";
import { pageMetadata } from "@/lib/seo";
import { author, site } from "@/lib/site";

const description = "了解 YXCR OS 如何处理浏览器本地学习记录、访问请求、联系邮件，以及未来启用 Google 广告时的信息与选择。";
export const metadata = pageMetadata("隐私政策", description, "/privacy");

export default function PrivacyPage() {
  return <InfoPage title="隐私政策" description={description} path="/privacy" sections={[
    { id: "scope", title: "适用范围与维护者", content: <>
      <p>本政策适用于 {site.name}（{site.url}）的页面与学习功能。维护者为 {author.name}，隐私联系邮箱为 <a href={`mailto:${author.email}`}>{author.email}</a>。</p>
      <p>当前本站无需注册或登录，没有在线 AI 服务，也未启用 Google AdSense、Google Analytics 或广告追踪脚本。下文的广告处理说明仅在未来实际启用相关服务时适用。</p>
    </> },
    { id: "data", title: "我们处理哪些信息", content: <>
      <ul>
        <li><strong>本地学习数据：</strong>昵称、主题偏好、收藏、掌握状态、错题、计划、学习活动、练习记录、笔记与导入的 Markdown 文档保存在当前浏览器的本地存储中。现有学习功能不会把这些内容上传到本站服务器，也不提供跨设备同步。</li>
        <li><strong>访问与搜索请求：</strong>浏览器访问页面、加载资源或使用站内搜索时，会向本站服务发送请求。承载网站的服务器与网络服务需要处理 IP 地址、浏览器信息、访问时间、请求地址及搜索词等数据，以返回内容、维护安全和排查故障。请勿在搜索框输入个人敏感信息。</li>
        <li><strong>主动联系信息：</strong>发送邮件时，你的邮箱、邮件内容与附件会经邮件服务传送给维护者，用于回复、纠错、核实与处理请求。</li>
      </ul>
      <p>部分学习文章含有第三方托管的图片。加载这些图片时，浏览器会向图片所在服务发起请求，该服务可能处理 IP 地址与请求信息。字体、站点标识与作者头像由本站提供。</p>
    </> },
    { id: "purpose", title: "信息用途与对外处理", content: <>
      <p>本地存储用于保存你主动使用的学习功能与偏好；网站请求用于提供内容和搜索、保障运行及处理异常；联系信息用于处理你提出的事项。我们不会将私人笔记或学习记录出售给广告商。</p>
      <p>托管、网络与邮件服务会在提供相应服务时处理必要数据。点击外部链接后，数据处理由目标网站及其政策决定。依法需要或为处理安全、侵权事项提供信息时，我们仅在必要范围内处理。</p>
      <p>外部服务的数据处理地点可能与你所在地区不同。我们会在增加会改变数据处理方式的服务时更新政策；需要授权或同意的处理，以适用规则要求及实际选择为准。</p>
    </> },
    { id: "advertising", title: "Google AdSense 与广告隐私", content: <>
      <p><strong>当前状态：</strong>本站正在进行广告接入准备，当前版本没有加载 AdSense 广告代码或设置广告 Cookie。</p>
      <p>未来启用广告后，Google 等第三方供应商可能使用 Cookie、网络信标、IP 地址及其他标识符，根据你此前访问本站或其他网站的情况投放、衡量广告和防范欺诈。Google 的广告 Cookie 可使其及合作伙伴依据这些访问活动展示个性化广告；实际处理取决于地区、广告设置和适用的同意选择。</p>
      <p>你可以在 <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer">Google 我的广告中心</a>管理或关闭个性化广告，也可以通过 <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer">第三方广告退出工具</a>管理参与供应商的选择。退出个性化不等于不再显示广告。</p>
      <p>Google 的处理方式请参阅<a href="https://policies.google.com/technologies/partner-sites?hl=zh-CN" target="_blank" rel="noopener noreferrer">使用 Google 服务的网站和应用中的信息使用说明</a>及其<a href="https://policies.google.com/privacy?hl=zh-CN" target="_blank" rel="noopener noreferrer">隐私政策</a>。实际启用的广告合作方及其信息会在相关同意管理界面或本政策中披露。</p>
      <p>面向欧洲经济区、英国与瑞士等适用地区启用广告时，我们将按照适用要求提供披露和同意管理。涉及个性化广告的同意收集将采用符合 Google 要求的认证平台，并提供重新选择或撤回入口。当前无需作出广告同意选择。</p>
    </> },
    { id: "choices", title: "查看、导出、删除与撤回", content: <>
      <ul>
        <li>在学习页面可查看和修改个人记录，在<Link href="/profile">个人学习档案</Link>中可导出当前可导出的学习记录；笔记也可单独导出为 Markdown。</li>
        <li>你可以在浏览器的网站数据设置中清除本站的本地存储，删除该浏览器保存的学习记录。清除前请按需导出备份；本站没有云端副本可用于恢复。</li>
        <li>清除本地数据不会删除已经下载的导出文件、发送的邮件或服务端日志。如需处理已发送的个人信息，请通过邮箱说明范围，我们会在适用规则允许的范围内核实和处理。</li>
        <li>未来启用可选 Cookie 或个性化广告时，你可以使用当时提供的同意管理入口拒绝或撤回相关同意。浏览器也可以限制 Cookie，但可能影响部分功能。</li>
      </ul>
    </> },
    { id: "retention", title: "保留与安全", content: <>
      <p>本地学习数据通常持续保留，直到你删除内容、清除网站数据、浏览器清理存储或设备发生变化。联系邮件仅在沟通、处理事项、解决争议或履行必要义务所需期间保留，随后删除或作适当处理。基础设施日志的可用性与保留受实际部署服务的配置约束。</p>
      <p>我们采取与服务规模相称的访问控制和维护措施，但无法保证任何网络传输或本地设备绝对安全。请勿将密码、密钥或敏感个人信息作为笔记内容，使用公共设备后请及时清理个人数据。</p>
    </> },
    { id: "children", title: "未成年人使用", content: <>
      <p>本站是一般编程与 AI 学习网站，不专门面向儿童，也不主动要求未成年人提供个人信息。未成年人应在监护人指导下使用。监护人如认为我们收到不应收集的儿童个人信息，可通过邮箱联系处理。</p>
    </> },
    { id: "updates", title: "政策更新与联系我们", content: <>
      <p>功能、第三方服务或适用规则发生变化时，我们会更新本页及顶部日期。涉及重要数据处理变化时，会提供相应提示；依法需要同意时会另行收集同意。</p>
      <p>对信息处理有疑问，或希望提出访问、更正、删除等请求，请发送邮件至 <a href={`mailto:${author.email}`}>{author.email}</a>。更多联系说明见<Link href="/contact">联系我们</Link>。</p>
    </> },
  ]} />;
}
