# **基于** [**Gmeek**](https://github.com/Meekdai/Gmeek)**的个人博客做了很多改善**

## UI改善

## 增加了其他Markdown编辑的功能

# [Gmeek](https://github.com/Meekdai/Gmeek)的原理流程

![](http://www.kdocs.cn/api/v3/office/copy/YU5aZW5GWUZaMlBXcUJLTUQ0WDhDalg1SERNR1VNRHNiVFY5bndYOHE3OUFuQVBOY0l4a0czTzQ1ZVhhRUZoVlRnSjB5aW41Uzl0TWJlRllSbVF5SEorOEJ1ZlFFcFRBaUY5U05sekRxa3F4N0Zya1RpUjNyM0w2OU9Ja21PcGpkVmR2eVBrSWpHakZDckMzVUd2bnhzWE9IQ1RSSTd2ZGpCQWF1em9renJ1dGNCN05kREtpcTVBdUYwcUtManJBcXlDWXJSakZWWE1yWDc2ZkJNc1lHT3VXV2E1cGhBS29zeVgxcnd3OHBjQ3l0dkYyREQwSHo5N1IveFBycDdSczRzZjdUNktjOXhvPQ==/attach/object/EUUTS6I7ADQAK? "po_bheegdgbihhhba")

# [Gmeek增强](https://github.com/MyMaskKing/MyMaskKing.github.io.git)的原理流程

![](http://www.kdocs.cn/api/v3/office/copy/YU5aZW5GWUZaMlBXcUJLTUQ0WDhDalg1SERNR1VNRHNiVFY5bndYOHE3OUFuQVBOY0l4a0czTzQ1ZVhhRUZoVlRnSjB5aW41Uzl0TWJlRllSbVF5SEorOEJ1ZlFFcFRBaUY5U05sekRxa3F4N0Zya1RpUjNyM0w2OU9Ja21PcGpkVmR2eVBrSWpHakZDckMzVUd2bnhzWE9IQ1RSSTd2ZGpCQWF1em9renJ1dGNCN05kREtpcTVBdUYwcUtManJBcXlDWXJSakZWWE1yWDc2ZkJNc1lHT3VXV2E1cGhBS29zeVgxcnd3OHBjQ3l0dkYyREQwSHo5N1IveFBycDdSczRzZjdUNktjOXhvPQ==/attach/object/JXQUS6I7AAAFU? "po_bheegdhaijjcja")

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

### **使用方法**

1.  把Git `issues/` 目录链接到[**StackEdit**](https://stackedit.cn/#)
2.  **添加文章**：在 `issues/` 目录下创建 `.md` 文件
3.  **更新文章**：修改 `issues/` 目录下的 `.md` 文件
4.  **删除文章**：删除 `issues/` 目录下的 `.md` 文件

系统会自动同步变更到 GitHub Issues。
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEyMDgxMzEwNjJdfQ==
-->
