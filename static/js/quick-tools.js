// 便捷功能图标 - 工具图标的SVG路径
const QUICK_TOOLS_ICON_PATH = "M7.638 2.146c-.591-.128-1.223-.285-1.788-.369-.226-.03-.453.017-.622.142-.169.124-.284.31-.316.531-.033.221.037.431.191.581.155.15.376.233.599.285.538.134 1.079.25 1.618.364.263.054.536.108.803.165.019-.173.05-.346.094-.516a3.698 3.698 0 0 1 .262-.683zm1.741 1.377c-.228-.06-.452-.119-.676-.179-.57-.153-1.153-.31-1.744-.435a.367.367 0 0 1-.287-.237.371.371 0 0 1 .044-.348.39.39 0 0 1 .315-.173c.12-.5.24.11.36.023.574.087 1.218.248 1.82.379.159.042.318.085.478.127a3.56 3.56 0 0 1 .69-.357.166.166 0 0 0-.01-.005 3.56 3.56 0 0 0-.99-1.18.149.149 0 0 0-.01-.008 3.696 3.696 0 0 0-2.273-.784 3.695 3.695 0 0 0-2.27.778.169.169 0 0 0-.013.01 3.562 3.562 0 0 0-.982 1.17.156.156 0 0 0-.012.007 3.603 3.603 0 0 0-.476 1.633.159.159 0 0 0-.1.012 3.605 3.605 0 0 0 .492 1.998l.7.011a3.582 3.582 0 0 0 1.23 1.218l.012.007a3.702 3.702 0 0 0 1.71.532c.15.01.298.009.444-.002.237-.018.47-.063.692-.133a3.575 3.575 0 0 0 1.163-.608l.008-.006a3.592 3.592 0 0 0 1.226-1.728.144.144 0 0 0 .005-.011 3.593 3.593 0 0 0 .184-1.056c.005-.131.005-.263 0-.395a3.593 3.593 0 0 0-.185-1.056.155.155 0 0 0-.005-.012 3.585 3.585 0 0 0-.215-.483 3.584 3.584 0 0 0-.54-.74zm3.51 4.582H9.018a.37.37 0 0 1-.296-.147.368.368 0 0 1-.067-.323.39.39 0 0 1 .234-.272c.11-.41.231-.32.346-.006l3.873.029a.36.36 0 0 1 .259.111.363.363 0 0 1 .112.259.379.379 0 0 1-.112.259.376.376 0 0 1-.26.111zm-5.318 2.122c.224.06.447.119.67.178.571.153 1.153.31 1.744.435a.367.367 0 0 1 .287.237.371.371 0 0 1-.044.348.39.39 0 0 1-.315.173c-.121.006-.24-.011-.36-.023-.574-.087-1.219-.248-1.821-.379l-.477-.126a3.557 3.557 0 0 1-.691.356c.3.002.7.004.1.006.269.156.552.29.844.389.218.117.445.21.68.272a3.701 3.701 0 0 0 1.738.02c.25-.57.49-.142.718-.244.346-.128.67-.318.973-.533l.009-.006c.407-.308.745-.675 1.004-1.092l.007-.011c.33-.507.52-1.086.572-1.67v-.012c.045-.51-.043-1.01-.187-1.496a.154.154 0 0 0-.005-.016 3.589 3.589 0 0 0-.388-1.012l-.012-.02a3.62 3.62 0 0 0-.482-.624 5.931 5.931 0 0 0-.347-.336l-3.904-.03a.39.39 0 0 1-.281-.136.368.368 0 0 1-.076-.32.39.39 0 0 1 .226-.275c.11-.43.232-.36.349-.011l3.293.025a3.54 3.54 0 0 0-.704-.592.146.146 0 0 0-.009-.006 3.696 3.696 0 0 0-2.273-.784 3.695 3.695 0 0 0-2.27.778.152.152 0 0 0-.012.01 3.563 3.563 0 0 0-.983 1.17l-.11.006a3.603 3.603 0 0 0-.477 1.633.167.167 0 0 0 0 .012 3.605 3.605 0 0 0 .492 1.998c.2.004.5.008.7.012a3.582 3.582 0 0 0 1.23 1.217l.011.007a3.699 3.699 0 0 0 3.267.265z";

// 内联便捷功能数据 - 备用数据
const QUICK_TOOLS_DATA = [
  {
    "name": "颜色转换工具",
    "url": "https://convertacolor.com",
    "description": "在HEX、RGB、HSL等颜色格式之间转换"
  },
  {
    "name": "正则表达式测试",
    "url": "https://regex101.com",
    "description": "在线测试和调试正则表达式"
  },
  {
    "name": "Favicon生成器",
    "url": "https://realfavicongenerator.net",
    "description": "生成各种尺寸的网站图标"
  },
  {
    "name": "Can I Use",
    "url": "https://caniuse.com",
    "description": "查询前端技术的浏览器兼容性"
  },
  {
    "name": "JSON格式化",
    "url": "https://jsonformatter.curiousconcept.com",
    "description": "JSON在线格式化和验证工具"
  }
];

// 全局变量，用于存储从服务器获取的便捷功能数据
let quickToolsData = null;

// 定义命名空间，避免全局变量冲突
const QuickTools = {
  // 存储元素引用
  elements: {
    panel: null,
    toggleBtn: null,
    list: null
  },
  
  // 状态变量
  state: {
    isInitialized: false,
    isMobile: false,
    isVisible: false
  }
};

// 在页面加载完成时初始化
console.log("便捷工具脚本已加载");

// 初始化便捷工具
function initQuickTools() {
    console.log("初始化便捷工具 - 开始");
    
    try {
        // 防止重复初始化
        if (QuickTools.state.isInitialized) {
            console.log("便捷工具已初始化，跳过");
            // 即使已经初始化，也要确保按钮可见
            if (QuickTools.elements.toggleBtn) {
                forceShowToggleButton();
            }
            return;
        }
    
    // 先从服务器获取便捷功能数据
    fetchQuickToolsData()
        .then(data => {
            // 设置全局变量
            quickToolsData = data;
            
                try {
            // 检查数据有效性
            if (checkQuickToolsData(quickToolsData)) {
                // 创建DOM元素
                createQuickToolsElements();
                
                // 渲染便捷功能
                renderQuickTools(quickToolsData);
                
                // 添加响应式处理
                        setupQuickToolsResponsiveBehavior();
                
                // 添加主题变化监听
                setupThemeChangeListener();
                
                // 延迟更新便捷功能按钮位置
                setTimeout(() => {
                            console.log("初始化后强制显示按钮");
                            forceShowToggleButton();
                }, 500);
                        
                        // 标记为已初始化
                        QuickTools.state.isInitialized = true;
                        console.log("便捷工具初始化完成");
                        
                        // 最后再次强制执行一次屏幕尺寸检测
                        setTimeout(() => {
                            checkScreenSize();
                        }, 1000);
            } else {
                        console.log("便捷功能数据为空或无效，尝试使用备用数据");
                        // 尝试使用备用数据
                        initWithFallbackData();
                    }
                } catch (error) {
                    console.error("初始化便捷工具时发生错误:", error);
                    // 出错时尝试使用备用数据
                    initWithFallbackData();
            }
        })
        .catch(error => {
            console.error("获取便捷功能数据失败:", error);
            console.log("尝试使用备用数据");
            
            // 尝试使用备用数据
                initWithFallbackData();
            });
    } catch (error) {
        console.error("初始化便捷工具主函数异常:", error);
        // 重大错误，仍然尝试使用备用数据
        initWithFallbackData();
    }
}

