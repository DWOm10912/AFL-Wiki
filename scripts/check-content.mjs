import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { parse } from 'yaml';
function matter(raw) { const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/); assert(match, 'Missing frontmatter'); return { data: parse(match[1]), content: raw.slice(match[0].length) }; }
const root=path.resolve('content');
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).filter(e=>!e.name.startsWith('.')).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
const pages=walk(root).filter(f=>f.endsWith('.md'));
const statuses=new Set(['tested','implemented','planned','retired','draft','index']);
const forbidden=[/internal[_ -]only|do[_ -]not[_ -]publish/i,/[A-Z]:[\\/](Users|Minecraft Modding)/,/\b(?:password|api[_-]?key)\s*[:=]/i];
function target(href,source){
 if(/^(https?:|mailto:|#)/.test(href))return;
 let p=decodeURIComponent(href.split('#')[0].split('?')[0]);if(!p)return;
 let dest=p.startsWith('/')?path.join(root,p):path.resolve(path.dirname(source),p);
 if(/\.(png|jpe?g|svg|webp)$/.test(p)){if(p.startsWith('/'))dest=path.join(root,'public',p);assert(fs.existsSync(dest),'Missing image '+p);return;}
 dest=dest.endsWith(path.sep)||p.endsWith('/')?path.join(dest,'index.md'):dest.replace(/\.html$/,'.md');
 if(!path.extname(dest))dest+='.md';
 assert(fs.existsSync(dest),`Broken link ${href} in ${source}`);
}
for(const file of pages){
 const raw=fs.readFileSync(file,'utf8'),{data,content}=matter(raw);
 assert(data.title&&data.description,`Missing metadata ${file}`);
 if(!file.endsWith(path.sep+'index.md')||data.status)assert(statuses.has(data.status),'Bad status '+file);
 for(const re of forbidden)assert(!re.test(raw),'Internal/private content in '+file);
 for(const match of content.matchAll(/\]\(([^)]+)\)/g))target(match[1],file);
 for(const card of data.cards||[])target(card.link,file);
 if(data.record){assert(['weapon','machine'].includes(data.record.kind));assert(data.record.id.startsWith('apocalypse_firstlight:'));assert(data.record.fields.length>=5);if(data.record.image)target(data.record.image,file);}
}
const p9=matter(fs.readFileSync('content/weapons/p9-01.md','utf8')).data;
assert(p9.record.fields.some(f=>f.label==='基础弹匣容量'&&f.value==='17 发'));
const br=matter(fs.readFileSync('content/weapons/br-51.md','utf8')).data;
assert(br.record.fields.some(f=>f.label==='基础伤害'&&f.value==='18 点'));
assert.equal(matter(fs.readFileSync('content/survival/stamina.md','utf8')).data.status,'tested');
const deps=JSON.parse(fs.readFileSync('package.json','utf8'));assert.equal(deps.private,true);
console.log(`CONTENT_PASS: ${pages.length} pages; links, status, images, template fields and public-content boundary checked.`);
