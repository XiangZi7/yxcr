import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import ArticleMeta from "./ArticleMeta.vue";
import ArticleSource from "./ArticleSource.vue";
import "katex/dist/katex.min.css";
import "./style.css";

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    "doc-before": () => h(ArticleMeta),
    "doc-footer-before": () => h(ArticleSource),
  }),
} satisfies Theme;
