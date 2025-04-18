// 热门站点数据配置 - 方便修改
// 数据配置路径: static/js/hot-sites.js

// 热门站点数据文件路径
const HOT_SITES_CONFIG_PATH = (() => {
    // 获取当前域名
    const currentDomain = window.UIState?.environment.domain || window.location.origin;
    // 拼接配置文件路径
    return `${currentDomain}/config/hot_site.json`;
})();

// 热门站点图标 - 火焰图标的SVG路径
const HOT_SITES_ICON_PATH = "M11.228 1.945c-.123-.103-.32-.103-.552-.103-.573 0-1.359.243-2.320.722-.96.48-1.726 1.039-2.299 1.683-.531.583-.972 1.258-1.298 2.022-.327.764-.532 1.488-.573 2.164-.04.675.082 1.253.368 1.724.286.471.697.778 1.209.879.532.1 1.053.05 1.564-.151.512-.204.9-.46 1.135-.781.266-.368.43-.737.43-1.1 0-.328-.143-.727-.389-1.156-.246-.43-.449-.665-.613-.665-.163 0-.266.092-.266.235 0 .163.02.285.06.368.042.081.103.204.165.327.102.143.163.306.204.46.061.307.041.604-.081.911a1.294 1.294 0 0 1-.675.645c-.308.144-.635.144-.982.021-.348-.143-.573-.43-.675-.85-.144-.485-.144-1.03-.02-1.6.122-.574.367-1.148.675-1.703.327-.614.736-1.187 1.248-1.683.491-.511 1.024-.92 1.595-1.228A3.89 3.89 0 0 1 9.46 2.257c.389-.02.696.5.92.225.225.184.348.43.389.738.041.286-.02.593-.163.9a2.212 2.212 0 0 1-.593.777c-.245.205-.522.328-.84.43-.327.123-.594.224-.84.307-.245.082-.409.204-.47.388-.063.184-.042.368.08.532.123.143.307.245.552.327.245.081.532.102.86.061.45-.061.838-.184 1.166-.368.327-.183.614-.42.84-.685.246-.266.43-.573.573-.92.143-.348.245-.686.245-1.015.02-.327-.04-.675-.163-1.002-.184-.308-.43-.533-.798-.695zm-7.004 7.65c-.246.409-.471.8-.717 1.168-.225.368-.43.696-.593.972-.358.591-.619 1.066-.747 1.394-.207.532-.166.993.12 1.394.144.184.329.267.573.267.245 0 .532-.083.84-.226.306-.165.593-.349.88-.573.265-.266.511-.553.736-.86.225-.306.43-.613.593-.9l.798-1.374a4.05 4.05 0 0 1-.634-.142 1.862 1.862 0 0 1-.88-.532 1.564 1.564 0 0 1-.45-.797 1.09 1.09 0 0 1-.041-.42c.02-.143.061-.266.1-.368l-.578-.003z";

// 内联热门站点数据 - 这只是备用测试数据，实际数据应从服务器获取
const HOT_SITES_DATA = [
  {
    "name": "测试",
    "url": "https://test.com",
    "hot": 95
  }
];

// 全局变量，用于存储从服务器获取的热门站点数据
let hotSitesData = null;

// 定义命名空间，避免全局变量冲突
const HotSites = {
  // 状态变量
  state: {
    isInitialized: false
  }
};

// 在页面加载完成时初始化
console.log("热门站点脚本已加载");

// 安全地关闭工具面板
function safeHideQuickToolsPanel(panel, btn) {
    // 如果工具JS还没有加载，可能hideQuickToolsPanel函数不存在
    if (typeof hideQuickToolsPanel === 'function') {
        try {
            hideQuickToolsPanel(panel, btn);
            return true;
        } catch (error) {
            console.error('调用hideQuickToolsPanel失败:', error);
        }
    }
    
    // 后备方案：直接修改样式
    if (panel) {
        panel.classList.remove('show');
        panel.style.display = 'none';
        panel.style.opacity = '0';
        panel.style.transform = 'translateX(260px)';
    }
    
    if (btn) {
        btn.classList.remove('active');
    }
    
    return false;
}

