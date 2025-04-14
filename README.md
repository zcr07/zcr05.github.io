# 爱捣鼓的小水木的博客 :link: https://blog.mymaskking.dpdns.org/ 
### :page_facing_up: [12](https://blog.mymaskking.dpdns.org//tag.html) 
### :speech_balloon: 3 
### :hibiscus: 71820 
### :alarm_clock: 2025-04-14 19:59:31 
### Powered by :heart: [Gmeek](https://github.com/Meekdai/Gmeek)

## Issue Publisher 工作流说明

这个仓库使用 GitHub Action 工作流（`issue-publisher.yml`）将 Markdown 文件自动同步为 GitHub Issues。

### 功能特点

- **监控文件变化**：自动检测 `issues/*.md` 文件的新增、修改和删除
- **双向同步**：
  - 新增/修改文件 → 创建/更新对应的 GitHub Issue
  - 删除文件 → 关闭对应的 GitHub Issue
- **智能处理**：
  - 支持中文文件名（自动解码路径中的转义序列）
  - 只处理当前提交中变更的文件
  - 自动验证文件存在性
- **标签管理**：
  - 从 Markdown 文件中提取标签（`ISSUE_LABELS:` 行）
  - 自动创建缺失的标签
  - 更新时保留原有标签，只添加新标签
- **状态恢复**：当重新添加已删除的文件时，自动重新打开对应的 Issue

### Markdown 文件格式

```markdown
ISSUE_LABELS: 标签1, 标签2, 标签3

这里是正文内容...
```

- 文件名将用作 Issue 标题
- 第一行可以包含以 `ISSUE_LABELS:` 开头的标签定义（可选）
- 如果未指定标签，将使用默认标签"文档"

### 工作流触发条件

当 `issues/*.md` 文件有任何变更时触发工作流。

### 使用方法

1. **添加文章**：在 `issues/` 目录下创建 `.md` 文件
2. **更新文章**：修改 `issues/` 目录下的 `.md` 文件
3. **删除文章**：删除 `issues/` 目录下的 `.md` 文件

系统会自动同步变更到 GitHub Issues。
