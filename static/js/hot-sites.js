// 热门站点图标 - 火焰图标的SVG路径
const HOT_SITES_ICON_PATH = "M11.228 1.945c-.123-.103-.32-.103-.552-.103-.573 0-1.359.243-2.320.722-.96.48-1.726 1.039-2.299 1.683-.531.583-.972 1.258-1.298 2.022-.327.764-.532 1.488-.573 2.164-.04.675.082 1.253.368 1.724.286.471.697.778 1.209.879.532.1 1.053.05 1.564-.151.512-.204.9-.46 1.135-.781.266-.368.43-.737.43-1.1 0-.328-.143-.727-.389-1.156-.246-.43-.449-.665-.613-.665-.163 0-.266.092-.266.235 0 .163.02.285.06.368.042.081.103.204.165.327.102.143.163.306.204.46.061.307.041.604-.081.911a1.294 1.294 0 0 1-.675.645c-.308.144-.635.144-.982.021-.348-.143-.573-.43-.675-.85-.144-.485-.144-1.03-.02-1.6.122-.574.367-1.148.675-1.703.327-.614.736-1.187 1.248-1.683.491-.511 1.024-.92 1.595-1.228A3.89 3.89 0 0 1 9.46 2.257c.389-.02.696.5.92.225.225.184.348.43.389.738.041.286-.02.593-.163.9a2.212 2.212 0 0 1-.593.777c-.245.205-.522.328-.84.43-.327.123-.594.224-.84.307-.245.082-.409.204-.47.388-.063.184-.042.368.08.532.123.143.307.245.552.327.245.081.532.102.86.061.45-.061.838-.184 1.166-.368.327-.183.614-.42.84-.685.246-.266.43-.573.573-.92.143-.348.245-.686.245-1.015.02-.327-.04-.675-.163-1.002-.184-.308-.43-.533-.798-.695zm-7.004 7.65c-.246.409-.471.8-.717 1.168-.225.368-.43.696-.593.972-.358.591-.619 1.066-.747 1.394-.207.532-.166.993.12 1.394.144.184.329.267.573.267.245 0 .532-.083.84-.226.306-.165.593-.349.88-.573.265-.266.511-.553.736-.86.225-.306.43-.613.593-.9l.798-1.374a4.05 4.05 0 0 1-.634-.142 1.862 1.862 0 0 1-.88-.532 1.564 1.564 0 0 1-.45-.797 1.09 1.09 0 0 1-.041-.42c.02-.143.061-.266.1-.368l-.578-.003z";

// 内联热门站点数据 - 这只是备用测试数据，实际数据应从服务器获取
const HOT_SITES_DATA = [
  {
    "name": "Gmeek增强版本使用教学",
    "url": "https://github.com",
    "hot": 95
  },
  {
    "name": "Stack Overflow",
    "url": "https://stackoverflow.com",
    "hot": 90
  },
  {
    "name": "掘金",
    "url": "https://juejin.cn",
    "hot": 85
  },
  {
    "name": "CSDN",
    "url": "https://www.csdn.net",
    "hot": 80
  },
  {
    "name": "InfoQ",
    "url": "https://www.infoq.cn",
    "hot": 75
  },
  {
    "name": "知乎",
    "url": "https://www.zhihu.com",
    "hot": 70
  },
  {
    "name": "V2EX",
    "url": "https://www.v2ex.com",
    "hot": 65
  },
  {
    "name": "博客园",
    "url": "https://www.cnblogs.com",
    "hot": 60
  }
];

// 全局变量，用于存储从服务器获取的热门站点数据
let hotSitesData = null;

// 在页面加载完成时初始化
console.log("热门站点脚本已加载");

// 初始化热门站点功能
function initHotSites() {
    console.log("初始化热门功能");
    
    // 先从服务器获取热门站点数据
    fetchHotSitesData()
        .then(data => {
            // 设置全局变量
            hotSitesData = data;
            
            // 检查数据有效性
            if (checkHotSitesData(hotSitesData)) {
                // 数据有效，创建DOM元素
                createHotSitesElements();
                
                // 渲染热门站点
                renderHotSites(hotSitesData);
                
                // 添加响应式处理
                setupResponsiveBehavior();
                
                // 添加主题变化监听
                setupThemeChangeListener();
                
                // 延迟更新热门按钮位置
                setTimeout(() => {
                    updateHotSitesButtonPosition();
                }, 500);
            } else {
                console.log("热门数据为空或无效，不创建热门元素");
            }
        })
        .catch(error => {
            console.error("获取热门数据失败:", error);
            console.log("尝试使用备用数据");
            
            // 尝试使用备用数据
            if (checkHotSitesData(HOT_SITES_DATA)) {
                hotSitesData = HOT_SITES_DATA;
                createHotSitesElements();
                renderHotSites(hotSitesData);
                setupResponsiveBehavior();
                setupThemeChangeListener();
                setTimeout(() => {
                    updateHotSitesButtonPosition();
                }, 500);
            } else {
                console.log("备用数据也无效，不创建热门元素");
            }
        });
}

