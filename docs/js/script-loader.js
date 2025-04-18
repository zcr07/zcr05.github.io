// 脚本加载器 - 确保按顺序加载js文件
// 先加载热点站点JS，再加载便捷工具JS

// 检查页面是否存在目录
function checkTocExistence() {
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
        const tocElement = document.querySelector(selector);
        if (tocElement) {
            console.log(`加载器检测到目录元素: ${selector}`);
            return true;
        }
    }
    
    // 额外检查是否有通过移动端目录按钮
    const mobileTocBtn = document.querySelector('.mobile-toc-btn, .toc-mobile-btn, .btn-toc, [data-role="toc-btn"]');
    if (mobileTocBtn) {
        console.log('加载器检测到移动端目录按钮');
        return true;
    }
    
    console.log('加载器未检测到目录元素');
    return false;
}

// 按顺序加载脚本的函数
function loadScriptsSequentially(scripts, callback) {
    let index = 0;
    
    function loadNext() {
        if (index < scripts.length) {
            const scriptSrc = scripts[index];
            console.log(`加载脚本 (${index + 1}/${scripts.length}): ${scriptSrc}`);
            
            // 如果有目录且当前是便捷工具JS，则跳过加载
            const hasToc = checkTocExistence();
            if (hasToc && scriptSrc.includes('quick-tools.js')) {
                console.log(`检测到目录存在，跳过加载便捷工具JS: ${scriptSrc}`);
                index++;
                loadNext();
                return;
            }
            
            const script = document.createElement('script');
            script.src = scriptSrc;
            script.async = false; // 禁用异步加载，确保按顺序
            
            // 脚本加载完成或出错时继续加载下一个
            script.onload = function() {
                console.log(`脚本加载成功: ${scriptSrc}`);
                index++;
                loadNext();
            };
            
            script.onerror = function() {
                console.error(`脚本加载失败: ${scriptSrc}`);
                index++;
                loadNext();
            };
            
            document.head.appendChild(script);
        } else if (typeof callback === 'function') {
            // 所有脚本加载完成，执行回调
            callback();
        }
    }
    
    // 开始加载第一个脚本
    loadNext();
}

// 需要按顺序加载的脚本列表
const scripts = [
    './js/plugins/hot-sites.js',
    './js/plugins/quick-tools.js'
];

// 在DOM加载完成后开始加载脚本
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM已加载，开始按顺序加载插件脚本');
    
    const hasToc = checkTocExistence();
    if (hasToc) {
        console.log('检测到目录，仅加载热门站点JS，跳过便捷工具JS');
    }
    
    loadScriptsSequentially(scripts, function() {
        console.log('所有插件脚本加载完成');
    });
});

// 为了防止直接在HTML中添加的脚本标签导致加载顺序错乱，可以在HTML中添加以下代码：
/*
<script src="/static/js/script-loader.js"></script>
*/ 