// main.js
window.addEventListener('load', function() {
    // 确保背景元素存在并且正确覆盖整个页面
    ensureBackgroundElement();

    // 增强背景动画
    enhanceBackgroundAnimation();
    
    // 监听滚动事件，确保滚动时背景正常显示
    window.addEventListener('scroll', handleScrollForBackground, { passive: true });
});

document.addEventListener('DOMContentLoaded', function() {
    // SVG图标定义
    var IconList = {
        'sun': 'M8 10.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM8 12a4 4 0 100-8 4 4 0 000 8zM8 0a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V.75A.75.75 0 018 0zm0 13a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 018 13zM2.343 2.343a.75.75 0 011.061 0l1.06 1.061a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zm9.193 9.193a.75.75 0 011.06 0l1.061 1.06a.75.75 0 01-1.06 1.061l-1.061-1.06a.75.75 0 010-1.061zM16 8a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0116 8zM3 8a.75.75 0 01-.75.75H.75a.75.75 0 010-1.5h1.5A.75.75 0 013 8zm10.657-5.657a.75.75 0 010 1.061l-1.061 1.06a.75.75 0 11-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zm-9.193 9.193a.75.75 0 010 1.06l-1.06 1.061a.75.75 0 11-1.061-1.06l1.06-1.061a.75.75 0 011.061 0z',
        'moon': 'M9.598 1.591a.75.75 0 01.785-.175 7 7 0 11-8.967 8.967.75.75 0 01.961-.96 5.5 5.5 0 007.046-7.046.75.75 0 01.175-.786zm1.616 1.945a7 7 0 01-7.678 7.678 5.5 5.5 0 107.678-7.678z',
        'sync': 'M1.705 8.005a.75.75 0 0 1 .834.656 5.5 5.5 0 0 0 9.592 2.97l-1.204-1.204a.25.25 0 0 1 .177-.427h3.646a.25.25 0 0 1 .25.25v3.646a.25.25 0 0 1-.427.177l-1.38-1.38A7.002 7.002 0 0 1 1.05 8.84a.75.75 0 0 1 .656-.834ZM8 2.5a5.487 5.487 0 0 0-4.131 1.869l1.204 1.204A.25.25 0 0 1 4.896 6H1.25A.25.25 0 0 1 1 5.75V2.104a.25.25 0 0 1 .427-.177l1.38 1.38A7.002 7.002 0 0 1 14.95 7.16a.75.75 0 0 1-1.49.178A5.5 5.5 0 0 0 8 2.5Z',
        'home': 'M6.906.664a1.749 1.749 0 0 1 2.187 0l5.25 4.2c.415.332.657.835.657 1.367v7.019A1.75 1.75 0 0 1 13.25 15h-3.5a.75.75 0 0 1-.75-.75V9H7v5.25a.75.75 0 0 1-.75.75h-3.5A1.75 1.75 0 0 1 1 13.25V6.23c0-.531.242-1.034.657-1.366l5.25-4.2Zm1.25 1.171a.25.25 0 0 0-.312 0l-5.25 4.2a.25.25 0 0 0-.094.196v7.019c0 .138.112.25.25.25H5.5V8.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 .75.75v5.25h2.75a.25.25 0 0 0 .25-.25V6.23a.25.25 0 0 0-.094-.195Z',
        'search': 'M15.7 13.3l-3.81-3.83A5.93 5.93 0 0 0 13 6c0-3.31-2.69-6-6-6S1 2.69 1 6s2.69 6 6 6c1.3 0 2.48-.41 3.47-1.11l3.83 3.81c.19.2.45.3.7.3.25 0 .52-.09.7-.3a.996.996 0 0 0 0-1.41v.01zM7 10.7c-2.59 0-4.7-2.11-4.7-4.7 0-2.59 2.11-4.7 4.7-4.7 2.59 0 4.7 2.11 4.7 4.7 0 2.59-2.11 4.7-4.7 4.7z',
        'rss': 'M2.002 2.725a.75.75 0 0 1 .797-.699C8.79 2.42 13.58 7.21 13.974 13.201a.75.75 0 0 1-1.497.098 10.502 10.502 0 0 0-9.776-9.776.747.747 0 0 1-.7-.798ZM2.84 7.05h-.002a7.002 7.002 0 0 1 6.113 6.111.75.75 0 0 1-1.49.178 5.503 5.503 0 0 0-4.8-4.8.75.75 0 0 1 .179-1.489ZM2 13a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z',
        'github': 'M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z',
        'music': 'M8 14.25A3.25 3.25 0 0 1 4.75 11V4.56l9.5-1.54v5.73a1.75 1.75 0 1 0 1-1.58V2a.75.75 0 0 0-.88-.74l-11 1.79A.75.75 0 0 0 2.5 3.8v5.7a3.25 3.25 0 1 0 1.5 2.75.05.05 0 0 0 0-.01v-4.6l9-1.46v4.52A3.25 3.25 0 0 1 8 14.25Z',
        'post': 'M0 3.75C0 2.784.784 2 1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25Zm1.75-.25a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25v-8.5a.25.25 0 0 0-.25-.25ZM3.5 6.25a.75.75 0 0 1 .75-.75h7a.75.75 0 0 1 0 1.5h-7a.75.75 0 0 1-.75-.75Zm.75 2.25h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1 0-1.5Z',
        'about': 'M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z',
        'contact': 'M0 4C0 1.79086 1.79086 0 4 0H12C14.2091 0 16 1.79086 16 4V8C16 10.2091 14.2091 12 12 12H8L4 16V12H4C1.79086 12 0 10.2091 0 8V4ZM4 3C4 3.55228 4.44772 4 5 4H11C11.5523 4 12 3.55228 12 3C12 2.44772 11.5523 2 11 2H5C4.44772 2 4 2.44772 4 3ZM5 7C4.44772 7 4 7.44772 4 8C4 8.55228 4.44772 9 5 9H9C9.55228 9 10 8.55228 10 8C10 7.44772 9.55228 7 9 7H5Z',
        'friends': 'M7.84 1.804A.75.75 0 018.25 1.5h5.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75h-1.5a.75.75 0 110-1.5h.75v-6h-4.5v3a.75.75 0 01-.75.75h-3v.75h.75a.75.75 0 110 1.5h-1.5a.75.75 0 01-.75-.75v-5.5a.75.75 0 01.225-.53l2.5-2.25z M1.5 8.5a3 3 0 116 0 3 3 0 01-6 0zm3-2a2 2 0 100 4 2 2 0 000-4zm8.634-3.635a.75.75 0 00-1.06 0l-.97.97-.97-.97a.75.75 0 00-1.06 1.06l.97.97-.97.97a.75.75 0 101.06 1.06l.97-.97.97.97a.75.75 0 101.06-1.06l-.97-.97.97-.97a.75.75 0 000-1.06z'
    };
    
    // 从 localStorage 获取主题设置或使用默认值
    var savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-color-mode', savedTheme);
    
    // 创建单一背景
    createSingleBackground();
    
    // 确保SVG图标正确填充颜色
    var svgPaths = document.querySelectorAll('svg path');
    svgPaths.forEach(path => {
        path.setAttribute('fill', 'currentColor');
    });
    
    // 设置所有预定义的SVG图标路径
    if (document.getElementById('pathSearch')) {
        document.getElementById('pathSearch').setAttribute('d', IconList['search']);
    }
    if (document.getElementById('pathHome')) {
        document.getElementById('pathHome').setAttribute('d', IconList['home']);
    }
    if (document.getElementById('pathRSS')) {
        document.getElementById('pathRSS').setAttribute('d', IconList['rss']);
    }
    if (document.getElementById('themeSwitch')) {
        document.getElementById('themeSwitch').setAttribute('d', savedTheme === 'light' ? IconList['moon'] : IconList['sun']);
    }
    if (document.getElementById('music')) {
        document.getElementById('music').setAttribute('d', IconList['music']);
    }
    if (document.getElementById('github')) {
        document.getElementById('github').setAttribute('d', IconList['github']);
    }
    
    // 设置帖子图标
    var iconPost = document.getElementsByClassName('svgTop0');
    for (var i = 0; i < iconPost.length; i++) {
        iconPost[i].setAttribute('d', IconList['post']);
    }
    
    // 添加页面淡入效果
    document.body.style.opacity = 0;
    setTimeout(function() {
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = 1;
    }, 100);
    
    // 添加标签链接点击处理，确保可点击
    setupTagClickHandlers();
    
    // 强制应用列表样式
    forceApplyListStyles();
    
    // 设置定时器，确保样式完全应用
    setTimeout(forceApplyListStyles, 500);
});

