export const author = {
  name: "XiangZi7",
  github: "https://github.com/XiangZi7",
  bilibili: "https://space.bilibili.com/52419790",
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
  name: "Interview OS",
  url: getSiteUrl(),
  description:
    "XiangZi7 的面试学习工作台：系统学习 JavaScript、TypeScript、Vue、React、Python 与 AI 大模型知识，通过精选面试题、Markdown 笔记与模拟练习构建自己的知识体系。",
};
export function absoluteUrl(path: string) {
  return new URL(path, `${site.url}/`).toString();
}
