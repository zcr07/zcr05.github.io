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
    
    // 创建全屏背景元素
    createBackgroundElement();
    
    // 增强背景动画效果
    enhanceBackgroundAnimation();
    
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
    
    // 设置定时器，确保样式完全应用，多次尝试应用
    setTimeout(forceApplyListStyles, 200);
    setTimeout(forceApplyListStyles, 500);
    setTimeout(forceApplyListStyles, 1000);
    setTimeout(forceApplyListStyles, 2000);
    
    // 设置定时器，确保背景动画效果完成应用
    setTimeout(enhanceBackgroundAnimation, 300);
    setTimeout(enhanceBackgroundAnimation, 800);
    
    // 在窗口加载完成后再次强制应用样式
    window.addEventListener('load', function() {
        forceApplyListStyles();
        enhanceBackgroundAnimation();
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

// 处理滚动时确保背景正常显示
function handleScrollForBackground() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.min(scrollY / pageHeight, 1);
    
    // 基于滚动位置调整背景效果
    const fixedBg = document.getElementById('fixed-background');
    if (fixedBg) {
        // 随滚动轻微改变背景色调
        const hue = 240 + (scrollPercent * 20); // 蓝色调范围
        fixedBg.style.filter = `hue-rotate(${scrollPercent * 15}deg)`;
        
        // 背景微小位移效果
        fixedBg.style.transform = `translateY(${scrollPercent * -10}px)`;
    }
    
    // 星星随滚动位置微调
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        const factor = (index % 5 + 1) / 5; // 不同星星有不同的移动因子
        star.style.transform = `translateY(${scrollPercent * -20 * factor}px)`;
    });
}

