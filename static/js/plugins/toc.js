/**
 * GmeekTOC - 文章目录生成插件
 * 基于https://blog.meekdai.com/Gmeek/plugins/GmeekTOC.js优化
 * 适配MyMaskKing的博客样式
 */

function createTOC() {
    // 检查是否在文章页面
    var postBody = document.getElementById('postBody');
    if (!postBody) return;
    
    // 防止重复生成
    if (document.getElementById('article-toc')) return;
    
    // 强制滚动到顶部
    window.scrollTo({
        top: 0,
        behavior: 'auto'
    });
    
    // 查找文章中的所有标题
    const headings = postBody.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings.length < 2) return; // 如果标题太少，不创建TOC
    
    // 为标题添加ID，确保能够精确定位
    headings.forEach((heading, index) => {
        // 如果标题没有ID，生成一个
        if (!heading.id) {
            const tag = heading.tagName.toLowerCase();
            const text = heading.textContent.trim();
            
            // 提取标题中可能的数字前缀(如: "1. 标题")
            const numMatch = text.match(/^(\d+)\.?\s+/);
            const numPrefix = numMatch ? numMatch[1] : '';
            
            // 创建独特的ID
            heading.id = `h-${tag}-${numPrefix ? numPrefix + '-' : ''}${index}`;
        }
    });
    
    // 创建目录容器
    const tocElement = document.createElement('div');
    tocElement.id = 'article-toc';
    tocElement.className = 'toc';
    
    // 添加目录标题
    tocElement.insertAdjacentHTML('afterbegin', '<div class="toc-title">文章目录</div>');
    
    // 创建目录内容容器
    const tocContent = document.createElement('div');
    tocContent.className = 'toc-content';
    tocElement.appendChild(tocContent);
    
    // 直接按文档顺序处理所有标题
    for (let i = 0; i < headings.length; i++) {
        const heading = headings[i];
        const level = parseInt(heading.tagName.charAt(1));
        
        // 创建目录链接
        const link = document.createElement('a');
        link.href = '#' + heading.id;
        link.textContent = heading.textContent;
        link.className = 'toc-link';
        link.setAttribute('data-level', level);
        link.setAttribute('data-index', i);
        
        // 根据标题级别设置缩进
        link.style.paddingLeft = `${(level - 1) * 15}px`;
        
        // 点击事件处理
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 获取目标元素ID
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (!targetElement) {
                console.error('目标元素未找到:', targetId);
                return;
            }
            
            // 移除所有激活状态
            document.querySelectorAll('.toc-link').forEach(l => {
                l.classList.remove('active');
            });
            
            // 添加激活状态到当前点击的链接
            this.classList.add('active');
            
            // 获取目标位置，考虑顶部空间
            const headerOffset = 85;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            // 平滑滚动
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // 不再更新URL哈希值
            // window.location.hash = targetId;
            
            // 在移动设备上，点击后关闭目录
            if (window.innerWidth <= 992) {
                // 关闭目录
                tocElement.classList.remove('show');
                tocToggleBtn.classList.remove('active');
                
                // 使用延时以允许动画完成后隐藏元素
                setTimeout(() => {
                    if (!tocElement.classList.contains('show')) {
                        tocElement.style.display = 'none';
                    }
                }, 300);
            }
        });
        
        tocContent.appendChild(link);
    }
    
    // 添加回到顶部按钮
    var topLink = document.createElement('a');
    topLink.href = '#';
    topLink.textContent = '回到顶部';
    topLink.className = 'toc-end';
    topLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 平滑滚动到顶部
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // 移除所有激活状态
        document.querySelectorAll('.toc-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // 激活第一个目录项
        const firstTocLink = document.querySelector('.toc-link');
        if (firstTocLink) {
            firstTocLink.classList.add('active');
            
            // 将目录滚动回顶部
            const tocContainer = document.querySelector('.toc-content');
            if (tocContainer) {
                tocContainer.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }
        
        // 清除URL中的哈希值
        if (window.location.hash) {
            const currentPath = window.location.pathname + window.location.search;
            window.history.replaceState(null, document.title, currentPath);
        }
        
        // 在移动设备上，点击后关闭目录
        if (window.innerWidth <= 992) {
            tocElement.classList.remove('show');
            tocToggleBtn.classList.remove('active');
        }
    });
    tocElement.appendChild(topLink);
    
    // 目录外层容器
    var rightSideToc = document.createElement('div');
    rightSideToc.className = 'right-side-toc';
    
    // 创建目录切换按钮 (仅在移动设备上显示)
    const tocToggleBtn = document.createElement('button');
    tocToggleBtn.className = 'toc-toggle';
    tocToggleBtn.setAttribute('aria-label', '显示/隐藏文章目录');
    tocToggleBtn.setAttribute('type', 'button'); // 确保按钮类型正确
    
    // 重新绑定点击事件
    tocToggleBtn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation(); // 阻止事件冒泡
        
        // 切换按钮和目录的状态
        this.classList.toggle('active');
        
        if (this.classList.contains('active')) {
            // 显示目录
            tocElement.classList.add('show');
            tocElement.style.display = 'block';
        } else {
            // 隐藏目录
            tocElement.classList.remove('show');
            // 使用延时以允许动画完成
            setTimeout(() => {
                if (!tocElement.classList.contains('show')) {
                    tocElement.style.display = 'none';
                }
            }, 300);
        }
        
        // 调试输出
        console.log('目录切换按钮被点击', 
                    '按钮状态:', this.classList.contains('active'), 
                    '目录状态:', tocElement.classList.contains('show'));
                    
        return false; // 防止事件冒泡
    };
    
    // 添加到容器
    rightSideToc.appendChild(tocElement);
    rightSideToc.appendChild(tocToggleBtn);
    
    // 将目录添加到页面
    var contentContainer = document.getElementById('content');
    if (contentContainer) {
        contentContainer.appendChild(rightSideToc);
    } else {
        postBody.parentNode.insertBefore(rightSideToc, postBody.nextSibling);
    }
    
    // 根据设备大小初始化目录显示状态
    if (window.innerWidth <= 992) {
        // 在移动设备上默认隐藏目录
        tocElement.classList.remove('show');
        tocElement.style.display = 'none';
    } else {
        // 在大屏幕上默认显示目录
        tocElement.style.display = 'block';
    }
    
    // 添加点击外部区域关闭目录的功能
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992 && 
            tocElement.classList.contains('show') && 
            !rightSideToc.contains(e.target)) {
            // 关闭目录
            tocElement.classList.remove('show');
            tocToggleBtn.classList.remove('active');
            
            // 使用延时以允许动画完成后隐藏元素
            setTimeout(() => {
                if (!tocElement.classList.contains('show')) {
                    tocElement.style.display = 'none';
                }
            }, 300);
        }
    });
    
    // 添加滚动监听
    window.addEventListener('scroll', highlightTOCOnScroll);
    
    // 简化哈希处理，删除哈希检查和定位功能
    // 页面加载时始终激活第一个目录项
        const firstTocLink = document.querySelector('.toc-link');
        if (firstTocLink) {
            firstTocLink.classList.add('active');
    }
    
    // 清除URL中的哈希值
        if (window.location.hash) {
        const currentPath = window.location.pathname + window.location.search;
        window.history.replaceState(null, document.title, currentPath);
        }
}

