---
layout: post          
title: "一些博客组件"
date: 2026-08-3      
categories: 技术       
tags: [其他] 
excerpt: "自用，也许对你们也有点用。"   
---
大概可能是我自己以后会用的。
# 时间流逝
```html
<div class="progress-wrapper" style="padding: 0">
<div class="progress-info">
<div class="progress-label">
<span id="yearprogress_yearname"></span>
</div>
<div id="yearprogress_text_container" class="progress-percentage">
<span id="yearprogress_progresstext"></span>
<span id="yearprogress_progresstext_full"></span>
</div>
</div>
<div class="progress">
<div id="yearprogress_progressbar" class="progress-bar bg-primary"></div>
</div>
</div>
<script no-pjax="">
function yearprogress_refresh() {
let year = new Date().getFullYear();
$("#yearprogress_yearname").text(year);
let from = new Date(year, 0, 1, 0, 0, 0);
let to = new Date(year, 11, 31, 23, 59, 59);
let now = new Date();
let progress = (((now - from) / (to - from + 1)) * 100).toFixed(7);
let progressshort = (((now - from) / (to - from + 1)) * 100).toFixed(2);
$("#yearprogress_progresstext").text(progressshort + "%");
$("#yearprogress_progresstext_full").text(progress + "%");
$("#yearprogress_progressbar").css("width", progress + "%");
}
yearprogress_refresh();
if (typeof yearProgressIntervalHasSet == "undefined") {
var yearProgressIntervalHasSet = true;
setInterval(function () {
yearprogress_refresh();
}, 500);
}
</script>
<style>
#yearprogress_text_container {
width: 100%;
height: 22px;
overflow: hidden;
user-select: none;
}
#yearprogress_text_container > span {
transition: all 0.3s ease;
display: block;
}
#yearprogress_text_container:hover > span {
transform: translateY(-45px);
}
</style>
```

# Music
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css">
<script src="https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/meting@2.0.1/dist/Meting.min.js"></script>
 <meting-js 
    server="netease" 
    type="playlist" 
    id="7360465359"
    fixed="true" 
    mini="true"
    order="random"
    loop="all"
    preload="auto"
    list-folded="false">
</meting-js>
```

# Live2D

```html
<script src="https://eqcn.ajz.miesnfu.com/wp-content/plugins/wp-3d-pony/live2dw/lib/L2Dwidget.min.js"></script>
<script>
    L2Dwidget.init({
        "model": {
　　　　　　　//jsonpath控制显示那个小萝莉模型，
            //(切换模型需要改动)
//              "https://unpkg.com/(live2d-widget-model-koharu)@1.0.5/assets/(koharu).model.json"
            jsonPath: "https://unpkg.com/live2d-widget-model-koharu@1.0.5/assets/koharu.model.json",
            "scale": 1
            },
        "display": {
            "position": "right", //看板娘的表现位置
            "width": 75,  //小萝莉的宽度
            "height": 150, //小萝莉的高度
            "hOffset": 0,
            "vOffset": -20
        },
        "mobile": {
            "show": true,
            "scale": 0.5
        },
        "react": {
            "opacityDefault": 0.7,
            "opacityOnHover": 0.2
        }
    });
</script>
```


