// main.js
document.addEventListener('DOMContentLoaded', function() {
    // 定义所有图标路径
    const IconList = {
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
    
    // 加载官方访问计数功能
    fetch('https://blog.meekdai.com/Gmeek/plugins/GmeekVercount.js')
        .then(response => response.text())
        .then(script => {
            const scriptElement = document.createElement('script');
            scriptElement.textContent = script;
            document.head.appendChild(scriptElement);
        })
        .catch(error => {
            console.error('Error loading GmeekVercount.js:', error);
            // 如果官方脚本加载失败，使用我们的备用实现
            loadBackupVercountScript();
        });
    
    // 确保SVG图标正确填充颜色
    const svgPaths = document.querySelectorAll('.btn svg path');
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
        document.getElementById('themeSwitch').setAttribute('d', document.documentElement.dataset.colorMode === 'light' ? IconList['moon'] : IconList['sun']);
    }
    if (document.getElementById('music')) {
        document.getElementById('music').setAttribute('d', IconList['music']);
    }
    if (document.getElementById('github')) {
        document.getElementById('github').setAttribute('d', IconList['github']);
    }
    
    // 设置帖子图标
    const iconPost = document.getElementsByClassName('svgTop0');
    for (let i = 0; i < iconPost.length; i++) {
        iconPost[i].setAttribute('d', IconList['post']);
    }
    
    // 添加页面淡入效果
    document.body.style.opacity = 0;
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = 1;
    }, 100);
    
    // 给标题添加动画效果
    const postTitle = document.querySelector('.postTitle');
    if (postTitle) {
        postTitle.classList.add('animate-gradient');
    }
    
    // 给博文卡片添加悬停动画效果
    const postCards = document.querySelectorAll('.Box');
    postCards.forEach(card => {
        card.classList.add('post-card');
    });
    
    // 主题切换
    setupThemeToggle();
    
    // 修复标签点击问题
    fixTagLabels();
    
    // 初始化搜索功能
    initSearch();
    
    // 链接点击动画 - 排除标签链接和锚点链接
    const links = document.querySelectorAll('a:not(.LabelName a):not([href^="tag.html"]):not([href^="#"])');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // 仅对非外部链接应用动画效果
            if (link.getAttribute('target') !== '_blank' && !link.getAttribute('href').startsWith('http')) {
                e.preventDefault();
                document.body.style.opacity = 0;
                setTimeout(() => {
                    window.location.href = link.getAttribute('href');
                }, 300);
            }
        });
    });
    
    // 修复Tag页面中的标签按钮点击
    if (window.location.pathname.includes('tag.html')) {
        const tagButtons = document.querySelectorAll('#taglabel .Label');
        if (tagButtons.length > 0) {
            tagButtons.forEach(button => {
                button.style.cursor = 'pointer';
            });
        }
    }
    
    // 页面滚动时的视差效果
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const header = document.getElementById('header');
        if (header) {
            header.style.transform = `translateY(${scrollPosition * 0.1}px)`;
        }
    });
    
    // 暗色/亮色主题切换增强
    const themeSwitch = document.querySelector('#themeSwitch');
    if (themeSwitch) {
        themeSwitch.parentElement.addEventListener('click', function() {
            // 添加过渡动画类
            document.body.classList.add('theme-transition');
            setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, 500);
            
            // 获取当前主题
            const currentTheme = document.documentElement.getAttribute('data-color-mode');
            // 设置新主题
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-color-mode', newTheme);
            
            // 保存到 localStorage
            localStorage.setItem('theme', newTheme);
            
            // 切换图标 - 正确设置图标
            if (newTheme === 'light') {
                themeSwitch.setAttribute('d', IconList['moon']);
            } else {
                themeSwitch.setAttribute('d', IconList['sun']);
            }
        });
    }
    
    // 创建页脚动画效果
    const footer = document.getElementById('footer');
    if (footer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    footer.style.opacity = '1';
                    footer.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        footer.style.opacity = '0';
        footer.style.transform = 'translateY(20px)';
        footer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(footer);
    }
    
    // 添加代码块复制功能
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach((codeBlock, index) => {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.textContent = '复制';
        copyButton.style.position = 'absolute';
        copyButton.style.right = '10px';
        copyButton.style.top = '10px';
        copyButton.style.padding = '5px 10px';
        copyButton.style.fontSize = '12px';
        copyButton.style.background = 'var(--primary-color)';
        copyButton.style.color = 'white';
        copyButton.style.border = 'none';
        copyButton.style.borderRadius = '4px';
        copyButton.style.cursor = 'pointer';
        copyButton.style.opacity = '0';
        copyButton.style.transition = 'opacity 0.2s';
        
        const pre = codeBlock.parentElement;
        pre.style.position = 'relative';
        
        pre.addEventListener('mouseenter', () => {
            copyButton.style.opacity = '1';
        });
        
        pre.addEventListener('mouseleave', () => {
            copyButton.style.opacity = '0';
        });
        
        copyButton.addEventListener('click', () => {
            const code = codeBlock.textContent;
            navigator.clipboard.writeText(code).then(() => {
                copyButton.textContent = '已复制!';
                setTimeout(() => {
                    copyButton.textContent = '复制';
                }, 2000);
            });
        });
        
        pre.appendChild(copyButton);
    });
});

