import Link from "next/link";
import { InfoPage } from "@/components/site/InfoPage";
import { pageMetadata } from "@/lib/seo";

const description = "说明本站当前的本地存储用途、Google 广告接入准备状态，以及管理 Cookie 和个性化广告的方法。";
export const metadata = pageMetadata("Cookie 与广告", description, "/cookies");

export default function CookiesPage() {
  return <InfoPage title="Cookie 与广告" description={description} path="/cookies" sections={[
    { id: "current", title: "当前使用情况", content: <>
      <p>本站当前使用浏览器本地存储保存学习数据与偏好。应用代码没有主动设置第一方 Cookie，当前也未接入 AdSense、Google Analytics、再营销或转化追踪脚本。广告功能尚未启用。</p>
      <p>Cookie 是浏览器保存、并可能随请求发送给对应网站的小段数据；localStorage 保存在当前浏览器中，不会像 Cookie 一样自动附在每次请求里。两者都属于设备存储技术，但用途和管理方式不同。</p>
    </> },
    { id: "storage", title: "本地存储清单", content: <>
      <div className="info-table-wrap"><table>
        <caption>当前学习功能使用的持久存储</caption>
        <thead><tr><th scope="col">存储项目</th><th scope="col">内容与用途</th><th scope="col">保存时间</th></tr></thead>
        <tbody>
          <tr><th scope="row"><code>interview-os:learning-v1</code></th><td>主题、昵称、收藏、掌握状态、计划、笔记、导入文档及练习记录</td><td>直到用户或浏览器清除</td></tr>
          <tr><th scope="row"><code>yxcr-os:resources-v1</code></th><td>知识库的收藏、掌握、笔记、计划与学习活动</td><td>直到用户或浏览器清除</td></tr>
          <tr><th scope="row">旧版本兼容记录</th><td>早期主题、收藏、掌握状态及笔记，升级时用于迁移本地数据</td><td>直到用户或浏览器清除</td></tr>
        </tbody>
      </table></div>
      <p>这些存储用于你选择的学习功能，不用于跨站广告追踪。禁止本站存储可能使部分记录无法保存；清除存储会删除本地学习数据。</p>
    </> },
    { id: "ads", title: "未来启用 Google 广告时", content: <>
      <p>如未来通过 Google AdSense 展示广告，Google 及其广告合作方可能使用 Cookie、网络信标、IP 地址或其他标识符，用于广告投放、频次控制、效果衡量与反欺诈，并可能依据此前对本站或其他网站的访问展示个性化广告。</p>
      <p>实际启用前，我们会更新说明，并按适用要求配置同意管理及合作方披露。在需要同意的地区，可选存储及相关个人数据处理将依据用户选择进行；拒绝或撤回同意的方式会在对应界面提供。</p>
      <p>广告将清楚标识并与学习操作区分。请根据真实兴趣自主选择是否访问广告；不需要通过点击广告来使用本站的学习功能。</p>
    </> },
    { id: "manage", title: "管理你的选择", content: <>
      <ul>
        <li>在浏览器的隐私或网站设置中，查看、限制或删除本站的 Cookie 与网站数据。删除前可到<Link href="/profile">个人学习档案</Link>导出记录。</li>
        <li>通过 <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer">Google 我的广告中心</a>管理个性化广告。</li>
        <li>通过 <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer">第三方广告退出工具</a>了解参与供应商的退出选项；这些选择可能按浏览器或设备分别生效。</li>
      </ul>
      <p>关闭个性化广告不会停止所有广告或所有必要数据处理。Google 的进一步说明见<a href="https://policies.google.com/technologies/ads?hl=zh-CN" target="_blank" rel="noopener noreferrer">广告技术政策</a>；本站完整说明见<Link href="/privacy">隐私政策</Link>。</p>
    </> },
  ]} />;
}
