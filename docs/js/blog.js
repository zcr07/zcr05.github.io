// main.js
document.addEventListener('DOMContentLoaded', function() {
    // 网页访问计数功能
    fetch('https://blog.meekdai.com/Gmeek/plugins/GmeekVercount.js')
        .then(response => response.text())
        .then(script => {
            const scriptElement = document.createElement('script');
            scriptElement.textContent = script;
            document.head.appendChild(scriptElement);
        })
        .catch(error => {
            console.error('Error loading GmeekVercount.js:', error);
        });
    
    // 确保SVG图标正确填充颜色
    const svgPaths = document.querySelectorAll('.btn svg path');
    svgPaths.forEach(path => {
        path.setAttribute('fill', 'currentColor');
    });
        
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
    
    // 修复标签链接，确保可点击 - 处理首页中的标签
    const labelLinks = document.querySelectorAll('.LabelName a, .LabelName object a');
    labelLinks.forEach(link => {
        // 移除现有的事件处理器以防止冲突
        const newLink = link.cloneNode(true);
        if (link.parentNode) {
            link.parentNode.replaceChild(newLink, link);
        }
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
            document.body.classList.add('theme-transition');
            setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, 500);
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

// 添加CSS变量
const cssStyle = document.createElement('style');
cssStyle.textContent = `
    .theme-transition {
        transition: background 0.5s ease, color 0.5s ease;
    }
`;
document.head.appendChild(cssStyle);