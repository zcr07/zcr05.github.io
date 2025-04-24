
# **基于** [**Gmeek**](https://github.com/Meekdai/Gmeek)**的个人博客做了很多改善**

## UI改善

## 增加了其他Markdown编辑的功能

# [Gmeek](https://github.com/Meekdai/Gmeek)的原理流程

![Image](https://raw.githubusercontent.com/MyMaskKing/MyMaskKing.github.io/main/assets/images/Gmeek博客搭建：快速搭建更自动化的个人博客/img_2b46848a80.png)

# [Gmeek增强](https://github.com/MyMaskKing/MyMaskKing.github.io.git)的原理流程

![Image](https://raw.githubusercontent.com/MyMaskKing/MyMaskKing.github.io/main/assets/images/Gmeek博客搭建：快速搭建更自动化的个人博客/img_2780839ab1.png)

----------

这个仓库使用 GitHub Action 工作流（`issue-publisher.yml`）将 Markdown 文件自动同步为 GitHub Issues。

### **功能特点**

-   **监控文件变化**：自动检测 `issues/*.md` 文件的新增、修改和删除
-   **图片资源自动处理**：自动下载文章中的图片并转存到仓库，确保图片链接永久有效(防止第三方图片链接失效)
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

#### 2. 编写文章

> [!NOTE]  
> 可以通过[StackEdit](https://stackedit.cn/)将Github的指定目录进行关联（可通过[我的博客](https://blog.mymaskking.dpdns.org/)找到具体方法,博客内有我的B站，抖音，油管等视频平台也可以找到相关视频）

1.  在`issues/`目录下创建Markdown文件(如`my-first-post.md`)
2.  文件名将自动成为Issue的标题
3.  在文件开头可以定义标签：

> 如果未指定标签，将使用默认标签**"文档"**

```
ISSUE_LABELS: 技术, 教程, 心得

这里开始是文章正文内容...
```

##### 更新文章

1.  修改`issues/`目录下的Markdown文件
2.  保存并推送到GitHub
3.  系统会自动更新对应的Issue

##### 删除文章

1.  从`issues/`目录删除Markdown文件
2.  推送更改到GitHub
3.  系统会自动关闭对应的Issue

#### **4. 图片处理**

-   文章中的图片会被自动下载并存储在`assets/images/文章名称/`目录下
-   图片链接会被自动更新为指向仓库中的图片
-   支持外部http链接图片、GitHub图片和相对路径图片

# 内置Gmeek官方UI和Gmeek增强版UI

1.  请选择要使用的config.json
2.  点击Action中的build Gmeek进行发布博客新的CSS和JS

## Gmeek官方UI

![Image](https://raw.githubusercontent.com/MyMaskKing/MyMaskKing.github.io/main/assets/images/Gmeek博客搭建：快速搭建更自动化的个人博客/img_5f7c6e923c.png)

### Gmeek增强版UI

![Image](https://raw.githubusercontent.com/MyMaskKing/MyMaskKing.github.io/main/assets/images/Gmeek博客搭建：快速搭建更自动化的个人博客/img_f36b7b7ec3.png)

# 重要提醒

> **自己仓库的Issues是所有人都可以创建的的**

## 解决办法

### 使用GitHub的workflow自动监控issues，非自己创建的自动关闭

**源码：**

```
name: Close Unauthorized Issues

on:
  issues:
    types: [opened]

permissions:
  issues: write  # 添加issues的写入权限

jobs:
  close-issue:
    runs-on: ubuntu-latest
    # 添加允许列表，只有不在允许列表中且不是仓库所有者的用户创建的Issue才会被关闭
    # 注意：这里使用的是GitHub用户名（username），不是邮箱
    # 例如：https://github.com/username 中的 username 就是用户名
    # 添加其他用户的例子：
    #  github.event.issue.user.login != 'MyFriend' &&
    #  github.event.issue.user.login != 'Collaborator123'
    if: |
      github.event.issue.user.login != github.repository_owner
    steps:
      - uses: actions/github-script@v6
        with:
          github-token: ${{secrets.GITHUB_TOKEN}}
          script: |
            await github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '此仓库的Issue由所有者通过特定工作流创建管理，不接受未授权用户创建的Issue。此Issue将被自动关闭。如有建议，请通过其他渠道联系仓库所有者。'
            });
            
            await github.rest.issues.update({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              state: 'closed'
            });
```

### 使用Issues的Template，在别人创建的时候进行提醒，不允许创建issues

**源码：**

**路径：仓库名\.github\ISSUE_TEMPLATE\温馨提示.md**

```
---
name: 温馨提示
about: 未经允许的Issues将会被自动关闭
title: ''
labels: ''
assignees: ''

---

blank_issues_enabled: false
contact_links:
  - name: 关于Issue创建说明
    url: https://blog.mymaskking.dpdns.org/
    about: 本仓库的Issue通过特定工作流由仓库所有者自动创建，不接受手动创建的Issue。如需讨论内容，请通过其他邮件与仓库所有者mymask139@163.com联系。
```




<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE2OTQ5NjY2NzZdfQ==
-->
