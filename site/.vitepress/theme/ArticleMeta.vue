<script setup lang="ts">
import { useData } from "vitepress";

const { frontmatter } = useData();
</script>

<template>
  <nav v-if="frontmatter.category" class="article-meta" aria-label="面包屑">
    <a href="/library">知识库</a>
    <span aria-hidden="true">›</span>
    <a :href="frontmatter.categoryLink">{{ frontmatter.category }}</a>
    <template v-if="frontmatter.collection">
      <span aria-hidden="true">›</span>
      <a :href="frontmatter.collection.link">{{ frontmatter.collection.title }}</a>
    </template>
    <span class="tag">{{ frontmatter.section }}</span>
  </nav>
</template>
