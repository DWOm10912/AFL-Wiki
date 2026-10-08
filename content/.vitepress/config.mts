import { defineConfig } from 'vitepress'
const sections = [
  { text: '新手指南', items: [{ text: '从这里开始', link: '/guide/' }, { text: '游戏基础', link: '/guide/basics' }, { text: '常见操作', link: '/guide/controls' }] },
  { text: '武器装备', items: [{ text: '装备索引', link: '/weapons/' }, { text: 'P9-01 制式手枪', link: '/weapons/p9-01' }, { text: 'BR-51 战斗步枪', link: '/weapons/br-51' }, { text: '弹药', link: '/weapons/ammunition' }, { text: '枪械配件', link: '/weapons/attachments' }, { text: '武器属性', link: '/weapons/attributes' }] },
  { text: '生存系统', items: [{ text: '生存概览', link: '/survival/' }, { text: '负重', link: '/survival/weight' }, { text: '耐力', link: '/survival/stamina' }, { text: '口渴', link: '/survival/thirst' }, { text: '体温', link: '/survival/temperature' }, { text: '辐射', link: '/survival/radiation' }] },
  { text: '工业系统', items: [{ text: '工业概览', link: '/industry/' }, { text: '机器', link: '/industry/machines' }, { text: '粉碎机', link: '/industry/crusher' }, { text: '材料', link: '/industry/materials' }, { text: '能源', link: '/industry/energy' }, { text: '配方', link: '/industry/recipes' }] },
  { text: '世界与探索', items: [{ text: '探索索引', link: '/world/' }, { text: '哥伦比亚联邦', link: '/world/columbia' }, { text: '地貌', link: '/world/terrain' }, { text: '生物', link: '/world/creatures' }, { text: '建筑与设施', link: '/world/structures' }] },
  { text: '项目', items: [{ text: '下载与版本', link: '/project/download' }, { text: '更新日志', link: '/project/changelog' }, { text: '常见问题', link: '/project/faq' }, { text: 'Bug 反馈', link: '/project/feedback' }, { text: '内容状态说明', link: '/project/status' }] }
]
export default defineConfig({
  title: 'AFL Wiki', description: '黎明启示录玩家 Wiki：原创枪械、生存机制、现代工业与世界探索。',
  lang: 'zh-CN', appearance: 'dark', base: process.env.WIKI_BASE || '/', cleanUrls: false,
  head: [['link', { rel: 'icon', type: 'image/png', href: `${process.env.WIKI_BASE || '/'}images/afl-badge.png` }]],
  locales: { root: { label: '简体中文', lang: 'zh-CN' }, en: { label: 'English', lang: 'en', link: '/en/', themeConfig: { nav: [{ text: '中文 Wiki', link: '/' }], sidebar: [], outlineTitle: 'On this page' } } },
  themeConfig: {
    logo: '/images/afl-badge.png', siteTitle: 'AFL / WIKI', i18nRouting: false,
    nav: [{ text: '新手指南', link: '/guide/' }, { text: '系统资料', items: sections.slice(1,5).map(s=>({text:s.text, link:s.items[0].link})) }, { text: '项目', items: sections[5].items }],
    sidebar: { '/': sections.map(s=>({...s, collapsed: false})), '/en/': [] },
    outline: { level: [2,3], label: '本页目录' }, sidebarMenuLabel: '栏目导航', returnToTopLabel: '返回顶部',
    darkModeSwitchLabel: '切换深色主题', darkModeSwitchTitle: '切换到深色', lightModeSwitchTitle: '切换到浅色',
    docFooter: { prev: '上一篇', next: '下一篇' }, langMenuLabel: '选择语言',
    search: { provider: 'local', options: { detailedView: true, locales: { root: { translations: { button: { buttonText: '搜索 Wiki', buttonAriaLabel: '搜索 Wiki' }, modal: { displayDetails: '显示详细内容', resetButtonTitle: '清空搜索', backButtonTitle: '关闭搜索', noResultsText: '没有找到相关词条', footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' } } } } },
      miniSearch: { options: { tokenize: (text) => { const parts = text.toLowerCase().match(/[a-z0-9]+|[\u3400-\u9fff]+/g) || []; return parts.flatMap(p => /[\u3400-\u9fff]/.test(p) ? [p, ...p, ...Array.from({length: Math.max(0,p.length-1)},(_,i)=>p.slice(i,i+2))] : [p]); } }, searchOptions: { prefix: true, fuzzy: 0.2 } }
    } },
    footer: { message: 'APOCALYPSE: FIRST LIGHT · 黎明启示录', copyright: 'AFL 项目内容与图片归原作者所有。非 Mojang 或 Microsoft 官方产品。' }
  }
})
