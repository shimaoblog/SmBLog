# SmBLog

极简静态博客生成器，基于 Node.js + GitHub Pages。

## 目录结构

```
├─ CSS/              # 样式文件
├─ JS/               # 脚本文件
├─ WENZHANG/         # 文章（xxxx-x-x-xxx.md）
├─ TALK/             # 说说（xxxx-x-x-xx.md）
├─ Setting/
│  └─ head.html      # 全局 <head> 片段
├─ build.js          # 构建脚本
├─ _config.yml       # 站点配置
└─ .github/workflows/deploy.yml  # 自动部署
```

## 使用方法

1. 修改 `_config.yml` 配置站点信息
2. 在 `WENZHANG/` 放文章，命名格式：`2026-08-13-文章标题.md`
3. 在 `TALK/` 放说说，命名格式：`2026-08-13-说说标题.md`
4. 根目录创建 `.md` 文件，开头写 `---Page---` 自动加入导航栏

## 文章 Front Matter

```yaml
---
title: 文章标题
date: 2026-08-13
category: 技术
description: 文章摘要
---
```

## 本地构建

```bash
npm install
npm run build
```

输出到 `_site/` 目录。

## 部署到 GitHub Pages

1. 仓库 Settings → Pages → Source 选 "GitHub Actions"
2. 推送到 main 分支自动构建部署
3. 访问地址：`https://你的用户名.github.io/仓库名/`

## 文章路径格式

`/分类/年/月/日/文件名.html`

例如：`/技术/2026/08/13/hello-world.html`

## Feed
JSON Feed: `/feed.json`
XML: `/feed.xml`