// 使用备用数据初始化的辅助函数
function initWithFallbackData() {
    try {
            if (checkQuickToolsData(QUICK_TOOLS_DATA)) {
                quickToolsData = QUICK_TOOLS_DATA;
                createQuickToolsElements();
                renderQuickTools(quickToolsData);
            setupQuickToolsResponsiveBehavior();
                setupThemeChangeListener();
            
                setTimeout(() => {
                forceShowToggleButton();
                }, 500);
            
            // 标记为已初始化
            QuickTools.state.isInitialized = true;
            console.log("便捷工具使用备用数据初始化完成");
            } else {
            console.log("备用数据也无效，创建最小化便捷功能按钮");
            // 即使数据无效，也要创建按钮
            createToggleButton();
            setupQuickToolsResponsiveBehavior();
        }
    } catch (error) {
        console.error("使用备用数据初始化时发生错误:", error);
        // 最后的尝试：只创建按钮
        createToggleButton();
    }
}

// 从服务器获取便捷功能数据
function fetchQuickToolsData() {
    return new Promise((resolve, reject) => {
        console.log("从服务器获取便捷功能数据");
        
        // 根据当前环境决定数据获取方式
        if (window.location.protocol === 'file:') {
            console.log('本地文件系统环境，使用备用数据');
            // 本地文件系统环境下，使用备用数据
            resolve(QUICK_TOOLS_DATA);
            return;
        }
        
        // 网络环境下，尝试从服务器获取数据
        fetch('./config/quick_tools.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`获取便捷功能数据失败: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('成功获取便捷功能数据:', data);
                resolve(data);
            })
            .catch(error => {
                console.error('获取便捷功能数据错误:', error);
                reject(error);
            });
    });
}

// 检查便捷功能数据是否有效
function checkQuickToolsData(data) {
    // 检查数据是否有效
    if (!Array.isArray(data) || data.length === 0) {
        console.log("便捷功能数据为空或无效");
        return false;
    }
    
    // 确保数据中至少有一个有效的项目（包含name和url）
    const validItems = data.filter(item => item && item.name && item.url);
    if (validItems.length === 0) {
        console.log("便捷功能数据中没有有效项目");
        return false;
    }
    
    console.log(`便捷功能数据有效，共${validItems.length}个项目`);
    return true;
}

// 创建便捷功能DOM元素
function createQuickToolsElements() {
    console.log("创建便捷功能DOM元素 - 开始");
    
    // 防止重复创建 - 先检查DOM中是否已存在面板
    if (document.getElementById('quickToolsPanel')) {
        console.log("便捷功能面板已存在于DOM中，跳过创建");
        QuickTools.elements.panel = document.getElementById('quickToolsPanel');
        QuickTools.elements.list = document.getElementById('quickToolsList');
        return;
    }
    
    // 创建右侧便捷功能面板
    createRightSideQuickTools();
    
    // 添加收起/展开按钮 - 用于移动设备
    createToggleButton();
    
    // 添加CSS样式
    addQuickToolsStyles();
    
    // 确保元素添加到DOM后，立即执行一次强制更新
    const singleUpdateTimeout = setTimeout(() => {
        console.log("DOM元素创建后的强制更新");
        
        // 检查并强制显示按钮
        if (QuickTools.elements.toggleBtn) {
            forceShowToggleButton();
        } else {
            console.warn("切换按钮尚未创建，重新创建");
            createToggleButton();
        }
        
        // 标记初始化完成，避免重复检查
        QuickTools.state.isInitialized = true;
        
        // 清除可能的多余定时器
        clearTimeout(singleUpdateTimeout);
    }, 100);
    
    console.log("创建便捷功能DOM元素 - 完成");
}

// 创建右侧便捷功能面板
function createRightSideQuickTools() {
    console.log("创建右侧便捷功能面板");
    
    // 查找body元素，我们将直接添加到body中，避免干扰现有布局
    const body = document.body;
    if (!body) {
        console.error('无法找到body元素');
        return;
    }
    
    // 如果已存在便捷功能容器，则不重复创建
    if (document.getElementById('quickToolsPanel')) {
        console.log('便捷功能面板已存在');
        QuickTools.elements.panel = document.getElementById('quickToolsPanel');
        QuickTools.elements.list = document.getElementById('quickToolsList');
        return;
    }
    
    // 创建右侧面板容器
    const rightPanel = document.createElement('div');
    rightPanel.id = 'quickToolsPanel';
    rightPanel.className = 'quick-tools-panel';
    rightPanel.setAttribute('aria-label', '便捷工具面板');
    
    // 创建面板标题
    const titleContainer = document.createElement('div');
    titleContainer.className = 'quick-tools-header';
    
    const titleIcon = document.createElement('svg');
    titleIcon.className = 'octicon quick-tools-icon';
    titleIcon.setAttribute('width', '16');
    titleIcon.setAttribute('height', '16');
    titleIcon.setAttribute('viewBox', '0 0 16 16');
    titleIcon.setAttribute('aria-hidden', 'true');
    
    const iconPath = document.createElement('path');
    iconPath.setAttribute('d', QUICK_TOOLS_ICON_PATH);
    iconPath.setAttribute('fill-rule', 'evenodd');
    
    titleIcon.appendChild(iconPath);
    
    const titleText = document.createElement('span');
    titleText.textContent = '便捷工具';
    
    const titleBadge = document.createElement('span');
    titleBadge.className = 'quick-tools-badge';
    titleBadge.style.backgroundColor = '#2ea043';
    titleBadge.style.color = '#ffffff';
    titleBadge.textContent = '工具';
    
    titleContainer.appendChild(titleIcon);
    titleContainer.appendChild(titleText);
    titleContainer.appendChild(titleBadge);
    
    // 创建工具列表容器
    const toolsList = document.createElement('div');
    toolsList.id = 'quickToolsList';
    toolsList.className = 'quick-tools-list';
    
    // 组装面板
    rightPanel.appendChild(titleContainer);
    rightPanel.appendChild(toolsList);
    
    // 添加点击事件监听器，防止点击面板内容导致面板被关闭
    rightPanel.addEventListener('click', function(e) {
        // 阻止事件冒泡，确保点击面板内容不会触发外部点击事件
        e.stopPropagation();
    });
    
    // 保存对元素的引用
    QuickTools.elements.panel = rightPanel;
    QuickTools.elements.list = toolsList;
    
    // 将面板添加到body
    body.appendChild(rightPanel);
}

