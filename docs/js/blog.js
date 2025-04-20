// main.js
window.addEventListener('load', function() {
    // 确保背景元素存在
    createStaticBackground();
});

document.addEventListener('DOMContentLoaded', function() {
    // 创建静态背景
    createStaticBackground();
    
    // 从localStorage获取主题设置
    var savedTheme = localStorage.getItem('meek_theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-color-mode', savedTheme);
    } else {
        // 默认使用亮色主题
        document.documentElement.setAttribute('data-color-mode', 'light');
    }
    
    // 强制应用根元素和body的背景颜色
    document.documentElement.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--global-bg');
    document.body.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--global-bg');
    
    // 强制设置postBody中的h标签margin和padding为0
    injectHeadingStyles();
    
    // 添加鼠标特效
    setupMouseEffect();
    
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
    
    // 创建静态背景元素
    createStaticBackground();
    
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
    
    // 增强列表项悬停效果
    enhanceListHoverEffects();
    
    // 添加阅读计数功能
    createVercount();
    var element = document.createElement('script');
    element.src = 'https://vercount.one/js';
    document.head.appendChild(element);
    console.log("\n %c GmeekVercount Plugins https://github.com/Meekdai/Gmeek \n","padding:5px 0;background:#bc4c00;color:#fff");
    
    // 设置定时器，确保样式完全应用
    setTimeout(function() {
        forceApplyListStyles();
        enhanceListHoverEffects(); // 再次调用以确保应用
    }, 500);
    
    // 在窗口加载完成后再次强制应用样式
    window.addEventListener('load', function() {
        forceApplyListStyles();
        enhanceListHoverEffects(); // 在load事件中也调用
        injectHeadingStyles(); // 确保在页面完全加载后再次注入h标签样式
    });
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

// 创建静态背景
function createStaticBackground() {
    // 移除任何可能存在的旧背景
    const oldBackground = document.getElementById('static-background');
    if (oldBackground) {
        oldBackground.parentNode.removeChild(oldBackground);
    }
}


// 检测是否为移动设备
function isMobileDevice() {
    return (window.innerWidth <= 768) || 
           (navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/webOS/i) ||
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/iPod/i) ||
            navigator.userAgent.match(/BlackBerry/i) ||
            navigator.userAgent.match(/Windows Phone/i));
}

// 简化的列表样式函数
function forceApplyListStyles() {
    // 创建新样式
    if (!document.getElementById('simple-list-styles')) {
        const listStyle = document.createElement('style');
        listStyle.id = 'simple-list-styles';
        listStyle.textContent = `
            /* 统一列表项样式 */
            .Box-row, .d-flex, #indexPostsList > div, tr.post-item, .post-item, 
            body > div.container-lg > div.container-lg > div.Box,
            body > div.container-lg > div.container-lg > div > div,
            #blog-container > div,
            main > div > div,
            [id*="post"] {
                position: relative !important;
                display: block !important;
                margin: 15px 0 !important;
                padding: 16px !important;
                background-color: rgba(25, 25, 49, 0.85) !important;
                border: 1px solid rgba(126, 87, 255, 0.3) !important;
                border-radius: 12px !important;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05) !important;
                z-index: 2 !important;
                transition: all 0.25s ease-out !important;
            }
            
            /* 暗色模式 */
            html[data-color-mode="dark"] .Box-row,
            html[data-color-mode="dark"] .d-flex, 
            html[data-color-mode="dark"] #indexPostsList > div, 
            html[data-color-mode="dark"] tr.post-item,
            html[data-color-mode="dark"] .post-item,
            html[data-color-mode="dark"] body > div.container-lg > div.container-lg > div.Box,
            html[data-color-mode="dark"] body > div.container-lg > div.container-lg > div > div,
            html[data-color-mode="dark"] #blog-container > div,
            html[data-color-mode="dark"] main > div > div,
            html[data-color-mode="dark"] [id*="post"] {
                background-color: rgba(18, 18, 42, 0.8) !important;
                border: 1px solid rgba(126, 87, 255, 0.3) !important;
            }
            
            /* 亮色模式 */
            html[data-color-mode="light"] .Box-row,
            html[data-color-mode="light"] .d-flex, 
            html[data-color-mode="light"] #indexPostsList > div, 
            html[data-color-mode="light"] tr.post-item,
            html[data-color-mode="light"] .post-item,
            html[data-color-mode="light"] body > div.container-lg > div.container-lg > div.Box,
            html[data-color-mode="light"] body > div.container-lg > div.container-lg > div > div,
            html[data-color-mode="light"] #blog-container > div,
            html[data-color-mode="light"] main > div > div,
            html[data-color-mode="light"] [id*="post"] {
                background-color: rgba(255, 255, 255, 0.98) !important;
                border: 1px solid rgba(3, 102, 214, 0.2) !important;
            }
            
            /* 简单悬停效果 */
            .Box-row:hover, .d-flex:hover, #indexPostsList > div:hover, tr.post-item:hover, 
            .post-item:hover,
            body > div.container-lg > div.container-lg > div.Box:hover,
            body > div.container-lg > div.container-lg > div > div:hover,
            #blog-container > div:hover,
            main > div > div:hover,
            [id*="post"]:hover {
                box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1) !important;
                border-left: 4px solid var(--primary-color) !important;
                padding-left: 13px !important;
            }
            
            /* 确保链接可见 */
            a {
                position: relative !important;
                z-index: 3 !important;
                text-decoration: none !important;
            }
            
            /* 标签样式 */
            .Label, .labels, .tag, .tags {
                display: inline-block !important;
                border-radius: 10px !important;
                padding: 4px 8px !important;
                margin: 2px !important;
            }
            
            /* 文本清晰度 */
            * {
                -webkit-font-smoothing: antialiased !important;
                -moz-osx-font-smoothing: grayscale !important;
                text-rendering: optimizeLegibility !important;
            }
            
            /* 移动设备响应式样式 */
            @media (max-width: 768px) {
                .Box-row, .d-flex, #indexPostsList > div, tr.post-item, .post-item, 
                body > div.container-lg > div.container-lg > div.Box,
                body > div.container-lg > div.container-lg > div > div,
                #blog-container > div,
                main > div > div,
                [id*="post"] {
                    padding: 12px !important;
                    margin: 10px 0 !important;
                }
                
                .Box-row:hover, .d-flex:hover, #indexPostsList > div:hover, tr.post-item:hover, 
                .post-item:hover,
                body > div.container-lg > div.container-lg > div.Box:hover,
                body > div.container-lg > div.container-lg > div > div:hover,
                #blog-container > div:hover,
                main > div > div:hover,
                [id*="post"]:hover {
                    padding-left: 12px !important;
                    border-left-width: 3px !important;
                }
            }
        `;
        document.head.appendChild(listStyle);
    }
}