// 从服务器获取热门站点数据
function fetchHotSitesData() {
    return new Promise((resolve, reject) => {
        console.log("从服务器获取热门站点数据");
        
        // 根据当前环境决定数据获取方式
        if (window.location.protocol === 'file:') {
            console.log('本地文件系统环境，使用备用数据');
            // 本地文件系统环境下，使用备用数据
            resolve(HOT_SITES_DATA);
            return;
        }
        
        // 网络环境下，尝试从服务器获取数据
        fetch('./config/hot_site.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`获取热门站点数据失败: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('成功获取热门站点数据:', data);
                resolve(data);
            })
            .catch(error => {
                console.error('获取热门站点数据错误:', error);
                reject(error);
            });
    });
}

// 检查热门站点数据是否有效
function checkHotSitesData(data) {
    // 检查数据是否有效
    if (!Array.isArray(data) || data.length === 0) {
        console.log("热门站点数据为空或无效");
        return false;
    }
    
    // 确保数据中至少有一个有效的站点（包含name和url）
    const validSites = data.filter(site => site && site.name && site.url);
    if (validSites.length === 0) {
        console.log("热门站点数据中没有有效站点");
        return false;
    }
    
    console.log(`热门站点数据有效，共${validSites.length}个站点`);
    return true;
}

// 创建热门站点DOM元素
function createHotSitesElements() {
    console.log("创建热门站点DOM元素");
    
    // 创建左侧热门站点面板
    createLeftSideHotSites();
    
    // 添加收起/展开按钮 - 用于移动设备
    createToggleButton();
    
    // 添加CSS样式
    addHotSitesStyles();
}

// 创建左侧热门站点面板
function createLeftSideHotSites() {
    console.log("创建左侧热门面板");
    
    // 查找body元素，我们将直接添加到body中，避免干扰现有布局
    const body = document.body;
    if (!body) {
        console.error('无法找到body元素');
        return;
    }
    
    // 如果已存在热门容器，则不重复创建
    if (document.getElementById('hotSitesPanel')) {
        console.log('热门面板已存在');
        return;
    }
    
    // 创建左侧面板容器
    const leftPanel = document.createElement('div');
    leftPanel.id = 'hotSitesPanel';
    leftPanel.className = 'hot-sites-panel';
    
    // 创建面板标题
    const titleContainer = document.createElement('div');
    titleContainer.className = 'hot-sites-header';
    
    const titleIcon = document.createElement('svg');
    titleIcon.className = 'octicon hot-sites-icon';
    titleIcon.setAttribute('width', '16');
    titleIcon.setAttribute('height', '16');
    titleIcon.setAttribute('viewBox', '0 0 16 16');
    
    const iconPath = document.createElement('path');
    iconPath.setAttribute('d', HOT_SITES_ICON_PATH);
    iconPath.setAttribute('fill-rule', 'evenodd');
    
    titleIcon.appendChild(iconPath);
    
    const titleText = document.createElement('span');
    titleText.textContent = '热门';
    
    const titleBadge = document.createElement('span');
    titleBadge.className = 'Label ml-2';
    titleBadge.style.backgroundColor = '#d73a4a';
    titleBadge.style.color = '#ffffff';
    titleBadge.textContent = '🔥🔥🔥';
    
    titleContainer.appendChild(titleIcon);
    titleContainer.appendChild(titleText);
    titleContainer.appendChild(titleBadge);
    
    // 创建站点列表容器
    const sitesList = document.createElement('div');
    sitesList.id = 'hotSitesList';
    sitesList.className = 'hot-sites-list';
    
    // 组装面板
    leftPanel.appendChild(titleContainer);
    leftPanel.appendChild(sitesList);
    
    // 添加点击事件监听器，防止点击面板内容导致面板被关闭
    leftPanel.addEventListener('click', function(e) {
        // 阻止事件冒泡，确保点击面板内容不会触发外部点击事件
        e.stopPropagation();
    });
    
    // 将面板添加到body
    body.appendChild(leftPanel);
}