// 创建收起/展开按钮
function createToggleButton() {
    console.log("创建便捷功能切换按钮 - 开始");
    
    // 查找已存在的按钮
    let toggleBtn = document.getElementById('quickToolsToggleBtn');
    
    // 如果已存在则不重复创建
    if (toggleBtn) {
        console.log('便捷功能切换按钮已存在，获取引用');
        QuickTools.elements.toggleBtn = toggleBtn;
        // 强制更新切换按钮样式，确保可见
        forceShowToggleButton();
        return toggleBtn;
    }
    
    // 创建按钮
    toggleBtn = document.createElement('button');
    toggleBtn.id = 'quickToolsToggleBtn';
    toggleBtn.className = 'quick-tools-toggle quick-tools-btn-persistent'; // 添加持久化标记
    toggleBtn.setAttribute('aria-label', '显示/隐藏便捷工具');
    toggleBtn.setAttribute('type', 'button');
    toggleBtn.setAttribute('data-qt-button', 'true'); // 添加额外标识
    
    // 确保按钮可见
    toggleBtn.style.position = 'fixed';
    toggleBtn.style.display = 'flex';
    toggleBtn.style.visibility = 'visible';
    toggleBtn.style.opacity = '0.95';
    toggleBtn.style.zIndex = '9979';
    toggleBtn.style.top = '40%';
    toggleBtn.style.right = '0';
    toggleBtn.style.width = '36px';
    toggleBtn.style.height = '80px';
    toggleBtn.style.borderRadius = '24px 0 0 24px';
    toggleBtn.style.background = 'linear-gradient(90deg, #2ea043, #3fb950)';
    toggleBtn.style.color = 'white';
    toggleBtn.style.fontSize = '16px';
    toggleBtn.style.fontWeight = 'bold';
    toggleBtn.style.letterSpacing = '2px';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.style.border = 'none';
    toggleBtn.style.outline = 'none';
    toggleBtn.style.writingMode = 'vertical-rl';
    toggleBtn.style.textOrientation = 'mixed';
    toggleBtn.style.boxShadow = '-2px 0 10px rgba(0, 0, 0, 0.2)';
    toggleBtn.style.transform = 'translateY(-50%)';
    toggleBtn.style.display = 'flex';
    toggleBtn.style.alignItems = 'center';
    toggleBtn.style.justifyContent = 'center';
    
    // 直接设置按钮文本，不依赖CSS
    toggleBtn.textContent = '工具⚙️';
    
    // 参考热门站点按钮的点击事件处理方式
    toggleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation(); // 阻止事件冒泡
        
        console.log('便捷功能切换按钮被点击');
        
        // 切换按钮活动状态
        this.classList.toggle('active');
        
        // 获取面板元素
        const panel = QuickTools.elements.panel;
        
        // 根据按钮状态显示或隐藏面板
        if (this.classList.contains('active')) {
            // 显示面板
            console.log('显示面板');
            showQuickToolsPanel(panel, this);
        } else {
            // 隐藏面板
            console.log('隐藏面板');
            hideQuickToolsPanel(panel, this);
        }
    });
    
    // 防止按钮被其他样式或脚本移除
    toggleBtn.setAttribute('data-persist', 'true');
    
    // 保存对按钮的引用
    QuickTools.elements.toggleBtn = toggleBtn;
    
    // 将按钮添加到body
    document.body.appendChild(toggleBtn);
    console.log('便捷功能切换按钮已添加到DOM，ID=' + toggleBtn.id);
    
    // 添加点击外部区域关闭面板的功能
    document.addEventListener('click', function(e) {
        const panel = QuickTools.elements.panel;
        const toggleBtn = QuickTools.elements.toggleBtn;
        
        if (panel && toggleBtn && 
            QuickTools.state.isVisible && 
            !panel.contains(e.target) && 
            e.target !== toggleBtn && 
            !toggleBtn.contains(e.target)) {
            // 点击了外部区域，隐藏面板
            hideQuickToolsPanel(panel, toggleBtn);
            toggleBtn.classList.remove('active');
            QuickTools.state.isVisible = false;
            console.log('点击外部区域，隐藏面板');
        }
    });
    
    // MutationObserver监听DOM变化，确保按钮不被移除
    const bodyObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.removedNodes.length > 0) {
                // 检查是否有我们的按钮被移除
                for (let i = 0; i < mutation.removedNodes.length; i++) {
                    const node = mutation.removedNodes[i];
                    if (node.id === 'quickToolsToggleBtn' || 
                        (node.nodeType === 1 && node.querySelector && node.querySelector('#quickToolsToggleBtn'))) {
                        console.warn('便捷功能按钮被移除，正在恢复');
                        // 按钮被移除，重新添加
                        setTimeout(function() {
                            if (!document.getElementById('quickToolsToggleBtn')) {
                                document.body.appendChild(toggleBtn);
                                console.log('便捷功能切换按钮已恢复到DOM');
                            }
                        }, 100);
                        break;
                    }
                }
            }
        });
    });
    
    // 开始观察body
    bodyObserver.observe(document.body, { childList: true, subtree: true });
    
    console.log("创建便捷功能切换按钮 - 完成");
    return toggleBtn;
}

// 强制显示切换按钮的辅助函数
function forceShowToggleButton() {
    // 先检查按钮是否在DOM中
    let btn = document.getElementById('quickToolsToggleBtn');
    
    // 如果按钮不在DOM中，创建它
    if (!btn) {
        console.warn("强制显示按钮时发现按钮不存在，重新创建");
        try {
            // 清理可能存在的冲突元素
            const existingBtns = document.querySelectorAll('[data-qt-button="true"]');
            existingBtns.forEach(el => {
                if (el.id !== 'quickToolsToggleBtn') {
                    el.remove();
                }
            });
            
            // 创建新按钮并添加额外标识以防冲突
            btn = document.createElement('button');
            btn.id = 'quickToolsToggleBtn';
            btn.className = 'quick-tools-toggle quick-tools-btn-persistent';
            btn.setAttribute('aria-label', '显示/隐藏便捷工具');
            btn.setAttribute('type', 'button');
            btn.setAttribute('data-qt-button', 'true');
            btn.setAttribute('data-timestamp', Date.now()); // 添加时间戳防止冲突
            
            // 添加基本样式
            btn.style.position = 'fixed';
            btn.style.display = 'flex';
            btn.style.visibility = 'visible';
            btn.style.opacity = '1';
            btn.style.zIndex = '9979';
            btn.style.top = '40%';
            btn.style.right = '0';
            btn.style.width = '36px';
            btn.style.height = '80px';
            btn.style.borderRadius = '24px 0 0 24px';
            btn.style.background = 'linear-gradient(90deg, #2ea043, #3fb950)';
            btn.style.color = 'white';
            btn.style.fontSize = '16px';
            btn.style.fontWeight = 'bold';
            btn.style.letterSpacing = '2px';
            btn.style.cursor = 'pointer';
            btn.style.border = 'none';
            btn.style.outline = 'none';
            btn.style.writingMode = 'vertical-rl';
            btn.style.textOrientation = 'mixed';
            btn.style.boxShadow = '-2px 0 10px rgba(0, 0, 0, 0.2)';
            btn.style.transform = 'translateY(-50%)';
            btn.textContent = '工具⚙️';
            
            // 添加点击事件 - 修改为与主按钮相同的处理方式
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('便捷功能切换按钮被点击');
                
                // 切换按钮活动状态
                this.classList.toggle('active');
                
                // 获取面板元素
                const panel = QuickTools.elements.panel;
                
                // 根据按钮状态显示或隐藏面板
                if (this.classList.contains('active')) {
                    // 显示面板
                    console.log('显示面板');
                    showQuickToolsPanel(panel, this);
                } else {
                    // 隐藏面板
                    console.log('隐藏面板');
                    hideQuickToolsPanel(panel, this);
                }
            });
            
            // 保存引用
            document.body.appendChild(btn);
            QuickTools.elements.toggleBtn = btn;
            console.log("创建并直接添加了新的便捷功能按钮", btn.id);
            
            if (!document.body.contains(btn)) {
                throw new Error("按钮添加到DOM后无法找到");
            }
        } catch (error) {
            console.error("直接创建按钮失败:", error);
            // 使用原始createToggleButton函数作为备用
            btn = createToggleButton();
            if (!btn || !document.body.contains(btn)) {
                console.error("按钮创建失败！");
                return;
            }
        }
    }
    
    console.log("强制显示便捷工具切换按钮");
    
    // 确保引用正确
    QuickTools.elements.toggleBtn = btn;
    
    // 应用固定样式确保按钮可见
    btn.style.position = 'fixed';
    btn.style.display = 'flex';
    btn.style.visibility = 'visible';
    btn.style.opacity = '1';
    btn.style.zIndex = '9979';
    btn.style.top = '40%';
    btn.style.right = '0';
    btn.style.transform = 'translateY(-50%)';
    btn.style.width = '36px';
    btn.style.height = '80px';
    btn.style.borderRadius = '24px 0 0 24px';
    btn.style.background = 'linear-gradient(90deg, #2ea043, #3fb950)';
    btn.style.boxShadow = '-2px 0 10px rgba(0, 0, 0, 0.2)';
    btn.style.writingMode = 'vertical-rl';
    btn.style.border = 'none';
    btn.style.outline = 'none';
    
    // 如果是小屏幕，调整样式
    if (window.innerWidth <= 768) {
        btn.style.borderRadius = '20px 0 0 20px';
        btn.style.width = '32px';
        btn.style.height = '70px';
        btn.style.fontSize = '14px';
        btn.style.fontWeight = 'bold';
        btn.style.letterSpacing = '2px';
        btn.style.cursor = 'pointer';
    }
    
    // 检查按钮是否显示，如果没有显示，再次尝试添加到DOM
    setTimeout(function() {
        if (!document.body.contains(btn)) {
            console.warn("按钮不在DOM中，重新添加");
            document.body.appendChild(btn);
        }
    }, 50);
}

