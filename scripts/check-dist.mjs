import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const base=process.env.WIKI_BASE || '/';
assert(base.startsWith('/') && base.endsWith('/'), 'WIKI_BASE must start and end with /');
const root=path.resolve('content/.vitepress/dist');assert(fs.existsSync(root),'Build first');
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
const files=walk(root);const html=files.filter(f=>f.endsWith('.html'));
for(const file of html){
 const s=fs.readFileSync(file,'utf8');assert(s.includes('<title>'),file);
 assert(!/internal[_ -]only|do[_ -]not[_ -]publish|source-audit|src\/main\/java|[A-Z]:\\Users/.test(s),'Private material leaked '+file);
 const ids=new Set([...s.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
 for(const m of s.matchAll(/\b(?:href|src)="([^"]+)"/g)){
  const href=m[1];if(/^(https?:|data:|mailto:|javascript:)/.test(href))continue;
  const [url,anchor]=href.split('#');
  if(!url){if(anchor)assert(ids.has(decodeURIComponent(anchor)),'Missing anchor '+href+' in '+file);continue;}
  if(url.startsWith('/')) assert(url.startsWith(base), 'Link outside deployment base '+href);
  const local=url.startsWith('/')?url.slice(base.length):url;
  let dest=url.startsWith('/')?path.join(root,local):path.resolve(path.dirname(file),local);
  dest=dest.split('?')[0];if(url.endsWith('/'))dest=path.join(dest,'index.html');
  if(!fs.existsSync(dest)&&!path.extname(dest))dest+='.html';
  assert(fs.existsSync(dest),'Missing built target '+href+' in '+file);
 }
}
assert(files.some(f=>/@localSearchIndexroot/.test(f)),'Local search index missing');
assert(!files.some(f=>/maintenance|templates|source-audit/.test(path.relative(root,f))),'Non-public material shipped');
console.log(`DIST_PASS: ${html.length} HTML files, local references, anchors, search index, public-only export.`);