// 创建收起/展开按钮
function createToggleButton() {
    // 如果已存在则不重复创建
    if (document.getElementById('hotSitesToggleBtn')) {
        return;
    }
    
    // 创建按钮
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'hotSitesToggleBtn';
    toggleBtn.className = 'hot-sites-toggle';
    toggleBtn.setAttribute('aria-label', '显示/隐藏热门站点');
    toggleBtn.setAttribute('type', 'button');
    
    // 不设置innerHTML，使用CSS ::after伪元素显示图标
    toggleBtn.innerHTML = '';
    
    // 添加点击事件
    toggleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation(); // 阻止事件冒泡
        
        console.log('热门站点切换按钮被点击');
        
        // 切换按钮和面板的状态
        this.classList.toggle('active');
        
        // 获取面板元素
        const panel = document.getElementById('hotSitesPanel');
        
        if (this.classList.contains('active')) {
            // 显示面板
            showHotSitesPanel(panel, this);
        } else {
            // 隐藏面板
            hideHotSitesPanel(panel, this);
        }
    });
    
    // 将按钮添加到body
    document.body.appendChild(toggleBtn);
    
    // 添加点击外部区域关闭面板的功能
    document.addEventListener('click', function(e) {
        const panel = document.getElementById('hotSitesPanel');
        const toggleBtn = document.getElementById('hotSitesToggleBtn');
        
        if (panel && toggleBtn && 
            window.innerWidth <= 1200 && 
            panel.classList.contains('show') && 
            !panel.contains(e.target) && 
            e.target !== toggleBtn && 
            !toggleBtn.contains(e.target)) {
            // 点击了外部区域，隐藏面板
            hideHotSitesPanel(panel, toggleBtn);
            toggleBtn.classList.remove('active');
        }
    });
    
    // 正确定位按钮（相对于目录按钮）
    updateHotSitesButtonPosition();
    
    // 监听窗口大小变化，更新按钮位置
    window.addEventListener('resize', updateHotSitesButtonPosition);
    
    return toggleBtn;
}

// 显示热门站点面板
function showHotSitesPanel(panel, btn) {
    if (!panel) return;
    
    console.log('显示热门站点面板');
    
    // 获取目录按钮位置以确保不遮挡
    const tocBtn = document.querySelector('.mobile-toc-btn');
    
    // 显示面板
    panel.classList.add('show');
    panel.style.display = 'block';
    
    // 设置面板的位置，在移动设备上从右侧滑出
    if (window.innerWidth <= 1200) {
        // 移动视图下，面板从右侧滑入
        panel.style.transform = 'translateX(260px)';
        
        // 确保样式立即生效
        requestAnimationFrame(() => {
            panel.style.opacity = '1';
            panel.style.transform = 'translateX(0)';
            panel.style.visibility = 'visible';
            
            // 添加滚动指示器
            addScrollIndicator(panel);
            
            // 调整面板位置，确保不遮挡目录按钮
            adjustPanelPosition(panel, tocBtn);
            
            console.log('热门站点面板已显示 - 移动视图');
        });
    } else {
        // 大屏幕视图，正常显示
        requestAnimationFrame(() => {
            panel.style.opacity = '1';
            panel.style.transform = 'scale(1)';
            panel.style.visibility = 'visible';
            
            console.log('热门站点面板已显示 - 桌面视图');
        });
    }
    
    // 更新按钮样式
    if (btn) {
        // 按钮样式由CSS控制
        // 通过切换active类来变更样式
    }
}

// 调整面板位置，避免遮挡目录按钮
function adjustPanelPosition(panel, tocBtn) {
    if (!panel) return;
    
    const viewportHeight = window.innerHeight;
    
    // 限制面板高度，设置为视口高度的60%，确保不会太大
    const maxHeight = Math.min(viewportHeight * 0.6, 400) + 'px';
    panel.style.maxHeight = maxHeight;
    
    if (tocBtn) {
        // 如果存在目录按钮，确保面板不会遮挡它
        const tocRect = tocBtn.getBoundingClientRect();
        const tocTop = tocRect.top;
        const tocHeight = tocRect.height;
        
        // 计算面板底部边界，确保至少留出10px间距
        const safeBottomMargin = tocTop - 10;
        
        // 调整面板位置，默认居中但受底部安全区域限制
        let panelTop = (viewportHeight - panel.offsetHeight) / 2;
        const panelBottom = panelTop + panel.offsetHeight;
        
        // 如果面板底部会遮挡目录按钮，则向上移动
        if (panelBottom > safeBottomMargin) {
            panelTop = Math.max(10, safeBottomMargin - panel.offsetHeight);
        }
        
        panel.style.top = panelTop + 'px';
        panel.style.transform = 'none'; // 移除默认的垂直居中transform
    }
}

