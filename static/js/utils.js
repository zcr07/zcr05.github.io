// 公共工具模块 - 为热门站点和便捷工具提供共享功能
// 用于消除重复代码并提高性能

// 全局UI状态管理
window.UIState = {
    // 面板状态
    panels: {
        hotSites: {
            isVisible: false,
            lastToggled: 0
        },
        quickTools: {
            isVisible: false,
            lastToggled: 0
        }
    },
    
    // 设备检测
    device: {
        isMobile: window.innerWidth <= 1200,
        isDesktop: window.innerWidth > 1200,
        isFirefox: navigator.userAgent.toLowerCase().indexOf('firefox') > -1,
        isEdge: navigator.userAgent.toLowerCase().indexOf('edg') > -1,
        isChrome: navigator.userAgent.toLowerCase().indexOf('chrome') > -1 && navigator.userAgent.toLowerCase().indexOf('edg') === -1
    },
    
    // 环境检测
    environment: {
        isLocalEnv: window.location.protocol === 'file:' || 
                    window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1',
        domain: window.location.origin,
        hasToc: false // 将在初始化时检测
    },
    
    // 主题状态
    theme: {
        isDark: document.documentElement.getAttribute('data-color-mode') === 'dark'
    }
};

// DOM工具函数
const DOMUtils = {
    // 检查元素是否存在
    elementExists: function(selector) {
        return document.querySelector(selector) !== null;
    },
    
    // 安全地获取元素
    getElement: function(id) {
        return document.getElementById(id);
    },
    
    // 检查页面是否存在目录
    checkTocExistence: function() {
        // 检查常见的目录元素
        const tocSelectors = [
            '.toc', 
            '#toc', 
            '.table-of-contents', 
            '#table-of-contents',
            '.post-toc',
            '.article-toc',
            '.markdown-toc',
            '.mobile-toc-btn',
            '[data-role="toc"]',
            '.sidebar-toc'
        ];
        
        // 搜索所有可能的目录元素
        for (const selector of tocSelectors) {
            if (this.elementExists(selector)) {
                console.log(`检测到目录元素: ${selector}`);
                return true;
            }
        }
        
        // 额外检查是否有通过移动端目录按钮
        if (this.elementExists('.mobile-toc-btn, .toc-mobile-btn, .btn-toc, [data-role="toc-btn"]')) {
            console.log('检测到移动端目录按钮');
            return true;
        }
        
        console.log('未检测到目录元素');
        return false;
    },
    
    // 安全地添加事件监听器（避免重复）
    safeAddEventListener: function(element, event, handler, handlerId) {
        if (!element) return false;
        
        // 使用自定义属性跟踪已添加的监听器
        const handlerKey = `data-handler-${handlerId || event}`;
        
        // 如果已经添加过相同的处理函数，则先移除
        if (element.hasAttribute(handlerKey)) {
            const oldHandlerId = element.getAttribute(handlerKey);
            if (typeof window[oldHandlerId] === 'function') {
                element.removeEventListener(event, window[oldHandlerId]);
            }
        }
        
        // 生成唯一的处理函数ID
        const uniqueHandlerId = `handler_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        
        // 存储处理函数到全局变量，以便稍后可以移除
        window[uniqueHandlerId] = handler;
        
        // 添加事件监听器
        element.addEventListener(event, handler);
        
        // 标记元素已添加此事件处理函数
        element.setAttribute(handlerKey, uniqueHandlerId);
        
        return true;
    },
    
    // 创建观察器合集 - 减少重复创建MutationObserver
    observers: {
        theme: null,
        body: null
    },
    
    // 单例模式创建主题观察器
    getThemeObserver: function(callback) {
        if (!this.observers.theme) {
            this.observers.theme = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.attributeName === 'data-color-mode') {
                        const isDark = document.documentElement.getAttribute('data-color-mode') === 'dark';
                        window.UIState.theme.isDark = isDark;
                        callback(isDark);
                    }
                });
            });
        }
        return this.observers.theme;
    }
};

// 面板管理工具
const PanelManager = {
    // 安全地隐藏热门站点面板
    hideHotSitesPanel: function() {
        const panel = DOMUtils.getElement('hotSitesPanel');
        const btn = DOMUtils.getElement('hotSitesToggleBtn');
        
        if (!panel) return false;
        
        console.log('隐藏热门站点面板');
        
        // 更新状态
        window.UIState.panels.hotSites.isVisible = false;
        
        // 隐藏面板
        panel.classList.remove('show');
        
        if (window.UIState.device.isMobile) {
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
            btn.classList.remove('active');
        }
        
        // 延迟设置display:none，与CSS过渡时间匹配
        setTimeout(() => {
            if (!panel.classList.contains('show')) {
                panel.style.display = 'none';
                console.log('热门站点面板已隐藏');
            }
        }, 300);
        
        return true;
    },
    
    // 安全地隐藏便捷工具面板
    hideQuickToolsPanel: function() {
        const panel = DOMUtils.getElement('quickToolsPanel');
        const btn = DOMUtils.getElement('quickToolsToggleBtn');
        
        if (!panel) return false;
        
        console.log('隐藏便捷工具面板');
        
        // 更新状态
        window.UIState.panels.quickTools.isVisible = false;
        
        // 隐藏面板
        panel.classList.remove('show');
        
        if (window.UIState.device.isMobile) {
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
            btn.classList.remove('active');
        }
        
        // 延迟设置display:none，与CSS过渡时间匹配
        setTimeout(() => {
            if (!panel.classList.contains('show')) {
                panel.style.display = 'none';
                console.log('便捷工具面板已隐藏');
            }
        }, 300);
        
        return true;
    },
    
    // 设置统一的全局点击处理器，避免重复
    setupGlobalClickHandler: function() {
        // 移除之前的点击处理器(如果存在)
        if (window.documentGlobalClickHandler) {
            document.removeEventListener('click', window.documentGlobalClickHandler);
        }
        
        // 创建新的统一点击处理器
        window.documentGlobalClickHandler = function(event) {
            // 防止处理特殊元素的点击
            if (event.target.closest('.no-click-outside')) {
                return;
            }
            
            // 处理热门站点面板点击外部
            const hotSitesPanel = DOMUtils.getElement('hotSitesPanel');
            const hotSitesBtn = DOMUtils.getElement('hotSitesToggleBtn');
            
            if (hotSitesPanel && hotSitesBtn && 
                window.UIState.device.isMobile && 
                window.UIState.panels.hotSites.isVisible && 
                !hotSitesPanel.contains(event.target) && 
                !hotSitesBtn.contains(event.target)) {
                // 点击了热门站点面板外部区域，隐藏面板
                PanelManager.hideHotSitesPanel();
                console.log('全局点击监听器：关闭热门站点面板');
            }
            
            // 处理便捷工具面板点击外部
            const quickToolsPanel = DOMUtils.getElement('quickToolsPanel');
            const quickToolsBtn = DOMUtils.getElement('quickToolsToggleBtn');
            
            if (quickToolsPanel && quickToolsBtn && 
                window.UIState.device.isMobile && 
                window.UIState.panels.quickTools.isVisible && 
                !quickToolsPanel.contains(event.target) && 
                !quickToolsBtn.contains(event.target)) {
                // 点击了便捷工具面板外部区域，隐藏面板
                PanelManager.hideQuickToolsPanel();
                console.log('全局点击监听器：关闭便捷工具面板');
            }
            
            // 触发插件管理器的点击事件，让各插件自行处理
            if (window.PluginManager && typeof window.PluginManager.triggerEvent === 'function') {
                window.PluginManager.triggerEvent('documentClick', {
                    event: event,
                    target: event.target
                });
            }
        };
        
        // 添加全局点击处理器
        document.addEventListener('click', window.documentGlobalClickHandler);
        console.log('统一全局点击处理器已设置');
        
        return true;
    }
};

// 响应式设计工具
const ResponsiveUtils = {
    // 检测设备类型并更新状态
    updateDeviceStatus: function() {
        const isMobile = window.innerWidth <= 1200;
        const wasChanged = window.UIState.device.isMobile !== isMobile;
        
        window.UIState.device.isMobile = isMobile;
        window.UIState.device.isDesktop = !isMobile;
        
        if (wasChanged) {
            console.log(`设备类型变更为: ${isMobile ? '移动设备' : '桌面设备'}`);
            
            // 触发自定义事件通知设备类型变化
            window.dispatchEvent(new CustomEvent('deviceTypeChanged', {
                detail: { isMobile, isDesktop: !isMobile }
            }));
        }
        
        return wasChanged;
    },
    
    // 设置响应式行为基础 - 窗口大小变化处理
    setupResponsiveBase: function() {
        // 防止重复添加事件监听器
        if (window._responsiveBaseSetup) return;
        
        // 使用节流函数减少不必要的处理
        let resizeTimeout;
        
        const handleResize = function() {
            // 更新设备状态
            ResponsiveUtils.updateDeviceStatus();
            
            // 触发窗口大小变化事件
            window.dispatchEvent(new CustomEvent('uiResize', { 
                detail: { 
                    width: window.innerWidth, 
                    height: window.innerHeight,
                    isMobile: window.UIState.device.isMobile,
                    isDesktop: window.UIState.device.isDesktop
                } 
            }));
        };
        
        // 添加resize事件监听器（带节流）
        window.addEventListener('resize', function() {
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            
            resizeTimeout = setTimeout(handleResize, 100);
        });
        
        // 标记为已设置
        window._responsiveBaseSetup = true;
        
        // 初始执行一次
        handleResize();
        
        console.log('响应式基础行为已设置');
    }
};

// 初始化函数
function initUtils() {
    console.log('初始化公共工具模块');
    
    // 检查目录存在性并存储
    window.UIState.environment.hasToc = DOMUtils.checkTocExistence();
    console.log(`目录状态：${window.UIState.environment.hasToc ? '存在' : '不存在'}`);
    
    // 设置响应式基础
    ResponsiveUtils.setupResponsiveBase();
    
    // 设置全局点击处理器
    PanelManager.setupGlobalClickHandler();
    
    // 导出函数到全局命名空间
    window.DOMUtils = DOMUtils;
    window.PanelManager = PanelManager;
    window.ResponsiveUtils = ResponsiveUtils;
    
    console.log('公共工具模块初始化完成');
}

// 在DOM加载完成时初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUtils);
} else {
    // 如果DOM已加载，立即初始化
    initUtils();
}

// 立即执行初始化
initUtils(); 