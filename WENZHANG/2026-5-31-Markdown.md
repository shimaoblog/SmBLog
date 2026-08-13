---
layout: post
title: Markdown
date: 2026-01-23
categories: 教程
tags: [自用,Markdown,教程]
excerpt: 喵
---

# 闲话

转到**Jekyll**后我就必须要学Markdown了

有人会问 我之前用的Typecho不也是md编辑器吗

对于这个问题 我一般都是用HTML写的

# 文件

Markdown文件有两种后缀

- .md
- .markdown

我们一般使用第一种

# 常见

粗体是两个

`**`

斜体是一个

`*`

标题有六种

---

# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

> 注意 #号后面要有空格

# 进阶

这是被划掉的内容

`~~被划掉的文字~~`

效果

~~被划掉的文字~~

---

这是引用

`> 引用内容`

效果

> 引用内容

---

无序列表

```md
- 第一项
- 第二项
- 第三项
```

效果

- 第一项
- 第二项
- 第三项

---

有序列表

```md
1. 第一项
2. 第二项
3. 第三项
```

效果

1. 第一项
2. 第二项
3. 第三项

---

插入链接

```md
[百度](https://www.baidu.com)
```

效果

[百度](https://www.baidu.com)

---

插入图片

```md
![图片描述](图片链接)
```

这个以后再说

我也懒得找图

---

行内代码

```md
`Hello World`
```

效果

`Hello World`

---

代码块

````md
```cpp
#include <iostream>

int main()
{
    std::cout << "Hello World";
    return 0;
}
``````