// 添加滚动指示器
function addScrollIndicator(panel) {
    // 检查内容是否超出容器高度，需要滚动
    const needsScroll = panel.scrollHeight > panel.clientHeight;
    
    if (needsScroll) {
        // 如果需要滚动，添加类以显示滚动提示
        panel.classList.add('needs-scroll');
        
        // 监听滚动事件，当滚动到底部时隐藏滚动提示
        panel.addEventListener('scroll', function() {
            const scrolledToBottom = (panel.scrollHeight - panel.scrollTop - panel.clientHeight) < 20;
            if (scrolledToBottom) {
                panel.classList.add('scrolled-bottom');
            } else {
                panel.classList.remove('scrolled-bottom');
            }
        });
    } else {
        panel.classList.remove('needs-scroll');
    }
}

// 隐藏热门站点面板
function hideHotSitesPanel(panel, btn) {
    if (!panel) return;
    
    console.log('隐藏热门站点面板');
    
    // 隐藏面板
    panel.classList.remove('show');
    
    if (window.innerWidth <= 1200) {
        // 移动视图下，面板向右侧滑出
        panel.style.opacity = '0';
        panel.style.transform = 'translateX(260px)';
    } else {
        // 大屏幕视图，正常隐藏
        panel.style.opacity = '0';
        panel.style.transform = 'scale(0.95)';
    }
    
    // 更新按钮样式
    if (btn) {
        // 按钮样式由CSS控制
        // 通过切换active类来变更样式
    }
    
    // 延迟设置display:none，与CSS过渡时间匹配
    setTimeout(() => {
        if (!panel.classList.contains('show')) {
            panel.style.display = 'none';
            console.log('热门站点面板已隐藏');
        }
    }, 300);
}

// 设置响应式行为
function setupResponsiveBehavior() {
    // 检测窗口大小变化
    window.addEventListener('resize', function() {
        const panel = document.getElementById('hotSitesPanel');
        const toggleBtn = document.getElementById('hotSitesToggleBtn');
        
        if (!panel || !toggleBtn) return;
        
        if (window.innerWidth <= 1200) {
            // 在小屏幕上默认隐藏面板，确保按钮可见
            if (!toggleBtn.classList.contains('active')) {
                panel.classList.remove('show');
                panel.style.display = 'none';
                panel.style.opacity = '0';
                panel.style.transform = 'scale(0.95)';
            }
            
            // 强制显示按钮
            toggleBtn.style.display = 'flex';
            toggleBtn.style.visibility = 'visible';
            toggleBtn.style.opacity = '1';
            
            // 配置面板为移动样式
            panel.classList.add('mobile');
        } else {
            // 在大屏幕上始终显示面板
            panel.classList.remove('show');
            panel.classList.remove('mobile');
            panel.style.display = 'block';
            panel.style.opacity = '1';
            panel.style.transform = 'scale(1)';
            
            // 隐藏按钮
            toggleBtn.style.display = 'none';
            toggleBtn.classList.remove('active');
        }
    });
    
    // 初始触发一次resize事件以设置初始状态
    window.dispatchEvent(new Event('resize'));
}

// 监听主题变化
function setupThemeChangeListener() {
    // 监听文档颜色模式变化
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'data-color-mode') {
                updateHotSitesTheme();
            }
        });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    // 初始更新一次主题
    updateHotSitesTheme();
}

// 更新热门站点主题
function updateHotSitesTheme() {
    const colorMode = document.documentElement.getAttribute('data-color-mode');
    const panel = document.getElementById('hotSitesPanel');
    const toggleBtn = document.getElementById('hotSitesToggleBtn');
    
    if (panel) {
        if (colorMode === 'dark') {
            panel.classList.add('theme-dark');
        } else {
            panel.classList.remove('theme-dark');
        }
    }
    
    if (toggleBtn) {
        if (colorMode === 'dark') {
            toggleBtn.classList.add('theme-dark');
        } else {
            toggleBtn.classList.remove('theme-dark');
        }
    }
}