// 切换便捷功能面板显示/隐藏状态 - 不再直接调用，由按钮点击事件处理
function toggleQuickToolsPanel() {
    const panel = QuickTools.elements.panel;
    const btn = QuickTools.elements.toggleBtn;
    
    if (!panel || !btn) return;
    
    const isVisible = QuickTools.state.isVisible;
    
    if (isVisible) {
        hideQuickToolsPanel(panel, btn);
        QuickTools.state.isVisible = false;
        btn.classList.remove('active');
    } else {
        showQuickToolsPanel(panel, btn);
        QuickTools.state.isVisible = true;
        btn.classList.add('active');
    }
}

// 显示便捷功能面板 - 模仿热门站点的显示函数
function showQuickToolsPanel(panel, btn) {
    if (!panel) {
        panel = QuickTools.elements.panel;
    }
    
    if (!btn) {
        btn = QuickTools.elements.toggleBtn;
    }
    
    if (!panel) {
        console.error('无法显示面板：面板元素不存在');
        return;
    }
    
    console.log('显示便捷功能面板');
    
    // 更新状态
    QuickTools.state.isVisible = true;
    
    // 显示面板
    panel.classList.add('show');
    panel.style.display = 'block';
    
    // 获取目录按钮位置以确保不遮挡
    const tocBtn = document.querySelector('.mobile-toc-btn');
    
    // 根据屏幕大小设置不同样式
    if (window.innerWidth <= 1200) {
        // 移动视图下，面板从右侧滑入
        panel.style.transform = 'translateX(260px)';
        panel.classList.add('mobile');
        
        // 确保样式立即生效
        requestAnimationFrame(() => {
            panel.style.opacity = '1';
            panel.style.transform = 'translateX(0)';
            panel.style.visibility = 'visible';
            
            // 添加滚动指示器
            addScrollIndicator(panel);
            
            // 调整面板位置，确保不遮挡目录按钮
            adjustPanelPosition(panel, tocBtn);
            
            console.log('便捷功能面板已显示 - 移动视图');
        });
    } else {
        // 大屏幕视图，正常显示
        panel.classList.remove('mobile');
        
        requestAnimationFrame(() => {
            panel.style.opacity = '1';
            panel.style.transform = 'scale(1)';
            panel.style.visibility = 'visible';
            
            console.log('便捷功能面板已显示 - 桌面视图');
        });
    }
    
    // 更新按钮状态
    if (btn) {
        btn.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
    }
}

// 隐藏便捷功能面板 - 模仿热门站点的隐藏函数
function hideQuickToolsPanel(panel, btn) {
    if (!panel) {
        panel = QuickTools.elements.panel;
    }
    
    if (!btn) {
        btn = QuickTools.elements.toggleBtn;
    }
    
    if (!panel) {
        console.error('无法隐藏面板：面板元素不存在');
        return;
    }
    
    console.log('隐藏便捷功能面板');
    
    // 更新状态
    QuickTools.state.isVisible = false;
    
    // 隐藏面板
    panel.classList.remove('show');
    
    // 根据屏幕大小设置不同动画
    if (window.innerWidth <= 1200) {
        // 移动视图下，面板向右侧滑出
        panel.style.opacity = '0';
        panel.style.transform = 'translateX(260px)';
        panel.style.visibility = 'hidden';
    } else {
        // 大屏幕视图，正常隐藏
        panel.style.opacity = '0';
        panel.style.transform = 'scale(0.95)';
    }
    
    // 更新按钮状态
    if (btn) {
        btn.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
    }
    
    // 延迟设置display:none，与CSS过渡时间匹配
    setTimeout(() => {
        if (!panel.classList.contains('show')) {
            panel.style.display = 'none';
            panel.style.visibility = 'hidden';
            console.log('便捷功能面板已隐藏');
        }
    }, 300);
}

// 调整面板位置，避免遮挡目录按钮
function adjustPanelPosition(panel, tocBtn) {
    if (!panel) return;
    
    const viewportHeight = window.innerHeight;
    
    // 限制面板高度，设置为视口高度的60%，确保不会太大
    const maxHeight = Math.min(viewportHeight * 0.6, 400) + 'px';
    panel.style.maxHeight = maxHeight;
    
    if (tocBtn) {
        // 如果存在目录按钮，确保面板不会遮挡它
        const tocRect = tocBtn.getBoundingClientRect();
        const tocTop = tocRect.top;
        
        // 计算安全距离，确保至少留出10px间距
        const safeBottomMargin = tocTop - 10;
        
        // 调整面板位置，默认居中但受底部安全区域限制
        let panelTop = (viewportHeight - panel.offsetHeight) / 2;
        const panelBottom = panelTop + panel.offsetHeight;
        
        // 如果面板底部会遮挡目录按钮，则向上移动
        if (panelBottom > safeBottomMargin) {
            panelTop = Math.max(10, safeBottomMargin - panel.offsetHeight);
        }
        
        panel.style.top = panelTop + 'px';
        panel.style.transform = 'none'; // 移除默认的垂直居中transform
    }
}

// 添加滚动指示器
function addScrollIndicator(panel) {
    // 检查内容是否超出容器高度，需要滚动
    const needsScroll = panel.scrollHeight > panel.clientHeight;
    
    if (needsScroll) {
        // 如果需要滚动，添加类以显示滚动提示
        panel.classList.add('needs-scroll');
        
        // 监听滚动事件，当滚动到底部时隐藏滚动提示
        panel.addEventListener('scroll', function() {
            const scrolledToBottom = (panel.scrollHeight - panel.scrollTop - panel.clientHeight) < 20;
            if (scrolledToBottom) {
                panel.classList.add('scrolled-bottom');
            } else {
                panel.classList.remove('scrolled-bottom');
            }
        });
    } else {
        panel.classList.remove('needs-scroll');
    }
}

