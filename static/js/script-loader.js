// 脚本加载器 - 确保按顺序加载js文件
// 先加载热点站点JS，再加载便捷工具JS

// 全局加载状态跟踪
window.scriptLoaderStatus = {
    hotSitesLoaded: false,
    quickToolsLoaded: false,
    pageFullyLoaded: false
};

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

// 设置全局的基本配置和状态
function setupGlobalConfig() {
    // 将目录状态暴露为全局变量，供各脚本使用
    window.hasToc = checkTocExistence();
    console.log("目录状态：", window.hasToc ? "存在" : "不存在");
    
    // 提前获取当前域名，方便构建各种路径
    window.currentDomain = window.location.origin;
    
    // 判断当前环境
    window.isLocalEnv = window.location.protocol === 'file:' || 
                       window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1';
    
    // 输出环境信息
    console.log(`当前环境: ${window.isLocalEnv ? '本地测试' : '网络环境'}`);
    console.log(`当前域名: ${window.currentDomain}`);
    
    // 输出配置文件路径信息
    console.log("配置文件路径: 热门站点配置 -> " + window.location.origin + "/static/config/hot_site.json");
    console.log("配置文件路径: 便捷工具配置 -> " + window.location.origin + "/static/config/quick_tools.json");
}

// 按顺序加载脚本的函数
function loadScriptsSequentially(scripts, callback) {
    let index = 0;
    
    function loadNext() {
        if (index < scripts.length) {
            const scriptSrc = scripts[index];
            console.log(`加载脚本 (${index + 1}/${scripts.length}): ${scriptSrc}`);
            
            // 如果有目录且当前是便捷工具JS，则跳过加载
            const hasToc = window.hasToc || checkTocExistence();
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
                
                // 更新加载状态
                if (scriptSrc.includes('hot-sites.js')) {
                    window.scriptLoaderStatus.hotSitesLoaded = true;
                    
                    // 确保热门按钮可见（在小屏幕上）
                    if (window.innerWidth <= 1200) {
                        setTimeout(function() {
                            if (typeof window.ensureButtonVisibility === 'function') {
                                window.ensureButtonVisibility();
                            }
                        }, 200);
                    }
                } else if (scriptSrc.includes('quick-tools.js')) {
                    window.scriptLoaderStatus.quickToolsLoaded = true;
                }
                
                index++;
                loadNext();
            };
            
            script.onerror = function() {
                console.error(`脚本加载失败: ${scriptSrc}`);
                
                // 尝试热门站点脚本重试加载
                if (scriptSrc.includes('hot-sites.js')) {
                    console.warn('热门站点脚本加载失败，将在1秒后重试');
                    setTimeout(function() {
                        const retryScript = document.createElement('script');
                        retryScript.src = scriptSrc;
                        retryScript.async = false;
                        document.head.appendChild(retryScript);
                    }, 1000);
                }
                
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
const scripts = (() => {
    // 设置全局基础配置
    setupGlobalConfig();
    
    // 构建脚本路径
    let hotSitesPath, quickToolsPath;
    
    // 根据当前环境确定脚本路径
    if (window.isLocalEnv) {
        // 本地测试环境，使用相对路径或绝对路径
        console.log('使用本地测试路径');
        
        // 获取当前路径
        const currentPath = window.location.pathname;
        const baseDir = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
        
        // 尝试使用相对路径
        hotSitesPath = `${baseDir}static/js/plugins/hot-sites.js`;
        quickToolsPath = `${baseDir}static/js/plugins/quick-tools.js`;
        
        // 如果是特定项目路径，提供硬编码路径作为备用
        if (currentPath.includes('AboutDev/Workspace_AI')) {
            console.log('检测到特定项目路径，提供备用绝对路径');
            hotSitesPath = 'D:/AboutDev/Workspace_AI/MyMaskKing.github.io/static/js/plugins/hot-sites.js';
            quickToolsPath = 'D:/AboutDev/Workspace_AI/MyMaskKing.github.io/static/js/plugins/quick-tools.js';
        }
    } else {
        // 网络环境使用绝对路径
        console.log('使用网络环境路径');
        hotSitesPath = `${window.location.origin}/static/js/plugins/hot-sites.js`;
        quickToolsPath = `${window.location.origin}/static/js/plugins/quick-tools.js`;
    }
    
    console.log('热门站点脚本路径:', hotSitesPath);
    console.log('便捷工具脚本路径:', quickToolsPath);
    
    return [hotSitesPath, quickToolsPath];
})();

// 在DOM加载完成后开始加载脚本
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM已加载，开始按顺序加载插件脚本');
    
    // 加载脚本
    loadScriptsSequentially(scripts, function() {
        console.log('所有插件脚本加载完成');
        
        // 加载完成后，设置热门站点脚本已加载标记
        window.scriptLoaderStatus.hotSitesLoaded = true;
    });
});

// 页面完全加载后的额外处理
window.addEventListener('load', function() {
    console.log('页面完全加载，执行最终检查');
    window.scriptLoaderStatus.pageFullyLoaded = true;
    
    // 延迟执行最终检查，确保热门按钮存在
    setTimeout(function() {
        // 移动视图下检查热门按钮是否存在
        if (window.innerWidth <= 1200 && !document.getElementById('hotSitesToggleBtn')) {
            console.log("页面加载完成后未找到热门按钮，尝试恢复");
            
            // 按优先级尝试不同的恢复方法
            if (typeof window.ensureButtonVisibility === 'function') {
                window.ensureButtonVisibility();
            } else if (typeof window.createToggleButton === 'function') {
                window.createToggleButton();
            }
        }
    }, 2000);
    
    // 设置定期检查，确保按钮始终存在
    setInterval(function() {
        if (window.innerWidth <= 1200 && !document.getElementById('hotSitesToggleBtn')) {
            console.log("定期检查：热门按钮不存在，尝试恢复");
            if (typeof window.ensureButtonVisibility === 'function') {
                window.ensureButtonVisibility();
            } else if (typeof window.createToggleButton === 'function') {
                window.createToggleButton();
            }
        }
    }, 5000); // 每5秒检查一次
});

// 为了防止直接在HTML中添加的脚本标签导致加载顺序错乱，可以在HTML中添加以下代码：
/*
<script src="/static/js/script-loader.js"></script>
*/ 