// 处理标签链接点击
function setupTagClickHandlers() {
    var labelLinks = document.querySelectorAll('.Label a, .LabelName a');
    labelLinks.forEach(function(link) {
        if (!link.hasAttribute('data-click-setup')) {
            link.addEventListener('click', function(e) {
                e.stopPropagation();
                if (this.getAttribute('href')) {
                    window.location.href = this.getAttribute('href');
                }
            }, true);
            link.setAttribute('data-click-setup', 'true');
        }
    });
}

// 处理滚动时确保背景正常显示
function handleScrollForBackground() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.min(scrollY / pageHeight, 1);
    
    // 基于滚动位置调整背景效果
    const fixedBg = document.getElementById('fixed-background');
    if (fixedBg) {
        // 轻微调整透明度
        fixedBg.style.opacity = 1 - (scrollPercent * 0.1);
    }
}

// 创建单一背景（替换多个背景创建函数）
function createSingleBackground() {
    // 移除所有现有背景元素
    const existingBgElements = document.querySelectorAll('#fixed-background, #page-background, #stars-container, #background-container');
    existingBgElements.forEach(el => el && el.parentNode && el.parentNode.removeChild(el));
    
    // 创建新的固定背景
    const fixedBg = document.createElement('div');
    fixedBg.id = 'fixed-background';
    fixedBg.style.cssText = `
        position: fixed;
        z-index: -999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--global-bg, #ddd6ff); /* 更接近图片的淡紫色背景 */
        overflow: hidden !important;
        pointer-events: none;
    `;
    
    // 添加渐变效果的伪元素样式
    const gradientStyle = document.createElement('style');
    gradientStyle.textContent = `
        #fixed-background::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(221, 214, 255, 0.9), rgba(200, 190, 255, 0.7)); /* 更接近图片的淡紫色渐变 */
            z-index: -998;
            pointer-events: none;
        }
        
        /* 博客标题动画 */
        @keyframes gradient {
            0% { background-position: 0% center; }
            50% { background-position: 100% center; }
            100% { background-position: 0% center; }
        }
        
        .blogTitle {
            background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            background-size: 200% auto;
            animation: gradient 5s ease infinite;
        }
    `;
    
    document.head.appendChild(gradientStyle);
    document.body.parentNode.insertBefore(fixedBg, document.body);
    
    // 确保页面的最小高度为视口高度
    document.documentElement.style.minHeight = '100vh';
    document.body.style.minHeight = '100vh';
    
    // 设置背景处理事件
    setupBackgroundEvents();
}

