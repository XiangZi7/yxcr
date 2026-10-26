import test from "node:test";
import assert from "node:assert/strict";
import { getMarkdownHeadings, markdownTitle } from "./utils.ts";

test("table of contents excludes headings inside fenced code", () => {
  const markdown = [
    "# 文档",
    "",
    "```markdown",
    "## 代码中的示例标题",
    "```",
    "",
    "## 真正的章节",
  ].join("\n");
  assert.deepEqual(
    getMarkdownHeadings(markdown).map((item) => item.title),
    ["文档", "真正的章节"],
  );
});
test("duplicate and formatted headings have stable unique anchors", () => {
  const headings = getMarkdownHeadings(
    "## **Proxy** 原理\n\n## Proxy 原理\n\n#### 不进入目录",
  );
  assert.deepEqual(
    headings.map((item) => item.id),
    ["proxy-原理", "proxy-原理-1"],
  );
});
test("document title uses an actual level-one heading or filename fallback", () => {
  assert.equal(markdownTitle("## 章节\n\n# 我的笔记", "导入文件"), "我的笔记");
  assert.equal(markdownTitle("正文，没有一级标题", "导入文件"), "导入文件");
});
