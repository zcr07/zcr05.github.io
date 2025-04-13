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
        
        // 重置所有可能存在的滚动容器
        resetAllScrollbars();
        
        // 移除所有激活状态
        document.querySelectorAll('.toc-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // 激活第一个目录项
        const firstTocLink = document.querySelector('.toc-link');
        if (firstTocLink) {
            firstTocLink.classList.add('active');
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
    tocToggleBtn.setAttribute('type', 'button'); 
    tocToggleBtn.style.display = 'flex';
    tocToggleBtn.style.visibility = 'visible';
    tocToggleBtn.style.opacity = '1';
    tocToggleBtn.style.zIndex = '9999';
    tocToggleBtn.style.boxShadow = '0 3px 15px rgba(0,0,0,0.3)';
    tocToggleBtn.style.transform = 'scale(1.1)';
    
    // 直接绑定事件监听器
    tocToggleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation(); // 阻止事件冒泡
        
        console.log('目录切换按钮被点击 - 直接事件监听');
        
        // 操作目录显示/隐藏
        this.classList.toggle('active');
        
        if (this.classList.contains('active')) {
            // 显示目录并设置样式
            tocElement.classList.add('show');
            tocElement.style.display = 'block';
            
            // 确保样式立即生效
            requestAnimationFrame(() => {
                tocElement.style.opacity = '1';
                tocElement.style.transform = 'scale(1)';
                tocElement.style.visibility = 'visible';
                
                // 添加重要标记样式
                document.documentElement.style.setProperty('--toc-visible', 'true');
                document.body.classList.add('toc-open');
                
                console.log('目录已显示 - 内联事件处理');
            });
        } else {
            // 隐藏目录
            tocElement.classList.remove('show');
            tocElement.style.opacity = '0';
            tocElement.style.transform = 'scale(0.95)';
            document.documentElement.style.setProperty('--toc-visible', 'false');
            document.body.classList.remove('toc-open');
            
            // 延迟设置display:none
            setTimeout(() => {
                if (!tocElement.classList.contains('show')) {
                    tocElement.style.display = 'none';
                }
            }, 300);
            
            console.log('目录已隐藏 - 内联事件处理');
        }
                    
        return false; // 防止事件冒泡
    });
    
    // 添加目录显示/隐藏全局样式
    const tocStatusStyle = document.createElement('style');
    tocStatusStyle.innerHTML = `
        html[style*="--toc-visible:true"] .toc,
        body.toc-open .toc {
            display: block !important;
            opacity: 1 !important;
            transform: scale(1) !important;
            visibility: visible !important;
        }
    `;
    document.head.appendChild(tocStatusStyle);
    
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
        // 在移动设备上默认隐藏目录，确保按钮可见
        tocElement.classList.remove('show');
        tocElement.style.display = 'none';
        tocElement.style.opacity = '0';
        tocElement.style.transform = 'scale(0.95)';
        
        // 强制显示按钮
        tocToggleBtn.style.display = 'flex';
        tocToggleBtn.style.visibility = 'visible';
        tocToggleBtn.style.opacity = '1';
        tocToggleBtn.style.zIndex = '9999';
        
        // 添加固定定位样式
        tocToggleBtn.style.position = 'fixed';
        tocToggleBtn.style.bottom = '20px';
        tocToggleBtn.style.right = '20px';
        
        console.log('移动设备初始化：隐藏目录，显示按钮 - 直接样式');
    } else {
        // 在大屏幕上默认显示目录
        tocElement.style.display = 'block';
        tocElement.style.opacity = '1';
        tocElement.style.transform = 'scale(1)';
        console.log('大屏幕初始化：显示目录');
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
            
            // 当页面在顶部时，确保所有滚动条回到顶部
            const tocContainer = document.querySelector('.toc-content');
            if (tocContainer) {
                tocContainer.scrollTop = 0;
            }
            
            // 重置其他可能存在的滚动条
            const tocElement = document.querySelector('.toc');
            if (tocElement) {
                tocElement.scrollTop = 0;
            }
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
            right: calc(50% - 550px - 280px);
            z-index: 100;
            width: 260px;
            height: calc(100vh - 140px);
            overflow: hidden;
            pointer-events: auto !important;
        }
        
        /* TOC基础样式 */
        .toc {
            width: 100%;
            max-height: calc(100vh - 150px);
            overflow-y: auto;
            background-color: rgba(255, 255, 255, 0.95);
            border-radius: 12px;
            border: 1px solid rgba(126, 87, 255, 0.3);
            padding: 15px 12px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        }
        
        /* 悬停效果 */
        .toc:hover {
            box-shadow: 0 8px 25px rgba(126, 87, 255, 0.25);
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
        
        /* 目录切换按钮样式 */
        .toc-toggle {
            display: none; /* 在桌面端隐藏切换按钮 */
        }
        
        /* 响应式设计 */
        @media (max-width: 1600px) {
            .right-side-toc {
                right: 20px;
                width: 240px;
            }
            
            .toc {
                width: 100%;
            }
        }
        
        @media (max-width: 1200px) {
            .right-side-toc {
                display: none !important;
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
                z-index: 9999 !important;
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
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
                background-color: rgba(255, 255, 255, 0.98);
            }
            
            /* 当添加show类时显示目录 */
            .toc.show {
                display: block !important; /* 强制显示 */
                transform: scale(1) !important;
                opacity: 1 !important;
                animation: fadeIn 0.3s ease forwards;
                visibility: visible !important;
                z-index: 9999 !important;
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
            
            /* 在移动设备上显示切换按钮 */
            .toc-toggle {
                display: flex !important; /* 强制显示 */
                align-items: center;
                justify-content: center;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                box-shadow: 0 3px 15px rgba(0, 0, 0, 0.3) !important;
                cursor: pointer;
                color: white;
                font-size: 26px !important;
                transition: all 0.3s ease;
                z-index: 9999 !important;
                border: none;
                outline: none;
                position: relative;
                visibility: visible !important;
                opacity: 1 !important;
                transform: scale(1.05);
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
    
    // 添加仅针对TOC组件的样式调整
    const contentStyle = document.createElement('style');
    contentStyle.textContent = `
        @media (min-width: 1201px) {
            /* 确保内容区域不会受到目录的影响 */
            #postBody {
                width: 100%;
                box-sizing: border-box;
            }
            
            /* 目录显示/隐藏按钮样式调整 */
            .toc-toggle {
                width: 0;
                height: 0;
                opacity: 0;
                visibility: hidden;
                display: none !important;
                pointer-events: none;
            }
        }
    `;
    document.head.appendChild(contentStyle);
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

// 显示/隐藏移动端目录
function toggleMobileToc(show) {
    const toc = document.querySelector('.mobile-toc');
    const btn = document.querySelector('.mobile-toc-btn');
    
    if (!toc) {
        console.log('目录不存在，这是不应该发生的情况，因为我们已经预先创建了目录');
        return;
    }
    
    // 如果指定了show参数，按指定参数处理，否则切换状态
    const shouldShow = (show !== undefined) ? show : (toc.style.display === 'none' || toc.style.opacity === '0');
    
    if (shouldShow) {
        // 显示目录
        console.log('显示移动端目录');
        toc.style.display = 'block';
        
        // 强制重排
        toc.offsetHeight;
        
        // 设置显示样式
        toc.style.opacity = '1';
        toc.style.transform = 'scale(1)';
        
        // 更新按钮样式
        if (btn) {
            btn.innerHTML = '×';
            btn.style.background = 'linear-gradient(135deg, #ff4f9a, #7e57ff)';
        }
    } else {
        // 隐藏目录
        console.log('隐藏移动端目录');
        toc.style.opacity = '0';
        toc.style.transform = 'scale(0.95)';
        
        // 延迟设置display: none
        setTimeout(() => {
            toc.style.display = 'none';
        }, 300);
        
        // 更新按钮样式
        if (btn) {
            btn.innerHTML = '≡';
            btn.style.background = 'linear-gradient(135deg, #7e57ff, #ff4f9a)';
        }
    }
}

// 检测设备并初始化相应的目录
function initializeTOC() {
    // 检查是否为移动设备
    if (window.innerWidth <= 992) {
        console.log('检测到移动设备，使用简化的目录');
        
        // 先创建目录内容，再创建按钮，确保目录在按钮创建时就已经存在
        createMobileToc();
        createMobileTocButton();
        
        // 移除可能已存在的原始目录
        const oldToc = document.querySelector('.right-side-toc');
        if (oldToc) {
            oldToc.style.display = 'none';
        }
        
        // 添加额外修复样式
        addExtraFixStyles();
    } else {
        console.log('检测到桌面设备，使用原始目录');
        // 使用原始的createTOC函数创建目录
        createTOC();
    }
    
    // 确保所有滚动条都重置到顶部
    setTimeout(resetAllScrollbars, 300);
}

// 页面加载完成后初始化
document.addEventListener("DOMContentLoaded", function() {
    // 添加样式
    addTOCStyles();
    
    // 无论有没有哈希值，强制滚动到页面顶部
    window.scrollTo({
        top: 0,
        behavior: 'auto'
    });
    
    // 初始化目录
    initializeTOC();
});

// 页面完全加载后再次检查
window.addEventListener("load", function() {
    // 再次强制滚动到顶部，确保在所有资源加载完毕后仍然在顶部
    resetAllScrollbars();
    
    // 确保目录已初始化
    setTimeout(function() {
        if (window.innerWidth <= 1024) {
            // 移动设备上检查目录是否已创建
            if (!document.querySelector('.mobile-toc')) {
                console.log('移动端目录未创建，创建目录内容和按钮');
                createMobileToc();
                createMobileTocButton();
                addExtraFixStyles();
            }
        } else {
            // 桌面设备上检查目录是否已创建
        if (!document.getElementById('article-toc')) {
                console.log('桌面端目录未创建，创建目录');
            createTOC();
            }
        }
        
        // 再次重置所有滚动条
        resetAllScrollbars();
    }, 500);
});

// 添加额外修复样式
function addExtraFixStyles() {
    // 检查是否在移动设备上
    if (window.innerWidth <= 992) {
        // 创建内联样式标签
        const fixStyle = document.createElement('style');
        fixStyle.id = 'toc-fix-style';
        fixStyle.innerHTML = `
            .toc-toggle {
                display: flex !important;
                visibility: visible !important;
                opacity: 1 !important;
                z-index: 9999 !important;
                position: fixed !important;
                bottom: 20px !important;
                right: 20px !important;
            }
            
            .toc.show {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                z-index: 9998 !important;
            }
            
            .right-side-toc {
                pointer-events: auto !important;
                z-index: 9999 !important;
            }
        `;
        
        // 删除之前的修复样式（如果有）
        const oldStyle = document.getElementById('toc-fix-style');
        if (oldStyle) {
            oldStyle.remove();
        }
        
        // 添加到头部
        document.head.appendChild(fixStyle);
        
        console.log('添加了额外修复样式');
    }
}

// 彻底重写移动端目录按钮及显示逻辑
function createMobileTocButton() {
    console.log('创建独立的移动端目录按钮');
    
    // 移除可能已存在的TOC按钮
    const existingBtn = document.querySelector('.mobile-toc-btn');
    if (existingBtn) {
        existingBtn.remove();
    }
    
    // 创建简单的移动端目录按钮
    const btn = document.createElement('button');
    btn.className = 'mobile-toc-btn';
    btn.innerHTML = '≡';
    btn.setAttribute('aria-label', '文章目录');
    
    // 应用样式
    Object.assign(btn.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #7e57ff, #ff4f9a)',
        color: 'white',
        fontSize: '28px',
        border: 'none',
        boxShadow: '0 3px 15px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: '10000'
    });
    
    // 绑定点击事件
    btn.addEventListener('click', function() {
        toggleMobileToc();
    });
    
    // 添加到body
    document.body.appendChild(btn);
    console.log('移动端目录按钮已创建');
    
    return btn;
}

// 创建简化的移动端目录
function createMobileToc() {
    console.log('创建独立的移动端目录');
    
    // 移除可能已存在的移动端目录
    const existingToc = document.querySelector('.mobile-toc');
    if (existingToc) {
        existingToc.remove();
    }
    
    // 获取文章中的所有标题
    const headings = document.querySelectorAll('#postBody h1, #postBody h2, #postBody h3, #postBody h4, #postBody h5, #postBody h6');
    if (headings.length < 2) {
        console.log('标题数量不足，不创建目录');
        return null;
    }
    
    // 创建目录容器
    const toc = document.createElement('div');
    toc.className = 'mobile-toc';
    
    // 设置初始样式 - 隐藏状态
    Object.assign(toc.style, {
        position: 'fixed',
        bottom: '80px',
        right: '20px',
        width: '280px',
        maxHeight: '70vh',
        background: 'rgba(255, 255, 255, 0.98)',
        borderRadius: '15px',
        border: '1px solid rgba(126, 87, 255, 0.3)',
        boxShadow: '0 5px 25px rgba(0, 0, 0, 0.3)',
        padding: '15px',
        overflowY: 'auto',
        display: 'none',
        zIndex: '9999',
        transition: 'transform 0.3s, opacity 0.3s',
        transform: 'scale(0.95)',
        opacity: '0'
    });
    
    // 添加标题
    const title = document.createElement('div');
    title.textContent = '文章目录';
    Object.assign(title.style, {
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '15px',
        paddingBottom: '10px',
        borderBottom: '2px solid rgba(126, 87, 255, 0.3)',
        fontSize: '18px',
        background: 'linear-gradient(135deg, #7e57ff, #ff4f9a)',
        webkitBackgroundClip: 'text',
        webkitTextFillColor: 'transparent',
        backgroundClip: 'text'
    });
    toc.appendChild(title);
    
    // 添加目录内容
    headings.forEach((heading, index) => {
        // 为标题添加ID
        if (!heading.id) {
            const tag = heading.tagName.toLowerCase();
            heading.id = `heading-${tag}-${index}`;
        }
        
        // 创建目录项
        const link = document.createElement('a');
        link.href = '#' + heading.id;
        link.textContent = heading.textContent;
        
        const level = parseInt(heading.tagName.charAt(1));
        
        // 设置目录项样式
        Object.assign(link.style, {
            display: 'block',
            padding: '8px 10px',
            marginBottom: '5px',
            textDecoration: 'none',
            color: 'inherit',
            borderLeft: '2px solid transparent',
            paddingLeft: (level - 1) * 15 + 10 + 'px',
            borderRadius: '0 8px 8px 0',
            transition: 'all 0.2s'
        });
        
        // 绑定点击事件
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 滚动到对应标题
            const target = document.getElementById(heading.id);
            if (target) {
                const yOffset = -85;
                const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({top: y, behavior: 'smooth'});
                
                // 关闭目录
                toggleMobileToc(false);
            }
        });
        
        toc.appendChild(link);
    });
    
    // 添加回到顶部按钮
    const topBtn = document.createElement('a');
    topBtn.textContent = '回到顶部';
    Object.assign(topBtn.style, {
        display: 'block',
        textAlign: 'center',
        marginTop: '15px',
        padding: '8px 0',
        borderTop: '1px solid rgba(126, 87, 255, 0.2)',
        cursor: 'pointer',
        fontWeight: 'bold',
        color: '#7e57ff'
    });
    
    topBtn.addEventListener('click', function() {
        window.scrollTo({top: 0, behavior: 'smooth'});
        toggleMobileToc(false);
    });
    
    toc.appendChild(topBtn);
    
    // 添加到body
    document.body.appendChild(toc);
    console.log('移动端目录已创建');
    
    return toc;
}

// 重置所有页面滚动条的函数
function resetAllScrollbars() {
    // 1. 重置主窗口滚动条
        window.scrollTo({
            top: 0,
        behavior: 'smooth'
    });
    
    // 2. 重置目录内容滚动条 - 立即生效
    const tocContainer = document.querySelector('.toc-content');
    if (tocContainer) {
        // 方法1: 直接设置scrollTop
        tocContainer.scrollTop = 0;
        
        // 方法2: 确保第一个目录项可见
        const firstTocLink = document.querySelector('.toc-link');
        if (firstTocLink) {
            try {
                // 使用兼容性更好的方式
                firstTocLink.scrollIntoView(true);
            } catch(e) {
                console.log('scrollIntoView失败');
            }
        }
    }
    
    // 3. 重置整个目录容器的滚动条（如果有）
    const tocElement = document.getElementById('article-toc');
    if (tocElement) {
        tocElement.scrollTop = 0;
    }
    
    // 4. 重置文章容器的滚动条（如果有）
    const postBody = document.getElementById('postBody');
    if (postBody) {
        postBody.scrollTop = 0;
    }
    
    // 5. 重置内容容器的滚动条（如果有）
    const contentContainer = document.getElementById('content');
    if (contentContainer) {
        contentContainer.scrollTop = 0;
    }
    
    // 6. 延迟再次尝试滚动重置，确保生效
    setTimeout(() => {
        if (tocContainer) tocContainer.scrollTop = 0;
        if (tocElement) tocElement.scrollTop = 0;
        
        // 尝试重置toc容器本身
        const toc = document.querySelector('.toc');
        if (toc) toc.scrollTop = 0;
    }, 50);
}

// 修改创建TOC切换按钮函数
function createTOCToggle(tocElement) {
    // 仅在移动设备上才需要创建切换按钮
    if (window.innerWidth <= 992) {
        const tocToggle = document.createElement('button');
        tocToggle.className = 'toc-toggle';
        tocToggle.setAttribute('aria-label', '切换目录显示');
        tocToggle.setAttribute('title', '切换目录显示');
        
        // 将切换按钮添加到文档中
        document.querySelector('.right-side-toc').appendChild(tocToggle);
        
        // 添加点击事件
        tocToggle.addEventListener('click', function() {
            tocElement.classList.toggle('hidden');
            tocToggle.classList.toggle('active');
            
            // 保存用户偏好到localStorage
            const isHidden = tocElement.classList.contains('hidden');
            localStorage.setItem('tocHidden', isHidden.toString());
        });
        
        // 从localStorage读取用户偏好
        const savedHidden = localStorage.getItem('tocHidden');
        if (savedHidden === 'true') {
            tocElement.classList.add('hidden');
            tocToggle.classList.add('active');
        }
    }
} 