// 设置响应式行为
function setupQuickToolsResponsiveBehavior() {
    console.log("设置便捷工具响应式行为 - 开始");
    
    // 解决性能问题：使用防抖技术限制resize事件的触发频率
    let resizeTimeout;
    
    // 定义resize处理函数，使用防抖
    window.quickToolsResizeHandler = function(e) {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            console.log(`窗口大小改变 - 触发便捷工具更新 [宽度: ${window.innerWidth}px, 高度: ${window.innerHeight}px]`);
            checkScreenSize();
        }, 100); // 100ms的防抖延迟
    };
    
    // 添加resize监听器
    window.addEventListener('resize', window.quickToolsResizeHandler);
    console.log("成功添加便捷工具resize监听器");
    
    // 测试resize事件是否正常工作
    console.log("立即触发一次resize事件测试");
    try {
        window.dispatchEvent(new Event('resize'));
        console.log("手动触发resize事件成功");
    } catch(e) {
        console.error("手动触发resize事件失败:", e);
    }
    
    // 在页面完成加载后进行一次性更新
    window.addEventListener('load', function() {
        console.log(`页面加载完成 - 更新便捷工具 [宽度: ${window.innerWidth}px]`);
        checkScreenSize();
    });
    
    // 替换多个定时任务为单个延迟检查，确保初始渲染后的正确展示
    setTimeout(() => {
        console.log(`单次延迟检查(500ms) - 更新便捷工具 [宽度: ${window.innerWidth}px]`);
        checkScreenSize();
    }, 500);
    
    console.log("设置便捷工具响应式行为 - 完成");
    return true;
}

// 检查屏幕尺寸
function checkScreenSize() {
    // 获取当前屏幕宽度
    const screenWidth = window.innerWidth;
    console.log(`检查屏幕尺寸 - 宽度: ${screenWidth}px`);
    
    // 清理可能的延迟任务，防止状态混乱
    if (window.quickToolsScreenCheckTimeout) {
        clearTimeout(window.quickToolsScreenCheckTimeout);
        window.quickToolsScreenCheckTimeout = null;
    }
    
    // 检查工具面板是否存在 - 需要检查正确的ID
    const quickToolsPanel = document.getElementById('quickToolsPanel');
    const toggleButton = document.getElementById('quickToolsToggleBtn');
    
    // 如果缺少DOM元素，创建必要的元素，但避免无限循环
    if (!quickToolsPanel) {
        console.log("未找到便捷工具面板，尝试重新创建");
        
        // 检查是否在短时间内多次尝试创建元素，如果是则跳过以防无限循环
        if (window.lastCreateElementsTime && (Date.now() - window.lastCreateElementsTime < 2000)) {
            console.log("检测到短时间内多次创建尝试，可能存在DOM元素问题，跳过此次创建");
            return false;
        }
        
        // 记录创建时间
        window.lastCreateElementsTime = Date.now();
        
        // 重置引用，确保QuickTools对象正确初始化
        if (QuickTools.elements.panel) {
            console.log("面板引用存在但DOM中不存在，重置引用");
            QuickTools.elements.panel = null;
            QuickTools.elements.list = null;
        }
        
        createQuickToolsElements();
        return false; // 返回false表示这次检查不成功
    }
    
    // 将正确的DOM元素引用保存到QuickTools对象
    if (quickToolsPanel && !QuickTools.elements.panel) {
        console.log("更新QuickTools对象的面板引用");
        QuickTools.elements.panel = quickToolsPanel;
        QuickTools.elements.list = document.getElementById('quickToolsList');
    }
    
    if (!toggleButton) {
        console.log("未找到便捷工具切换按钮，尝试重新创建");
        
        // 同样防止重复创建
        if (window.lastCreateButtonTime && (Date.now() - window.lastCreateButtonTime < 2000)) {
            console.log("检测到短时间内多次创建按钮尝试，跳过此次创建");
            return false;
        }
        
        window.lastCreateButtonTime = Date.now();
        
        // 重置按钮引用
        if (QuickTools.elements.toggleBtn) {
            QuickTools.elements.toggleBtn = null;
        }
        
        createToggleButton();
    } else if (!QuickTools.elements.toggleBtn) {
        // 更新按钮引用
        QuickTools.elements.toggleBtn = toggleButton;
    }
    
    // 确定是否为移动设备视图
    const isMobileView = screenWidth <= 1200;
    
    // 缓存之前的状态以减少不必要的DOM更新
    if (window.quickToolsLastState === undefined) {
        window.quickToolsLastState = {
            isMobileView: null,
            isVisible: null
        };
    }
    
    // 只有当状态发生变化时才更新DOM
    if (window.quickToolsLastState.isMobileView !== isMobileView) {
        console.log(`视图模式变更: ${isMobileView ? '移动设备' : '桌面设备'}`);
        
        if (isMobileView) {
            applyMobileViewSettings(quickToolsPanel, toggleButton);
        } else {
            applyDesktopViewSettings(quickToolsPanel, toggleButton);
        }
        
        // 更新缓存的状态
        window.quickToolsLastState.isMobileView = isMobileView;
    }
    
    // 更新按钮位置（这个可能需要在任何情况下都执行）
    updateQuickToolsButtonPosition();
    
    return true;
}

// 应用移动设备视图设置
function applyMobileViewSettings(panel, button) {
    if (!panel || !button) return false;
    
    // 移动设备视图：隐藏面板，显示切换按钮
    panel.style.display = 'none';
    button.style.display = 'flex';
    
    // 更新状态
    window.quickToolsState = window.quickToolsState || {};
    window.quickToolsState.isVisible = false;
    
    console.log("应用移动设备视图设置 - 面板隐藏，按钮显示");
    return true;
}

// 应用桌面设备视图设置
function applyDesktopViewSettings(panel, button) {
    if (!panel || !button) return false;
    
    // 桌面视图：显示面板，隐藏切换按钮
    panel.style.display = 'block';
    button.style.display = 'none';
    button.style.visibility = 'hidden';
    button.style.opacity = '0';
    
    // 更新状态
    window.quickToolsState = window.quickToolsState || {};
    window.quickToolsState.isVisible = true;
    
    console.log("应用桌面设备视图设置 - 面板显示，按钮隐藏");
    return true;
}

// 更新便捷功能按钮的位置
function updateQuickToolsButtonPosition() {
    const quickToolsBtn = QuickTools.elements.toggleBtn;
    if (!quickToolsBtn) return;
    
    // 强制检测当前屏幕尺寸
    const isMobile = window.innerWidth <= 1200;
    QuickTools.state.isMobile = isMobile;
    
    console.log(`更新按钮位置: 宽度=${window.innerWidth}, 移动模式=${isMobile}`);
    
    if (isMobile) {
        // 将便捷功能按钮设置为贴边显示（贴靠右侧边缘）
        quickToolsBtn.style.position = 'fixed';
        quickToolsBtn.style.top = '40%'; // 定位在中部位置，与热门网站按钮错开
        quickToolsBtn.style.transform = 'translateY(-50%)';
        quickToolsBtn.style.right = '0';
        quickToolsBtn.style.left = 'auto';
        quickToolsBtn.style.bottom = 'auto';
        quickToolsBtn.style.borderRadius = '24px 0 0 24px'; // 左侧为半圆形，右侧贴边
        quickToolsBtn.style.zIndex = '9979'; // 确保比热门站点按钮低一级
        
        // 强制显示按钮
        quickToolsBtn.style.display = 'flex';
        quickToolsBtn.style.visibility = 'visible';
        quickToolsBtn.style.opacity = '0.95';
        
        // 如果是小屏幕，稍微调整尺寸
        if (window.innerWidth <= 768) {
            quickToolsBtn.style.borderRadius = '20px 0 0 20px';
        }
    } else {
        // 大屏幕上隐藏按钮
        quickToolsBtn.style.display = 'none';
        quickToolsBtn.style.visibility = 'hidden';
    }
}