/**
 * 修复标签点击功能
 */
function fixTagLabels() {
    try {
        // 处理首页和文章页的标签
        const labelContainers = document.querySelectorAll('.LabelName');
        
        if (labelContainers && labelContainers.length > 0) {
            labelContainers.forEach(container => {
                // 避免重复处理
                if (container.getAttribute('data-fixed') === 'true') {
                    return;
                }
                
                let targetLink = '';
                let labelText = '';
                
                // 检查是否有object标签
                const objectTag = container.querySelector('object');
                if (objectTag) {
                    try {
                        // 从object中获取链接和文本
                        const linkInObject = objectTag.contentDocument ? 
                            objectTag.contentDocument.querySelector('a') : null;
                            
                        if (linkInObject) {
                            targetLink = linkInObject.getAttribute('href');
                            labelText = linkInObject.textContent.trim();
                        } else {
                            // 可能是因为跨域无法直接访问object内容
                            // 尝试从object的data属性解析内容
                            const objectData = objectTag.getAttribute('data');
                            if (objectData && objectData.includes('<a href=')) {
                                const match = objectData.match(/<a href="([^"]+)"[^>]*>([^<]+)<\/a>/);
                                if (match) {
                                    targetLink = match[1];
                                    labelText = match[2];
                                }
                            }
                        }
                    } catch (e) {
                        console.warn('无法获取object中的链接:', e);
                    }
                    
                    // 如果仍然没有获取到链接，尝试推断链接
                    if (!targetLink || !labelText) {
                        const objectHtml = objectTag.outerHTML;
                        const tagMatch = objectHtml.match(/tag\.html#([^"']+)/);
                        if (tagMatch) {
                            targetLink = `tag.html#${tagMatch[1]}`;
                            labelText = decodeURIComponent(tagMatch[1]);
                        }
                    }
                } else {
                    // 直接从a标签获取
                    const directLink = container.querySelector('a');
                    if (directLink) {
                        targetLink = directLink.getAttribute('href');
                        labelText = directLink.textContent.trim();
                    }
                }
                
                // 如果成功获取了链接和文本，替换容器内容
                if (targetLink) {
                    // 确保是标签页链接
                    if (!targetLink.includes('tag.html') && labelText) {
                        targetLink = `tag.html#${encodeURIComponent(labelText)}`;
                    }
                    
                    // 保存原始背景色
                    const originalStyle = window.getComputedStyle(container);
                    const bgColor = originalStyle.backgroundColor;
                    
                    // 创建新的链接元素
                    const newLink = document.createElement('a');
                    newLink.href = targetLink;
                    newLink.textContent = labelText || '标签';
                    newLink.style.color = '#fff';
                    newLink.style.textDecoration = 'none';
                    newLink.style.display = 'block';
                    newLink.style.padding = '2px 8px';
                    newLink.style.width = '100%';
                    newLink.style.height = '100%';
                    newLink.style.cursor = 'pointer';
                    
                    // 阻止事件冒泡，防止冲突
                    newLink.addEventListener('click', function(e) {
                        e.stopPropagation();
                    });
                    
                    // 清空并替换内容
                    container.innerHTML = '';
                    container.appendChild(newLink);
                    container.style.backgroundColor = bgColor;
                    container.setAttribute('data-fixed', 'true');
                }
            });
        }
        
        // 处理标签页面的标签按钮
        const tagButtons = document.querySelectorAll('#taglabel .Label');
        if (tagButtons && tagButtons.length > 0) {
            tagButtons.forEach(button => {
                // 避免重复处理
                if (button.getAttribute('data-fixed') === 'true') {
                    return;
                }
                
                // 检查现有的onclick属性
                const onclickAttr = button.getAttribute('onclick');
                if (onclickAttr && onclickAttr.includes('updateShowTag')) {
                    // 提取标签名
                    const tagMatch = onclickAttr.match(/updateShowTag\(['"]([^'"]+)['"]\)/);
                    if (tagMatch && tagMatch[1]) {
                        const tagName = tagMatch[1];
                        
                        // 移除现有的onclick
                        button.removeAttribute('onclick');
                        
                        // 添加新的点击事件
                        button.addEventListener('click', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            // 优先使用原始函数
                            if (typeof window.updateShowTag === 'function') {
                                window.updateShowTag(tagName);
                            } else {
                                // 后备方案：更新URL哈希
                                window.location.hash = tagName;
                                
                                // 触发哈希变更事件
                                const hashChangeEvent = new HashChangeEvent('hashchange');
                                window.dispatchEvent(hashChangeEvent);
                            }
                        });
                    }
                } else {
                    // 没有onclick属性，直接添加标准点击事件
                    button.addEventListener('click', function(e) {
                        const tagName = this.textContent.trim().replace(/\s+\d+$/, ''); // 去掉计数
                        if (tagName) {
                            window.location.hash = encodeURIComponent(tagName);
                        }
                    });
                }
                
                button.setAttribute('data-fixed', 'true');
                button.style.cursor = 'pointer';
            });
        }
    } catch (err) {
        console.error('修复标签点击时出错:', err);
    }
}

