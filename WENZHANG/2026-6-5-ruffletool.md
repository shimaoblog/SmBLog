---
layout: post
title: Ruffle
date: 2026-06-5
categories: 工具
tags: [互联网文化]
excerpt: Ruffle的玩法 和杂七杂八
hero_image: https://img.cdn1.vip/i/6a22bce0deb4f_1780661472.webp
---
图片来自**gledos的博客**
我也不知道怎么是这个样子 将就看吧
# 前言
不知道什么时候起 著名的Flash网站[蜡笔X](http://Labix.net)居然可以原生播放flash了  
右键了一下调出了Ruffle菜单这个东西  
我上网查了下 得到了以下信息

# 这是什么
[Ruffle官网](https://ruffle.rs)
Ruffle是一个开源的Flash Player模拟器
> Ruffle设计为所有现代操作系统和浏览器原生运行，能让Flash内容焕发生机，无需额外繁琐。

- 安全使用——借助Rust和WASM的保证，我们避免了Flash著名的安全陷阱。
- 安装简便——无论您是用户还是网站所有者，我们都尽力让您轻松上手。
- 免费开源——授权的MIT/Apache 2.0，你可以随意使用Ruffle！

 # 刨坟指南
我最推荐的办法就是安装**浏览器插件**  


  
当然你还可以
- 下载桌面应用
# 你的Flash网站
之前发布过一篇叫
> 旧YouTube复兴网站Archive

的文章
里面有些网站就是又Ruffle驱动的  
那么 你该怎么使用呢?  
在你网站的head里插入这个代码
`<script src="https://unpkg.com/@ruffle-rs/ruffle"></script>`  
就可以播放Flsh的文件了(.SWF)
# OtherInfo
- Internet Archive就内置Ruffle
- Labix使用Ruffle让网站兼容浏览器
- Flash的文件格式为.swf
