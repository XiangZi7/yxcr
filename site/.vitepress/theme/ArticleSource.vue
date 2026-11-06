<script setup lang="ts">
import { useData } from "vitepress";

const { frontmatter } = useData();
</script>

<template>
  <aside v-if="frontmatter.origin" class="article-source">
    内容来源：<a :href="frontmatter.origin.url" target="_blank" rel="noopener">{{ frontmatter.origin.name }}</a>
    <template v-if="frontmatter.origin.license">
      · 许可：{{ frontmatter.origin.license }}
      <template v-if="frontmatter.origin.modified">（已改编）</template>
    </template>
    · <a href="/copyright">版权与来源说明</a>
  </aside>
</template>