// 增强列表项悬停效果 - 修改以支持移动设备
function enhanceListHoverEffects() {
    // 选择所有列表项
    const listItems = document.querySelectorAll('.Box-row, .d-flex, #indexPostsList > div, tr.post-item, .post-item');
    const isMobile = isMobileDevice();
    
    listItems.forEach(item => {
        // 鼠标移入效果
        item.addEventListener('mouseenter', function() {
            // 查找内部元素并应用变换
            
            // 标题效果 - 移动设备上减小变换
            const headings = this.querySelectorAll('h1, h2, h3, h4, a.Link--primary');
            headings.forEach(heading => {
                heading.style.transform = isMobile ? 'translateX(2px)' : 'translateX(5px)';
                heading.style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.1)';
            });
            
            // 段落效果 - 移动设备上减小或禁用某些效果
            const paragraphs = this.querySelectorAll('p');
            paragraphs.forEach(p => {
                p.style.transform = isMobile ? 'scale(1.01)' : 'scale(1.02)';
                p.style.letterSpacing = isMobile ? '0.01em' : '0.02em';
            });
            
            // 图片效果 - 移动设备上更微妙
            const images = this.querySelectorAll('img');
            images.forEach(img => {
                img.style.transform = isMobile ? 'scale(1.02)' : 'scale(1.05)';
                img.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                img.style.filter = 'brightness(1.1)';
                img.style.borderRadius = '8px';
            });
            
            // 阅读数量效果特殊处理 - 包括官方的阅读计数元素
            const viewCounts = this.querySelectorAll('#vercount, #postVercount, [id*="vercount"], .mr-3.text-gray, #busuanzi_value_page_pv, #busuanzi_value_site_pv');
            viewCounts.forEach(count => {
                count.style.color = 'var(--secondary-color)';
                count.style.fontWeight = 'bold';
                count.style.transform = isMobile ? 'scale(1.05)' : 'scale(1.1)';
                count.style.textShadow = '0 0 5px rgba(255, 79, 154, 0.3)';
                count.style.transition = 'all 0.3s ease';
            });
            
            // SVG图标效果 - 移动设备上禁用旋转
            const svgs = this.querySelectorAll('svg');
            svgs.forEach(svg => {
                svg.style.transform = isMobile ? 'scale(1.05)' : 'scale(1.1) rotate(5deg)';
                svg.style.filter = 'drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2))';
            });
        });
        
        // 鼠标移出效果
        item.addEventListener('mouseleave', function() {
            // 恢复原始样式
            
            // 恢复标题
            const headings = this.querySelectorAll('h1, h2, h3, h4, a.Link--primary');
            headings.forEach(heading => {
                heading.style.transform = '';
                heading.style.textShadow = '';
            });
            
            // 恢复段落
            const paragraphs = this.querySelectorAll('p');
            paragraphs.forEach(p => {
                p.style.transform = '';
                p.style.letterSpacing = '';
            });
            
            // 恢复图片
            const images = this.querySelectorAll('img');
            images.forEach(img => {
                img.style.transform = '';
                img.style.boxShadow = '';
                img.style.filter = '';
                img.style.borderRadius = '';
            });
            
            // 恢复阅读数量 - 包括官方的阅读计数元素
            const viewCounts = this.querySelectorAll('#vercount, #postVercount, [id*="vercount"], .mr-3.text-gray, #busuanzi_value_page_pv, #busuanzi_value_site_pv');
            viewCounts.forEach(count => {
                count.style.color = '';
                count.style.fontWeight = '';
                count.style.transform = '';
                count.style.textShadow = '';
            });
            
            // 恢复SVG图标
            const svgs = this.querySelectorAll('svg');
            svgs.forEach(svg => {
                svg.style.transform = '';
                svg.style.filter = '';
            });
        });
        
        // 为移动设备添加触摸开始事件
        if (isMobile) {
            item.addEventListener('touchstart', function() {
                // 模拟鼠标悬停效果
                const event = new MouseEvent('mouseenter', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                this.dispatchEvent(event);
                
                // 设置延时后恢复原状态
                setTimeout(() => {
                    const leaveEvent = new MouseEvent('mouseleave', {
                        bubbles: true,
                        cancelable: true,
                        view: window
                    });
                    this.dispatchEvent(leaveEvent);
                }, 1000); // 1秒后恢复
            });
        }
    });
}

