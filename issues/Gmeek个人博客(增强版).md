
# **基于** [**Gmeek**](https://github.com/Meekdai/Gmeek)**的个人博客做了很多改善**

## UI改善

## 增加了其他Markdown编辑的功能

# [Gmeek](https://github.com/Meekdai/Gmeek)的原理流程

![](http://www.kdocs.cn/api/v3/office/copy/ckNjR09UV2tNTWxlMHd5KzRITUgwODUwaWFZTFZFdTFla1J6eVRIbnZnTEtOMTYzWm8rb3R5WmxwczFSWnN0dFlCQmV1UEl2TGZsZ2YvR0ZzenQ3RThkZFM1TGUrVGlIbDR3NFNvcHRqOXlZdXVkclZOVmF4bnRTaHJhdzFBYU9RMGhFdk5hV1kzd3o0UzhocTd1QTQvWXlKaTZQZmFtU3poVGhYREFvMCs2TVYyTFVwT1M3bXQwaTJTN0ZLaWRzd3p3K3hzRHZYN3FQY3MyaUhJdlhYS2FtdmU0NEJnYXlNdUxGZysweTdmRWxwVW5VNTN0NnV5LzhETjlDOWs3YTE0cFNNV0Y5Umw0PQ==/attach/object/EUUTS6I7ADQAK? "po_bheegdgbihhhba")

# [Gmeek增强](https://github.com/MyMaskKing/MyMaskKing.github.io.git)的原理流程

![](http://www.kdocs.cn/api/v3/office/copy/ckNjR09UV2tNTWxlMHd5KzRITUgwODUwaWFZTFZFdTFla1J6eVRIbnZnTEtOMTYzWm8rb3R5WmxwczFSWnN0dFlCQmV1UEl2TGZsZ2YvR0ZzenQ3RThkZFM1TGUrVGlIbDR3NFNvcHRqOXlZdXVkclZOVmF4bnRTaHJhdzFBYU9RMGhFdk5hV1kzd3o0UzhocTd1QTQvWXlKaTZQZmFtU3poVGhYREFvMCs2TVYyTFVwT1M3bXQwaTJTN0ZLaWRzd3p3K3hzRHZYN3FQY3MyaUhJdlhYS2FtdmU0NEJnYXlNdUxGZysweTdmRWxwVW5VNTN0NnV5LzhETjlDOWs3YTE0cFNNV0Y5Umw0PQ==/attach/object/JXQUS6I7AAAFU? "po_bheegdhaijjcja")

----------

这个仓库使用 GitHub Action 工作流（`issue-publisher.yml`）将 Markdown 文件自动同步为 GitHub Issues。

### **功能特点**

-   **监控文件变化**：自动检测 `issues/*.md` 文件的新增、修改和删除
-   **双向同步**：

-   新增/修改文件 → 创建/更新对应的 GitHub Issue
-   删除文件 → 关闭对应的 GitHub Issue

-   **智能处理**：

-   支持中文文件名（自动解码路径中的转义序列）
-   只处理当前提交中变更的文件
-   自动验证文件存在性

-   **标签管理**：

-   从 Markdown 文件中提取标签（`ISSUE_LABELS:` 行）
-   自动创建缺失的标签
-   更新时保留原有标签，只添加新标签

-   **状态恢复**：当重新添加已删除的文件时，自动重新打开对应的 Issue

### **Markdown 文件格式**

`ISSUE_LABELS: 标签1, 标签2, 标签3`

-   文件名将用作 Issue 标题
-   第一行可以包含以 `ISSUE_LABELS:` 开头的标签定义（可选）
-   如果未指定标签，将使用默认标签"文档"

### **工作流触发条件**

当 `issues/*.md` 文件有任何变更时触发工作流。

### 使用方法

> [!CAUTION]  
> 使用Gmeek增强版之前务必先阅读[# Gmeek快速上手](https://blog.meekdai.com/post/Gmeek-kuai-su-shang-shou.html)，这里只讲增强内容的用法。

#### 1. 基础设置

1.  点击[Gmeek增强版Template](https://github.com/new?template_name=gmeek_enhanced&template_owner=MyMaskKing)把仓库下载到自己的Github
2.  在仓库根目录创建`issues`文件夹(如不存在)

#### 2. 创建文章

> [!NOTE]  
> 可以通过[StackEdit](https://stackedit.cn/)将Github的指定目录进行关联（可通过[我的博客](https://blog.mymaskking.dpdns.org/)找到具体方法,博客内有我的B站，抖音，油管等视频平台也可以找到相关视频）

1.  在`issues/`目录下创建Markdown文件(如`my-first-post.md`)
2.  文件名将自动成为Issue的标题
3.  在文件开头可以定义标签：

```
ISSUE_LABELS: 技术, 教程, 心得

这里开始是文章正文内容...
```

1.  保存文件并推送到GitHub

#### 3. 更新文章

1.  修改`issues/`目录下的Markdown文件
2.  保存并推送到GitHub
3.  系统会自动更新对应的Issue

#### 4. 删除文章

1.  从`issues/`目录删除Markdown文件
2.  推送更改到GitHub
3.  系统会自动关闭对应的Issue

# 内置Gmeek官方UI和Gmeek增强版UI

1.  请选择要使用的config.json
2.  点击Action中的build Gmeek进行发布博客新的CSS和JS

## Gmeek官方UI

![](http://www.kdocs.cn/api/v3/office/copy/ckNjR09UV2tNTWxlMHd5KzRITUgwODUwaWFZTFZFdTFla1J6eVRIbnZnTEtOMTYzWm8rb3R5WmxwczFSWnN0dFlCQmV1UEl2TGZsZ2YvR0ZzenQ3RThkZFM1TGUrVGlIbDR3NFNvcHRqOXlZdXVkclZOVmF4bnRTaHJhdzFBYU9RMGhFdk5hV1kzd3o0UzhocTd1QTQvWXlKaTZQZmFtU3poVGhYREFvMCs2TVYyTFVwT1M3bXQwaTJTN0ZLaWRzd3p3K3hzRHZYN3FQY3MyaUhJdlhYS2FtdmU0NEJnYXlNdUxGZysweTdmRWxwVW5VNTN0NnV5LzhETjlDOWs3YTE0cFNNV0Y5Umw0PQ==/attach/object/CXW327Q7ADQCG?)

### Gmeek增强版UI

![](http://www.kdocs.cn/api/v3/office/copy/ckNjR09UV2tNTWxlMHd5KzRITUgwODUwaWFZTFZFdTFla1J6eVRIbnZnTEtOMTYzWm8rb3R5WmxwczFSWnN0dFlCQmV1UEl2TGZsZ2YvR0ZzenQ3RThkZFM1TGUrVGlIbDR3NFNvcHRqOXlZdXVkclZOVmF4bnRTaHJhdzFBYU9RMGhFdk5hV1kzd3o0UzhocTd1QTQvWXlKaTZQZmFtU3poVGhYREFvMCs2TVYyTFVwT1M3bXQwaTJTN0ZLaWRzd3p3K3hzRHZYN3FQY3MyaUhJdlhYS2FtdmU0NEJnYXlNdUxGZysweTdmRWxwVW5VNTN0NnV5LzhETjlDOWs3YTE0cFNNV0Y5Umw0PQ==/attach/object/D7W327Q7ADQCQ?)
<!--stackedit_data:
eyJoaXN0b3J5IjpbNTgwNjI2MTM0XX0=
-->