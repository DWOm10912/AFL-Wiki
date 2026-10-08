<script setup>
import { withBase } from 'vitepress'
const sections = [
 ['01','新手指南','了解基本环境、常见操作与出发前的准备。','/guide/'],
 ['02','武器装备','查阅原生枪械、弹药、配件与武器属性。','/weapons/'],
 ['03','生存系统','管理负重与耐力，留意水分、体温和辐射。','/survival/'],
 ['04','工业系统','从材料处理到能源供应，认识现代设备。','/industry/'],
 ['05','世界与探索','走近哥伦比亚联邦，关注地貌与设施资料。','/world/']
]
</script>
<template><main class="wiki-home">
<div class="home-topline"><span>APOCALYPSE: FIRST LIGHT</span><span>中文资料库 <i aria-hidden="true">/</i> WIKI V1</span></div>
<section class="hero"><div class="hero-copy"><p class="eyebrow">黎明启示录 · 玩家资料库</p><h1>黎明之后，<br><span>生存有据可循。</span></h1><p class="hero-description">探索 Minecraft 现代末日生存。<br>从一把制式手枪，到维持据点运转的工业系统，<br class="desktop-break">在这里查阅 AFL 的装备、机制与世界。</p><div class="hero-actions"><a class="primary-link" :href="withBase('/guide/')">阅读新手指南</a><a class="secondary-link" :href="withBase('/project/download.html')">下载与版本</a></div></div>
<a class="feature-dossier" :href="withBase('/weapons/p9-01.html')"><div class="dossier-top"><span>装备档案 / 001</span><span>9 × 19 mm</span></div><img :src="withBase('/images/p9-01.png')" alt="AFL 现有 P9-01 制式手枪物品图" width="256" height="256" /><div class="dossier-bottom"><div><p>原生枪械</p><h2>P9-01 <span>制式手枪</span></h2></div><span class="dossier-open" aria-label="阅读 P9-01 档案">↗</span></div><p class="image-source">游戏物品图 · 非实机截图</p></a></section>
<div class="build-strip"><span><small>游戏平台</small>Minecraft 1.20.1</span><span><small>加载器</small>Forge 47.4.22</span><span><small>开发版本</small>1.0.0-alpha</span><a :href="withBase('/project/status.html')"><small>阅读提示</small>查看内容状态说明 ↗</a></div>
<section id="wiki-sections" class="home-section"><div class="section-heading"><div><span class="eyebrow">FIELD GUIDE</span><h2>按系统查阅</h2></div><p>从你现在遇到的问题开始。</p></div><div class="category-grid"><a v-for="s in sections" :key="s[0]" :href="withBase(s[3])"><span class="card-no">{{s[0]}}</span><h3>{{s[1]}}</h3><p>{{s[2]}}</p><span class="card-link">浏览栏目 ↗</span></a></div></section>
<section class="reading-row"><div><span class="eyebrow">START READING</span><h2>先了解这些</h2><p>准备装备，也为下一段路留出余力。</p></div><nav aria-label="推荐阅读"><a :href="withBase('/survival/weight.html')"><span>负重</span><small>质量与负担有什么不同？</small><b aria-hidden="true">↗</b></a><a :href="withBase('/survival/stamina.html')"><span>耐力</span><small>冲刺、恢复与力竭</small><b aria-hidden="true">↗</b></a><a :href="withBase('/industry/crusher.html')"><span>粉碎机</span><small>输入、产物与能源需求</small><b aria-hidden="true">↗</b></a></nav></section>
<div class="edition-note"><span>开发版资料</span><p>本 Wiki 区分已验收、待验收和规划内容。开发版本号不代表公开发行；下载地址以项目确认的发布渠道为准。</p><a :href="withBase('/project/changelog.html')">查看更新记录 ↗</a></div>
</main></template>
