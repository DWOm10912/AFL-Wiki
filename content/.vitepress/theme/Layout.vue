<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData, withBase } from 'vitepress'
const { frontmatter: fm, lang } = useData()
const labels = { tested: '已实机验收', implemented: '已实现 · 待验收', planned: '规划中', retired: '已废弃', draft: '资料待核实', index: '栏目索引' }
</script>
<template><DefaultTheme.Layout>
  <template #doc-before><div v-if="fm.status" class="page-meta"><span class="category-label">{{ fm.category || 'AFL WIKI' }}</span><a :href="withBase('/project/status.html')" class="status-label" :class="fm.status">{{ labels[fm.status] || fm.status }}</a></div></template>
  <template #doc-after><aside v-if="fm.reviewed" class="review-note">资料核对：{{ fm.reviewed }} · 开发版数值可能调整。条目状态说明的是核验范围，不代表已公开发布。<a :href="withBase('/project/feedback.html')">反馈条目问题</a></aside></template>
</DefaultTheme.Layout></template>