// 设置背景相关事件
function setupBackgroundEvents() {
    // 页面完全加载后确保背景正确
    window.addEventListener('load', function() {
        // 确保页面底部背景覆盖
        document.documentElement.style.minHeight = '100vh';
        document.body.style.minHeight = '100vh';
    });
    
    // 监听窗口大小变化
    window.addEventListener('resize', function() {
        // 确保页面底部背景覆盖
        document.documentElement.style.minHeight = '100vh';
        document.body.style.minHeight = '100vh';
    });
    
    // 确保主题切换时背景保持
    window.addEventListener('theme-changed', function() {
        setTimeout(function() {
            // 确保页面底部背景覆盖
            document.documentElement.style.minHeight = '100vh';
            document.body.style.minHeight = '100vh';
        }, 100);
    });
}

// 确保列表元素应用了正确的样式，但不修改标签样式
function forceApplyListStyles() {
    // 特别针对Gmeek博客系统的文章列表项
    const gmeekSelectors = [
        '.Box-row',                 // 标准GitHub风格
        '#indexPostsList > div',    // Gmeek首页文章列表
        'tr.post-item',             // Gmeek表格样式列表
        '.post-list > div',         // 其他可能的文章列表容器
        '.post',                    // 通用文章类
        '.d-flex'                   // Gmeek常用的flex布局容器
    ];
    
    // 合并选择器为一个查询字符串
    const allRowsSelector = gmeekSelectors.join(', ');
    
    // 查找所有可能的列表项元素
    const allRows = document.querySelectorAll(allRowsSelector);
    
    // 为所有可能的列表项应用样式
    allRows.forEach(function(row, index) {
        applyListHoverStyle(row, index);
    });
}