// 添加热门站点的CSS样式
function addHotSitesStyles() {
    console.log('添加热门站点样式');
    
    // 如果样式已存在，则不重复添加
    if (document.getElementById('hotSitesStyles')) {
        return;
    }
    
    const styleElement = document.createElement('style');
    styleElement.id = 'hotSitesStyles';
    styleElement.textContent = `
        /* 热门站点面板 - 基础样式 */
        .hot-sites-panel {
            position: fixed;
            top: 120px;
            left: 20px;
            width: 220px;
            max-height: calc(100vh - 150px);
            overflow-y: auto;
            background-color: #ffffff;
            border-radius: 12px;
            border: 1px solid rgba(126, 87, 255, 0.3);
            padding: 15px 12px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            z-index: 100;
        }
        
        /* 悬停效果 */
        .hot-sites-panel:hover {
            box-shadow: 0 8px 25px rgba(126, 87, 255, 0.25);
        }
        
        /* 暗色模式下的面板 */
        html[data-color-mode="dark"] .hot-sites-panel {
            background-color: #22223b;
            border: 1px solid rgba(126, 87, 255, 0.4);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        }
        
        /* 滚动条样式 */
        .hot-sites-panel::-webkit-scrollbar {
            width: 5px;
        }
        
        .hot-sites-panel::-webkit-scrollbar-track {
            background-color: rgba(0, 0, 0, 0.05);
            border-radius: 10px;
        }
        
        .hot-sites-panel::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, var(--primary-color, #7e57ff), var(--secondary-color, #ff4f9a));
            border-radius: 10px;
        }
        
        /* 标题样式 */
        .hot-sites-header {
            font-weight: bold;
            text-align: center;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid rgba(126, 87, 255, 0.3);
            display: flex;
            align-items: center;
        }
        
        /* 标题图标 */
        .hot-sites-icon {
            margin-right: 8px;
            color: #f85149;
            flex-shrink: 0;
        }
        
        /* 标题文本 */
        .hot-sites-header span {
            font-weight: 600;
            font-size: 16px;
            background: linear-gradient(135deg, var(--primary-color, #7e57ff), var(--secondary-color, #ff4f9a));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        /* 站点列表 */
        .hot-sites-list {
            display: flex;
            flex-direction: column;
            gap: 7px;
            padding-right: 5px;
        }
        
        /* 单个站点项 */
        .hot-site-item {
            display: flex;
            align-items: center;
            padding: 8px 12px;
            margin: 3px 0;
            border-left: 2px solid transparent;
            border-radius: 0 8px 8px 0;
            transition: all 0.3s ease;
            background-color: #ffffff;
        }
        
        /* 暗黑主题站点项 */
        html[data-color-mode="dark"] .hot-site-item {
            background-color: #2d333b;
        }
        
        /* 站点悬停效果 */
        .hot-site-item:hover {
            background-color: rgba(126, 87, 255, 0.1);
            border-left-color: var(--primary-color, #7e57ff);
            transform: translateX(3px);
        }
        
        /* 排名标识 */
        .hot-site-rank {
            width: 22px;
            height: 22px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #e5e5e5;
            color: #606060;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
            margin-right: 10px;
            flex-shrink: 0;
        }
        
        /* 前三名排名标识 */
        .hot-site-rank.rank-1 {
            background-color: #FFD700;
            color: #664d00;
        }
        
        .hot-site-rank.rank-2 {
            background-color: #C0C0C0;
            color: #505050;
        }
        
        .hot-site-rank.rank-3 {
            background-color: #CD7F32;
            color: #5a3600;
        }
        
        html[data-color-mode="dark"] .hot-site-rank {
            background-color: #2d333b;
            color: #adbac7;
        }
        
        html[data-color-mode="dark"] .hot-site-rank.rank-1 {
            background-color: #705b00;
            color: #FFD700;
        }
        
        html[data-color-mode="dark"] .hot-site-rank.rank-2 {
            background-color: #494949;
            color: #dddddd;
        }
        
        html[data-color-mode="dark"] .hot-site-rank.rank-3 {
            background-color: #614023;
            color: #ea9a56;
        }
        
        /* 站点链接 */
        .hot-site-link {
            color: #24292f;
            text-decoration: none;
            overflow: hidden;
            text-overflow: ellipsis;
            flex-grow: 1;
            margin-right: 8px;
            font-size: 14px;
            transition: all 0.3s ease;
            max-width: 130px; /* 增加宽度 */
            display: inline-block;
            word-break: break-word; /* 允许长单词断行 */
            line-height: 1.4; /* 增加行高，更易读 */
        }
        
        /* 暗黑主题站点链接 */
        html[data-color-mode="dark"] .hot-site-link {
            color: #c9d1d9;
        }
        
        /* 链接悬停效果 */
        .hot-site-item:hover .hot-site-link {
            color: var(--primary-color, #7e57ff);
        }
        
        /* 热度标签 */
        .hot-site-hot {
            display: inline-flex;
            min-width: 22px;
            height: 22px;
            align-items: center;
            justify-content: center;
            background-color: var(--primary-color, #7e57ff);
            color: white;
            border-radius: 11px;
            padding: 0 8px;
            font-size: 12px;
            font-weight: bold;
            flex-shrink: 0;
            transition: all 0.2s ease;
        }
        
        /* 站点悬停时热度标签 */
        .hot-site-item:hover .hot-site-hot {
            background-color: var(--secondary-color, #ff4f9a);
            transform: scale(1.05);
        }
        
        /* 热门标签 */
        .hot-sites-panel .hot-sites-header .Label {
            font-size: 10px;
            font-weight: 500;
            padding: 2px 8px;
            border-radius: 10px;
            margin-left: 8px;
            -webkit-text-fill-color: #ffffff;
        }
        
        /* 响应式设计 */
        @media (max-width: 1400px) {
            .hot-sites-panel {
                left: 10px;
                width: 200px;
            }
        }
        
        @media (max-width: 1200px) {
            /* 默认隐藏热门站点面板 */
            .hot-sites-panel {
                display: none;
                opacity: 0;
                transform: translateX(50px);
                transition: transform 0.3s ease, opacity 0.3s ease;
                visibility: hidden;
            }
            
            /* 当面板显示时的样式 */
            .hot-sites-panel.show {
                display: block;
                opacity: 1;
                transform: translateX(0);
                visibility: visible;
                z-index: 9990; /* 确保低于目录按钮的z-index */
            }
            
            /* 在移动设备上的面板样式 */
            .hot-sites-panel.mobile {
                position: fixed;
                top: 50%;
                right: 0;
                left: auto;
                transform: translateY(-50%);
                width: 260px;
                max-height: 60vh; /* 限制高度，避免太长 */
                border-radius: 12px 0 0 12px;
                box-shadow: -2px 0 15px rgba(0, 0, 0, 0.2);
                transform-origin: right center;
                overflow-y: auto; /* 确保可以滚动 */
                overflow-x: hidden;
                scrollbar-width: thin; /* Firefox */
                scrollbar-color: rgba(126, 87, 255, 0.5) transparent; /* Firefox */
                background-color: #ffffff; /* 确保移动视图背景也是白色 */
            }
            
            html[data-color-mode="dark"] .hot-sites-panel.mobile {
                background-color: #22223b; /* 暗色模式下的背景色 */
            }
            
            /* 自定义滚动条样式 */
            .hot-sites-panel.mobile::-webkit-scrollbar {
                width: 5px;
            }
            
            .hot-sites-panel.mobile::-webkit-scrollbar-track {
                background: transparent;
                margin: 10px 0;
            }
            
            .hot-sites-panel.mobile::-webkit-scrollbar-thumb {
                background-color: rgba(126, 87, 255, 0.5);
                border-radius: 10px;
            }
            
            .hot-sites-panel.mobile::-webkit-scrollbar-thumb:hover {
                background-color: rgba(126, 87, 255, 0.8);
            }
            
            /* 添加滚动提示 */
            .hot-sites-panel.mobile::after {
                content: "";
                position: absolute;
                bottom: 15px;
                left: 50%;
                transform: translateX(-50%);
                width: 40px;
                height: 4px;
                background-color: rgba(126, 87, 255, 0.3);
                border-radius: 4px;
                opacity: 0.7;
                animation: scrollHint 2s infinite;
                pointer-events: none;
            }
            
            @keyframes scrollHint {
                0%, 100% { opacity: 0.3; }
                50% { opacity: 0.8; }
            }
            
            /* 热门站点列表样式优化 */
            .hot-sites-list {
                padding-bottom: 20px; /* 为滚动提示预留空间 */
                display: flex;
                flex-direction: column;
                gap: 7px;
            }
            
            /* 热门站点切换按钮 - 贴边样式 */
            .hot-sites-toggle {
                display: flex !important; /* 强制显示 */
                align-items: center;
                justify-content: center;
                width: 36px;
                height: 80px;
                border-radius: 24px 0 0 24px; /* 左侧半圆，右侧贴边 */
                background: linear-gradient(90deg, #7e57ff, #9165ff);
                box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
                cursor: pointer;
                color: white;
                font-size: 20px;
                font-weight: bold;
                transition: all 0.3s ease;
                z-index: 9980; /* 确保低于目录按钮 */
                border: none;
                outline: none;
                position: fixed;
                top: 30%; /* 放在屏幕上方三分之一处，避开目录按钮 */
                right: 0;
                transform: translateY(-50%);
                visibility: visible;
                opacity: 0.95;
                writing-mode: vertical-rl;
                text-orientation: mixed;
            }
            
            /* 热门站点文字标签 */
            .hot-sites-toggle::after {
                content: '热门🔥';
                font-size: 16px;
                letter-spacing: 2px;
                margin-top: 5px;
            }
            
            /* 切换按钮悬停效果 */
            .hot-sites-toggle:hover {
                opacity: 1;
                width: 40px;
                box-shadow: -3px 0 15px rgba(0, 0, 0, 0.3);
            }
            
            /* 切换按钮激活状态 */
            .hot-sites-toggle.active {
                background: linear-gradient(90deg, #9165ff, #7e57ff);
                width: 36px;
            }
            
            /* 切换按钮激活状态下文字 */
            .hot-sites-toggle.active::after {
                content: '收起➡';
            }
            
            /* 移动端交互优化 */
            .hot-site-item {
                padding: 10px 12px;
                margin: 4px 0;
                border-radius: 8px;
                transition: background-color 0.2s ease, transform 0.2s ease;
                background-color: #ffffff;
            }
            
            html[data-color-mode="dark"] .hot-site-item {
                background-color: #2d333b;
            }
            
            .hot-site-item:active {
                background-color: rgba(126, 87, 255, 0.2);
                transform: scale(0.98);
            }
            
            /* 站点悬停效果微调 */
            .hot-site-item:hover {
                background-color: rgba(126, 87, 255, 0.1);
            }
            
            /* 在移动设备上增加链接区域宽度 */
            .hot-site-link {
                max-width: 170px; /* 移动视图增加链接宽度 */
            }
        }
        
        @media (max-width: 768px) {
            .hot-sites-panel.mobile {
                width: 240px;
                max-height: 65vh;
            }
            
            .hot-sites-toggle {
                width: 32px;
                height: 70px;
                border-radius: 20px 0 0 20px;
                font-size: 16px;
            }
            
            .hot-sites-toggle::after {
                font-size: 14px;
                letter-spacing: 1px;
            }
            
            .hot-sites-toggle:hover {
                width: 36px;
            }
            
            .hot-sites-toggle.active {
                width: 32px;
            }
            
            .hot-site-link {
                font-size: 13px;
                max-width: 150px; /* 小屏幕调整链接宽度 */
            }
            
            .hot-site-item {
                padding: 8px 10px;
            }
        }
    `;
    
    document.head.appendChild(styleElement);
}