/**
 * 设置主题切换
 */
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // 检查本地存储中的主题设置
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-color-mode', savedTheme);
    
    // 更新主题切换按钮的状态
    updateThemeToggleState(savedTheme);
    
    // 添加点击事件
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-color-mode');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // 设置新主题
        document.documentElement.setAttribute('data-color-mode', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // 更新主题切换按钮的状态
        updateThemeToggleState(newTheme);
    });
}

/**
 * 更新主题切换按钮的状态
 */
function updateThemeToggleState(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    if (theme === 'dark') {
        themeToggle.innerHTML = '<i class="fa fa-sun-o"></i>';
        themeToggle.title = '切换到亮色模式';
    } else {
        themeToggle.innerHTML = '<i class="fa fa-moon-o"></i>';
        themeToggle.title = '切换到暗色模式';
    }
}

/**
 * 初始化搜索功能
 */
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput || !searchResults) return;
    
    searchInput.addEventListener('input', function() {
        const query = this.value.trim().toLowerCase();
        
        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }
        
        // 这里可以实现搜索逻辑
        // 示例: 从posts.json加载文章数据并搜索
        fetch('/static/data/posts.json')
            .then(response => response.json())
            .then(posts => {
                const results = posts.filter(post => 
                    post.title.toLowerCase().includes(query) || 
                    post.summary.toLowerCase().includes(query) ||
                    post.tags.some(tag => tag.toLowerCase().includes(query))
                );
                
                displaySearchResults(results, query);
            })
            .catch(err => {
                console.error('搜索时出错:', err);
                searchResults.innerHTML = '<p>搜索时发生错误</p>';
                searchResults.style.display = 'block';
            });
    });
    
    // 点击其他区域关闭搜索结果
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

/**
 * 显示搜索结果
 */
function displaySearchResults(results, query) {
    const searchResults = document.getElementById('search-results');
    
    if (results.length === 0) {
        searchResults.innerHTML = `<p>未找到与"${query}"相关的结果</p>`;
    } else {
        let html = '<ul>';
        results.slice(0, 5).forEach(post => {
            html += `<li><a href="${post.url}">${post.title}</a></li>`;
        });
        html += '</ul>';
        
        if (results.length > 5) {
            html += `<p>共找到 ${results.length} 个结果，显示前 5 个</p>`;
        }
        
        searchResults.innerHTML = html;
    }
    
    searchResults.style.display = 'block';
}

