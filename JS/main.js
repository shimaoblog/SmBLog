// SmBLog 前端交互
(function(){
  // 暗色主题切换
  const toggleBtn = document.querySelector('.theme-toggle');
  const icon = toggleBtn ? toggleBtn.querySelector('i') : null;

  function applyTheme(mode){
    if(mode === 'dark'){
      document.body.classList.add('dark');
      if(icon){ icon.className = 'fa-solid fa-sun'; }
    }else{
      document.body.classList.remove('dark');
      if(icon){ icon.className = 'fa-solid fa-moon'; }
    }
    localStorage.setItem('smblog-theme', mode);
  }

  // 初始化
  let saved = localStorage.getItem('smblog-theme') || 'light';
  applyTheme(saved);

  if(toggleBtn){
    toggleBtn.addEventListener('click', function(){
      let now = document.body.classList.contains('dark') ? 'light' : 'dark';
      applyTheme(now);
    });
  }

  // 导航高亮当前页
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-item').forEach(function(item){
    if(item.getAttribute('href') === currentPath || item.getAttribute('href') === currentPath.replace(/\/$/, '/index.html')){
      item.classList.add('selected');
    }
  });
})();
