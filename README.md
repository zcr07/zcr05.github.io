# 爱捣鼓的小水木的博客 :link: https://blog.mymaskking.dpdns.org/ 
### :page_facing_up: [11](https://blog.mymaskking.dpdns.org//tag.html) 
### :speech_balloon: 1 
### :hibiscus: 40373 
### :alarm_clock: 2025-04-17 21:38:42 
### Powered by :heart: [Gmeek](https://github.com/Meekdai/Gmeek)

---

## 使用说明

本博客基于Gmeek静态博客系统开发，增强版本添加了热门站点和便捷工具等功能。以下是主要功能和使用方法：

### 热门站点与便捷工具功能

博客页面左侧可显示热门站点列表，右侧可显示便捷工具列表。在移动设备上，这些功能会转变为可点击的侧边按钮。

#### 数据配置

1. 热门站点数据：`static/js/hot-sites.js` 文件顶部的 `HOT_SITES_DATA` 变量
2. 便捷工具数据：`static/js/quick-tools.js` 文件顶部的 `QUICK_TOOLS_DATA` 变量

也可通过修改以下配置路径来更改数据源：
- 热门站点数据路径：`HOT_SITES_CONFIG_PATH` (默认：`https://blog.mymaskking.ggff.net/config/hot_site.json`)
- 便捷工具数据路径：`QUICK_TOOLS_CONFIG_PATH` (默认：`https://blog.mymaskking.ggff.net/config/quick_tools.json`)

#### JS加载优先顺序（重要）

为确保功能正常，请按以下顺序在HTML中引入JS文件：

```html
<!-- 1. 先加载便捷工具js -->
<script src="static/js/quick-tools.js"></script>

<!-- 2. 后加载热门站点js -->
<script src="static/js/hot-sites.js"></script>
```

必须先加载便捷工具JS再加载热门站点JS，这样热门站点JS才能正确引用便捷工具中定义的函数，确保两个面板的互斥显示。
> [!TIP]
> hot-sites.js中配置了document的全局监听，所有必须放到最后加载！
> 否则：hot-sites.js的内容会被quick-tools.js覆盖！
### 其他功能

- 响应式布局：适配各种屏幕尺寸
- 主题切换：支持亮色/暗色模式切换
- 搜索功能：支持全站内容搜索

### 开发维护

开发者可以通过修改以下文件进行功能扩展：

1. `static/js/hot-sites.js`：热门站点功能
2. `static/js/quick-tools.js`：便捷工具功能
3. `static/css/blog.css`：全站样式

若要添加新的交互元素，建议遵循现有代码结构，并注意不同功能间的互操作性。