// 初始化热门站点功能
function initHotSites() {
    console.log("初始化热门功能");
    
    // 防止重复初始化
    if (HotSites.state.isInitialized) {
        console.log("热门站点已初始化，跳过");
        return;
    }
    
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
                setupHotSitesResponsiveBehavior();
                
                // 添加主题变化监听
                setupThemeChangeListener();
                
                // 延迟更新热门按钮位置
                setTimeout(() => {
                    updateHotSitesButtonPosition();
                }, 500);
                
                // 标记为已初始化
                HotSites.state.isInitialized = true;
                
                // 导出关键函数到全局作用域，让工具JS能够调用
                window.hideHotSitesPanel = hideHotSitesPanel;
                window.showHotSitesPanel = showHotSitesPanel;
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
                setupHotSitesResponsiveBehavior();
                setupThemeChangeListener();
                setTimeout(() => {
                    updateHotSitesButtonPosition();
                }, 500);
                
                // 标记为已初始化
                HotSites.state.isInitialized = true;
                
                // 导出关键函数到全局作用域
                window.hideHotSitesPanel = hideHotSitesPanel;
                window.showHotSitesPanel = showHotSitesPanel;
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
        if (window.UIState?.environment.isLocalEnv || window.location.protocol === 'file:') {
            console.log('本地文件系统环境，使用备用数据');
            // 本地文件系统环境下，使用备用数据
            resolve(HOT_SITES_DATA);
            return;
        }
        
        // 网络环境下，尝试从服务器获取数据
        fetch(HOT_SITES_CONFIG_PATH)
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
    if (DOMUtils.getElement('hotSitesPanel')) {
        console.log('热门面板已存在');
        return;
    }
    
    // 创建左侧面板容器
    const leftPanel = document.createElement('div');
    leftPanel.id = 'hotSitesPanel';
    leftPanel.className = 'hot-sites-panel';
    
    // 确保面板有正确的定位样式
    leftPanel.style.position = 'fixed';
    leftPanel.style.top = '120px';
    leftPanel.style.left = '20px';
    leftPanel.style.zIndex = '100';
    leftPanel.style.maxHeight = 'calc(100vh - 150px)';
    leftPanel.style.overflowY = 'auto';
    leftPanel.style.width = '220px';
    leftPanel.style.backgroundColor = '#ffffff';
    leftPanel.style.borderRadius = '12px';
    leftPanel.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    
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
    DOMUtils.safeAddEventListener(leftPanel, 'click', function(e) {
        // 阻止事件冒泡，确保点击面板内容不会触发外部点击事件
        e.stopPropagation();
    }, 'hotSitesPanelClick');
    
    // 将面板添加到body
    body.appendChild(leftPanel);
    
    // 检查屏幕宽度，设置初始显示状态
    if (window.UIState?.device.isMobile) {
        // 在小屏幕上默认隐藏面板
        leftPanel.style.display = 'none';
        leftPanel.style.opacity = '0';
        leftPanel.style.transform = 'translateX(-260px)';
    } else {
        // 在大屏幕上默认显示面板
        leftPanel.style.display = 'block';
        leftPanel.style.opacity = '1';
        leftPanel.style.transform = 'scale(1)';
        leftPanel.style.visibility = 'visible';
    }
    
    // 在暗色模式下应用不同的背景色
    if (window.UIState?.theme.isDark) {
        leftPanel.style.backgroundColor = '#22223b';
        leftPanel.classList.add('theme-dark');
    }
}

