import Link from "next/link";
import { InfoPage } from "@/components/site/InfoPage";
import { pageMetadata } from "@/lib/seo";

const description =
  "说明本站当前的本地存储用途、Google 广告接入准备状态，以及管理 Cookie 和个性化广告的方法。";
export const metadata = pageMetadata("Cookie 与广告", description, "/cookies");

export default function CookiesPage() {
  return (
    <InfoPage
      title="Cookie 与广告"
      description={description}
      path="/cookies"
      sections={[
        {
          id: "current",
          title: "当前使用情况",
          content: (
            <>
              <p>
                本站当前使用浏览器本地存储保存学习数据与偏好。应用代码没有主动设置第一方
                Cookie，当前也未接入 AdSense、Google
                Analytics、再营销或转化追踪脚本。广告功能尚未启用。
              </p>
              <p>
                Cookie
                是浏览器保存、并可能随请求发送给对应网站的小段数据；localStorage
                保存在当前浏览器中，不会像 Cookie
                一样自动附在每次请求里。两者都属于设备存储技术，但用途和管理方式不同。
              </p>
            </>
          ),
        },
        {
          id: "storage",
          title: "本地存储清单",
          content: (
            <>
              <div className="info-table-wrap">
                <table>
                  <caption>当前学习功能使用的持久存储</caption>
                  <thead>
                    <tr>
                      <th scope="col">存储项目</th>
                      <th scope="col">内容与用途</th>
                      <th scope="col">保存时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <code>interview-os:learning-v1</code>
                      </th>
                      <td>
                        主题、昵称、收藏、掌握状态、计划、笔记、导入文档及练习记录
                      </td>
                      <td>直到用户或浏览器清除</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <code>yxcr-os:resources-v1</code>
                      </th>
                      <td>知识库的收藏、掌握、笔记、计划与学习活动</td>
                      <td>直到用户或浏览器清除</td>
                    </tr>
                    <tr>
                      <th scope="row">旧版本兼容记录</th>
                      <td>
                        早期主题、收藏、掌握状态及笔记，升级时用于迁移本地数据
                      </td>
                      <td>直到用户或浏览器清除</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                这些存储用于你选择的学习功能，不用于跨站广告追踪。禁止本站存储可能使部分记录无法保存；清除存储会删除本地学习数据。
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