// 备用访问量统计函数，仅在官方脚本加载失败时使用
function loadBackupVercountScript() {
    // 直接在页面中嵌入访问量统计代码
    function createVercount() {
        // 博客文章页面浏览量
        var postBody = document.getElementById('postBody');
        if (postBody) {
            postBody.insertAdjacentHTML('afterend', '<div style="font-size:small;margin-top:8px;">本文浏览量：<span id="postVercount">--</span>次</div>');
        }
        
        // 网站总浏览量
        var runday = document.getElementById('runday');
        if (runday) {
            runday.insertAdjacentHTML('afterend', '总浏览量：<span id="vercount">--</span>次 • ');
        }
    }
    
    // 执行访问量统计代码
    createVercount();
    
    // 加载vercount.js
    var element = document.createElement('script');
    element.src = 'https://vercount.one/js';
    document.head.appendChild(element);
}

// 页面加载完成后初始化SVG图标
document.addEventListener('DOMContentLoaded', function() {
    // 从 localStorage 获取主题设置或使用默认值
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-color-mode', savedTheme);
    
    // 根据当前主题设置正确的图标
    const themeSwitch = document.getElementById('themeSwitch');
    if (themeSwitch) {
        if (savedTheme === 'light') {
            themeSwitch.setAttribute('d', IconList['moon']);
        } else {
            themeSwitch.setAttribute('d', IconList['sun']);
        }
    }
    
    // 确保所有SVG图标都正确加载
    initializeIcons();
    
    // ... 其他已有代码
});