// 根据滚动位置高亮目录项
function highlightTOCOnScroll() {
    const headings = document.querySelectorAll('#postBody h1, #postBody h2, #postBody h3, #postBody h4, #postBody h5, #postBody h6');
    if (headings.length === 0) return;
    
    const tocLinks = document.querySelectorAll('.toc-link');
    if (tocLinks.length === 0) return;
    
    // 显示/隐藏回到顶部按钮
    const backToTopButton = document.querySelector('.toc-end');
    if (backToTopButton) {
        backToTopButton.style.visibility = window.scrollY > 200 ? 'visible' : 'hidden';
    }
    
    // 计算当前视窗位置
    const scrollY = window.scrollY;
    const headerOffset = 90;  // 头部偏移量
    
    // 找到当前视窗中的标题
    let currentHeadingIndex = -1;
    
    // 从后往前检查，找到第一个在视窗上方的标题
    for (let i = headings.length - 1; i >= 0; i--) {
        const headingTop = headings[i].getBoundingClientRect().top + window.pageYOffset - headerOffset;
        if (scrollY >= headingTop) {
            currentHeadingIndex = i;
            break;
        }
    }
    
    // 移除所有激活状态
    tocLinks.forEach(link => link.classList.remove('active'));
    
    // 如果找到匹配的标题，激活对应目录项
    if (currentHeadingIndex >= 0) {
        const currentHeading = headings[currentHeadingIndex];
        const activeLink = document.querySelector(`.toc-link[href="#${currentHeading.id}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            
            // 确保激活的目录项在可视区域内
            const tocContainer = document.querySelector('.toc-content');
            if (tocContainer) {
                const linkTop = activeLink.offsetTop;
                const containerTop = tocContainer.scrollTop;
                const containerHeight = tocContainer.clientHeight;
                
                if (linkTop < containerTop || linkTop > containerTop + containerHeight - 50) {
                    tocContainer.scrollTo({
                        top: linkTop - containerHeight / 2,
                        behavior: 'smooth'
                    });
                }
            }
        }
    } else if (scrollY < 100) {
        // 如果页面顶部，激活第一个目录项
        const firstTocLink = document.querySelector('.toc-link');
        if (firstTocLink) {
            firstTocLink.classList.add('active');
        }
    }
}

// 添加TOC样式
function addTOCStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* 右侧目录容器 */
        .right-side-toc {
            position: fixed;
            top: 120px;
            right: 5%;
            z-index: 100;
            width: 280px;
            height: calc(100vh - 140px);
            overflow: hidden;
            pointer-events: none;
        }
        
        /* TOC基础样式 */
        .toc {
            width: 260px;
            max-height: calc(100vh - 150px);
            overflow-y: auto;
            background-color: rgba(255, 255, 255, 0.92);
            border-radius: 12px;
            border: 1px solid rgba(126, 87, 255, 0.3);
            padding: 15px 12px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
            pointer-events: auto;
        }
        
        /* 悬停效果 */
        .toc:hover {
            box-shadow: 0 8px 25px rgba(126, 87, 255, 0.25);
            transform: translateY(-3px);
        }
        
        /* 暗色模式下的TOC */
        html[data-color-mode="dark"] .toc {
            background-color: rgba(18, 18, 42, 0.85);
            border: 1px solid rgba(126, 87, 255, 0.4);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        }
        
        /* 标题样式 */
        .toc-title {
            font-weight: bold;
            text-align: center;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid rgba(126, 87, 255, 0.3);
            font-size: 18px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        /* 目录链接样式 */
        .toc-link {
            display: block;
            color: var(--text-color);
            text-decoration: none;
            padding: 8px 12px;
            margin: 3px 0;
            border-left: 2px solid transparent;
            border-radius: 0 8px 8px 0;
            transition: all 0.3s ease;
            font-size: 14px;
            line-height: 1.5;
            white-space: normal;
            word-break: break-word;
            overflow-wrap: break-word;
            max-width: 100%;
            position: relative;
        }
        
        /* 标题级别样式 */
        .toc-link[data-level="1"], .toc-link[data-level="2"] {
            font-weight: 500;
        }
        
        .toc-link[data-level="1"] {
            margin-top: 8px;
        }
        
        /* 悬停效果 */
        .toc-link:hover {
            color: var(--primary-color);
            background-color: rgba(126, 87, 255, 0.1);
            border-left-color: var(--primary-color);
            transform: translateX(3px);
        }
        
        /* 激活状态 */
        .toc-link.active {
            color: var(--secondary-color);
            border-left-color: var(--secondary-color);
            background-color: rgba(255, 79, 154, 0.1);
            font-weight: 600;
            transform: translateX(5px);
            box-shadow: 0 3px 8px rgba(255, 79, 154, 0.15);
        }
        
        /* 激活指示器 */
        .toc-link.active::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 2px;
            background: linear-gradient(to bottom, var(--primary-color), var(--secondary-color));
            animation: pulseIndicator 1.5s infinite;
        }
        
        @keyframes pulseIndicator {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
        }
        
        /* 回到顶部按钮 */
        .toc-end {
            text-align: center;
            display: block;
            margin-top: 15px;
            padding: 8px 0;
            border-top: 1px solid rgba(126, 87, 255, 0.2);
            color: var(--primary-color);
            font-weight: bold;
            cursor: pointer;
            visibility: hidden;
            transition: all 0.3s ease;
            border-radius: 6px;
        }
        
        .toc-end:hover {
            color: var(--secondary-color);
            transform: translateY(-2px);
            background-color: rgba(126, 87, 255, 0.1);
        }
        
        /* 滚动条样式 */
        .toc::-webkit-scrollbar {
            width: 5px;
        }
        
        .toc::-webkit-scrollbar-track {
            background-color: rgba(0, 0, 0, 0.05);
            border-radius: 10px;
        }
        
        .toc::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, var(--primary-color), var(--secondary-color));
            border-radius: 10px;
        }
        
        /* 响应式设计 */
        @media (max-width: 1200px) {
            .right-side-toc {
                right: 2%;
                width: 240px;
            }
            
            .toc {
                width: 220px;
            }
        }
        
        /* 移动设备样式 */
        @media (max-width: 992px) {
            .right-side-toc {
                position: fixed;
                bottom: max(20px, env(safe-area-inset-bottom, 20px));
                right: 20px;
                top: auto;
                width: auto;
                height: auto;
                pointer-events: auto;
                z-index: 1000;
            }
            
            .toc {
                display: none; /* 默认隐藏 */
                position: absolute;
                bottom: 60px;
                right: 0;
                width: 280px;
                max-height: min(70vh, 500px);
                margin: 0;
                padding: 15px;
                transform: scale(0.95);
                transform-origin: bottom right;
                opacity: 0;
                transition: transform 0.3s ease, opacity 0.3s ease;
                overflow-y: auto;
                border-radius: 15px;
                box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
            }
            
            /* 当添加show类时显示目录 */
            .toc.show {
                display: block !important; /* 强制显示 */
                transform: scale(1);
                opacity: 1;
                animation: fadeIn 0.3s ease forwards;
            }
            
            /* 适配夜间模式 */
            html[data-color-mode="dark"] .toc-toggle {
                box-shadow: 0 3px 15px rgba(0, 0, 0, 0.4);
            }
            
            html[data-color-mode="dark"] .toc-toggle:hover, 
            html[data-color-mode="dark"] .toc-toggle:focus {
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
            }
            
            /* 确保目录内容可滚动 */
            .toc-content {
                padding-right: 5px;
                max-height: calc(100% - 60px); /* 减去标题和底部按钮高度 */
                overflow-y: auto;
                -webkit-overflow-scrolling: touch; /* iOS流畅滚动 */
                scrollbar-width: thin;
                scrollbar-color: var(--primary-color) transparent;
            }
            
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: scale(0.95) translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
            }
            
            /* 移动端按钮悬浮效果 */
            .toc-link {
                padding: 10px 12px;
                margin: 4px 0;
                border-radius: 8px;
                transition: background-color 0.2s ease, transform 0.2s ease;
            }
            
            .toc-link:active {
                background-color: rgba(126, 87, 255, 0.2);
                transform: scale(0.98);
            }
            
            /* 更明显的按钮当前状态 */
            .toc-link.active {
                background-color: rgba(255, 79, 154, 0.15);
                position: relative;
                font-weight: bold;
            }
            
            /* 菜单按钮脉动动画 */
            @keyframes pulse {
                0% { box-shadow: 0 0 0 0 rgba(126, 87, 255, 0.7); }
                70% { box-shadow: 0 0 0 10px rgba(126, 87, 255, 0); }
                100% { box-shadow: 0 0 0 0 rgba(126, 87, 255, 0); }
            }
            
            .toc-toggle:not(.active) {
                animation: pulse 2s infinite;
            }
            
            .toc-toggle {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
                cursor: pointer;
                color: white;
                font-size: 24px;
                transition: all 0.3s ease;
                z-index: 102;
                border: none;
                outline: none;
                position: relative;
            }
            
            .toc-toggle:hover, .toc-toggle:focus {
                transform: scale(1.1);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            }
            
            .toc-toggle::before {
                content: "≡";
                font-size: 28px;
                line-height: 1;
                transition: transform 0.3s ease;
            }
            
            .toc-toggle.active {
                background: linear-gradient(135deg, var(--secondary-color), var(--primary-color));
            }
            
            .toc-toggle.active::before {
                content: "×";
                transform: rotate(90deg);
            }
            
            .toc-link:hover, .toc-link.active {
                transform: translateX(0);
            }
        }
        
        @media (max-width: 768px) {
            .right-side-toc {
                bottom: 15px;
                right: 15px;
            }
            
            .toc {
                max-width: calc(100vw - 30px);
                width: 240px;
                bottom: 55px;
            }
            
            .toc-link {
                font-size: 13px;
                padding: 6px 10px;
            }
            
            .toc-toggle {
                width: 45px;
                height: 45px;
                font-size: 22px;
            }
        }
    `;
    document.head.appendChild(style);
}

// 监听窗口大小变化，调整目录显示
window.addEventListener('resize', function() {
    const tocElement = document.getElementById('article-toc');
    const tocToggleBtn = document.querySelector('.toc-toggle');
    
    if (tocElement && tocToggleBtn) {
        if (window.innerWidth > 992) {
            // 在大屏幕上，始终显示目录
            tocElement.classList.remove('show');
            tocToggleBtn.classList.remove('active');
            tocElement.style.display = 'block'; // 大屏幕上始终显示
        } else {
            // 在小屏幕上，默认隐藏目录
            if (!tocToggleBtn.classList.contains('active')) {
                tocElement.classList.remove('show');
                tocElement.style.display = 'none'; // 小屏幕上默认隐藏
            }
        }
    }
});

// 监听URL哈希变化，立即清除并滚动到顶部
window.addEventListener('hashchange', function() {
    if (window.location.hash) {
        // 如果URL中有哈希值，立即清除
        const currentPath = window.location.pathname + window.location.search;
        window.history.replaceState(null, document.title, currentPath);
        
        // 强制滚动到顶部
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        });
    }
});

// 页面加载完成后初始化
document.addEventListener("DOMContentLoaded", function() {
    // 添加样式
    addTOCStyles();
    
    // 无论有没有哈希值，强制滚动到页面顶部
    window.scrollTo({
        top: 0,
        behavior: 'auto'  // 使用auto而不是smooth，确保立即生效
    });
    
    // 创建目录
    createTOC();
});

// 页面完全加载后再次检查，确保所有内容已渲染
window.addEventListener("load", function() {
    // 再次强制滚动到顶部，确保在所有资源加载完毕后仍然在顶部
    window.scrollTo({
        top: 0,
        behavior: 'auto'
    });
    
    setTimeout(function() {
        // 确保目录已创建
        if (!document.getElementById('article-toc')) {
            createTOC();
        }
        
        // 第三次确认滚动到顶部
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        });
    }, 500);
}); 