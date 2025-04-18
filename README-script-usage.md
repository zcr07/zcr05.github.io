# 热点站点和便捷工具JS引入指南

为了确保热点站点和便捷工具JS正确加载且按正确顺序执行，需要在HTML页面中使用脚本加载器。

## 正确的脚本引入方式

请在您的HTML页面中使用以下方式引入脚本：

```html
<!-- 引入脚本加载器 -->
<script src="/static/js/script-loader.js"></script>
```

脚本加载器会自动按顺序加载以下脚本：
1. 先加载: `/static/js/plugins/hot-sites.js` (热点站点)
2. 后加载: `/static/js/plugins/quick-tools.js` (便捷工具) - **注意：如果页面包含目录，便捷工具JS将不会加载**

## 目录与便捷工具的互斥关系

为了优化页面布局和用户体验，系统遵循以下规则：

1. **热点站点功能** - 在所有页面中都会加载和显示
2. **便捷工具功能** - 仅在没有目录的页面中加载和显示
3. **页面目录功能** - 如果页面包含目录，便捷工具功能将被禁用

这种设计确保页面不会因为过多的侧边功能而变得拥挤或混乱。脚本加载器会自动检测页面是否包含目录元素，并相应地调整脚本加载行为。

## 不要直接引入单个脚本

请不要直接在HTML中分别引入这两个脚本：

```html
<!-- 不要这样做 -->
<script src="/static/js/plugins/hot-sites.js"></script>
<script src="/static/js/plugins/quick-tools.js"></script>
```

这样做可能会导致加载顺序问题，并且绕过了目录检测逻辑，可能使便捷工具在不应该出现的地方显示。

## 注意事项

1. 如果您需要添加新的插件脚本，请在`script-loader.js`中的`scripts`数组中添加新的脚本路径。
2. 脚本加载顺序很重要，热点站点JS必须先于便捷工具JS加载。
3. 如果遇到脚本加载问题，请检查浏览器控制台中是否有错误信息。
4. 如果您想在有目录的页面中强制启用便捷工具，需要修改`script-loader.js`中的检测逻辑（不推荐）。

## 目录检测原理

系统会自动检测页面中是否存在以下目录相关元素：

* 类选择器: `.toc`, `.table-of-contents`, `.post-toc`, `.article-toc`, `.markdown-toc`, `.mobile-toc-btn`, `.sidebar-toc`
* ID选择器: `#toc`, `#table-of-contents`
* 属性选择器: `[data-role="toc"]`, `[data-role="toc-btn"]`
* 其他移动端目录按钮: `.toc-mobile-btn`, `.btn-toc`

如果发现以上任一元素，系统将认为页面包含目录，并相应地调整便捷工具的加载行为。

## 自定义加载顺序

如果需要自定义加载顺序或添加新脚本，请修改`script-loader.js`文件中的以下部分：

```javascript
// 需要按顺序加载的脚本列表
const scripts = [
    '/static/js/plugins/hot-sites.js',
    '/static/js/plugins/quick-tools.js',
    // 可以在这里添加更多脚本
];
```

## 故障排除

如果脚本加载后功能不正常，请尝试以下步骤：

1. 清除浏览器缓存后重试
2. 检查浏览器控制台是否有JavaScript错误
3. 确认网络请求中脚本是否正确加载（查看Network标签）
4. 确保脚本加载器本身被正确引入
5. 检查页面是否包含目录元素（这会禁用便捷工具功能） 