// 添加浏览量计数功能
function createVercount() {
    var postBody = document.getElementById('postBody');
    if (postBody){
        postBody.insertAdjacentHTML('afterend','<div id="busuanzi_container_page_pv" style="display:none;float:left;margin-top:8px;font-size:small;">本文浏览量<span id="busuanzi_value_page_pv"></span>次</div>');
    }
    var runday = document.getElementById('runday');
    if (runday) {
        runday.insertAdjacentHTML('afterend', '<span id="busuanzi_container_site_pv" style="display:none">总浏览量<span id="busuanzi_value_site_pv"></span>次 • </span>');
    }
}

// 立即初始化
(function() {
    // 立即应用静态背景
    createStaticBackground();
    
    // DOM加载完成后再次应用
    document.addEventListener('DOMContentLoaded', function() {
        createStaticBackground();
    });
    
    // 窗口加载完成后再次应用
    window.addEventListener('load', function() {
        createStaticBackground();
        forceApplyListStyles();
    });
})();

// 添加H标签样式注入函数
function injectHeadingStyles() {
    // 移除可能存在的旧样式
    const oldStyle = document.getElementById('heading-zero-margin-style');
    if (oldStyle) {
        oldStyle.parentNode.removeChild(oldStyle);
    }

    // 创建新样式元素
    const styleElement = document.createElement('style');
    styleElement.id = 'heading-zero-margin-style';
    styleElement.textContent = `
        #postBody h1, 
        #postBody h2, 
        #postBody h3, 
        #postBody h4, 
        #postBody h5, 
        #postBody h6 {
            margin: 10px !important;
            padding: 10px !important;
            width: auto !important;
        }
        /* 引用块样式 */
        #postBody blockquote p{
            margin: 0 !important;
        }
    `;
    
    // 将样式添加到文档头部
    document.head.appendChild(styleElement);
    
    console.log('已注入H标签零边距样式');
}