// 初始化所有SVG图标
function initializeIcons() {
    const IconList = {
        'sun': 'M8 10.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM8 12a4 4 0 100-8 4 4 0 000 8zM8 0a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V.75A.75.75 0 018 0zm0 13a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 018 13zM2.343 2.343a.75.75 0 011.061 0l1.06 1.061a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zm9.193 9.193a.75.75 0 011.06 0l1.061 1.06a.75.75 0 01-1.06 1.061l-1.061-1.06a.75.75 0 010-1.061zM16 8a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0116 8zM3 8a.75.75 0 01-.75.75H.75a.75.75 0 010-1.5h1.5A.75.75 0 013 8zm10.657-5.657a.75.75 0 010 1.061l-1.061 1.06a.75.75 0 11-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zm-9.193 9.193a.75.75 0 010 1.06l-1.06 1.061a.75.75 0 11-1.061-1.06l1.06-1.061a.75.75 0 011.061 0z',
        'moon': 'M9.598 1.591a.75.75 0 01.785-.175 7 7 0 11-8.967 8.967.75.75 0 01.961-.96 5.5 5.5 0 007.046-7.046.75.75 0 01.175-.786zm1.616 1.945a7 7 0 01-7.678 7.678 5.5 5.5 0 107.678-7.678z',
        'sync': 'M1.705 8.005a.75.75 0 0 1 .834.656 5.5 5.5 0 0 0 9.592 2.97l-1.204-1.204a.25.25 0 0 1 .177-.427h3.646a.25.25 0 0 1 .25.25v3.646a.25.25 0 0 1-.427.177l-1.38-1.38A7.002 7.002 0 0 1 1.05 8.84a.75.75 0 0 1 .656-.834ZM8 2.5a5.487 5.487 0 0 0-4.131 1.869l1.204 1.204A.25.25 0 0 1 4.896 6H1.25A.25.25 0 0 1 1 5.75V2.104a.25.25 0 0 1 .427-.177l1.38 1.38A7.002 7.002 0 0 1 14.95 7.16a.75.75 0 0 1-1.49.178A5.5 5.5 0 0 0 8 2.5Z',
        'home': 'M6.906.664a1.749 1.749 0 0 1 2.187 0l5.25 4.2c.415.332.657.835.657 1.367v7.019A1.75 1.75 0 0 1 13.25 15h-3.5a.75.75 0 0 1-.75-.75V9H7v5.25a.75.75 0 0 1-.75.75h-3.5A1.75 1.75 0 0 1 1 13.25V6.23c0-.531.242-1.034.657-1.366l5.25-4.2Zm1.25 1.171a.25.25 0 0 0-.312 0l-5.25 4.2a.25.25 0 0 0-.094.196v7.019c0 .138.112.25.25.25H5.5V8.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 .75.75v5.25h2.75a.25.25 0 0 0 .25-.25V6.23a.25.25 0 0 0-.094-.195Z',
        'search': 'M15.7 13.3l-3.81-3.83A5.93 5.93 0 0 0 13 6c0-3.31-2.69-6-6-6S1 2.69 1 6s2.69 6 6 6c1.3 0 2.48-.41 3.47-1.11l3.83 3.81c.19.2.45.3.7.3.25 0 .52-.09.7-.3a.996.996 0 0 0 0-1.41v.01zM7 10.7c-2.59 0-4.7-2.11-4.7-4.7 0-2.59 2.11-4.7 4.7-4.7 2.59 0 4.7 2.11 4.7 4.7 0 2.59-2.11 4.7-4.7 4.7z',
        'rss': 'M2.002 2.725a.75.75 0 0 1 .797-.699C8.79 2.42 13.58 7.21 13.974 13.201a.75.75 0 0 1-1.497.098 10.502 10.502 0 0 0-9.776-9.776.747.747 0 0 1-.7-.798ZM2.84 7.05h-.002a7.002 7.002 0 0 1 6.113 6.111.75.75 0 0 1-1.49.178 5.503 5.503 0 0 0-4.8-4.8.75.75 0 0 1 .179-1.489ZM2 13a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z',
        'music': 'M8 14.25A3.25 3.25 0 0 1 4.75 11V4.56l9.5-1.54v5.73a1.75 1.75 0 1 0 1-1.58V2a.75.75 0 0 0-.88-.74l-11 1.79A.75.75 0 0 0 2.5 3.8v5.7a3.25 3.25 0 1 0 1.5 2.75.05.05 0 0 0 0-.01v-4.6l9-1.46v4.52A3.25 3.25 0 0 1 8 14.25Z',
        'post': 'M0 3.75C0 2.784.784 2 1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25Zm1.75-.25a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25v-8.5a.25.25 0 0 0-.25-.25ZM3.5 6.25a.75.75 0 0 1 .75-.75h7a.75.75 0 0 1 0 1.5h-7a.75.75 0 0 1-.75-.75Zm.75 2.25h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1 0-1.5Z',
        'github': 'M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z',
        'about': 'M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z',
        'contact': 'M0 4C0 1.79086 1.79086 0 4 0H12C14.2091 0 16 1.79086 16 4V8C16 10.2091 14.2091 12 12 12H8L4 16V12H4C1.79086 12 0 10.2091 0 8V4ZM4 3C4 3.55228 4.44772 4 5 4H11C11.5523 4 12 3.55228 12 3C12 2.44772 11.5523 2 11 2H5C4.44772 2 4 2.44772 4 3ZM5 7C4.44772 7 4 7.44772 4 8C4 8.55228 4.44772 9 5 9H9C9.55228 9 10 8.55228 10 8C10 7.44772 9.55228 7 9 7H5Z',
        'friends': 'M7.84 1.804A.75.75 0 018.25 1.5h5.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75h-1.5a.75.75 0 110-1.5h.75v-6h-4.5v3a.75.75 0 01-.75.75h-3v.75h.75a.75.75 0 110 1.5h-1.5a.75.75 0 01-.75-.75v-5.5a.75.75 0 01.225-.53l2.5-2.25z M1.5 8.5a3 3 0 116 0 3 3 0 01-6 0zm3-2a2 2 0 100 4 2 2 0 000-4zm8.634-3.635a.75.75 0 00-1.06 0l-.97.97-.97-.97a.75.75 0 00-1.06 1.06l.97.97-.97.97a.75.75 0 101.06 1.06l.97-.97.97.97a.75.75 0 101.06-1.06l-.97-.97.97-.97a.75.75 0 000-1.06z'
    };

    // 设置所有SVG路径
    const allSvgPaths = document.querySelectorAll('svg path');
    allSvgPaths.forEach(path => {
        const parentSvg = path.closest('svg');
        if (parentSvg) {
            const id = path.id || '';
            
            // 根据ID或类名设置路径
            if (id === 'pathSearch' || parentSvg.classList.contains('search-icon')) {
                path.setAttribute('d', IconList['search']);
            } else if (id === 'pathHome' || parentSvg.classList.contains('home-icon')) {
                path.setAttribute('d', IconList['home']);
            } else if (id === 'pathRSS' || parentSvg.classList.contains('rss-icon')) {
                path.setAttribute('d', IconList['rss']);
            } else if (id === 'themeSwitch' || parentSvg.classList.contains('theme-icon')) {
                // 正确设置主题切换图标
                const currentTheme = document.documentElement.getAttribute('data-color-mode') || 'light';
                path.setAttribute('d', currentTheme === 'light' ? IconList['moon'] : IconList['sun']);
            } else if (id === 'music' || parentSvg.classList.contains('music-icon')) {
                path.setAttribute('d', IconList['music']);
            } else if (id === 'github' || parentSvg.classList.contains('github-icon')) {
                path.setAttribute('d', IconList['github']);
            } else if (path.classList.contains('svgTop0') || parentSvg.classList.contains('post-icon')) {
                path.setAttribute('d', IconList['post']);
            }
            
            // 确保填充颜色正确
            path.setAttribute('fill', 'currentColor');
        }
    });
    
    // 特别处理文章图标
    const postIcons = document.getElementsByClassName('svgTop0');
    for (let i = 0; i < postIcons.length; i++) {
        postIcons[i].setAttribute('d', IconList['post']);
    }
}