// 清理热门站点元素
function cleanupHotSitesElements() {
    console.log("清理热门站点元素");
    
    // 移除面板
    const panel = document.getElementById('hotSitesPanel');
    if (panel) {
        panel.parentNode.removeChild(panel);
    }
    
    // 移除按钮
    const btn = document.getElementById('hotSitesToggleBtn');
    if (btn) {
        btn.parentNode.removeChild(btn);
    }
    
    // 移除样式
    const styles = document.getElementById('hotSitesStyles');
    if (styles) {
        styles.parentNode.removeChild(styles);
    }
}

// 显示无数据提示
function showNoDataMessage() {
    const hotSitesList = document.getElementById('hotSitesList');
    if (hotSitesList) {
        hotSitesList.innerHTML = '<div class="p-2 text-center color-fg-muted">无法加载热门站点数据</div>';
    }
}

// 渲染热门站点列表
function renderHotSites(sites) {
    console.log("渲染热门列表", sites);
    
    // 再次验证数据有效性
    if (!Array.isArray(sites) || sites.length === 0) {
        console.error('热门数据为空或格式错误');
        cleanupHotSitesElements();
        return;
    }
    
    const hotSitesList = document.getElementById('hotSitesList');
    
    if (!hotSitesList) {
        console.error('热门列表元素不存在');
        return;
    }
    
    // 过滤无效站点
    const validSites = sites.filter(site => site && site.name && site.url);
    
    // 检查过滤后是否还有有效站点
    if (validSites.length === 0) {
        console.error('没有有效的热门数据');
        cleanupHotSitesElements();
        return;
    }
    
    // 按热度排序
    validSites.sort((a, b) => (b.hot || 0) - (a.hot || 0));
    
    // 清空列表
    hotSitesList.innerHTML = '';
    
    // 添加站点数量提示
    const countIndicator = document.createElement('div');
    countIndicator.className = 'hot-sites-count';
    countIndicator.textContent = `共${validSites.length}个`;
    countIndicator.style.textAlign = 'center';
    countIndicator.style.fontSize = '12px';
    countIndicator.style.color = '#666';
    countIndicator.style.marginBottom = '10px';
    hotSitesList.appendChild(countIndicator);
    
    // 添加站点
    validSites.forEach((site, index) => {
        if (!site.name || !site.url) {
            console.warn('站点数据不完整:', site);
            return;
        }
        
        const item = document.createElement('div');
        item.className = 'hot-site-item';
        
        // 添加排名标识
        const rankBadge = document.createElement('span');
        rankBadge.className = 'hot-site-rank';
        rankBadge.textContent = index + 1;
        
        // 根据排名设置不同的颜色
        if (index === 0) {
            rankBadge.classList.add('rank-1');
        } else if (index === 1) {
            rankBadge.classList.add('rank-2');
        } else if (index === 2) {
            rankBadge.classList.add('rank-3');
        }
        
        const link = document.createElement('a');
        link.className = 'hot-site-link';
        link.href = site.url;
        link.target = '_blank';
        link.title = site.name; // 添加title属性，鼠标悬停时显示完整名称
        
        // 如果站点名称太长，显示前15个字符加省略号，但保留完整title提示
        const siteName = site.name;
        link.textContent = siteName;
        
        const hotLabel = document.createElement('span');
        hotLabel.className = 'hot-site-hot';
        hotLabel.textContent = '🔥' + (site.hot || 0);
        
        item.appendChild(rankBadge);
        item.appendChild(link);
        item.appendChild(hotLabel);
        hotSitesList.appendChild(item);
    });
    
    // 如果没有站点，清理所有元素
    if (validSites.length === 0) {
        cleanupHotSitesElements();
    } else {
        // 添加滚动提示
        const scrollHint = document.createElement('div');
        scrollHint.className = 'scroll-hint';
        scrollHint.style.textAlign = 'center';
        scrollHint.style.fontSize = '12px';
        scrollHint.style.color = '#888';
        scrollHint.style.padding = '10px 0';
        scrollHint.style.opacity = '0.7';
        scrollHint.textContent = '⟳ 滑动查看更多 ⟳';
        hotSitesList.appendChild(scrollHint);
    }
}