// 添加鼠标特效功能 - Canvas版本
function setupMouseEffect() {
    // 检测是否为移动设备 - 使用已有函数
    if (isMobileDevice()) {
        return; // 移动设备上不启用特效，提升性能
    }
    
    // 创建两层Canvas提升性能 - 前景层用于活跃粒子，背景层用于涟漪效果
    const foregroundCanvas = document.createElement('canvas');
    const backgroundCanvas = document.createElement('canvas');
    
    // 前景Canvas - 用于绘制粒子
    foregroundCanvas.className = 'mouse-effect-foreground';
    foregroundCanvas.style.position = 'fixed';
    foregroundCanvas.style.top = '0';
    foregroundCanvas.style.left = '0';
    foregroundCanvas.style.width = '100%';
    foregroundCanvas.style.height = '100%';
    foregroundCanvas.style.pointerEvents = 'none';
    foregroundCanvas.style.zIndex = '9999';
    
    // 背景Canvas - 用于绘制涟漪效果
    backgroundCanvas.className = 'mouse-effect-background';
    backgroundCanvas.style.position = 'fixed';
    backgroundCanvas.style.top = '0';
    backgroundCanvas.style.left = '0';
    backgroundCanvas.style.width = '100%';
    backgroundCanvas.style.height = '100%';
    backgroundCanvas.style.pointerEvents = 'none';
    backgroundCanvas.style.zIndex = '9998';
    
    // 设置Canvas尺寸为窗口大小
    function updateCanvasSizes() {
        const dpr = window.devicePixelRatio || 1;
        foregroundCanvas.width = window.innerWidth * dpr;
        foregroundCanvas.height = window.innerHeight * dpr;
        backgroundCanvas.width = window.innerWidth * dpr;
        backgroundCanvas.height = window.innerHeight * dpr;
        
        // 根据设备像素比例缩放上下文，保证高分辨率显示
        const fgCtx = foregroundCanvas.getContext('2d');
        const bgCtx = backgroundCanvas.getContext('2d');
        fgCtx.scale(dpr, dpr);
        bgCtx.scale(dpr, dpr);
    }
    
    updateCanvasSizes();
    document.body.appendChild(backgroundCanvas);
    document.body.appendChild(foregroundCanvas);
    
    // 获取2D绘图上下文
    const fgCtx = foregroundCanvas.getContext('2d');
    const bgCtx = backgroundCanvas.getContext('2d');
    
    // 鼠标状态追踪
    let mouseX = 0, mouseY = 0;
    let lastMouseX = 0, lastMouseY = 0;
    let mouseSpeed = 0;
    let lastParticleTime = 0;
    
    // 对象池 - 提高性能，避免频繁创建和销毁对象
    const MAX_PARTICLES = 100;
    const particlePool = [];
    const ripplePool = [];
    const activeParticles = [];
    const activeRipples = [];
    
    // 性能控制参数
    const FRAME_RATE = 30; // 目标帧率
    const FRAME_INTERVAL = 1000 / FRAME_RATE;
    let lastFrameTime = 0;
    let animationId = null;
    let isVisible = true;
    
    // 从CSS变量获取颜色 - 与网站风格保持一致
    const getThemeColors = () => {
        const style = getComputedStyle(document.documentElement);
        const isDark = document.documentElement.getAttribute('data-color-mode') === 'dark';
        
        // 提取主要颜色
        const primaryColor = style.getPropertyValue('--primary-color').trim() || '#7e57ff';
        const secondaryColor = style.getPropertyValue('--secondary-color').trim() || '#ff4f9a';
        const accentColor = style.getPropertyValue('--accent-color').trim() || '#00dcdc';
        const borderRadius = parseInt(style.getPropertyValue('--border-radius').trim() || '8') + 'px';
        
        // 转换为带透明度的RGBA颜色
        return {
            isDark,
            colors: [
                toRGBA(primaryColor, 0.85),
                toRGBA(secondaryColor, 0.8),
                toRGBA(accentColor, 0.75),
                toRGBA(isDark ? '#ffcc00' : '#0078d7', 0.7),
                toRGBA('#ffffff', 0.85)
            ],
            borderRadius,
            // 添加一些网站现有的阴影效果
            boxShadow: style.getPropertyValue('--box-shadow').trim() || '0 5px 20px rgba(100, 120, 220, 0.15)'
        };
    };
    
    // 全局主题状态
    let themeState = getThemeColors();
    
    // 颜色转换函数 - 支持hex和rgb格式转换成rgba
    function toRGBA(color, alpha) {
        if (!color) return `rgba(126, 87, 255, ${alpha})`;
        
        if (color.startsWith('#')) {
            // Hex格式
            const r = parseInt(color.slice(1, 3), 16);
            const g = parseInt(color.slice(3, 5), 16);
            const b = parseInt(color.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        } else if (color.startsWith('rgb')) {
            // rgb或rgba格式
            if (color.startsWith('rgba')) {
                return color.replace(/[\d\.]+\)$/, `${alpha})`);
            } else {
                return color.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
            }
        }
        return color; // 未知格式，返回原始值
    }
    
    // 特殊字符与网站设计协调
    const specialChars = ['✧', '✦', '✺', '✫', '✿', '❀', '♥', '⭐', '∗'];
    
    // 粒子类 - 对象池模式
    class Particle {
        constructor() {
            this.reset(); // 初始化属性
            this.active = false; // 默认为非活跃状态
        }
        
        reset() {
            this.x = 0;
            this.y = 0;
            this.startX = 0;
            this.startY = 0;
            this.color = '';
            this.shape = ''; // 粒子形状: 'star', 'dot', 'diamond', 'circle'
            this.size = 0;
            this.lifespan = 0;
            this.createdAt = 0;
            this.vx = 0;
            this.vy = 0;
            this.opacity = 0;
            this.scale = 0;
            this.rotation = 0;
            this.rotationSpeed = 0;
            this.glowSize = 0; // 发光效果大小
            this.glowColor = ''; // 发光颜色
            return this;
        }
        
        // 初始化粒子状态
        init(x, y, speed) {
            this.reset();
            this.active = true;
            this.x = x;
            this.y = y;
            this.startX = x;
            this.startY = y;
            
            // 从主题获取颜色
            const colors = themeState.colors;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            
            // 随机决定粒子形状 - 与博客主题一致的几何形状
            // 增加星星和菱形的比例，减少普通圆点
            const shapeRandom = Math.random();
            if (shapeRandom < 0.4) { // 40%概率是星星
                this.shape = 'star';
            } else if (shapeRandom < 0.7) { // 30%概率是菱形
                this.shape = 'diamond';
            } else if (shapeRandom < 0.9) { // 20%概率是圆形
                this.shape = 'circle';
            } else { // 10%概率是点
                this.shape = 'dot';
            }
            
            this.size = this.shape === 'star' ? Math.random() * 4 + 3 : Math.random() * 3 + 1;
            
            // 为星星形状设置发光效果
            if (this.shape === 'star') {
                this.glowSize = this.size * 2;
                this.glowColor = this.color.replace(/[\d\.]+\)$/, '0.5)');
            }
            
            // 生命周期和动画参数
            this.lifespan = Math.random() * 500 + 300; // 生命周期300-800ms，更短促但更多数量
            this.createdAt = Date.now();
            
            // 计算移动方向和速度 - 更随机的运动方向
            const angle = Math.random() * Math.PI * 2;
            const distance = (Math.random() * 20 + 15) * (speed / 40); // 更轻盈的移动距离
            
            // 计算终点坐标
            this.vx = Math.cos(angle) * distance;
            this.vy = Math.sin(angle) * distance - (Math.random() * 2); // 轻微上浮效果
            
            // 初始不透明度和缩放
            this.opacity = 0;
            this.scale = 0.5 + Math.random() * 0.5;
            
            // 旋转角度（弧度）
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.05; // 更快的旋转
            
            return this;
        }
        
        // 更新粒子状态
        update() {
            const now = Date.now();
            const age = now - this.createdAt;
            const progress = Math.min(age / this.lifespan, 1);
            
            // 如果超过生命周期，设为非活跃并返回false
            if (progress >= 1) {
                this.active = false;
                return false;
            }
            
            // 缓动函数，使运动更自然
            const easeOutQuad = function(t) { return t * (2 - t); };
            const easedProgress = easeOutQuad(progress);
            
            // 更新位置 - 添加轻微波动效果
            this.x = this.startX + this.vx * easedProgress;
            this.y = this.startY + this.vy * easedProgress - Math.sin(progress * Math.PI) * 3; // 轻微上浮波动
            
            // 更新不透明度 - 快速淡入，缓慢淡出
            if (progress < 0.2) {
                this.opacity = progress / 0.2; // 前20%时间淡入
            } else {
                this.opacity = 1 - ((progress - 0.2) / 0.8); // 后80%时间淡出
            }
            
            // 更新缩放 - 先快速放大，再缓慢缩小
            if (progress < 0.2) {
                this.scale = 0.5 + progress / 0.2 * 0.8; // 前20%时间放大
            } else {
                this.scale = 1.3 - ((progress - 0.2) / 0.8) * 0.8; // 后80%时间缩小
            }
            
            // 更新旋转 - 使星星闪烁旋转效果更明显
            this.rotation += this.rotationSpeed;
            
            // 更新发光效果
            if (this.shape === 'star') {
                this.glowSize = this.size * (2 + Math.sin(progress * Math.PI * 3) * 0.5); // 脉动发光
            }
            
            // 返回粒子是否继续存活
            return true;
        }
        
        // 绘制粒子
        draw(ctx) {
            ctx.save();
            
            // 设置全局透明度
            ctx.globalAlpha = this.opacity;
            
            // 移动到粒子位置并应用变换
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.scale(this.scale, this.scale);
            
            // 设置发光效果
            ctx.shadowBlur = this.shape === 'star' ? this.glowSize : this.size;
            ctx.shadowColor = this.color;
            ctx.fillStyle = this.color;
            
            // 根据形状绘制不同的粒子
            switch (this.shape) {
                case 'star':
                    this.drawStar(ctx, 0, 0, 5, this.size, this.size/2.5);
                    break;
                case 'diamond':
                    this.drawDiamond(ctx, 0, 0, this.size);
                    break;
                case 'dot':
                    ctx.beginPath();
                    ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                case 'circle':
                default:
                    ctx.beginPath();
                    ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                    break;
            }
            
            ctx.restore();
        }
        
        // 绘制星星形状
        drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
            let rot = Math.PI / 2 * 3;
            let x = cx;
            let y = cy;
            let step = Math.PI / spikes;
            
            ctx.beginPath();
            ctx.moveTo(cx, cy - outerRadius);
            
            for (let i = 0; i < spikes; i++) {
                x = cx + Math.cos(rot) * outerRadius;
                y = cy + Math.sin(rot) * outerRadius;
                ctx.lineTo(x, y);
                rot += step;
                
                x = cx + Math.cos(rot) * innerRadius;
                y = cy + Math.sin(rot) * innerRadius;
                ctx.lineTo(x, y);
                rot += step;
            }
            
            ctx.lineTo(cx, cy - outerRadius);
            ctx.closePath();
            ctx.fill();
        }
        
        // 绘制菱形
        drawDiamond(ctx, cx, cy, size) {
            ctx.beginPath();
            ctx.moveTo(cx, cy - size);
            ctx.lineTo(cx + size, cy);
            ctx.lineTo(cx, cy + size);
            ctx.lineTo(cx - size, cy);
            ctx.closePath();
            ctx.fill();
        }
    }
    
    // 涟漪效果类 - 对象池模式
    class Ripple {
        constructor() {
            this.reset();
            this.active = false;
        }
        
        reset() {
            this.x = 0;
            this.y = 0;
            this.size = 0;
            this.maxSize = 0;
            this.createdAt = 0;
            this.duration = 0;
            this.color = '';
            this.spikes = 0;  // 星形涟漪的尖角数
            this.innerRadius = 0; // 内部半径
            this.outerRadius = 0; // 外部半径
            this.rotation = 0; // 旋转角度
            this.rotationSpeed = 0; // 旋转速度
            return this;
        }
        
        // 初始化涟漪
        init(x, y) {
            this.reset();
            this.active = true;
            this.x = x;
            this.y = y;
            this.size = 1;
            this.maxSize = 80 + Math.random() * 40; // 80-120之间的随机大小
            this.createdAt = Date.now();
            this.duration = 1000 + Math.random() * 500; // 1-1.5秒持续时间
            
            // 从主题获取颜色
            const colors = themeState.colors;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            
            // 设置星形涟漪的参数
            this.spikes = 5 + Math.floor(Math.random() * 4); // 5-8个尖角
            this.innerRadius = 0.4; // 内部半径比例
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.01; // 每帧旋转角度
            
            return this;
        }
        
        // 更新涟漪状态
        update() {
            const now = Date.now();
            const age = now - this.createdAt;
            
            // 如果超过持续时间，设为非活跃并返回false
            if (age >= this.duration) {
                this.active = false;
                return false;
            }
            
            // 更新旋转角度
            this.rotation += this.rotationSpeed;
            
            // 返回涟漪是否继续存活
            return true;
        }
        
        // 绘制涟漪
        draw(ctx) {
            const now = Date.now();
            const age = now - this.createdAt;
            const progress = age / this.duration;
            
            // 计算当前大小和不透明度
            const size = this.maxSize * progress;
            const opacity = 1 - progress;
            
            // 保存上下文状态
            ctx.save();
            
            // 设置阴影和模糊效果增强星光效果
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
            ctx.fillStyle = 'transparent';
            ctx.strokeStyle = this.color.replace(/[\d\.]+\)$/, `${opacity * 0.7})`);
            ctx.lineWidth = 2 - progress; // 线宽随时间减小
            
            // 绘制星形涟漪
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            
            // 绘制两个同心星形，增加立体感
            this.drawStarPath(ctx, 0, 0, this.spikes, size, size * this.innerRadius);
            ctx.stroke();
            
            // 绘制第二个更小更透明的星形 - 旋转45度形成错位效果
            ctx.rotate(Math.PI / this.spikes);
            ctx.strokeStyle = this.color.replace(/[\d\.]+\)$/, `${opacity * 0.3})`);
            ctx.lineWidth = 1;
            this.drawStarPath(ctx, 0, 0, this.spikes, size * 0.7, size * 0.3);
            ctx.stroke();
            
            // 增加一个圆形光晕效果
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2);
            ctx.strokeStyle = this.color.replace(/[\d\.]+\)$/, `${opacity * 0.15})`);
            ctx.lineWidth = 0.5;
            ctx.stroke();
            
            // 恢复上下文状态
            ctx.restore();
        }
        
        // 绘制星形路径 - 使用贝塞尔曲线让星形边缘更柔和
        drawStarPath(ctx, cx, cy, spikes, outerRadius, innerRadius) {
            const step = Math.PI / spikes;
            let rot = Math.PI / 2 * 3;
            
            ctx.beginPath();
            
            // 移动到第一个顶点
            let x = cx + Math.cos(rot) * outerRadius;
            let y = cy + Math.sin(rot) * outerRadius;
            ctx.moveTo(x, y);
            
            // 绘制星形路径 - 使用二次贝塞尔曲线
            for (let i = 0; i < spikes; i++) {
                // 外部顶点
                rot += step;
                const outerX = cx + Math.cos(rot) * innerRadius;
                const outerY = cy + Math.sin(rot) * innerRadius;
                
                // 控制点 - 在内外半径之间
                const ctrlX = cx + Math.cos(rot - step/2) * (innerRadius + outerRadius) * 0.4;
                const ctrlY = cy + Math.sin(rot - step/2) * (innerRadius + outerRadius) * 0.4;
                
                // 使用二次贝塞尔曲线连接到内部点
                ctx.quadraticCurveTo(ctrlX, ctrlY, outerX, outerY);
                
                // 内部顶点
                rot += step;
                const innerX = cx + Math.cos(rot) * outerRadius;
                const innerY = cy + Math.sin(rot) * outerRadius;
                
                // 控制点 - 在内外半径之间
                const ctrlX2 = cx + Math.cos(rot - step/2) * (innerRadius + outerRadius) * 0.4;
                const ctrlY2 = cy + Math.sin(rot - step/2) * (innerRadius + outerRadius) * 0.4;
                
                // 使用二次贝塞尔曲线连接到外部点
                ctx.quadraticCurveTo(ctrlX2, ctrlY2, innerX, innerY);
            }
            
            ctx.closePath();
        }
    }
    
    // 初始化对象池
    function initObjectPools() {
        // 预创建粒子对象
        for (let i = 0; i < MAX_PARTICLES; i++) {
            particlePool.push(new Particle());
            if (i < MAX_PARTICLES / 4) { // 涟漪数量较少
                ripplePool.push(new Ripple());
            }
        }
    }
    
    // 从对象池获取粒子
    function getParticleFromPool() {
        for (let i = 0; i < particlePool.length; i++) {
            if (!particlePool[i].active) {
                return particlePool[i];
            }
        }
        // 如果池已满，创建新的粒子
        const particle = new Particle();
        particlePool.push(particle);
        return particle;
    }
    
    // 从对象池获取涟漪
    function getRippleFromPool() {
        for (let i = 0; i < ripplePool.length; i++) {
            if (!ripplePool[i].active) {
                return ripplePool[i];
            }
        }
        // 如果池已满，创建新的涟漪
        const ripple = new Ripple();
        ripplePool.push(ripple);
        return ripple;
    }
    
    // 创建粒子
    function createParticle(x, y, speed) {
        const particle = getParticleFromPool().init(x, y, speed);
        activeParticles.push(particle);
        
        // 限制活跃粒子数量
        if (activeParticles.length > MAX_PARTICLES) {
            // 移除最早创建的粒子
            const oldestParticle = activeParticles.shift();
            oldestParticle.active = false;
        }
    }
    
    // 创建涟漪
    function createRipple(x, y) {
        const ripple = getRippleFromPool().init(x, y);
        activeRipples.push(ripple);
        
        // 限制活跃涟漪数量
        if (activeRipples.length > 3) {
            // 移除最早创建的涟漪
            const oldestRipple = activeRipples.shift();
            oldestRipple.active = false;
        }
    }
    
    // 鼠标移动事件处理
    const handleMouseMove = function(e) {
        // 更新位置
        lastMouseX = mouseX;
        lastMouseY = mouseY;
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // 计算鼠标移动速度
        const dx = mouseX - lastMouseX;
        const dy = mouseY - lastMouseY;
        mouseSpeed = Math.sqrt(dx*dx + dy*dy);
        
        // 只在鼠标速度超过阈值时创建粒子
        if (mouseSpeed > 5) { // 降低阈值，更容易触发
            const now = Date.now();
            if (now - lastParticleTime > 16) { // 增加创建频率，约每16ms一个粒子
                // 粒子生成策略：速度越快，生成越多，但有上限
                const particlesToCreate = Math.min(1 + Math.floor(mouseSpeed / 30), 2);
                
                for (let i = 0; i < particlesToCreate; i++) {
                    // 在鼠标轨迹上随机位置生成粒子，而非鼠标精确位置
                    const ratio = Math.random();
                    const trailX = lastMouseX * ratio + mouseX * (1-ratio);
                    const trailY = lastMouseY * ratio + mouseY * (1-ratio);
                    
                    // 添加小偏移，使粒子轨迹看起来更自然
                    const offsetX = (Math.random() - 0.5) * 4;
                    const offsetY = (Math.random() - 0.5) * 4;
                    createParticle(trailX + offsetX, trailY + offsetY, mouseSpeed);
                }
                
                lastParticleTime = now;
            }
        }
    };
    
    // 节流函数 - 限制事件处理频率
    function throttle(func, limit) {
        let lastCall = 0;
        return function(...args) {
            const now = Date.now();
            if (now - lastCall >= limit) {
                lastCall = now;
                func.apply(this, args);
            }
        };
    }
    
    // 使用节流函数包装鼠标移动事件处理
    const throttledMouseMove = throttle(handleMouseMove, 10);
    
    // 鼠标点击事件处理
    const handleClick = function(e) {
        // 不在输入框和按钮上触发特效
        if (e.target.tagName.toLowerCase() === 'input' || 
            e.target.tagName.toLowerCase() === 'textarea' || 
            e.target.tagName.toLowerCase() === 'button' ||
            e.target.tagName.toLowerCase() === 'a' ||
            e.target.classList.contains('btn')) {
            return;
        }
        
        // 创建星形涟漪效果
        createRipple(e.clientX, e.clientY);
        
        // 创建星星爆发效果 - 呈现放射状发散
        const numParticles = 15; // 发射粒子数量
        const angleStep = (Math.PI * 2) / numParticles;
        
        for (let i = 0; i < numParticles; i++) {
            // 根据索引计算角度，实现均匀放射
            const angle = i * angleStep + (Math.random() * 0.2 - 0.1); // 添加小随机偏移
            
            // 计算粒子位置 - 从中心稍微偏移
            const distance = Math.random() * 8;
            const x = e.clientX + Math.cos(angle) * distance;
            const y = e.clientY + Math.sin(angle) * distance;
            
            // 延迟创建粒子，呈现逐步爆发效果
            setTimeout(() => {
                createParticle(x, y, 60 + Math.random() * 40);
            }, i * 10);
        }
        
        // 创建额外的随机散射粒子
        setTimeout(() => {
            for (let i = 0; i < 5; i++) {
                const randomAngle = Math.random() * Math.PI * 2;
                const randomDist = 5 + Math.random() * 10;
                const x = e.clientX + Math.cos(randomAngle) * randomDist;
                const y = e.clientY + Math.sin(randomAngle) * randomDist;
                createParticle(x, y, 30 + Math.random() * 30);
            }
        }, 50);
    };
    
    // 链接悬停效果
    function setupLinkEffects() {
        const links = document.querySelectorAll('a:not(.btn):not([role="button"]):not([data-effect-added])');
        links.forEach(link => {
            link.setAttribute('data-effect-added', 'true');
            
            link.addEventListener('mouseenter', function() {
                const rect = this.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                for (let i = 0; i < 2; i++) {
                    setTimeout(() => {
                        const angle = Math.random() * Math.PI * 2;
                        const dist = 10 + Math.random() * 10;
                        const x = centerX + Math.cos(angle) * dist;
                        const y = centerY + Math.sin(angle) * dist;
                        
                        createParticle(x, y, 30);
                    }, i * 50);
                }
            });
        });
    }
    
    // 页面可见性变化处理 - 当页面不可见时暂停动画
    function handleVisibilityChange() {
        if (document.hidden) {
            isVisible = false;
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        } else {
            isVisible = true;
            if (!animationId) {
                lastFrameTime = performance.now();
                animationId = requestAnimationFrame(render);
            }
        }
    }
    
    // 绘制前景层（活跃粒子）
    function drawForeground() {
        // 清除画布
        fgCtx.clearRect(0, 0, foregroundCanvas.width / window.devicePixelRatio, foregroundCanvas.height / window.devicePixelRatio);
        
        // 更新和绘制粒子
        for (let i = activeParticles.length - 1; i >= 0; i--) {
            if (activeParticles[i].update()) {
                activeParticles[i].draw(fgCtx);
            } else {
                activeParticles[i].active = false;
                activeParticles.splice(i, 1);
            }
        }
    }
    
    // 绘制背景层（涟漪效果）
    function drawBackground() {
        // 清除画布
        bgCtx.clearRect(0, 0, backgroundCanvas.width / window.devicePixelRatio, backgroundCanvas.height / window.devicePixelRatio);
        
        // 更新和绘制涟漪
        for (let i = activeRipples.length - 1; i >= 0; i--) {
            if (activeRipples[i].update()) {
                activeRipples[i].draw(bgCtx);
            } else {
                activeRipples[i].active = false;
                activeRipples.splice(i, 1);
            }
        }
    }
    
    // 渲染循环
    function render(timestamp) {
        // 帧率控制
        if (!lastFrameTime) lastFrameTime = timestamp;
        
        const elapsed = timestamp - lastFrameTime;
        
        if (elapsed > FRAME_INTERVAL) {
            // 更新上一帧时间
            lastFrameTime = timestamp - (elapsed % FRAME_INTERVAL);
            
            // 绘制背景和前景
            drawBackground();
            drawForeground();
            
            // 定期重置主题状态 - 适应可能的主题变化
            if (Date.now() % 1000 < 16) { // 大约每秒检查一次
                themeState = getThemeColors();
            }
            
            // 定期添加链接特效
            if (Date.now() % 2000 < 16) { // 大约每2秒检查一次
                setupLinkEffects();
            }
        }
        
        // 继续渲染
        if (isVisible) {
            animationId = requestAnimationFrame(render);
        }
    }
    
    // 监听主题变化
    const themeObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'data-color-mode') {
                // 当主题变化时，更新颜色方案
                themeState = getThemeColors();
            }
        });
    });
    
    // 初始化
    initObjectPools();
    
    // 事件监听器
    window.addEventListener('resize', updateCanvasSizes);
    document.addEventListener('mousemove', throttledMouseMove);
    document.addEventListener('click', handleClick);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // 监听主题变化
    themeObserver.observe(document.documentElement, { 
        attributes: true, 
        attributeFilter: ['data-color-mode'] 
    });
    
    // 使用Intersection Observer监听Canvas可见性
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.target === foregroundCanvas || entry.target === backgroundCanvas) {
                isVisible = entry.isIntersecting;
                
                if (isVisible && !animationId) {
                    lastFrameTime = performance.now();
                    animationId = requestAnimationFrame(render);
                } else if (!isVisible && animationId) {
                    cancelAnimationFrame(animationId);
                    animationId = null;
                }
            }
        });
    }, { threshold: 0 });
    
    observer.observe(foregroundCanvas);
    observer.observe(backgroundCanvas);
    
    // 启动渲染循环
    lastFrameTime = performance.now();
    animationId = requestAnimationFrame(render);
    
    // 定期设置链接特效
    setInterval(setupLinkEffects, 2000);
    
    // 返回清理函数
    return function cleanup() {
        isVisible = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        
        document.removeEventListener('mousemove', throttledMouseMove);
        document.removeEventListener('click', handleClick);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('resize', updateCanvasSizes);
        
        themeObserver.disconnect();
        observer.disconnect();
        
        if (foregroundCanvas && foregroundCanvas.parentNode) {
            foregroundCanvas.parentNode.removeChild(foregroundCanvas);
        }
        
        if (backgroundCanvas && backgroundCanvas.parentNode) {
            backgroundCanvas.parentNode.removeChild(backgroundCanvas);
        }
    };
}