// 监听主题变化
function setupThemeChangeListener() {
    // 监听文档颜色模式变化
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'data-color-mode') {
                updateQuickToolsTheme();
            }
        });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    // 初始更新一次主题
    updateQuickToolsTheme();
}

// 更新便捷功能主题
function updateQuickToolsTheme() {
    const colorMode = document.documentElement.getAttribute('data-color-mode');
    const panel = QuickTools.elements.panel;
    
    if (panel) {
        if (colorMode === 'dark') {
            panel.classList.add('theme-dark');
        } else {
            panel.classList.remove('theme-dark');
        }
    }
}

// 清理便捷功能元素
function cleanupQuickToolsElements() {
    console.log("清理便捷功能元素");
    
    // 移除面板
    if (QuickTools.elements.panel) {
        QuickTools.elements.panel.remove();
        QuickTools.elements.panel = null;
    }
    
    // 移除按钮
    if (QuickTools.elements.toggleBtn) {
        QuickTools.elements.toggleBtn.remove();
        QuickTools.elements.toggleBtn = null;
    }
    
    // 移除样式
    const styles = document.getElementById('quickToolsStyles');
    if (styles) {
        styles.remove();
    }
    
    // 重置状态
    QuickTools.state.isInitialized = false;
    QuickTools.state.isVisible = false;
}

// 渲染便捷功能列表
function renderQuickTools(tools) {
    console.log("渲染便捷功能列表");
    
    const quickToolsList = QuickTools.elements.list;
    
    if (!quickToolsList) {
        console.error('便捷功能列表元素不存在');
        return;
    }
    
    // 再次验证数据有效性
    if (!Array.isArray(tools) || tools.length === 0) {
        console.error('便捷功能数据为空或格式错误');
        cleanupQuickToolsElements();
        return;
    }
    
    // 过滤无效工具
    const validTools = tools.filter(tool => tool && tool.name && tool.url);
    
    // 检查过滤后是否还有有效工具
    if (validTools.length === 0) {
        console.error('没有有效的便捷功能数据');
        cleanupQuickToolsElements();
        return;
    }
    
    // 清空列表
    quickToolsList.innerHTML = '';
    
    // 添加工具数量提示
    const countIndicator = document.createElement('div');
    countIndicator.className = 'quick-tools-count';
    countIndicator.textContent = `共${validTools.length}个工具`;
    quickToolsList.appendChild(countIndicator);
    
    // 添加工具
    validTools.forEach((tool) => {
        if (!tool.name || !tool.url) {
            console.warn('工具数据不完整:', tool);
            return;
        }
        
        const item = document.createElement('div');
        item.className = 'quick-tool-item';
        
        const link = document.createElement('a');
        link.className = 'quick-tool-link';
        link.href = tool.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.title = tool.name;
        link.textContent = tool.name;
        
        const description = document.createElement('div');
        description.className = 'quick-tool-description';
        description.textContent = tool.description || '';
        
        item.appendChild(link);
        item.appendChild(description);
        quickToolsList.appendChild(item);
    });
    
        // 添加滚动提示
        const scrollHint = document.createElement('div');
        scrollHint.className = 'scroll-hint';
        scrollHint.textContent = '⟳ 滑动查看更多 ⟳';
        quickToolsList.appendChild(scrollHint);
}

