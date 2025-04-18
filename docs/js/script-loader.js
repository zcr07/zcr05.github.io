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
    const scriptStatus = {}; // 记录每个脚本的加载状态
    const MAX_RETRIES = 3;   // 最大重试次数
    const TIMEOUT = 10000;   // 脚本加载超时时间（毫秒）
    
    // 标记脚本已加载完成，继续加载下一个
    function markScriptLoaded(src, success = true) {
        if (!scriptStatus[src]) {
            scriptStatus[src] = {
                loaded: success,
                attempts: 1
            };
        } else {
            scriptStatus[src].loaded = success;
            scriptStatus[src].attempts++;
        }
        
        console.log(`脚本 ${src} ${success ? '加载成功' : '加载失败'} (尝试次数: ${scriptStatus[src].attempts})`);
    }
    
    // 加载单个脚本
    function loadScript(src, onComplete) {
        console.log(`开始加载脚本: ${src}`);
        
        // 创建脚本元素
        const script = document.createElement('script');
        script.src = src;
        script.async = false; // 禁用异步加载，确保按顺序执行
        
        // 设置加载超时处理
        let timeoutId = setTimeout(function() {
            console.warn(`脚本加载超时: ${src}`);
            
            // 检查脚本是否已标记为加载成功，避免重复处理
            if (scriptStatus[src] && scriptStatus[src].loaded) {
                return;
            }
            
            // 标记为加载失败
            markScriptLoaded(src, false);
            
            // 检查是否需要重试
            if (!scriptStatus[src] || scriptStatus[src].attempts < MAX_RETRIES) {
                console.log(`重试加载脚本(${scriptStatus[src] ? scriptStatus[src].attempts : 0}/${MAX_RETRIES}): ${src}`);
                // 移除超时的脚本元素
                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                }
                // 延迟重试，避免立即失败
                setTimeout(function() {
                    loadScript(src, onComplete);
                }, 1000);
            } else {
                console.error(`脚本 ${src} 加载失败，已达最大重试次数`);
                onComplete(false);
            }
        }, TIMEOUT);
        
        // 脚本加载成功
        script.onload = function() {
            clearTimeout(timeoutId); // 清除超时计时器
            markScriptLoaded(src, true);
            
            // 根据脚本类型更新全局状态
            if (src.includes('hot-sites.js')) {
                window.scriptLoaderStatus.hotSitesLoaded = true;
                
                // 确保热门按钮可见（在小屏幕上）
                if (window.innerWidth <= 1200) {
                    setTimeout(function() {
                        if (typeof window.ensureButtonVisibility === 'function') {
                            window.ensureButtonVisibility();
                        }
                    }, 200);
                }
            } else if (src.includes('quick-tools.js')) {
                window.scriptLoaderStatus.quickToolsLoaded = true;
            }
            
            onComplete(true);
        };
        
        // 脚本加载失败
        script.onerror = function() {
            clearTimeout(timeoutId); // 清除超时计时器
            markScriptLoaded(src, false);
            
            // 检查是否需要重试
            if (scriptStatus[src].attempts < MAX_RETRIES) {
                console.warn(`脚本加载失败，准备重试(${scriptStatus[src].attempts}/${MAX_RETRIES}): ${src}`);
                
                // 移除错误的脚本元素
                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                }
                
                // 延迟重试，避免立即失败
                setTimeout(function() {
                    loadScript(src, onComplete);
                }, 1000 * scriptStatus[src].attempts); // 重试间隔随尝试次数增加
            } else {
                console.error(`脚本 ${src} 加载失败，已达最大重试次数`);
                
                // 特殊处理热门站点脚本加载失败的情况
                if (src.includes('hot-sites.js') && window.innerWidth <= 1200) {
                    console.warn('热门站点脚本加载失败，尝试应急方案');
                    // 添加一个简单的内联脚本创建热门按钮
                    const inlineScript = document.createElement('script');
                    inlineScript.textContent = `
                        (function() {
                            console.log("创建应急热门按钮");
                            const btn = document.createElement('button');
                            btn.id = 'hotSitesToggleBtn';
                            btn.style.position = 'fixed';
                            btn.style.top = '50%';
                            btn.style.left = '0';
                            btn.style.transform = 'translateY(-50%)';
                            btn.style.zIndex = '9999';
                            btn.style.width = '36px';
                            btn.style.height = '80px';
                            btn.style.background = 'linear-gradient(90deg, #7e57ff, #9165ff)';
                            btn.style.color = 'white';
                            btn.style.border = 'none';
                            btn.style.borderRadius = '0 24px 24px 0';
                            btn.style.writingMode = 'vertical-rl';
                            btn.style.fontSize = '16px';
                            btn.style.display = 'flex';
                            btn.style.alignItems = 'center';
                            btn.style.justifyContent = 'center';
                            btn.innerHTML = "热门";
                            
                            btn.addEventListener('click', function() {
                                alert('热门站点功能正在加载中，请稍后再试');
                            });
                            
                            document.body.appendChild(btn);
                        })();
                    `;
                    document.head.appendChild(inlineScript);
                }
                
                onComplete(false);
            }
        };
        
        // 添加到文档中开始加载
        document.head.appendChild(script);
    }
    
    // 递归加载脚本列表中的下一个脚本
    function loadNext() {
        if (index < scripts.length) {
            const scriptSrc = scripts[index];
            
            // 如果有目录且当前是便捷工具JS，则跳过加载
            const hasToc = window.hasToc || checkTocExistence();
            if (hasToc && scriptSrc.includes('quick-tools.js')) {
                console.log(`检测到目录存在，跳过加载便捷工具JS: ${scriptSrc}`);
                index++;
                loadNext();
                return;
            }
            
            // 加载当前脚本，完成后继续加载下一个
            loadScript(scriptSrc, function(success) {
                index++;
                
                // 不管成功或失败，都继续加载下一个脚本
                setTimeout(loadNext, 200); // 小延迟，避免连续加载过快
            });
        } else if (typeof callback === 'function') {
            // 所有脚本加载完成，执行回调
            callback();
            console.log('所有脚本加载序列已完成');
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
