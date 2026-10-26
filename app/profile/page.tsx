import { pageMetadata } from "@/lib/seo";
import { ProfilePage } from "@/components/learning/ProfilePage";
export const metadata = pageMetadata(
  "我的学习档案",
  "管理个人学习档案、阅读主题与字体偏好，查看知识积累并导出本地学习记录。",
  "/profile",
  true,
);
export default function Page() {
  return <ProfilePage />;
}