// 主题切换功能
function modeSwitch() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-color-mode');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // 添加过渡动画类
    document.body.classList.add('theme-transition');
    
    // 设置新主题
    html.setAttribute('data-color-mode', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // 更新主题图标
    const themeSwitch = document.getElementById('themeSwitch');
    if (themeSwitch) {
        if (newTheme === 'light') {
            themeSwitch.setAttribute('d', IconList['moon']);
        } else {
            themeSwitch.setAttribute('d', IconList['sun']);
        }
    }
    
    // 移除过渡动画类
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 500);
}

// 初始化动画图标
document.addEventListener('DOMContentLoaded', function() {
    // 从 localStorage 获取主题设置或使用默认值
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-color-mode', savedTheme);
    
    // 设置主题切换图标
    const themeSwitchBtn = document.querySelector('#themeSwitch');
    if (themeSwitchBtn) {
        // 设置正确的图标
        themeSwitchBtn.setAttribute('d', savedTheme === 'light' ? IconList['moon'] : IconList['sun']);
        
        // 添加点击事件处理
        themeSwitchBtn.parentElement.addEventListener('click', function() {
            // 调用主题切换函数
            modeSwitch();
        });
    }
    
    // 设置所有SVG图标
    const svgPaths = document.querySelectorAll('.btn svg path');
    svgPaths.forEach(path => {
        path.setAttribute('fill', 'currentColor');
    });
    
    // 设置预定义的SVG图标路径
    if (document.getElementById('pathSearch')) {
        document.getElementById('pathSearch').setAttribute('d', IconList['search']);
    }
    if (document.getElementById('pathHome')) {
        document.getElementById('pathHome').setAttribute('d', IconList['home']);
    }
    if (document.getElementById('pathRSS')) {
        document.getElementById('pathRSS').setAttribute('d', IconList['rss']);
    }
    if (document.getElementById('music')) {
        document.getElementById('music').setAttribute('d', IconList['music']);
    }
    if (document.getElementById('github')) {
        document.getElementById('github').setAttribute('d', IconList['github']);
    }
    
    // 设置帖子图标
    const iconPost = document.getElementsByClassName('svgTop0');
    for (let i = 0; i < iconPost.length; i++) {
        iconPost[i].setAttribute('d', IconList['post']);
    }
    
    // 统一标签样式处理
    initializeLabels();
    
    // 页面加载完成后增加淡入效果
    document.body.style.opacity = 0;
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = 1;
    }, 100);
});

// 统一标签样式处理
function initializeLabels() {
    // 确保所有标签容器有统一的类
    const labelContainers = document.querySelectorAll('.listLabels');
    labelContainers.forEach(container => {
        if (!container.classList.contains('flexLabels')) {
            container.classList.add('flexLabels');
        }
    });
    
    // 处理标签样式
    const allLabels = document.querySelectorAll('.Label, .LabelName');
    allLabels.forEach(label => {
        // 确保标签有基本样式
        if (label.classList.contains('LabelTime') && !label.hasAttribute('data-styled')) {
            // 日期标签特殊样式
            label.style.background = 'linear-gradient(45deg, var(--secondary-color), #ff6b6b)';
            label.setAttribute('data-styled', 'true');
        } 
        
        // 为包含链接的标签添加点击处理
        const labelLinks = label.querySelectorAll('a');
        labelLinks.forEach(link => {
            if (!link.hasAttribute('data-event-added')) {
                link.setAttribute('data-event-added', 'true');
                link.addEventListener('click', function(e) {
                    e.stopPropagation(); // 阻止事件冒泡
                });
            }
        });
    });
    
    // 修复标签页的标签布局
    const tagLabel = document.getElementById('taglabel');
    if (tagLabel && !tagLabel.classList.contains('flexLabels')) {
        tagLabel.classList.add('flexLabels');
    }
}