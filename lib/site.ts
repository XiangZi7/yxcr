export const author = {
  name: "XiangZi7",
  email: "xiangzi777777@gmail.com",
  github: "https://github.com/XiangZi7",
  bilibili: "https://space.bilibili.com/52419790",
  avatar: "/images/xiangzi7-avatar.png",
} as const;

function getSiteUrl() {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://yxcr.top");
    return /^https?:$/.test(url.protocol) ? url.origin : "https://yxcr.top";
  } catch {
    return "https://yxcr.top";
  }
}
export const site = {
  name: "YXCR OS",
  url: getSiteUrl(),
  description:
    "XiangZi7 的编程与 AI 学习网站：系统学习 JavaScript、TypeScript、Vue、React、Python 与 AI 大模型知识，通过原理解析、代码实践、学习笔记与自测练习构建自己的知识体系。",
};
export function absoluteUrl(path: string) {
  return new URL(path, `${site.url}/`).toString();
}