// 添加便捷功能的CSS样式
function addQuickToolsStyles() {
    console.log('添加便捷功能样式');
    
    // 如果样式已存在，则不重复添加
    if (document.getElementById('quickToolsStyles')) {
        return;
    }
    
    const styleElement = document.createElement('style');
    styleElement.id = 'quickToolsStyles';
    styleElement.textContent = `
        /* 便捷功能面板 - 基础样式 */
        #quickToolsPanel.quick-tools-panel {
            position: fixed !important;
            top: 120px !important;
            right: 20px !important;
            width: 220px !important;
            max-height: calc(100vh - 150px) !important;
            overflow-y: auto !important;
            background-color: #ffffff !important;
            border-radius: 12px !important;
            border: 1px solid rgba(46, 160, 67, 0.3) !important;
            padding: 15px 12px !important;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1) !important;
            backdrop-filter: blur(10px) !important;
            -webkit-backdrop-filter: blur(10px) !important;
            transition: all 0.3s ease !important;
            z-index: 100 !important;
        }
        
        /* 悬停效果 */
        #quickToolsPanel.quick-tools-panel:hover {
            box-shadow: 0 8px 25px rgba(46, 160, 67, 0.25) !important;
        }
        
        /* 暗色模式下的面板 */
        html[data-color-mode="dark"] #quickToolsPanel.quick-tools-panel,
        #quickToolsPanel.quick-tools-panel.theme-dark {
            background-color: #22223b !important;
            border: 1px solid rgba(46, 160, 67, 0.4) !important;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3) !important;
        }
        
        /* 滚动条样式 */
        #quickToolsPanel.quick-tools-panel::-webkit-scrollbar {
            width: 5px !important;
        }
        
        #quickToolsPanel.quick-tools-panel::-webkit-scrollbar-track {
            background-color: rgba(0, 0, 0, 0.05) !important;
            border-radius: 10px !important;
        }
        
        #quickToolsPanel.quick-tools-panel::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #2ea043, #56d364) !important;
            border-radius: 10px !important;
        }
        
        /* 标题样式 */
        .quick-tools-header {
            font-weight: bold !important;
            text-align: center !important;
            margin-bottom: 15px !important;
            padding-bottom: 10px !important;
            border-bottom: 2px solid rgba(46, 160, 67, 0.3) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
        }
        
        /* 标题图标 */
        .quick-tools-icon {
            margin-right: 8px !important;
            color: #2ea043 !important;
            flex-shrink: 0 !important;
        }
        
        /* 标题文本 */
        .quick-tools-header span {
            font-weight: 600 !important;
            font-size: 16px !important;
            background: linear-gradient(135deg, #2ea043, #56d364) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
        }
        
        /* 标志样式 */
        .quick-tools-badge {
            font-size: 10px !important;
            font-weight: 500 !important;
            padding: 2px 8px !important;
            border-radius: 10px !important;
            margin-left: 8px !important;
        }
        
        /* 工具列表 */
        .quick-tools-list {
            display: flex !important;
            flex-direction: column !important;
            gap: 10px !important;
            padding-right: 5px !important;
        }
        
        /* 单个工具项 */
        .quick-tool-item {
            display: flex !important;
            flex-direction: column !important;
            padding: 10px 12px !important;
            margin: 3px 0 !important;
            border-left: 2px solid transparent !important;
            border-radius: 0 8px 8px 0 !important;
            transition: all 0.3s ease !important;
            background-color: #ffffff !important;
        }
        
        /* 工具数量提示 */
        .quick-tools-count {
            text-align: center !important;
            font-size: 12px !important;
            color: #666 !important;
            margin-bottom: 10px !important;
        }
        
        /* 滚动提示 */
        .scroll-hint {
            text-align: center !important;
            font-size: 12px !important;
            color: #888 !important;
            padding: 10px 0 !important;
            opacity: 0.7 !important;
        }
        
        /* 暗黑主题工具项 */
        html[data-color-mode="dark"] .quick-tool-item,
        .theme-dark .quick-tool-item {
            background-color: #2d333b !important;
        }
        
        /* 工具悬停效果 */
        .quick-tool-item:hover {
            background-color: rgba(46, 160, 67, 0.1) !important;
            border-left-color: #2ea043 !important;
            transform: translateX(3px) !important;
        }
        
        /* 工具链接 */
        .quick-tool-link {
            color: #24292f !important;
            text-decoration: none !important;
            font-weight: 500 !important;
            font-size: 14px !important;
            transition: all 0.3s ease !important;
            margin-bottom: 5px !important;
        }
        
        /* 工具描述 */
        .quick-tool-description {
            color: #6e7781 !important;
            font-size: 12px !important;
            line-height: 1.4 !important;
        }
        
        /* 暗黑主题工具链接 */
        html[data-color-mode="dark"] .quick-tool-link,
        .theme-dark .quick-tool-link {
            color: #c9d1d9 !important;
        }
        
        /* 暗黑主题工具描述 */
        html[data-color-mode="dark"] .quick-tool-description,
        .theme-dark .quick-tool-description {
            color: #8b949e !important;
        }
        
        /* 链接悬停效果 */
        .quick-tool-item:hover .quick-tool-link {
            color: #2ea043 !important;
        }
        
        /* 便捷功能切换按钮 */
        #quickToolsToggleBtn.quick-tools-toggle {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 36px !important;
            height: 80px !important;
            border-radius: 24px 0 0 24px !important;
            background: linear-gradient(90deg, #2ea043, #3fb950) !important;
            box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2) !important;
            cursor: pointer !important;
            color: white !important;
            font-size: 16px !important;
            font-weight: bold !important;
            letter-spacing: 2px !important;
            transition: all 0.3s ease !important;
            z-index: 9979 !important;
            border: none !important;
            outline: none !important;
            position: fixed !important;
            top: 40% !important;
            right: 0 !important;
            transform: translateY(-50%) !important;
            writing-mode: vertical-rl !important;
            text-orientation: mixed !important;
            opacity: 0.95 !important;
        }
        
        /* 切换按钮悬停效果 */
        #quickToolsToggleBtn.quick-tools-toggle:hover {
            opacity: 1 !important;
            width: 40px !important;
            box-shadow: -3px 0 15px rgba(0, 0, 0, 0.3) !important;
        }
        
        /* 切换按钮激活状态 */
        #quickToolsToggleBtn.quick-tools-toggle.active {
            background: linear-gradient(90deg, #3fb950, #2ea043) !important;
            width: 36px !important;
        }
        
        /* 响应式设计 */
        @media (max-width: 1400px) {
            #quickToolsPanel.quick-tools-panel {
                right: 10px !important;
                width: 200px !important;
            }
        }
        
        @media (max-width: 1200px) {
            /* 默认隐藏便捷功能面板 */
            #quickToolsPanel.quick-tools-panel {
                display: none !important;
                opacity: 0 !important;
                transform: translateX(50px) !important;
                transition: transform 0.3s ease, opacity 0.3s ease !important;
                visibility: hidden !important;
            }
            
            /* 当面板显示时的样式 */
            #quickToolsPanel.quick-tools-panel.show {
                display: block !important;
                opacity: 1 !important;
                transform: translateX(0) !important;
                visibility: visible !important;
                z-index: 9990 !important; /* 确保比热门站点低一级 */
            }
            
            /* 在移动设备上的面板样式 */
            #quickToolsPanel.quick-tools-panel.mobile {
                position: fixed !important;
                top: 50% !important;
                right: 0 !important;
                left: auto !important;
                transform: translateY(-50%) !important;
                width: 260px !important;
                max-height: 60vh !important; /* 限制高度，避免太长 */
                border-radius: 12px 0 0 12px !important;
                box-shadow: -2px 0 15px rgba(0, 0, 0, 0.2) !important;
                transform-origin: right center !important;
                overflow-y: auto !important; /* 确保可以滚动 */
                overflow-x: hidden !important;
                scrollbar-width: thin !important; /* Firefox */
                scrollbar-color: rgba(46, 160, 67, 0.5) transparent !important; /* Firefox */
            }
            
            /* 移动端交互优化 */
            .quick-tool-item {
                padding: 10px 12px !important;
                margin: 4px 0 !important;
                border-radius: 8px !important;
                transition: background-color 0.2s ease, transform 0.2s ease !important;
            }
            
            .quick-tool-item:active {
                background-color: rgba(46, 160, 67, 0.2) !important;
                transform: scale(0.98) !important;
            }
        }
        
        @media (max-width: 768px) {
            #quickToolsPanel.quick-tools-panel.mobile {
                width: 240px !important;
                max-height: 65vh !important;
            }
            
            #quickToolsToggleBtn.quick-tools-toggle {
                width: 32px !important;
                height: 70px !important;
                border-radius: 20px 0 0 20px !important;
                font-size: 14px !important;
            }
            
            #quickToolsToggleBtn.quick-tools-toggle:hover {
                width: 36px !important;
            }
            
            #quickToolsToggleBtn.quick-tools-toggle.active {
                width: 32px !important;
            }
            
            .quick-tool-link {
                font-size: 13px !important;
                max-width: 150px !important; /* 小屏幕调整链接宽度 */
            }
            
            .quick-tool-item {
                padding: 8px 10px !important;
            }
        }
    `;
    
    document.head.appendChild(styleElement);
}

// 为了确保脚本能够执行，添加一个延迟的初始化调用
setTimeout(function() {
    console.log("延迟初始化便捷功能 - 检查是否已初始化");
    // 检查冲突
    checkAndResolveConflicts();
    
    // 确保只初始化一次
    if (!QuickTools.state.isInitialized) {
        console.log("尚未初始化，执行延迟初始化");
        initQuickTools();
    } else {
        console.log("已初始化，跳过延迟初始化");
        // 仍然更新按钮位置，确保UI正确
        if (QuickTools.elements.toggleBtn) {
            forceShowToggleButton();
        } else {
            console.warn("按钮不存在，重新创建");
            createToggleButton();
        }
    }
}, 1000);

