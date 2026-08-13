// SmBLog 静态博客构建脚本
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');
const yaml = require('js-yaml');

// 读取配置
const configPath = path.join(__dirname, '_config.yml');
const config = yaml.load(fs.readFileSync(configPath, 'utf-8'));
const base = config.base || '/';
const outputDir = path.resolve(__dirname, config.output_dir || './_site');
const author = config.author || '';
const siteTitle = config.title || 'SmBLog';

// 目录常量
const dirArticle = path.join(__dirname, 'WENZHANG');
const dirTalk = path.join(__dirname, 'TALK');
const dirSetting = path.join(__dirname, 'Setting');
const dirCss = path.join(__dirname, 'CSS');
const dirJs = path.join(__dirname, 'JS');

// 清空输出目录
if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true, force: true });
}
fs.mkdirSync(outputDir, { recursive: true });

// 复制静态资源目录
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const f of fs.readdirSync(src)) {
    const s = path.join(src, f);
    const d = path.join(dest, f);
    if (fs.statSync(s).isDirectory()) {
      copyDir(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}
copyDir(dirCss, path.join(outputDir, 'CSS'));
copyDir(dirJs, path.join(outputDir, 'JS'));

// 读取全局 head 片段
const globalHead = fs.readFileSync(path.join(dirSetting, 'head.html'), 'utf-8')
  .replaceAll('{{base}}', base);

// 读取模板
const indexTpl = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
const postTpl = fs.readFileSync(path.join(__dirname, 'post.html'), 'utf-8');
const pageTpl = fs.readFileSync(path.join(__dirname, 'page.html'), 'utf-8');
const archiveTpl = fs.readFileSync(path.join(__dirname, 'archive.html'), 'utf-8');

// ============================================
// 收集独立页面（根目录 md，头部含 ---Page---）
// ============================================
let pageList = [];
for (const f of fs.readdirSync(__dirname)) {
  if (!f.endsWith('.md')) continue;
  const filePath = path.join(__dirname, f);
  const raw = fs.readFileSync(filePath, 'utf-8');
  if (raw.startsWith('---Page---')) {
    const cleanRaw = raw.replace('---Page---', '').trim();
    const { data, content } = matter(cleanRaw);
    const slug = data.slug || path.basename(f, '.md');
    pageList.push({
      title: data.title || slug,
      slug: slug,
      content: marked.parse(content),
      data: data
    });
  }
}

// ============================================
// 收集文章 WENZHANG/
// ============================================
let postList = [];
if (fs.existsSync(dirArticle)) {
  for (const f of fs.readdirSync(dirArticle)) {
    if (!f.endsWith('.md')) continue;
    const filePath = path.join(dirArticle, f);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const dateStr = data.date || f.match(/(\d{4}-\d{2}-\d{2})/)?.[1] || '2026-01-01';
    const dt = new Date(dateStr);
    const slug = data.slug || path.basename(f, '.md').replace(/^\d{4}-\d{2}-\d{2}-/, '');
    const category = data.category || 'note';
    postList.push({
      title: data.title || slug,
      date: dt,
      category: category,
      slug: slug,
      content: marked.parse(content),
      desc: data.description || content.replace(/[#*`>\-]/g, '').slice(0, 80) + '...',
      data: data
    });
  }
}
postList.sort((a, b) => b.date.getTime() - a.date.getTime());

// ============================================
// 收集说说 TALK/
// ============================================
let talkList = [];
if (fs.existsSync(dirTalk)) {
  for (const f of fs.readdirSync(dirTalk)) {
    if (!f.endsWith('.md')) continue;
    const filePath = path.join(dirTalk, f);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const dateStr = data.date || f.match(/(\d{4}-\d{2}-\d{2})/)?.[1] || '2026-01-01';
    const dt = new Date(dateStr);
    const slug = data.slug || path.basename(f, '.md');
    talkList.push({
      title: data.title || '说说',
      date: dt,
      slug: slug,
      content: marked.parse(content),
      data: data
    });
  }
}
talkList.sort((a, b) => b.date.getTime() - a.date.getTime());

// ============================================
// 渲染导航
// ============================================
let navHtml = `<a class="nav-item" href="${base}index.html"><i class="fa-solid fa-house nav-icon"></i>首页</a>`;
for (const p of pageList) {
  navHtml += `<a class="nav-item" href="${base}${p.slug}.html">${p.title}</a>`;
}

// ============================================
// 渲染首页文章列表
// ============================================
let articleListHtml = '';
for (const p of postList.slice(0, 10)) {
  const y = p.date.getFullYear();
  const m = String(p.date.getMonth() + 1).padStart(2, '0');
  const d = String(p.date.getDate()).padStart(2, '0');
  const url = `${base}${p.category}/${y}/${m}/${d}/${p.slug}.html`;
  const dateStr = `${y}-${m}-${d}`;
  articleListHtml += `
    <div class="article-card">
      <a href="${url}">
        <span class="article-date"><i class="fa-regular fa-calendar"></i> ${dateStr}</span>
        <span class="article-title">${p.title}</span>
        <p class="article-desc">${p.desc}</p>
      </a>
    </div>`;
}

// ============================================
// 渲染首页说说列表
// ============================================
let talkListHtml = '';
for (const t of talkList.slice(0, 5)) {
  const y = t.date.getFullYear();
  const m = String(t.date.getMonth() + 1).padStart(2, '0');
  const d = String(t.date.getDate()).padStart(2, '0');
  const dateStr = `${y}-${m}-${d}`;
  const plainText = t.content.replace(/<[^>]+>/g, '').slice(0, 60) + '...';
  talkListHtml += `
    <div class="article-card">
      <span class="article-date"><i class="fa-regular fa-calendar"></i> ${dateStr}</span>
      <p class="article-desc">${plainText}</p>
    </div>`;
}

// ============================================
// 渲染归档页
// ============================================
let archiveHtml = '';
const yearMap = {};
for (const p of postList) {
  const y = p.date.getFullYear();
  if (!yearMap[y]) yearMap[y] = [];
  yearMap[y].push(p);
}
const years = Object.keys(yearMap).sort((a, b) => b - a);
for (const y of years) {
  const posts = yearMap[y];
  archiveHtml += `<div class="year-group">`;
  archiveHtml += `<div class="timeline-year">${y}<span class="year-count">${posts.length} 篇</span></div>`;
  archiveHtml += `<div class="timeline-posts">`;
  for (const p of posts) {
    const m = String(p.date.getMonth() + 1).padStart(2, '0');
    const d = String(p.date.getDate()).padStart(2, '0');
    const url = `${base}${p.category}/${y}/${m}/${d}/${p.slug}.html`;
    archiveHtml += `
      <div class="timeline-post">
        <span class="timeline-post-date">${m}-${d}</span>
        <a class="timeline-post-title" href="${url}">${p.title}</a>
      </div>`;
  }
  archiveHtml += `</div></div>`;
}

// ============================================
// 输出首页
// ============================================
let indexHtml = indexTpl
  .replaceAll('{{global_head}}', globalHead)
  .replaceAll('{{site_title}}', siteTitle)
  .replaceAll('{{base}}', base)
  .replaceAll('{{nav}}', navHtml)
  .replaceAll('{{article_list}}', articleListHtml)
  .replaceAll('{{talk_list}}', talkListHtml)
  .replaceAll('{{author}}', author);
fs.writeFileSync(path.join(outputDir, 'index.html'), indexHtml, 'utf-8');

// ============================================
// 输出归档页
// ============================================
let archivePageHtml = archiveTpl
  .replaceAll('{{global_head}}', globalHead)
  .replaceAll('{{site_title}}', siteTitle)
  .replaceAll('{{base}}', base)
  .replaceAll('{{nav}}', navHtml)
  .replaceAll('{{archive_content}}', archiveHtml)
  .replaceAll('{{author}}', author);
fs.writeFileSync(path.join(outputDir, 'archive.html'), archivePageHtml, 'utf-8');

// ============================================
// 输出独立页面
// ============================================
for (const p of pageList) {
  let html = pageTpl
    .replaceAll('{{global_head}}', globalHead)
    .replaceAll('{{site_title}}', siteTitle)
    .replaceAll('{{base}}', base)
    .replaceAll('{{nav}}', navHtml)
    .replaceAll('{{page_title}}', p.title)
    .replaceAll('{{page_content}}', p.content)
    .replaceAll('{{author}}', author);
  fs.writeFileSync(path.join(outputDir, `${p.slug}.html`), html, 'utf-8');
}

// ============================================
// 输出文章页（路径：/分类/YYYY/MM/DD/slug.html）
// ============================================
for (const p of postList) {
  const y = p.date.getFullYear();
  const m = String(p.date.getMonth() + 1).padStart(2, '0');
  const d = String(p.date.getDate()).padStart(2, '0');
  const outSub = path.join(outputDir, p.category, String(y), m, d);
  fs.mkdirSync(outSub, { recursive: true });

  const dateStr = `${y}-${m}-${d}`;
  let html = postTpl
    .replaceAll('{{global_head}}', globalHead)
    .replaceAll('{{site_title}}', siteTitle)
    .replaceAll('{{base}}', base)
    .replaceAll('{{nav}}', navHtml)
    .replaceAll('{{post_title}}', p.title)
    .replaceAll('{{post_date}}', dateStr)
    .replaceAll('{{post_content}}', p.content)
    .replaceAll('{{author}}', author);
  fs.writeFileSync(path.join(outSub, `${p.slug}.html`), html, 'utf-8');
}

// ============================================
// 输出 RSS
// ============================================
let rssItems = '';
for (const p of postList.slice(0, 20)) {
  const y = p.date.getFullYear();
  const m = String(p.date.getMonth() + 1).padStart(2, '0');
  const d = String(p.date.getDate()).padStart(2, '0');
  const url = `${base}${p.category}/${y}/${m}/${d}/${p.slug}.html`;
  rssItems += `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${url}</link>
      <pubDate>${p.date.toUTCString()}</pubDate>
      <description><![CDATA[${p.content}]]></description>
    </item>`;
}
const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${siteTitle}</title>
    <link>${base}</link>
    <description>${config.description || ''}</description>
    ${rssItems}
  </channel>
</rss>`;
fs.writeFileSync(path.join(outputDir, 'feed.xml'), rssXml, 'utf-8');

// ============================================
// 复制根目录静态文件（favicon 等）
// ============================================
for (const f of fs.readdirSync(__dirname)) {
  if (f.endsWith('.ico') || f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.svg')) {
    fs.copyFileSync(path.join(__dirname, f), path.join(outputDir, f));
  }
}

console.log('✅ SmBLog 构建完成！');
console.log(`📁 输出目录: ${outputDir}`);
console.log(`📝 文章数量: ${postList.length}`);
console.log(`💬 说说数量: ${talkList.length}`);
console.log(`📄 独立页面: ${pageList.length}`);
