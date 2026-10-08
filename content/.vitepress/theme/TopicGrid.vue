<script setup>
import { useData, withBase } from 'vitepress'
const { frontmatter: fm } = useData()
</script>
<template><div class="topic-grid"><a v-for="(item,i) in fm.cards || []" :key="item.link" :href="withBase(item.link)" class="topic-card"><span class="card-no">{{ String(i+1).padStart(2,'0') }}</span><h2>{{item.title}}</h2><p>{{item.description}}</p><span class="card-link">阅读条目 <span aria-hidden="true">↗</span></span></a></div></template>
