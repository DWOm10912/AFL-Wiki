<script setup>
import { useData, withBase } from 'vitepress'
const { frontmatter: fm } = useData()
</script>
<template><section v-if="fm.record" class="record-sheet" aria-label="条目资料卡">
<figure class="record-figure"><img v-if="fm.record.image" :src="withBase(fm.record.image)" :alt="fm.record.imageAlt || fm.title" width="256" height="256" /><div v-else class="image-placeholder"><span aria-hidden="true">[ IMAGE ]</span><strong>图片待补充</strong><p>等待正式游戏截图或模型展示图</p></div><figcaption>{{ fm.record.caption || '正式展示图尚未提供' }}</figcaption></figure>
<div class="record-info"><span class="category-label">{{ fm.record.kind === 'weapon' ? 'WEAPON DATA' : 'MACHINE DATA' }}</span><h2>基础资料</h2><dl><template v-for="row in fm.record.fields" :key="row.label"><dt>{{ row.label }}</dt><dd>{{ row.value }}</dd></template></dl><p class="registry" v-if="fm.record.id">{{ fm.record.id }}</p></div>
</section></template>
