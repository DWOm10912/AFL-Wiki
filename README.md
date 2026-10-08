# AFL 官方网页 Wiki V1

独立 VitePress 1.6.4 + Vue 3.5 网站；中文优先，Markdown 内容，浏览器本地全文搜索。

源码仓库：[DWOm10912/AFL-Wiki](https://github.com/DWOm10912/AFL-Wiki)，默认开发分支为`main`。网站可在本地预览和静态构建，不需要后端数据库；尚未部署公开网站。

## 本地运行

使用 Node.js 22或更高版本（本轮验证环境24.19.0）：

```powershell
git clone https://github.com/DWOm10912/AFL-Wiki.git
cd AFL-Wiki
npm ci
npm run dev
```

已有本地检出时，直接在项目目录执行`npm ci`与`npm run dev`即可。

打开终端给出的 `http://127.0.0.1:5173/`。固定端口占用会明确失败，不偷偷切换到不确定地址。依赖全部在本目录，不在 Forge 项目。

## 验证与静态构建

```powershell
npm run check
npm run build
npm run check:dist
npm run preview
```

构建输出：`content/.vitepress/dist`；预览默认 `http://127.0.0.1:4173/`。输出可以直接交给静态服务器，不需要Node服务器或数据库。正常开发无需任何Forge任务。

## 目录

- `content/`：唯一网站内容根，33个页面；英文保留`en/`。
- `content/.vitepress/config.mts`：导航、侧栏、locale、本地搜索、站点配置。
- `content/.vitepress/theme/`：品牌主题和Vue组件。
- `content/public/images/`：只放准许公开、实际使用的图片。
- `templates/`：武器、机器、机制Markdown模板，不参与站点构建。
- `scripts/`：内容与静态产物检查，不操作游戏仓库。

## 新增条目

1. 复制`templates/weapon.md`或`machine.md`到对应`content/`分类；填写frontmatter和正文。
2. 属性卡通过`record.fields`自动排版。没有图片时保留明确占位，不造截图。
3. 为每页指定status：tested / implemented / planned / retired / draft / index；只有明确实机证据才用tested。
4. 在`config.mts`对应侧栏加入路由，并在相关栏目index的cards中加入链接。现有内容frontmatter使用JSON格式（合法YAML），模板使用YAML，两者都可编辑。
5. 运行内容检查、构建和产物检查。更新核对日期及维护用来源记录；不要把内部文档整包复制到content。

全文搜索在启动预览和静态构建时索引Markdown标题与正文。当前VitePress 1.6开发预览的搜索索引不会可靠地随Markdown热更新；编辑内容后，若需要立即检查新搜索结果，请在运行`npm run dev`的终端按Ctrl+C并重新执行该命令。页面正文的热更新不等于搜索索引已经刷新。中文分词在本地进行，不依赖搜索SaaS或上传查询。自定义资料卡中的重要参数也应在Markdown正文表格中记录，以进入索引并保持无JavaScript可读性。

## 英文扩展

现有`/en/`为明确未翻译入口。以后把对应条目放到`content/en/...`，逐步配置英文nav/sidebar及标签。当前`i18nRouting: false`让语言切换进入各语言首页，避免未翻译条目404；完整对照翻译就绪后再启用对应页跳转。不要把中文页面假装成英文翻译完成。

## 可选静态部署（尚未部署）

可使用GitHub Pages、Cloudflare Pages、Netlify或自有Nginx，仅部署`content/.vitepress/dist`。不上传源码审查记录、node_modules或整个仓库。

- 域名根目录：默认base `/`，保持`.html`文件路由。
- GitHub项目子路径：构建前设置环境变量，例如 `$env:WIKI_BASE='/afl-wiki/'`，然后`npm run build`；图片和导航通过withBase跟随前缀。更换base后重新构建，不能只移动旧产物。
- 预览本轮根路径后再安排目标托管的子路径检查。`check:dist`使用同一个`WIKI_BASE`检查产物链接。已验证根路径与`/afl-wiki/`子路径的构建和链接，实际托管配置仍需发布时验收。
- 不需要SPA回退；站点为多页静态HTML。404.html由VitePress生成。
- 暂无实际下载URL、正式Bug反馈URL或生产域名。确认后再更新项目页面；不要使用虚假地址。
- 不配置自动部署workflow，所有发布动作等待项目负责人另行批准。

VitePress官方部署说明：https://vitepress.dev/guide/deploy

## 内容与资产

复用原项目badge及两张枪械物品图，明确标注物品图而非实机截图。机器图、正式横幅、世界截图待补。未发布的地图、内部调试命令、任务记录不进入网站。

当前`1.0.0-alpha`来自开发版本配置，不能当成正式发行公告。耐力V1仅按明确记录标为已实机验收；其余示例保守区分已实现待验收、规划与待核实。

## 工具链维护

保持VitePress稳定版1.6.4；`overrides.vite`固定为6.4.4，避开旧Vite5在开发服务器上的已知问题。此覆盖组合已通过本轮开发预览和静态构建；升级VitePress时重新确认是否仍需要覆盖。`package-lock.json`用于可重复安装，前置内容解析使用yaml 2.9.1。本轮`npm audit`为0项已知漏洞，该结果只代表检查时的软件包公告状态。

开发专用的`afl-search-hmr-compat`只解析VitePress现有的`/@localSearchIndex`虚拟模块路径，消除Vite 6解析警告，不改变构建格式，也不承诺搜索索引热更新。开发文件监听忽略构建输出目录，避免构建时反复刷新预览。

## 仓库范围

仓库包含README、网站源码、33个Markdown页面、3张现有项目图片、页面模板、检查脚本和锁定的构建依赖配置。`node_modules`、构建产物、本地缓存、日志、环境变量文件和本地维护记录均由`.gitignore`排除。

本仓库独立于Minecraft模组，不包含模组Java源码、世界存档或开发工具。代码推送不等于网站部署；没有配置自动部署工作流。