// 创建收起/展开按钮
function createToggleButton() {
    // 如果已存在则不重复创建
    if (DOMUtils.getElement('hotSitesToggleBtn')) {
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
    
    // 根据当前屏幕宽度设置初始状态
    if (window.UIState?.device.isMobile) {
        toggleBtn.style.display = 'flex';
        toggleBtn.style.visibility = 'visible';
        toggleBtn.style.opacity = '0.95';
    } else {
        toggleBtn.style.display = 'none';
        toggleBtn.style.visibility = 'hidden';
        toggleBtn.style.opacity = '0';
    }
    
    // 将按钮添加到body
    document.body.appendChild(toggleBtn);
    console.log('热门站点切换按钮已添加到DOM');
    
    // 添加点击事件
    DOMUtils.safeAddEventListener(toggleBtn, 'click', function(e) {
        e.preventDefault();
        e.stopPropagation(); // 阻止事件冒泡
        
        console.log('热门站点切换按钮被点击');
        
        // 切换按钮和面板的状态
        this.classList.toggle('active');
        
        // 获取面板元素
        const panel = DOMUtils.getElement('hotSitesPanel');
        
        if (this.classList.contains('active')) {
            // 如果工具面板正在显示，先关闭它
            if (window.UIState?.device.isMobile) {
                const quickToolsPanel = DOMUtils.getElement('quickToolsPanel');
                const quickToolsBtn = DOMUtils.getElement('quickToolsToggleBtn');
                
                if (quickToolsPanel && quickToolsPanel.classList.contains('show')) {
                    console.log('点击热门按钮：检测到工具面板开启，自动关闭工具面板');
                    // 使用公共面板管理器关闭工具面板
                    if (PanelManager && typeof PanelManager.hideQuickToolsPanel === 'function') {
                        PanelManager.hideQuickToolsPanel();
                    }
                }
            }
            
            // 显示面板
            showHotSitesPanel(panel, this);
        } else {
            // 隐藏面板
            hideHotSitesPanel(panel, this);
        }
    }, 'hotSitesToggleBtnClick');
    
    // 正确定位按钮（相对于目录按钮）
    updateHotSitesButtonPosition();
    
    // 监听窗口大小变化，更新按钮位置
    window.addEventListener('uiResize', updateHotSitesButtonPosition);
    
    return toggleBtn;
}

// 显示热门站点面板
function showHotSitesPanel(panel, btn) {
    if (!panel) return;
    
    console.log('显示热门站点面板');
    
    // 获取目录按钮位置以确保不遮挡
    const tocBtn = document.querySelector('.mobile-toc-btn');
    
    // 在小屏幕上，如果工具面板正在显示，则关闭它
    if (window.UIState?.device.isMobile) {
        const quickToolsPanel = DOMUtils.getElement('quickToolsPanel');
        
        if (quickToolsPanel && quickToolsPanel.classList.contains('show')) {
            console.log('检测到工具面板开启，自动关闭工具面板');
            // 使用公共面板管理器关闭工具面板
            if (PanelManager && typeof PanelManager.hideQuickToolsPanel === 'function') {
                PanelManager.hideQuickToolsPanel();
            }
        }
    }
    
    // 更新状态
    if (window.UIState?.panels) {
        window.UIState.panels.hotSites.isVisible = true;
        window.UIState.panels.hotSites.lastToggled = Date.now();
    }
    
    // 显示面板
    panel.classList.add('show');
    panel.style.display = 'block';
    
    // 设置面板的位置，在移动设备上从左侧滑出
    if (window.UIState?.device.isMobile) {
        // 移动视图下，面板从左侧滑入
        panel.style.transform = 'translateX(-260px)';
        
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
        btn.classList.add('active');
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
        DOMUtils.safeAddEventListener(panel, 'scroll', function() {
            const scrolledToBottom = (panel.scrollHeight - panel.scrollTop - panel.clientHeight) < 20;
            if (scrolledToBottom) {
                panel.classList.add('scrolled-bottom');
            } else {
                panel.classList.remove('scrolled-bottom');
            }
        }, 'hotSitesPanelScroll');
    } else {
        panel.classList.remove('needs-scroll');
    }
}

// 隐藏热门站点面板 - 使用公共模块的面板管理器
function hideHotSitesPanel(panel, btn) {
    // 如果公共面板管理器可用，则使用它
    if (PanelManager && typeof PanelManager.hideHotSitesPanel === 'function') {
        return PanelManager.hideHotSitesPanel();
    }
    
    // 后备实现，确保功能正常工作
    if (!panel) return;
    
    console.log('隐藏热门站点面板');
    
    // 更新状态
    if (window.UIState?.panels) {
        window.UIState.panels.hotSites.isVisible = false;
    }
    
    // 隐藏面板
    panel.classList.remove('show');
    
    if (window.UIState?.device.isMobile) {
        // 移动视图下，面板向左侧滑出
        panel.style.opacity = '0';
        panel.style.transform = 'translateX(-260px)';
    } else {
        // 大屏幕视图，正常隐藏
        panel.style.opacity = '0';
        panel.style.transform = 'scale(0.95)';
    }
    
    // 更新按钮样式
    if (btn) {
        // 按钮样式由CSS控制
        // 通过切换active类来变更样式
        btn.classList.remove('active');
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
function setupHotSitesResponsiveBehavior() {
    // 监听自定义的UI大小调整事件
    window.addEventListener('uiResize', function(e) {
        const panel = DOMUtils.getElement('hotSitesPanel');
        const toggleBtn = DOMUtils.getElement('hotSitesToggleBtn');
        
        if (!panel) return;
        
        const isMobile = e.detail?.isMobile || window.UIState?.device.isMobile || window.innerWidth <= 1200;
        
        if (isMobile) {
            // 在小屏幕上默认隐藏面板，确保按钮可见
            if (toggleBtn && !toggleBtn.classList.contains('active')) {
                panel.classList.remove('show');
                panel.style.display = 'none';
                panel.style.opacity = '0';
                panel.style.transform = 'translateX(-50px)';
                panel.style.visibility = 'hidden';
            }
            
            // 确保按钮显示（如果存在）
            if (toggleBtn) {
                toggleBtn.style.display = 'flex';
                toggleBtn.style.visibility = 'visible';
                toggleBtn.style.opacity = '0.95';
            }
            
            // 配置面板为移动样式
            panel.classList.add('mobile');
        } else {
            // 在大屏幕上始终显示面板
            panel.classList.remove('show');
            panel.classList.remove('mobile');
            panel.style.display = 'block';
            panel.style.opacity = '1';
            panel.style.transform = 'scale(1)';
            panel.style.visibility = 'visible';
            
            // 隐藏按钮（如果存在）
            if (toggleBtn) {
                toggleBtn.style.display = 'none';
                toggleBtn.style.visibility = 'hidden';
                toggleBtn.style.opacity = '0';
                toggleBtn.classList.remove('active');
            }
        }
    });
}

// 监听主题变化
function setupThemeChangeListener() {
    // 使用公共工具模块的主题观察器
    const themeObserver = DOMUtils.getThemeObserver(function(isDark) {
        updateHotSitesTheme(isDark);
    });
    
    // 开始观察
    themeObserver.observe(document.documentElement, { attributes: true });
    
    // 初始更新一次主题
    updateHotSitesTheme(window.UIState?.theme.isDark);
}

// 更新热门站点主题
function updateHotSitesTheme(isDark) {
    const panel = DOMUtils.getElement('hotSitesPanel');
    const toggleBtn = DOMUtils.getElement('hotSitesToggleBtn');
    
    if (panel) {
        if (isDark) {
            panel.classList.add('theme-dark');
        } else {
            panel.classList.remove('theme-dark');
        }
    }
    
    if (toggleBtn) {
        if (isDark) {
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
    if (DOMUtils.getElement('hotSitesStyles')) {
        return;
    }
    
    const styleElement = document.createElement('style');
    styleElement.id = 'hotSitesStyles';
    styleElement.textContent = `
        /* 热门站点面板 - 基础样式 */
        #hotSitesPanel.hot-sites-panel {
            position: fixed !important;
            top: 120px !important;
            left: 20px !important;
            width: 220px !important;
            max-height: calc(100vh - 150px) !important;
            overflow-y: auto !important;
            background-color: #ffffff !important;
            border-radius: 12px !important;
            border: 1px solid rgba(126, 87, 255, 0.3) !important;
            padding: 15px 12px !important;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1) !important;
            backdrop-filter: blur(10px) !important;
            -webkit-backdrop-filter: blur(10px) !important;
            transition: all 0.3s ease !important;
            z-index: 100 !important;
        }
        
        /* 热门站点切换按钮 */
        #hotSitesToggleBtn.hot-sites-toggle {
            display: none !important; /* 默认隐藏，在移动视图中再显示 */
            align-items: center !important;
            justify-content: center !important;
            width: 36px !important;
            height: 80px !important;
            border-radius: 0 24px 24px 0 !important;
            background: linear-gradient(90deg, #7e57ff, #9165ff) !important;
            box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2) !important;
            cursor: pointer !important;
            color: white !important;
            font-size: 20px !important;
            font-weight: bold !important;
            transition: all 0.3s ease !important;
            z-index: 9980 !important;
            border: none !important;
            outline: none !important;
            position: fixed !important;
            top: 40% !important;
            left: 0 !important;
            transform: translateY(-50%) !important;
            visibility: hidden !important; /* 默认隐藏，在移动视图中再显示 */
            opacity: 0 !important;
            writing-mode: vertical-rl !important;
            text-orientation: mixed !important;
        }
        
        /* 热门站点文字标签 */
        #hotSitesToggleBtn.hot-sites-toggle::after {
            content: '热门🔥' !important;
            font-size: 16px !important;
            letter-spacing: 2px !important;
            margin-top: 5px !important;
        }
        
        /* 切换按钮悬停效果 */
        #hotSitesToggleBtn.hot-sites-toggle:hover {
            opacity: 1 !important;
            width: 40px !important;
            box-shadow: 3px 0 15px rgba(0, 0, 0, 0.3) !important;
        }
        
        /* 切换按钮激活状态 */
        #hotSitesToggleBtn.hot-sites-toggle.active {
            background: linear-gradient(90deg, #9165ff, #7e57ff) !important;
            width: 36px !important;
        }
        
        /* 切换按钮激活状态下文字 */
        #hotSitesToggleBtn.hot-sites-toggle.active::after {
            content: '收起⬅' !important;
        }
        
        /* 悬停效果 */
        #hotSitesPanel.hot-sites-panel:hover {
            box-shadow: 0 8px 25px rgba(126, 87, 255, 0.25) !important;
        }
        
        /* 暗色模式下的面板 */
        html[data-color-mode="dark"] #hotSitesPanel.hot-sites-panel {
            background-color: #22223b !important;
            border: 1px solid rgba(126, 87, 255, 0.4) !important;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3) !important;
        }
        
        /* 滚动条样式 */
        #hotSitesPanel.hot-sites-panel::-webkit-scrollbar {
            width: 5px !important;
        }
        
        #hotSitesPanel.hot-sites-panel::-webkit-scrollbar-track {
            background-color: rgba(0, 0, 0, 0.05) !important;
            border-radius: 10px !important;
        }
        
        #hotSitesPanel.hot-sites-panel::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, var(--primary-color, #7e57ff), var(--secondary-color, #ff4f9a)) !important;
            border-radius: 10px !important;
        }
        
        /* 标题样式 */
        #hotSitesPanel .hot-sites-header {
            font-weight: bold !important;
            text-align: center !important;
            margin-bottom: 15px !important;
            padding-bottom: 10px !important;
            border-bottom: 2px solid rgba(126, 87, 255, 0.3) !important;
            display: flex !important;
            align-items: center !important;
            background-color: transparent !important;
        }
        
        /* 标题图标 */
        #hotSitesPanel .hot-sites-icon {
            margin-right: 8px !important;
            color: #f85149 !important;
            flex-shrink: 0 !important;
        }
        
        /* 标题文本 */
        #hotSitesPanel .hot-sites-header span {
            font-weight: 600 !important;
            font-size: 16px !important;
            background: linear-gradient(135deg, var(--primary-color, #7e57ff), var(--secondary-color, #ff4f9a)) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
        }
        
        /* 站点列表 */
        #hotSitesPanel .hot-sites-list {
            display: flex !important;
            flex-direction: column !important;
            gap: 7px !important;
            padding-right: 5px !important;
            background-color: transparent !important;
        }
        
        /* 单个站点项 */
        #hotSitesPanel .hot-site-item {
            display: flex !important;
            align-items: center !important;
            padding: 8px 12px !important;
            margin: 3px 0 !important;
            border-left: 2px solid transparent !important;
            border-radius: 0 8px 8px 0 !important;
            transition: all 0.3s ease !important;
            background-color: #ffffff !important;
        }
        
        /* 暗黑主题站点项 */
        html[data-color-mode="dark"] #hotSitesPanel .hot-site-item {
            background-color: #2d333b !important;
        }
        
        /* 站点悬停效果 */
        #hotSitesPanel .hot-site-item:hover {
            background-color: rgba(126, 87, 255, 0.1) !important;
            border-left-color: var(--primary-color, #7e57ff) !important;
            transform: translateX(3px) !important;
        }
        
        /* 排名标识 */
        #hotSitesPanel .hot-site-rank {
            width: 22px !important;
            height: 22px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            background-color: #e5e5e5 !important;
            color: #606060 !important;
            border-radius: 4px !important;
            font-size: 12px !important;
            font-weight: bold !important;
            margin-right: 10px !important;
            flex-shrink: 0 !important;
        }
        
        /* 前三名排名标识 */
        #hotSitesPanel .hot-site-rank.rank-1 {
            background-color: #FFD700 !important;
            color: #664d00 !important;
        }
        
        #hotSitesPanel .hot-site-rank.rank-2 {
            background-color: #C0C0C0 !important;
            color: #505050 !important;
        }
        
        #hotSitesPanel .hot-site-rank.rank-3 {
            background-color: #CD7F32 !important;
            color: #5a3600 !important;
        }
        
        html[data-color-mode="dark"] #hotSitesPanel .hot-site-rank {
            background-color: #2d333b !important;
            color: #adbac7 !important;
        }
        
        html[data-color-mode="dark"] #hotSitesPanel .hot-site-rank.rank-1 {
            background-color: #705b00 !important;
            color: #FFD700 !important;
        }
        
        html[data-color-mode="dark"] #hotSitesPanel .hot-site-rank.rank-2 {
            background-color: #494949 !important;
            color: #dddddd !important;
        }
        
        html[data-color-mode="dark"] #hotSitesPanel .hot-site-rank.rank-3 {
            background-color: #614023 !important;
            color: #ea9a56 !important;
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
            #hotSitesPanel.hot-sites-panel {
                display: none !important;
                opacity: 0 !important;
                transform: translateX(-50px) !important;
                transition: transform 0.3s ease, opacity 0.3s ease !important;
                visibility: hidden !important;
            }
            
            /* 当面板显示时的样式 */
            #hotSitesPanel.hot-sites-panel.show {
                display: block !important;
                opacity: 1 !important;
                transform: translateX(0) !important;
                visibility: visible !important;
                z-index: 9990 !important; /* 确保低于目录按钮的z-index */
            }
            
            /* 在移动设备上显示按钮 */
            #hotSitesToggleBtn.hot-sites-toggle {
                display: flex !important;
                visibility: visible !important;
                opacity: 0.95 !important;
            }
            
            /* 在移动设备上的面板样式 */
            #hotSitesPanel.hot-sites-panel.mobile {
                position: fixed !important;
                top: 50% !important;
                left: 0 !important;
                right: auto !important;
                transform: translateY(-50%) !important;
                width: 260px !important;
                max-height: 60vh !important; /* 限制高度，避免太长 */
                border-radius: 0 12px 12px 0 !important;
                box-shadow: 2px 0 15px rgba(0, 0, 0, 0.2) !important;
                transform-origin: left center !important;
                overflow-y: auto !important; /* 确保可以滚动 */
                overflow-x: hidden !important;
                scrollbar-width: thin !important; /* Firefox */
                scrollbar-color: rgba(126, 87, 255, 0.5) transparent !important; /* Firefox */
                background-color: #ffffff !important; /* 确保移动视图背景也是白色 */
            }
            
            html[data-color-mode="dark"] #hotSitesPanel.hot-sites-panel.mobile {
                background-color: #22223b !important; /* 暗色模式下的背景色 */
            }
            
            /* 自定义滚动条样式 */
            #hotSitesPanel.hot-sites-panel.mobile::-webkit-scrollbar {
                width: 5px !important;
            }
            
            #hotSitesPanel.hot-sites-panel.mobile::-webkit-scrollbar-track {
                background: transparent !important;
                margin: 10px 0 !important;
            }
            
            #hotSitesPanel.hot-sites-panel.mobile::-webkit-scrollbar-thumb {
                background-color: rgba(126, 87, 255, 0.5) !important;
                border-radius: 10px !important;
            }
            
            #hotSitesPanel.hot-sites-panel.mobile::-webkit-scrollbar-thumb:hover {
                background-color: rgba(126, 87, 255, 0.8) !important;
            }
            
            /* 添加滚动提示 */
            #hotSitesPanel.hot-sites-panel.mobile::after {
                content: "" !important;
                position: absolute !important;
                bottom: 15px !important;
                left: 50% !important;
                transform: translateX(-50%) !important;
                width: 40px !important;
                height: 4px !important;
                background-color: rgba(126, 87, 255, 0.3) !important;
                border-radius: 4px !important;
                opacity: 0.7 !important;
                animation: hotSitesScrollHint 2s infinite !important;
                pointer-events: none !important;
            }
            
            @keyframes hotSitesScrollHint {
                0%, 100% { opacity: 0.3; }
                50% { opacity: 0.8; }
            }
            
            /* 热门站点列表样式优化 */
            #hotSitesPanel .hot-sites-list {
                padding-bottom: 20px !important; /* 为滚动提示预留空间 */
                display: flex !important;
                flex-direction: column !important;
                gap: 7px !important;
            }
            
            /* 移动端交互优化 */
            #hotSitesPanel .hot-site-item {
                padding: 10px 12px !important;
                margin: 4px 0 !important;
                border-radius: 8px !important;
                transition: background-color 0.2s ease, transform 0.2s ease !important;
                background-color: #ffffff !important;
            }
            
            html[data-color-mode="dark"] #hotSitesPanel .hot-site-item {
                background-color: #2d333b !important;
            }
            
            #hotSitesPanel .hot-site-item:active {
                background-color: rgba(126, 87, 255, 0.2) !important;
                transform: scale(0.98) !important;
            }
            
            /* 站点悬停效果微调 */
            #hotSitesPanel .hot-site-item:hover {
                background-color: rgba(126, 87, 255, 0.1) !important;
            }
            
            /* 在移动设备上增加链接区域宽度 */
            #hotSitesPanel .hot-site-link {
                max-width: 170px !important; /* 移动视图增加链接宽度 */
                overflow: hidden !important;
                text-overflow: ellipsis !important;
                white-space: nowrap !important;
            }
        }
        
        @media (max-width: 768px) {
            #hotSitesPanel.hot-sites-panel.mobile {
                width: 240px !important;
                max-height: 65vh !important;
            }
            
            #hotSitesToggleBtn.hot-sites-toggle {
                width: 32px !important;
                height: 70px !important;
                border-radius: 0 20px 20px 0 !important;
                font-size: 16px !important;
            }
            
            #hotSitesToggleBtn.hot-sites-toggle::after {
                font-size: 14px !important;
                letter-spacing: 1px !important;
            }
            
            #hotSitesToggleBtn.hot-sites-toggle:hover {
                width: 36px !important;
            }
            
            #hotSitesToggleBtn.hot-sites-toggle.active {
                width: 32px !important;
            }
            
            #hotSitesPanel .hot-site-link {
                font-size: 13px !important;
                max-width: 150px !important; /* 小屏幕调整链接宽度 */
            }
            
            #hotSitesPanel .hot-site-item {
                padding: 8px 10px !important;
            }
        }
    `;
    
    document.head.appendChild(styleElement);
}

// 清理热门站点元素
function cleanupHotSitesElements() {
    console.log("清理热门站点元素");
    
    // 移除面板
    const panel = DOMUtils.getElement('hotSitesPanel');
    if (panel) {
        panel.parentNode.removeChild(panel);
    }
    
    // 移除按钮
    const btn = DOMUtils.getElement('hotSitesToggleBtn');
    if (btn) {
        btn.parentNode.removeChild(btn);
    }
    
    // 移除样式
    const styles = DOMUtils.getElement('hotSitesStyles');
    if (styles) {
        styles.parentNode.removeChild(styles);
    }
}

// 显示无数据提示
function showNoDataMessage() {
    const hotSitesList = DOMUtils.getElement('hotSitesList');
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
    
    const hotSitesList = DOMUtils.getElement('hotSitesList');
    
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

// 修改全局点击监听器，分离处理逻辑
function setupGlobalClickHandler() {
    // 如果公共模块已加载，使用公共模块的全局点击处理器
    if (window.PanelManager && typeof window.PanelManager.setupGlobalClickHandler === 'function') {
        window.PanelManager.setupGlobalClickHandler();
        return;
    }
    
    console.log('公共工具模块未加载，使用本地全局点击处理器');
    
    // 如果全局点击处理器已经存在，先移除
    if (window.globalOutsideClickHandler) {
        document.removeEventListener('click', window.globalOutsideClickHandler);
    }
    
    // 创建新的点击处理器，只处理热门站点面板
    window.globalOutsideClickHandler = function(e) {
        // 处理热门站点面板
        const hotSitesPanel = document.getElementById('hotSitesPanel');
        const hotSitesBtn = document.getElementById('hotSitesToggleBtn');
        
        if (hotSitesPanel && hotSitesBtn && 
            window.innerWidth <= 1200 && 
            hotSitesPanel.classList.contains('show') && 
            !hotSitesPanel.contains(e.target) && 
            e.target !== hotSitesBtn && 
            !hotSitesBtn.contains(e.target)) {
            // 点击了热门站点面板外部区域，隐藏面板
            hideHotSitesPanel(hotSitesPanel, hotSitesBtn);
            hotSitesBtn.classList.remove('active');
            console.log('全局点击监听器：关闭热门站点面板');
        }
        
        // 处理便捷工具面板 - 前提是这部分代码已加载
        const quickToolsPanel = document.getElementById('quickToolsPanel');
        const quickToolsBtn = document.getElementById('quickToolsToggleBtn');
        
        if (quickToolsPanel && quickToolsBtn && 
            typeof hideQuickToolsPanel === 'function' &&
            window.innerWidth <= 1200 && 
            quickToolsPanel.classList.contains('show') && 
            !quickToolsPanel.contains(e.target) && 
            e.target !== quickToolsBtn && 
            !quickToolsBtn.contains(e.target)) {
            // 点击了便捷工具面板外部区域，隐藏面板 - 使用安全的调用方式
            safeHideQuickToolsPanel(quickToolsPanel, quickToolsBtn);
            console.log('全局点击监听器：关闭便捷工具面板');
        }
    };
    
    // 添加全局点击事件监听
    document.addEventListener('click', window.globalOutsideClickHandler);
    console.log('全局点击监听器已添加（热门站点版本）');
}

// 确保在DOM完全加载后再执行初始化 - 比工具JS更早执行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log("DOM加载完成，初始化热门站点");
        initHotSites();
    });
} else {
    // 如果DOMContentLoaded已经触发，直接初始化
    console.log("DOM已经加载，直接初始化热门站点");
    initHotSites();
}

// 立即执行初始化，确保早于工具JS执行
console.log("立即初始化热门站点，确保在工具JS之前执行");
initHotSites();

// 为了确保脚本能够执行，添加一个延迟的初始化调用
setTimeout(function() {
    console.log("延迟初始化热门站点 - 检查是否已初始化");
    // 确保只初始化一次
    if (!HotSites.state.isInitialized) {
        console.log("热门站点尚未初始化，执行延迟初始化");
        initHotSites();
    } else {
        console.log("热门站点已初始化，跳过延迟初始化");
        // 仍然更新按钮位置，确保UI正确
        updateHotSitesButtonPosition();
    }
}, 300); // 较短的延迟，确保在工具JS之前执行

// 更新热门站点按钮的位置
function updateHotSitesButtonPosition() {
    const hotSitesBtn = DOMUtils.getElement('hotSitesToggleBtn');
    if (!hotSitesBtn) return;
    
    const isMobile = window.UIState?.device.isMobile || window.innerWidth <= 1200;
    
    if (isMobile) {
        // 在小屏幕上强制显示按钮 - 确保按钮可见
        hotSitesBtn.style.position = 'fixed';
        hotSitesBtn.style.top = '50%'; // 与工具按钮保持相同垂直位置
        hotSitesBtn.style.transform = 'translateY(-50%)';
        hotSitesBtn.style.left = '0';
        hotSitesBtn.style.right = 'auto';
        hotSitesBtn.style.bottom = 'auto';
        hotSitesBtn.style.borderRadius = '0 24px 24px 0'; // 右侧为半圆形，左侧贴边
        hotSitesBtn.style.zIndex = '9980'; // 确保比工具按钮高一级
        
        // 强制显示按钮
        hotSitesBtn.style.display = 'flex';
        hotSitesBtn.style.visibility = 'visible';
        hotSitesBtn.style.opacity = '1';
        hotSitesBtn.style.width = '36px';
        hotSitesBtn.style.height = '80px';
        hotSitesBtn.style.writingMode = 'vertical-rl';
        hotSitesBtn.style.textOrientation = 'mixed';
        hotSitesBtn.style.background = 'linear-gradient(90deg, #7e57ff, #9165ff)';
        hotSitesBtn.style.color = 'white';
        hotSitesBtn.style.boxShadow = '2px 0 10px rgba(0, 0, 0, 0.2)';
        hotSitesBtn.style.border = 'none';
        hotSitesBtn.style.fontSize = '16px';
        hotSitesBtn.style.fontWeight = 'bold';
        hotSitesBtn.style.letterSpacing = '2px';
        hotSitesBtn.style.alignItems = 'center';
        hotSitesBtn.style.justifyContent = 'center';
        
        // 如果是小屏幕，稍微调整尺寸
        if (window.innerWidth <= 768) {
            hotSitesBtn.style.borderRadius = '0 20px 20px 0';
            hotSitesBtn.style.width = '32px';
            hotSitesBtn.style.height = '70px';
            hotSitesBtn.style.fontSize = '14px';
        }
    } else {
        // 大屏幕上隐藏按钮
        hotSitesBtn.style.display = 'none';
        hotSitesBtn.style.visibility = 'hidden';
    }
}

// 确保热门站点按钮在小屏幕上始终可见的函数
function ensureButtonVisibility() {
    console.log('确保热门站点按钮可见 - 开始');
    
    // 如果不是小屏幕，不需要处理
    if (!window.UIState?.device.isMobile && window.innerWidth > 1200) {
        console.log('大屏幕模式，无需确保按钮可见');
        return;
    }
    
    // 查找热门站点按钮
    let hotSitesBtn = DOMUtils.getElement('hotSitesToggleBtn');
    
    // 如果按钮不存在，创建一个新的
    if (!hotSitesBtn) {
        console.log('热门站点按钮不存在，尝试创建');
        if (typeof createToggleButton === 'function') {
            hotSitesBtn = createToggleButton();
            console.log('已创建热门站点按钮');
        } else {
            console.error('无法创建热门站点按钮：createToggleButton函数不可用');
            return;
        }
    }
    
    // 检查按钮是否在DOM中
    if (!document.body.contains(hotSitesBtn)) {
        console.log('热门站点按钮不在DOM中，重新添加');
        document.body.appendChild(hotSitesBtn);
    }
    
    // 确保按钮可见
    hotSitesBtn.style.display = 'flex';
    hotSitesBtn.style.visibility = 'visible';
    hotSitesBtn.style.opacity = '1';
    
    // 如果是移动设备，确保按钮位置正确
    updateHotSitesButtonPosition();
    
    console.log('确保热门站点按钮可见 - 完成');
    return hotSitesBtn;
}

// 暴露函数到全局作用域，以便其他脚本可以调用
window.ensureButtonVisibility = ensureButtonVisibility; 