// 为单个元素应用悬停样式
function applyListHoverStyle(element, index) {
    // 跳过已处理的元素
    if (element.hasAttribute('data-hover-styled')) {
        return;
    }
    
    // 标记元素为已处理
    element.setAttribute('data-hover-styled', 'true');
    
    // 添加特定类名便于样式选择
    element.classList.add('list-hover-effect');
    
    // 设置基本样式和过渡效果
    element.style.transition = 'all 0.3s ease-in-out';
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.style.borderRadius = '8px';
    element.style.marginBottom = '10px';
    
    // 根据索引添加不同的左侧边框颜色
    if (index % 3 === 0) {
        element.style.borderLeft = '3px solid var(--primary-color)';
    } else if (index % 3 === 1) {
        element.style.borderLeft = '3px solid var(--secondary-color)';
    } else {
        element.style.borderLeft = '3px solid var(--accent-color)';
    }
    
    // 添加鼠标进入事件监听
    element.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 6px 14px rgba(0, 0, 0, 0.1)';
        
        // 增加边框宽度
        if (index % 3 === 0) {
            this.style.borderLeft = '6px solid var(--primary-color)';
        } else if (index % 3 === 1) {
            this.style.borderLeft = '6px solid var(--secondary-color)';
        } else {
            this.style.borderLeft = '6px solid var(--accent-color)';
        }
    });
    
    // 添加鼠标离开事件监听
    element.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
        
        // 恢复边框宽度
        if (index % 3 === 0) {
            this.style.borderLeft = '3px solid var(--primary-color)';
        } else if (index % 3 === 1) {
            this.style.borderLeft = '3px solid var(--secondary-color)';
        } else {
            this.style.borderLeft = '3px solid var(--accent-color)';
        }
    });
}

// 添加复制代码功能
document.addEventListener('DOMContentLoaded', function() {
    var preElements = document.querySelectorAll('pre');
    
    preElements.forEach(function(preElement) {
        // 创建复制按钮
        var copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.textContent = '复制';
        copyButton.style.position = 'absolute';
        copyButton.style.top = '5px';
        copyButton.style.right = '5px';
        copyButton.style.padding = '4px 8px';
        copyButton.style.background = 'rgba(126, 87, 255, 0.8)';
        copyButton.style.color = 'white';
        copyButton.style.border = 'none';
        copyButton.style.borderRadius = '3px';
        copyButton.style.fontSize = '12px';
        copyButton.style.cursor = 'pointer';
        copyButton.style.opacity = '0';
        copyButton.style.transition = 'opacity 0.2s';
        
        // 设置预格式化元素样式
        preElement.style.position = 'relative';
        preElement.style.overflow = 'hidden';
        preElement.style.borderRadius = '6px';
        preElement.style.border = '1px solid rgba(126, 87, 255, 0.2)';
        
        // 添加悬停显示复制按钮
        preElement.addEventListener('mouseenter', function() {
            copyButton.style.opacity = '1';
        });
        
        preElement.addEventListener('mouseleave', function() {
            copyButton.style.opacity = '0';
        });
        
        // 添加复制功能
        copyButton.addEventListener('click', function() {
            // 获取代码内容
            var codeElement = preElement.querySelector('code');
            var textToCopy = codeElement ? codeElement.textContent : preElement.textContent;
            
            // 复制到剪贴板
            navigator.clipboard.writeText(textToCopy).then(function() {
                copyButton.textContent = '已复制!';
                copyButton.style.background = 'rgba(40, 167, 69, 0.8)';
                
                // 延迟恢复原样
                setTimeout(function() {
                    copyButton.textContent = '复制';
                    copyButton.style.background = 'rgba(126, 87, 255, 0.8)';
                }, 2000);
            }).catch(function(err) {
                console.error('无法复制文本: ', err);
                copyButton.textContent = '复制失败';
                copyButton.style.background = 'rgba(220, 53, 69, 0.8)';
                
                // 延迟恢复原样
                setTimeout(function() {
                    copyButton.textContent = '复制';
                    copyButton.style.background = 'rgba(126, 87, 255, 0.8)';
                }, 2000);
            });
        });
        
        // 将按钮添加到预格式化元素
        preElement.appendChild(copyButton);
    });
});

// 主题切换功能
function modeSwitch() {
    var html = document.documentElement;
    var currentTheme = html.getAttribute('data-color-mode');
    var newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // 添加过渡动画类
    document.body.classList.add('theme-transition');
    
    // 设置新主题
    html.setAttribute('data-color-mode', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // 更新主题图标
    var themeSwitch = document.getElementById('themeSwitch');
    if (themeSwitch) {
        themeSwitch.setAttribute('d', newTheme === 'light' ? IconList['moon'] : IconList['sun']);
    }
    
    // 移除过渡动画类
    setTimeout(function() {
        document.body.classList.remove('theme-transition');
    }, 500);
    
    // 强制重新应用列表样式
    setTimeout(forceApplyListStyles, 300);
    
    // 触发主题变更事件
    window.dispatchEvent(new Event('theme-changed'));
}

// 添加语言切换
function toggleZhCn() {
    var elements = document.querySelectorAll('.lang-zhcn');
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        if (element.style.display === 'none') {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    }
}