(function(){
  const overlay = document.createElement('div');
  overlay.className = "lightbox-overlay";
  overlay.innerHTML = `
    <div class="lightbox-wrap">
      <button class="lb-btn lb-close">&times;</button>
      <button class="lb-btn lb-prev">&lsaquo;</button>
      <button class="lb-btn lb-next">&rsaquo;</button>
      <div class="lightbox-img-container">
        <img class="lightbox-img">
      </div>
      <div class="lb-info-bar">
        <div class="lb-count"></div>
        <div class="lb-caption"></div>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  const lbImg = overlay.querySelector('.lightbox-img');
  const lbClose = overlay.querySelector('.lb-close');
  const lbPrev = overlay.querySelector('.lb-prev');
  const lbNext = overlay.querySelector('.lb-next');
  const lbCount = overlay.querySelector('.lb-count');
  const lbCaption = overlay.querySelector('.lb-caption');

  let imgList = [];
  let currentIdx = 0;
  let zoomScale = 1;
  let dragX=0,dragY=0,isDrag=false,startX=0,startY=0,imgOriginX=0,imgOriginY=0;

  // 收集当前文章内全部图片
  function refreshImageList(){
    imgList = Array.from(document.querySelectorAll('main article img'));
    imgList.forEach((img,idx)=>{
      img.style.cursor='zoom‑in';
      img.onclick=(e)=>{
        e.preventDefault();
        openLightbox(idx);
      }
    })
  }

  function openLightbox(idx){
    currentIdx=idx; zoomScale=1; resetImgPos();
    const src = imgList[currentIdx].src;
    const altText = imgList[currentIdx].alt || "";
    lbImg.src = src;
    lbCaption.innerText = altText;
    lbCount.innerText = `${currentIdx+1} / ${imgList.length}`;
    overlay.classList.add('active');
    document.body.style.overflow='hidden';
  }
  function closeLightbox(){
    overlay.classList.remove('active');
    document.body.style.overflow='';
  }
  function prevImg(){
    if(imgList.length<=1) return;
    currentIdx = (currentIdx‑1+imgList.length)%imgList.length;
    zoomScale=1; resetImgPos();
    lbImg.src=imgList[currentIdx].src;
    lbCaption.innerText=imgList[currentIdx].alt||"";
    lbCount.innerText=`${currentIdx+1} / ${imgList.length}`;
  }
  function nextImg(){
    if(imgList.length<=1) return;
    currentIdx=(currentIdx+1)%imgList.length;
    zoomScale=1; resetImgPos();
    lbImg.src=imgList[currentIdx].src;
    lbCaption.innerText=imgList[currentIdx].alt||"";
    lbCount.innerText=`${currentIdx+1} / ${imgList.length}`;
  }
  function resetImgPos(){
    dragX=0; dragY=0;
    lbImg.style.transform=`translate(${dragX}px,${dragY}px) scale(${zoomScale})`;
  }

  // 滚轮缩放
  overlay.addEventListener('wheel',(e)=>{
    if(!overlay.classList.contains('active')) return;
    e.preventDefault();
    if(e.deltaY<0) zoomScale = Math.min(zoomScale*1.25,4);
    else zoomScale = Math.max(zoomScale/1.25,1);
    lbImg.style.transform=`translate(${dragX}px,${dragY}px) scale(${zoomScale})`;
  },{passive:false})

  // 拖拽平移
  lbImg.addEventListener('mousedown',(e)=>{
    if(zoomScale<=1) return;
    isDrag=true;
    startX=e.clientX; startY=e.clientY;
    imgOriginX=dragX; imgOriginY=dragY;
  })
  window.addEventListener('mousemove',(e)=>{
    if(!isDrag) return;
    dragX = imgOriginX + (e.clientX‑startX);
    dragY = imgOriginY + (e.clientY‑startY);
    lbImg.style.transform=`translate(${dragX}px,${dragY}px) scale(${zoomScale})`;
  })
  window.addEventListener('mouseup',()=>isDrag=false)

  // 键盘快捷键
  window.addEventListener('keydown',(e)=>{
    if(!overlay.classList.contains('active')) return;
    if(e.key==='Escape') closeLightbox();
    if(e.key==='ArrowLeft') prevImg();
    if(e.key==='ArrowRight') nextImg();
  })

  lbClose.onclick = closeLightbox;
  lbPrev.onclick = prevImg;
  lbNext.onclick = nextImg;
  overlay.onclick = (e)=>{if(e.target===overlay) closeLightbox();}

  // DOM加载完成抓取图片；SmBLog异步渲染文章后也要重新抓取
  document.addEventListener('DOMContentLoaded',refreshImageList);
  window.refreshLightboxList = refreshImageList;
})();
