## 博客文章设置了置顶但是没有生效？

同时使用了 **hexo-generator-index** 插件和**hexo-generator-topindex** 插件

1.  hexo-generator-index - 默认的首页生成器，使用 sticky 字段排序
2.  hexo-generator-topindex - 另一个首页生成器，使用 top 字段排序

**解决：**

```
npm uninstall hexo-generator-topindex
```

## 如何让首页不显示Top的背景图，但是博客页面显示呢？

**效果如下：**

![](http://www.kdocs.cn/api/v3/office/copy/NWVxUlJCRnFSNGdJRnNITW9DR2kveGRkRmYrVmN2UWh2YXJXc2s1ZjRkM0JudHVRajlVQnNWNWpzMXF6NDlDSEQ0anFraHhWR2NQMldjcUdyd1BtaEZGR05rVlBHRVZkMVFLK0FGRWp2VW96ODl3WlllNXRybXlyNFkyNUVQTU9lL0NyTE1JQnU1alBkZmVRaTZYUEF1ek5pTlBGbEYxRHJFR05wRDVXOG9maUlNcVlNTGJvR1ZJM1kxRW9rM0NVbW5TQkpONjBzd3Q1TDdFUDV4bWZ4bFhBUXJwalgrblpvdkw0dllFMzQ2NklUcU8vdjlIL1ZGdldoeVljV1VBbytFTWc5UHRGZ1dJPQ==/attach/object/EDXIDJY7AAAB2?)

![](http://www.kdocs.cn/api/v3/office/copy/NWVxUlJCRnFSNGdJRnNITW9DR2kveGRkRmYrVmN2UWh2YXJXc2s1ZjRkM0JudHVRajlVQnNWNWpzMXF6NDlDSEQ0anFraHhWR2NQMldjcUdyd1BtaEZGR05rVlBHRVZkMVFLK0FGRWp2VW96ODl3WlllNXRybXlyNFkyNUVQTU9lL0NyTE1JQnU1alBkZmVRaTZYUEF1ek5pTlBGbEYxRHJFR05wRDVXOG9maUlNcVlNTGJvR1ZJM1kxRW9rM0NVbW5TQkpONjBzd3Q1TDdFUDV4bWZ4bFhBUXJwalgrblpvdkw0dllFMzQ2NklUcU8vdjlIL1ZGdldoeVljV1VBbytFTWc5UHRGZ1dJPQ==/attach/object/36GIFJY7ADQFE?)

**解决：**

```
 # Disable all banner image(是否禁用所有首页顶部图片，true为禁用，false为不禁用)
disable_top_img: false

# The banner image of home page（只禁用首页顶部图片，其他页面顶部图片仍然显示）
index_img: false

# If the banner of page not setting, it will show the top_img
default_top_img: "background: linear-gradient(45deg, rgba(16, 30, 67, 0.7) 0%, rgba(52, 82, 255, 0.7) 30%, rgba(243, 54, 142, 0.7) 70%, rgba(255, 107, 69, 0.7) 100%), url('/img/other/background.jpg') center / cover no-repeat"
```

## 嵌入视频不生效，显示404？

如果是你用其他平台复制粘贴的，请保证你的视频嵌入代码是字符串，不要加**任何装饰。**

**正确的例子**

<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=114166908066279&bvid=BV1hSQDYAEQs&cid=28882438458&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>

**错误的例子：**

<iframe src="[//player.bilibili.com/player.html?isOutside=true&aid=114166908066279&bvid=BV1hSQDYAEQs&cid=28882438458&p=1"](https://player.bilibili.com/player.html?isOutside=true&aid=114166908066279&bvid=BV1hSQDYAEQs&cid=28882438458&p=1%22) scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>

## cloudflare自动发布的时候会把main分支也给发布？

> cloudflare发布gh-pages分支的时候，也会把mian分支作为预览分支发布的

----------

> **解决办法：**  
> **进入自己的pages-->设置-->分支控制(编辑)-->预览分支(设置成：无)**

![](http://www.kdocs.cn/api/v3/office/copy/NWVxUlJCRnFSNGdJRnNITW9DR2kveGRkRmYrVmN2UWh2YXJXc2s1ZjRkM0JudHVRajlVQnNWNWpzMXF6NDlDSEQ0anFraHhWR2NQMldjcUdyd1BtaEZGR05rVlBHRVZkMVFLK0FGRWp2VW96ODl3WlllNXRybXlyNFkyNUVQTU9lL0NyTE1JQnU1alBkZmVRaTZYUEF1ek5pTlBGbEYxRHJFR05wRDVXOG9maUlNcVlNTGJvR1ZJM1kxRW9rM0NVbW5TQkpONjBzd3Q1TDdFUDV4bWZ4bFhBUXJwalgrblpvdkw0dllFMzQ2NklUcU8vdjlIL1ZGdldoeVljV1VBbytFTWc5UHRGZ1dJPQ==/attach/object/QSDUZKQ7ACAHM?)

POST_TITLE: Hexo博客搭建：QA章（Hexo博客搭建和发布上踩的坑）

POST_CATEGORIES: 百宝箱

POST_TAGS: 博客,教程

POST_STICKY:
<!--stackedit_data:
eyJoaXN0b3J5IjpbMjA3NTEyMTgxM119
-->