// 最终检查，确保按钮在所有情况下都可见
setTimeout(function() {
    console.log("最终按钮检查");
    checkAndResolveConflicts(); // 确保没有冲突
    
    // 检查按钮是否存在且可见
    const btn = document.getElementById('quickToolsToggleBtn');
    const isMobile = window.innerWidth <= 1200;
    
    if (isMobile) {
        if (!btn) {
            console.warn("按钮不存在（最终检查），创建按钮");
            try {
                // 直接创建按钮而不调用可能有冲突的函数
                const newBtn = document.createElement('button');
                newBtn.id = 'quickToolsToggleBtn';
                newBtn.className = 'quick-tools-toggle quick-tools-btn-persistent';
                newBtn.setAttribute('aria-label', '显示/隐藏便捷工具');
                newBtn.setAttribute('type', 'button');
                newBtn.setAttribute('data-qt-button', 'true');
                newBtn.setAttribute('data-final-check', 'true');
                newBtn.setAttribute('data-timestamp', Date.now());
                
                // 应用样式
                newBtn.style.position = 'fixed';
                newBtn.style.display = 'flex';
                newBtn.style.visibility = 'visible';
                newBtn.style.opacity = '1';
                newBtn.style.zIndex = '9979';
                newBtn.style.top = '40%';
                newBtn.style.right = '0';
                newBtn.style.transform = 'translateY(-50%)';
                newBtn.style.width = '36px';
                newBtn.style.height = '80px';
                newBtn.style.borderRadius = '24px 0 0 24px';
                newBtn.style.background = 'linear-gradient(90deg, #2ea043, #3fb950)';
                newBtn.style.color = 'white';
                newBtn.style.fontSize = '16px';
                newBtn.style.fontWeight = 'bold';
                newBtn.style.letterSpacing = '2px';
                newBtn.style.cursor = 'pointer';
                newBtn.style.border = 'none';
                newBtn.style.outline = 'none';
                newBtn.style.writingMode = 'vertical-rl';
                newBtn.style.textOrientation = 'mixed';
                newBtn.style.boxShadow = '-2px 0 10px rgba(0, 0, 0, 0.2)';
                newBtn.textContent = '工具⚙️';
                
                // 添加点击事件
                newBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('紧急创建的便捷功能按钮被点击');
                    // 尝试查找并使用toggleQuickToolsPanel函数
                    if (typeof toggleQuickToolsPanel === 'function') {
                        toggleQuickToolsPanel();
                    } else {
                        // 直接切换面板显示/隐藏
                        const panel = document.querySelector('.quick-tools-panel');
                        if (panel) {
                            if (panel.style.display === 'none') {
                                panel.style.display = 'block';
                                panel.style.opacity = '1';
                                panel.style.visibility = 'visible';
                                panel.style.transform = 'translateX(0)';
                                panel.classList.add('show');
                            } else {
                                panel.style.display = 'none';
                                panel.style.opacity = '0';
                                panel.style.visibility = 'hidden';
                                panel.style.transform = 'translateX(260px)';
                                panel.classList.remove('show');
                            }
                        }
                    }
                });
                
                // 添加到DOM
                document.body.appendChild(newBtn);
                console.log("最终检查创建了新按钮:", newBtn.id);
                
                // 更新引用
                if (typeof QuickTools !== 'undefined' && QuickTools.elements) {
                    QuickTools.elements.toggleBtn = newBtn;
                }
            } catch (error) {
                console.error("最终检查创建按钮失败:", error);
                // 尝试使用函数创建
                if (typeof createToggleButton === 'function') {
                    createToggleButton();
                }
            }
        } else if (btn.style.display !== 'flex' || btn.style.visibility !== 'visible') {
            console.warn("按钮存在但不可见（最终检查），强制显示");
            if (typeof forceShowToggleButton === 'function') {
                forceShowToggleButton();
            } else {
                // 直接应用样式
                btn.style.display = 'flex';
                btn.style.visibility = 'visible';
                btn.style.opacity = '1';
                btn.style.position = 'fixed';
                btn.style.right = '0';
                btn.style.top = '40%';
                btn.style.zIndex = '9979';
            }
        }
    }
}, 2000);

// 多次执行最终检查，确保在各种情况下按钮都能正常显示
[3000, 5000, 10000].forEach(function(delay) {
    setTimeout(function() {
        console.log(`${delay}ms 延迟检查便捷工具按钮可见性`);
        const btn = document.getElementById('quickToolsToggleBtn');
        const isMobile = window.innerWidth <= 1200;
        
        if (isMobile && (!btn || btn.style.display !== 'flex' || btn.style.visibility !== 'visible')) {
            console.warn(`${delay}ms 检查: 按钮不可见，强制显示`);
            if (typeof forceShowToggleButton === 'function') {
                forceShowToggleButton();
            } else if (!btn) {
                // 创建超简单按钮
                const emergencyBtn = document.createElement('button');
                emergencyBtn.id = 'quickToolsToggleBtn';
                emergencyBtn.style.position = 'fixed';
                emergencyBtn.style.right = '0';
                emergencyBtn.style.top = '40%';
                emergencyBtn.style.width = '36px';
                emergencyBtn.style.height = '80px';
                emergencyBtn.style.zIndex = '9999';
                emergencyBtn.style.display = 'flex';
                emergencyBtn.style.visibility = 'visible';
                emergencyBtn.style.opacity = '1';
                emergencyBtn.style.background = 'linear-gradient(90deg, #2ea043, #3fb950)';
                emergencyBtn.style.borderRadius = '24px 0 0 24px';
                emergencyBtn.style.border = 'none';
                emergencyBtn.style.color = 'white';
                emergencyBtn.textContent = '工具';
                emergencyBtn.setAttribute('data-emergency', 'true');
                document.body.appendChild(emergencyBtn);
                console.log("创建了紧急按钮");
            }
        }
    }, delay);
});

// 检查并解决与其他脚本的冲突
function checkAndResolveConflicts() {
    // 防止热门站点脚本的resize监听器干扰我们的按钮
    console.log("检查并解决可能的脚本冲突");
    
    // 保存原始的resize事件，以便我们可以稍后恢复它
    if (window.originalAddEventListener === undefined) {
        window.originalAddEventListener = window.addEventListener;
        
        // 重写addEventListener，过滤掉可能导致冲突的resize事件
        window.addEventListener = function(type, listener, options) {
            if (type === 'resize') {
                console.log("拦截到resize事件监听器添加尝试");
                
                // 包装监听器，确保我们的按钮不会被其他脚本删除
                const wrappedListener = function(event) {
                    // 调用原始监听器
                    listener.call(this, event);
                    
                    // 确保我们的按钮仍然在DOM中
                    const btn = document.getElementById('quickToolsToggleBtn');
                    if (btn && QuickTools.state.isMobile) {
                        // 确保按钮样式正确但不使用可能冲突的方法
                        btn.style.display = 'flex';
                        btn.style.visibility = 'visible';
                        btn.style.opacity = '1';
                    }
                };
                
                // 调用原始方法，但使用我们的包装监听器
                window.originalAddEventListener.call(this, type, wrappedListener, options);
            } else {
                // 对于非resize事件，正常添加监听器
                window.originalAddEventListener.call(this, type, listener, options);
            }
        };
    }
    
    // 清理可能的重复元素
    setTimeout(function() {
        // 延时执行，确保DOM完全加载
        const quickToolsButtons = document.querySelectorAll('[id^="quickToolsToggleBtn"]');
        if (quickToolsButtons.length > 1) {
            console.warn("检测到多个快捷工具按钮，清理重复按钮");
            // 保留最近创建的按钮
            let newestBtn = null;
            let newestTimestamp = 0;
            
            quickToolsButtons.forEach(function(btn) {
                const timestamp = parseInt(btn.getAttribute('data-timestamp') || '0');
                if (timestamp > newestTimestamp) {
                    newestTimestamp = timestamp;
                    newestBtn = btn;
                }
            });
            
            // 删除其他按钮
            quickToolsButtons.forEach(function(btn) {
                if (btn !== newestBtn) {
                    btn.remove();
                }
            });
            
            // 更新引用
            if (newestBtn) {
                QuickTools.elements.toggleBtn = newestBtn;
            }
        }
    }, 500);
}

// 确保在DOM完全加载后再执行初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log("DOM加载完成，初始化便捷工具");
        checkAndResolveConflicts();
        initQuickTools();
    });
} else {
    // 如果DOMContentLoaded已经触发，直接初始化
    console.log("DOM已经加载，直接初始化便捷工具");
    checkAndResolveConflicts();
    initQuickTools();
} 

// 确保立即执行初始化
console.log("立即执行初始化便捷工具");
initQuickTools();