// 确保背景元素存在
function ensureBackgroundElement() {
    // 检查固定背景是否存在
    if (!document.getElementById('fixed-background')) {
        const fixedBg = document.createElement('div');
        fixedBg.id = 'fixed-background';
        fixedBg.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -999;
            background-color: var(--global-bg, #070720);
            transition: background-color 0.5s ease;
            pointer-events: none;
        `;
        document.body.parentNode.insertBefore(fixedBg, document.body);
        
        // 应用高级背景动画
        enhanceBackgroundAnimation();
    }
    
    // 检查页面背景是否存在
    if (!document.getElementById('page-background')) {
        const pageBg = document.createElement('div');
        pageBg.id = 'page-background';
        pageBg.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            min-height: 100%;
            height: auto;
            z-index: -998;
            background-color: var(--global-bg, #070720);
            transition: background-color 0.5s ease;
            pointer-events: none;
        `;
        document.body.parentNode.insertBefore(pageBg, document.body);
    }
    
    // 确保背景动画效果
    enhanceBackgroundAnimation();
    
    // 确保最小高度设置，防止背景不足
    document.documentElement.style.minHeight = '100vh';
    document.body.style.minHeight = '100vh';
    
    // 添加并优化滚动事件处理
    window.removeEventListener('scroll', handleScrollForBackground);
    window.addEventListener('scroll', handleScrollForBackground);
    
    // 立即处理一次滚动效果
    handleScrollForBackground();
}

// 创建全屏背景元素
function createBackgroundElement() {
    // 确保动画关键帧已定义
    if (!document.getElementById('background-keyframes')) {
        const keyframes = document.createElement('style');
        keyframes.id = 'background-keyframes';
        keyframes.textContent = `
            @keyframes backgroundColorShift {
                0% { background-color: var(--global-bg, #070720) !important; }
                33% { background-color: #080830 !important; }
                66% { background-color: #10102a !important; }
                100% { background-color: #070720 !important; }
            }
            
            @keyframes gradientFlow {
                0% { background-position: 0% 50%; opacity: 0.7; }
                50% { background-position: 100% 50%; opacity: 0.9; }
                100% { background-position: 0% 50%; opacity: 0.7; }
            }
            
            @keyframes pulsate {
                0% { transform: scale(1); opacity: 0.7; }
                50% { transform: scale(1.05); opacity: 0.8; }
                100% { transform: scale(1); opacity: 0.7; }
            }
            
            @keyframes rotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            /* 确保背景覆盖整个页面，即使内容很长 */
            html, body {
                min-height: 100vh !important;
                background-color: var(--global-bg, #070720) !important;
            }
            
            /* 解决背景不一致问题 */
            #background-container {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                overflow: hidden !important;
                z-index: -1000 !important;
                pointer-events: none !important;
            }
            
            /* 确保内容容器不受模糊影响 */
            .tech-box-content {
                position: relative !important;
                z-index: 2 !important;
                backface-visibility: hidden !important;
            }
            
            /* 禁用列表项的backdrop-filter，防止内容模糊 */
            .tech-box-row, [data-tech-styled="true"] {
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
            }
        `;
        document.head.appendChild(keyframes);
    }
    
    // 创建主背景容器
    let bgContainer = document.getElementById('background-container');
    if (!bgContainer) {
        bgContainer = document.createElement('div');
        bgContainer.id = 'background-container';
        document.body.parentNode.insertBefore(bgContainer, document.body);
        
        // 设置容器样式 - 确保充满整个视口
        bgContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
            z-index: -1000;
            pointer-events: none;
        `;
    }
    
    
    // 创建渐变层 - 确保覆盖整个视口区域
    let gradientLayer = document.getElementById('gradient-layer');
    if (!gradientLayer) {
        gradientLayer = document.createElement('div');
        gradientLayer.id = 'gradient-layer';
        bgContainer.appendChild(gradientLayer);
        
        // 设置渐变层样式
        gradientLayer.style.cssText = `
            position: absolute;
            top: -10%;
            left: -10%;
            width: 120%;
            height: 120%;
            background: 
                radial-gradient(circle at 80% 10%, rgba(126, 87, 255, 0.15), transparent 40%),
                radial-gradient(circle at 20% 30%, rgba(0, 220, 220, 0.15), transparent 40%),
                radial-gradient(circle at 70% 65%, rgba(255, 79, 154, 0.15), transparent 50%),
                radial-gradient(circle at 10% 85%, rgba(126, 87, 255, 0.15), transparent 30%);
            background-size: 200% 200%;
            animation: gradientFlow 15s ease-in-out infinite;
            z-index: -998;
            opacity: 0.8;
        `;
    } else {
        // 直接设置动画
        gradientLayer.style.animation = 'gradientFlow 15s ease-in-out infinite';
    }
    
    // 创建光晕层
    let glowLayer = document.getElementById('glow-layer');
    if (!glowLayer) {
        glowLayer = document.createElement('div');
        glowLayer.id = 'glow-layer';
        bgContainer.appendChild(glowLayer);
        
        // 设置光晕层样式
        glowLayer.style.cssText = `
            position: absolute;
            top: -10%;
            left: -10%;
            width: 120%;
            height: 120%;
            background: radial-gradient(circle at 50% 50%, rgba(126, 87, 255, 0.05), transparent 70%);
            animation: pulsate 10s ease-in-out infinite;
            z-index: -997;
        `;
    } else {
        // 直接设置动画
        glowLayer.style.animation = 'pulsate 10s ease-in-out infinite';
    }
    
    // 创建旋转图形层
    let shapesLayer = document.getElementById('shapes-layer');
    if (!shapesLayer) {
        shapesLayer = document.createElement('div');
        shapesLayer.id = 'shapes-layer';
        bgContainer.appendChild(shapesLayer);
        
        // 设置旋转图形层样式
        shapesLayer.style.cssText = `
            position: absolute;
            top: -10%;
            left: -10%;
            width: 120%;
            height: 120%;
            background: 
                radial-gradient(circle at 30% 40%, rgba(126, 87, 255, 0.03) 0%, transparent 30%),
                radial-gradient(circle at 70% 60%, rgba(0, 220, 220, 0.03) 0%, transparent 30%);
            animation: rotate 60s linear infinite;
            z-index: -996;
        `;
    } else {
        // 直接设置动画
        shapesLayer.style.animation = 'rotate 60s linear infinite';
    }
    
    // 确保页面的最小高度为视口高度，并设置文档背景色
    document.documentElement.style.cssText += `
        min-height: 100vh !important;
        background-color: var(--global-bg, #070720) !important;
    `;
    document.body.style.cssText += `
        min-height: 100vh !important;
        background-color: var(--global-bg, #070720) !important;
    `;
    
    // 设置背景处理事件
    setupBackgroundEvents();
    
    // 立即触发背景动画效果
    enhanceBackgroundAnimation();
}

// 设置背景相关事件
function setupBackgroundEvents() {
    // 页面完全加载后确保背景正确
    window.addEventListener('load', function() {
        ensureBackgroundElement();
        enhanceBackgroundAnimation();
    });
    
    // DOMContentLoaded事件
    document.addEventListener('DOMContentLoaded', function() {
        ensureBackgroundElement();
        enhanceBackgroundAnimation();
    });
    
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        handleScrollForBackground();
        // 确保动画一直存在
        if (!document.getElementById('dynamic-background-animations')) {
            enhanceBackgroundAnimation();
        }
    }, { passive: true });
    
    // 监听窗口大小变化
    window.addEventListener('resize', function() {
        ensureBackgroundElement();
        enhanceBackgroundAnimation();
    });
    
    // 确保主题切换时背景保持
    window.addEventListener('theme-changed', function() {
        setTimeout(function() {
            ensureBackgroundElement();
            enhanceBackgroundAnimation();
        }, 100);
    });
    
    // 定期检查背景动画是否存在
    setInterval(function() {
        ensureBackgroundElement();
        enhanceBackgroundAnimation();
    }, 2000);
}

// 主题切换功能
function modeSwitch() {
    var html = document.documentElement;
    var currentTheme = html.getAttribute('data-color-mode');
    var newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // 设置新主题
    html.setAttribute('data-color-mode', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // 更新主题图标
    var themeSwitch = document.getElementById('themeSwitch');
    if (themeSwitch) {
        if (newTheme === 'light') {
            themeSwitch.setAttribute('d', IconList['moon']);
        } else {
            themeSwitch.setAttribute('d', IconList['sun']);
        }
    }
    
    // 强制重新应用样式和背景
    injectRootStyles();
    replaceBackground();
    injectGmeekSpecificStyles();
    forceApplyListStyles();
    
    // 触发主题变更事件
    window.dispatchEvent(new Event('theme-changed'));
}

// 增强背景动画效果
function enhanceBackgroundAnimation() {
    // 检查是否已存在动态动画样式
    if (document.getElementById('dynamic-background-animations')) {
        return;
    }

    // 创建动态背景动画样式
    const dynamicStyles = document.createElement('style');
    dynamicStyles.id = 'dynamic-background-animations';
    
    // 定义多种动画效果
    const animations = `
        /* 微粒子效果 */
        @keyframes floatingParticles {
            0% { transform: translateY(0) rotate(0deg); opacity: 0.8; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 0.2; }
            100% { transform: translateY(0) rotate(360deg); opacity: 0.8; }
        }
        
        /* 流动效果 */
        @keyframes flowingEffect {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        
        /* 星光闪烁效果 */
        @keyframes starTwinkle {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 0.2; }
        }
        
        /* 为背景元素添加复合动画 */
        #fixed-background::before,
        #page-background::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 50% 50%, transparent 70%, rgba(10, 10, 40, 0.2) 100%);
            z-index: -1;
            pointer-events: none;
        }
        
        /* 添加星星效果 */
        .star {
            position: fixed;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            animation: starTwinkle var(--twinkle-duration, 3s) infinite ease-in-out;
            z-index: -10;
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
    
    dynamicStyles.textContent = animations;
    document.head.appendChild(dynamicStyles);
    
    // 创建星星背景
    createStars();
}

// 创建星星效果
function createStars() {
    // 如果已存在星星容器，则不重新创建
    if (document.getElementById('stars-container')) {
        return;
    }
    
    const starsContainer = document.createElement('div');
    starsContainer.id = 'stars-container';
    starsContainer.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -10; pointer-events: none;';
    document.body.appendChild(starsContainer);
    
    // 创建多个星星
    const starCount = Math.min(Math.floor(window.innerWidth * window.innerHeight / 20000), 100);
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // 随机位置
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // 随机大小
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // 随机透明度
        star.style.opacity = (Math.random() * 0.7 + 0.3).toString();
        
        // 随机动画延迟和持续时间
        star.style.setProperty('--twinkle-duration', `${Math.random() * 3 + 2}s`);
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        starsContainer.appendChild(star);
    }
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
    
    // 首先注入高优先级的全局样式
    injectForcedListStyles();
    
    // 为所有可能的列表项应用样式
    allRows.forEach(function(row, index) {
        applyTechStyleToElement(row, index);
    });
    
    // 特别处理文档中的第一个表格，通常是文章列表
    const blogTables = document.querySelectorAll('table');
    if (blogTables.length > 0) {
        const firstTable = blogTables[0];
        const rows = firstTable.querySelectorAll('tr');
        rows.forEach(function(row, index) {
            if (index > 0) { // 跳过表头
                applyTechStyleToElement(row, index);
            }
        });
    }
    
    // 处理标签容器
    const tagContainers = document.querySelectorAll('.tag-container, .tags, .LabelGroup');
    tagContainers.forEach(container => {
        container.style.display = 'flex';
        container.style.flexWrap = 'wrap';
        container.style.gap = '5px';
        container.style.margin = '5px 0';
    });
    
    // 延迟处理，确保DOM更新后再次应用样式
    setTimeout(function() {
        // 特殊处理 - 查找页面上所有带链接的容器元素作为潜在的列表项
        document.querySelectorAll('div > a[href], p > a[href]').forEach(function(link) {
            // 检查是否是文章链接
            if (link.href.includes('/post/')) {
                const parent = link.parentElement;
                if (parent && !parent.classList.contains('tech-box-row')) {
                    applyTechStyleToElement(parent, Math.floor(Math.random() * 100));
                }
            }
        });
    }, 300);
}

// 对单个元素应用技术风格样式
function applyTechStyleToElement(element, index) {
    // 跳过已处理的元素
    if (element.hasAttribute('data-tech-styled')) {
        return;
    }
    
    // 标记元素为已处理
    element.setAttribute('data-tech-styled', 'true');
    element.classList.add('tech-box-row');
    
    // 提取原有内容，并包装在内容容器中
    if (!element.querySelector('.tech-box-content')) {
        const originalContent = element.innerHTML;
        element.innerHTML = `<div class="tech-box-content">${originalContent}</div>`;
        
        // 添加左侧装饰边框
        const leftBar = document.createElement('div');
        leftBar.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 3px;
            height: 100%;
            background: linear-gradient(to bottom, var(--primary-color, #7e57ff), var(--secondary-color, #00dcdc));
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        element.appendChild(leftBar);
        
        // 使用简单的JavaScript处理悬停效果，而不是CSS变换
        element.onmouseenter = function() {
            // 直接修改DOM元素样式，不使用transform
            this.style.marginTop = '9px';
            this.style.marginBottom = '21px';
            this.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
            leftBar.style.opacity = '1';
        };
        
        element.onmouseleave = function() {
            this.style.marginTop = '15px';
            this.style.marginBottom = '15px';
            this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
            leftBar.style.opacity = '0';
        };
    }
}

// 注入强制的列表样式表
function injectForcedListStyles() {
    // 检查是否已经存在
    if (document.getElementById('forced-list-styles')) {
        return;
    }
    
    const styleSheet = document.createElement('style');
    styleSheet.id = 'forced-list-styles';
    styleSheet.innerHTML = `
        /* 强制应用到所有列表相关元素 */
        .tech-box-row,
        #indexPostsList > div,
        tr.post-item,
        .Box-row,
        .d-flex {
            display: block !important;
            position: relative !important;
            overflow: hidden !important;
            border-radius: 12px !important;
            margin: 15px 0 !important;
            padding: 16px !important;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05) !important;
            z-index: 1 !important;
            transition: all 0.4s ease-out !important;
            /* 移除可能导致模糊的效果 */
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            transform-style: preserve-3d !important;
            backface-visibility: hidden !important;
            will-change: transform !important;
        }
        
        /* 特别针对表格中的行元素 */
        table tr {
            display: block !important;
            margin: 15px 0 !important;
            border-radius: 12px !important;
        }
        
        /* 强制类优先级 */
        [data-tech-styled="true"] {
            border-radius: 12px !important;
            overflow: hidden !important;
            position: relative !important; 
        }
        
        /* 确保链接可点击 */
        .tech-box-row a,
        [data-tech-styled="true"] a {
            position: relative !important;
            z-index: 2 !important;
        }
        
        /* 防止内容模糊 */
        .tech-box-content {
            transform: translateZ(0) !important;
            backface-visibility: hidden !important;
        }
    `;
    
    document.head.appendChild(styleSheet);
}

// 添加装饰性元素
function addDecorativeElementTo(element) {
    // 创建一个装饰性边框
    const decorator = document.createElement('div');
    decorator.classList.add('tech-border-decoration');
    
    // 设置样式
    decorator.style.cssText = `
        position: absolute;
        inset: 0;
        border-radius: 12px;
        pointer-events: none;
        overflow: hidden;
        z-index: 0;
    `;
    
    // 创建边框发光效果
    const glow = document.createElement('div');
    glow.classList.add('border-glow');
    glow.style.cssText = `
        position: absolute;
        inset: 0;
        border-radius: 12px;
        background: linear-gradient(135deg, 
            transparent 0%, 
            rgba(126, 87, 255, 0.2) 15%, 
            rgba(0, 220, 220, 0.2) 35%,
            transparent 50%,
            transparent 70%, 
            rgba(255, 79, 154, 0.2) 85%, 
            transparent 100%);
        opacity: 0.8;
        transition: all 0.5s ease;
    `;
    
    // 创建左侧边条
    const leftBar = document.createElement('div');
    leftBar.classList.add('left-decoration-bar');
    leftBar.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background: linear-gradient(to bottom, var(--primary-color), var(--secondary-color));
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // 添加元素到DOM
    decorator.appendChild(glow);
    decorator.appendChild(leftBar);
    
    // 添加到列表项
    if (!element.querySelector('.tech-border-decoration')) {
        element.appendChild(decorator);
    }
    
    // 添加鼠标悬停效果
    element.addEventListener('mouseenter', function() {
        glow.style.opacity = '1';
        leftBar.style.opacity = '1';
    });
    
    element.addEventListener('mouseleave', function() {
        glow.style.opacity = '0.8';
        leftBar.style.opacity = '0';
    });
}

// 为Gmeek博客系统特定添加一个直接的样式注入函数
function injectGmeekSpecificStyles() {
    // 检查是否已存在
    if (document.getElementById('gmeek-specific-styles')) {
        document.getElementById('gmeek-specific-styles').remove();
    }
    
    const styleEl = document.createElement('style');
    styleEl.id = 'gmeek-specific-styles';
    
    // 针对Gmeek特定的HTML结构定义强制样式
    styleEl.textContent = `
        /* 直接针对博客首页文章列表 */
        body > div.container-lg > div.container-lg > div.Box,
        body > div.container-lg > div.container-lg > div > div,
        #blog-container > div,
        main > div > div,
        .Box-row, 
        .d-flex, 
        #indexPostsList > div {
            border-radius: 12px !important;
            overflow: visible !important;
            margin-bottom: 16px !important;
            background-color: rgba(255, 255, 255, 0.8) !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            border: 1px solid rgba(126, 87, 255, 0.2) !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
            padding: 16px !important;
            transition: none !important;
            transform: none !important;
            will-change: auto !important;
            filter: none !important;
        }
        
        /* 暗色模式下的样式 */
        html[data-color-mode="dark"] body > div.container-lg > div.container-lg > div.Box,
        html[data-color-mode="dark"] body > div.container-lg > div.container-lg > div > div,
        html[data-color-mode="dark"] #blog-container > div,
        html[data-color-mode="dark"] main > div > div,
        html[data-color-mode="dark"] .Box-row,
        html[data-color-mode="dark"] .d-flex,
        html[data-color-mode="dark"] #indexPostsList > div {
            background-color: rgba(18, 18, 42, 0.8) !important;
            border: 1px solid rgba(126, 87, 255, 0.3) !important;
        }
        
        /* 修复标签样式 */
        .Label {
            border-radius: 12px !important;
            padding: 4px 8px !important;
            margin: 2px !important;
            display: inline-block !important;
        }
        
        /* 全局文字清晰度增强 */
        * {
            -webkit-font-smoothing: antialiased !important;
            -moz-osx-font-smoothing: grayscale !important;
            text-rendering: optimizeLegibility !important;
        }
        
        /* 背景元素强制样式 */
        #fixed-background, 
        #page-background, 
        #background-container {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            background-color: #070720 !important;
            z-index: -1000 !important;
            animation: none !important;
            transition: none !important;
            transform: none !important;
        }
        
        /* 确保HTML和BODY有正确背景 */
        html, body {
            background-color: #070720 !important;
            min-height: 100vh !important;
        }
        
        /* 技术盒子内容样式 */
        .tech-box-content {
            position: relative !important;
            z-index: 5 !important;
            pointer-events: auto !important;
        }
    `;
    
    document.head.appendChild(styleEl);
}

// 立即执行初始化
(function() {
    // 立即添加全局背景和增强动画
    createBackgroundElement();
    enhanceBackgroundAnimation();
    
    // 直接注入Gmeek特定样式
    injectGmeekSpecificStyles();
    
    // 立即应用列表样式(在元素可用时)
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        forceApplyListStyles();
        injectGmeekSpecificStyles(); // 再次尝试注入
        createStars(); // 创建星星效果
    }
    
    // 等待DOM加载完成后再次应用样式
    document.addEventListener('DOMContentLoaded', function() {
        forceApplyListStyles();
        injectGmeekSpecificStyles(); // 确保样式已注入
        enhanceBackgroundAnimation();
        createStars();
        
        // 多次尝试应用样式，确保在各种情况下都能生效
        setTimeout(forceApplyListStyles, 100);
        setTimeout(injectGmeekSpecificStyles, 100);
        setTimeout(forceApplyListStyles, 500);
        setTimeout(injectGmeekSpecificStyles, 500);
        
        // MutationObserver监听DOM变化，以应对动态加载的内容
        if (typeof MutationObserver !== 'undefined') {
            const observer = new MutationObserver(function(mutations) {
                let needsUpdate = false;
                
                mutations.forEach(function(mutation) {
                    if (mutation.addedNodes.length > 0) {
                        needsUpdate = true;
                    }
                });
                
                if (needsUpdate) {
                    forceApplyListStyles();
                    injectGmeekSpecificStyles();
                }
            });
            
            // 开始观察文档变化
            observer.observe(document.documentElement, {
                childList: true,
                subtree: true
            });
        }
    });
})();

// 直接修改页面样式，强制应用我们想要的效果
function injectRootStyles() {
    if (document.getElementById('root-force-styles')) {
        return;
    }

    const styleEl = document.createElement('style');
    styleEl.id = 'root-force-styles';
    styleEl.textContent = `
        /* 重置可能导致问题的CSS属性 */
        html, body {
            background-color: #070720 !important;
            min-height: 100vh !important;
            height: auto !important;
            overflow-x: hidden !important;
        }
        
        /* 固定背景，不受滚动影响 */
        #background-container {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            z-index: -1000 !important;
            pointer-events: none !important;
            overflow: hidden !important;
        }
        
        /* 全局禁用模糊滤镜 */
        * {
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            filter: none !important;
            backface-visibility: hidden !important;
            -webkit-font-smoothing: antialiased !important;
            transform-style: flat !important;
        }
        
        /* 重写列表项样式，不使用CSS动画 */
        .d-flex, .Box-row, #indexPostsList > div, tr.post-item, .post-item, .tech-box-row {
            position: relative !important;
            display: block !important;
            background-color: rgba(246, 250, 255, 0.8) !important;
            border-radius: 12px !important;
            border: 1px solid rgba(126, 87, 255, 0.2) !important;
            padding: 16px !important;
            margin: 15px 0 !important;
            transition: none !important;
            transform: none !important;
            z-index: 1 !important;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05) !important;
            overflow: visible !important;
        }
        
        /* 暗色模式列表项 */
        html[data-color-mode="dark"] .d-flex, 
        html[data-color-mode="dark"] .Box-row, 
        html[data-color-mode="dark"] #indexPostsList > div, 
        html[data-color-mode="dark"] tr.post-item,
        html[data-color-mode="dark"] .post-item,
        html[data-color-mode="dark"] .tech-box-row {
            background-color: rgba(18, 18, 42, 0.8) !important;
            border: 1px solid rgba(126, 87, 255, 0.3) !important;
        }
        
        /* 技术盒子内容区域，确保清晰 */
        .tech-box-content {
            position: relative !important;
            z-index: 5 !important;
            transform: none !important;
            filter: none !important;
        }
    `;
    
    document.head.appendChild(styleEl);
}

// 创建新的背景容器替换原有背景
function replaceBackground() {
    // 移除现有背景元素
    const existingBgs = document.querySelectorAll('#background-container, #fixed-background, #page-background, #stars-container');
    existingBgs.forEach(bg => bg && bg.parentNode && bg.parentNode.removeChild(bg));
    
    // 创建新的背景容器
    const bgContainer = document.createElement('div');
    bgContainer.id = 'background-container';
    document.body.parentNode.insertBefore(bgContainer, document.body);
    
    // 设置基础背景层，使用简单的颜色而不是动画
    const baseLayer = document.createElement('div');
    baseLayer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #070720;
        z-index: -10;
    `;
    bgContainer.appendChild(baseLayer);
    
    // 添加简单的渐变背景，不使用动画
    const gradientLayer = document.createElement('div');
    gradientLayer.style.cssText = `
        position: absolute;
        top: -10%;
        left: -10%;
        width: 120%;
        height: 120%;
        background: 
            radial-gradient(circle at 80% 10%, rgba(126, 87, 255, 0.15), transparent 40%),
            radial-gradient(circle at 20% 30%, rgba(0, 220, 220, 0.15), transparent 40%),
            radial-gradient(circle at 70% 65%, rgba(255, 79, 154, 0.15), transparent 50%),
            radial-gradient(circle at 10% 85%, rgba(126, 87, 255, 0.15), transparent 30%);
        z-index: -9;
    `;
    bgContainer.appendChild(gradientLayer);
    
    // 设置HTML和BODY的背景颜色，确保滚动时一致
    document.documentElement.style.cssText += 'background-color: #070720 !important;';
    document.body.style.cssText += 'background-color: #070720 !important;';
}

// 立即执行初始化
(function() {
    // 直接强制应用根样式
    injectRootStyles();
    
    // 替换背景元素，使用简单不会产生滚动问题的实现
    replaceBackground();
    
    // 延迟注入Gmeek特定样式，以确保优先级
    setTimeout(injectGmeekSpecificStyles, 0);
    
    // 等待DOMContentLoaded事件
    document.addEventListener('DOMContentLoaded', function() {
        // 再次注入样式和替换背景
        injectRootStyles();
        replaceBackground();
        injectGmeekSpecificStyles();
        forceApplyListStyles();
        
        // 延迟再次应用，以防DOM动态更新
        setTimeout(function() {
            injectRootStyles();
            forceApplyListStyles();
        }, 500);
        
        // 设置DOM变化观察器以处理动态内容
        if (typeof MutationObserver !== 'undefined') {
            const observer = new MutationObserver(function() {
                injectRootStyles();
                forceApplyListStyles();
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    });
    
    // 监听window加载完成事件
    window.addEventListener('load', function() {
        // 再次强制应用样式和替换背景
        injectRootStyles();
        replaceBackground();
        forceApplyListStyles();
    });
})();

// 创建纯静态背景，彻底解决滚动问题
function createStaticBackground() {
    // 删除所有现有背景相关元素
    const elementsToRemove = document.querySelectorAll(
        '#background-container, #fixed-background, #page-background, #stars-container, #gradient-layer, ' +
        '#glow-layer, #shapes-layer, #dynamic-background, #simple-background'
    );
    elementsToRemove.forEach(el => el && el.parentNode && el.parentNode.removeChild(el));
    
    // 删除所有背景相关样式表
    const stylesToRemove = document.querySelectorAll(
        '#background-keyframes, #dynamic-background-animations, #glow-animation, ' +
        '#particle-animation, #root-background-fix, #root-force-styles'
    );
    stylesToRemove.forEach(style => style && style.parentNode && style.parentNode.removeChild(style));
    
    // 注入静态背景样式
    const staticStyle = document.createElement('style');
    staticStyle.id = 'static-background-style';
    staticStyle.textContent = `
        /* 固定基础样式 */
        html, body {
            background-color: #070720 !important;
            background-image: 
                radial-gradient(circle at 80% 10%, rgba(126, 87, 255, 0.15), transparent 40%), 
                radial-gradient(circle at 20% 30%, rgba(0, 220, 220, 0.15), transparent 40%),
                radial-gradient(circle at 70% 65%, rgba(255, 79, 154, 0.15), transparent 50%),
                radial-gradient(circle at 10% 85%, rgba(126, 87, 255, 0.15), transparent 30%) !important;
            background-attachment: fixed !important;
            background-size: cover !important;
            min-height: 100vh !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
        }
        
        /* 清除可能影响背景的属性 */
        * {
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
        }
        
        /* 确保内容显示正确 */
        .container-lg, main, #content, article {
            background: transparent !important;
            position: relative !important;
            z-index: 1 !important;
        }
    `;
    document.head.appendChild(staticStyle);
}

// 简化的列表样式函数
function simpleListItems() {
    // 移除现有样式
    const oldStyles = document.querySelectorAll('#simple-list-styles, #gmeek-specific-styles, #forced-list-styles');
    oldStyles.forEach(style => style && style.parentNode && style.parentNode.removeChild(style));
    
    // 创建新样式
    const listStyle = document.createElement('style');
    listStyle.id = 'simple-list-styles';
    listStyle.textContent = `
        /* 统一列表项样式 */
        .Box-row, .d-flex, #indexPostsList > div, tr.post-item, .post-item, .tech-box-row, 
        body > div.container-lg > div.container-lg > div.Box,
        body > div.container-lg > div.container-lg > div > div,
        #blog-container > div,
        main > div > div,
        [id*="post"] {
            position: relative !important;
            display: block !important;
            margin: 15px 0 !important;
            padding: 16px !important;
            background-color: rgba(246, 250, 255, 0.8) !important;
            border: 1px solid rgba(126, 87, 255, 0.2) !important;
            border-radius: 12px !important;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05) !important;
            z-index: 2 !important;
            transform: none !important;
            transition: all 0.25s ease-out !important;
        }
        
        /* 暗色模式 */
        html[data-color-mode="dark"] .Box-row,
        html[data-color-mode="dark"] .d-flex, 
        html[data-color-mode="dark"] #indexPostsList > div, 
        html[data-color-mode="dark"] tr.post-item,
        html[data-color-mode="dark"] .post-item,
        html[data-color-mode="dark"] .tech-box-row,
        html[data-color-mode="dark"] body > div.container-lg > div.container-lg > div.Box,
        html[data-color-mode="dark"] body > div.container-lg > div.container-lg > div > div,
        html[data-color-mode="dark"] #blog-container > div,
        html[data-color-mode="dark"] main > div > div,
        html[data-color-mode="dark"] [id*="post"] {
            background-color: rgba(18, 18, 42, 0.8) !important;
            border: 1px solid rgba(126, 87, 255, 0.3) !important;
        }
        
        /* 简单悬停效果 */
        .Box-row:hover, .d-flex:hover, #indexPostsList > div:hover, tr.post-item:hover, 
        .post-item:hover, .tech-box-row:hover,
        body > div.container-lg > div.container-lg > div.Box:hover,
        body > div.container-lg > div.container-lg > div > div:hover,
        #blog-container > div:hover,
        main > div > div:hover,
        [id*="post"]:hover {
            box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1) !important;
            border-left: 4px solid #7e57ff !important;
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
            background-color: rgba(126, 87, 255, 0.1) !important;
            border: 1px solid rgba(126, 87, 255, 0.2) !important;
        }
        
        /* 文本清晰度 */
        * {
            -webkit-font-smoothing: antialiased !important;
            -moz-osx-font-smoothing: grayscale !important;
            text-rendering: optimizeLegibility !important;
        }
    `;
    document.head.appendChild(listStyle);
    
    // 移除所有动画和变换属性
    const items = document.querySelectorAll('.Box-row, .d-flex, #indexPostsList > div, tr.post-item, .post-item, .tech-box-row, [id*="post"]');
    items.forEach(item => {
        // 清除样式转换属性
        item.style.transition = 'all 0.25s ease-out';
        item.style.transform = 'none';
        item.style.animation = 'none';
        
        // 确保项目有相对定位
        item.style.position = 'relative';
    });
}

// 初始化函数
function initStaticTheme() {
    // 应用静态背景
    createStaticBackground();
    
    // 应用简单列表样式
    simpleListItems();
}

// 立即初始化
(function() {
    // 立即应用静态主题
    initStaticTheme();
    
    // DOM加载完成后再次应用
    document.addEventListener('DOMContentLoaded', function() {
        initStaticTheme();
        
        // 延迟处理以确保所有元素都已加载
        setTimeout(initStaticTheme, 500);
    });
    
    // 窗口加载完成后再次应用
    window.addEventListener('load', function() {
        initStaticTheme();
    });
    
    // 监听DOM变化
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(function() {
            simpleListItems();
        });
        
        // 观察文档变化
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
})();

// 主题切换函数 - 简化版
function modeSwitch() {
    // 切换主题
    var html = document.documentElement;
    var currentTheme = html.getAttribute('data-color-mode');
    var newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // 设置新主题
    html.setAttribute('data-color-mode', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // 更新主题图标
    var themeSwitch = document.getElementById('themeSwitch');
    if (themeSwitch) {
        var iconName = newTheme === 'light' ? 'moon' : 'sun';
        if (IconList && IconList[iconName]) {
            themeSwitch.setAttribute('d', IconList[iconName]);
        }
    }
    
    // 重新应用样式
    simpleListItems();
}