// 确保在DOM完全加载后再执行初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHotSites);
} else {
    // 如果DOMContentLoaded已经触发，直接初始化
    initHotSites();
}

// 为了确保脚本能够执行，添加一个延迟的初始化调用
setTimeout(function() {
    console.log("延迟初始化热门站点");
    initHotSites();
}, 1000);

// 更新热门站点按钮的位置
function updateHotSitesButtonPosition() {
    const hotSitesBtn = document.getElementById('hotSitesToggleBtn');
    if (!hotSitesBtn) return;
    
    // 检查是否存在目录按钮
    const tocBtn = document.querySelector('.mobile-toc-btn');
    const isMobileView = window.innerWidth <= 1200;
    
    if (isMobileView) {
        // 将热门站点按钮设置为贴边显示（贴靠右侧边缘）
        hotSitesBtn.style.position = 'fixed';
        hotSitesBtn.style.top = '30%'; // 定位在上方三分之一处，避开中间和底部区域
        hotSitesBtn.style.transform = 'translateY(-50%)';
        hotSitesBtn.style.right = '0';
        hotSitesBtn.style.left = 'auto';
        hotSitesBtn.style.bottom = 'auto';
        hotSitesBtn.style.borderRadius = '24px 0 0 24px'; // 左侧为半圆形，右侧贴边
        
        // 如果是小屏幕，稍微调整尺寸
        if (window.innerWidth <= 768) {
            hotSitesBtn.style.borderRadius = '20px 0 0 20px';
        }
    } else {
        // 大屏幕上隐藏按钮
        hotSitesBtn.style.display = 'none';
    }
} 
