
> 最开始搭建的Gmeek博客（基于github的issues），后来发现自己git的issues是所有人都可以新建的，这就丧失了个人博客的意义，遂放弃转战其他！  
> ps:自己还拿着cursor吭哧吭哧的做了个性化，各种js注入插件...

# 温馨提示

> **自己的博客发布流程**：  
> **WPS云文档-->复制粘贴到stackedit-->自动发布博客（**[**📖博客A**](https://blog.mymaskking.dpdns.org/)**|**[**📖博客B**](https://hexo-blog.mymaskking.dpdns.org/)）  
> [**📖博客A**](https://blog.mymaskking.dpdns.org/)：基于Gmeek（已做UI个性化）  
> [**📖博客B**](https://hexo-blog.mymaskking.dpdns.org/)：基于Hexo和anzhiyu主题

# 官方文档

**安知鱼主题官方文档**:[点我](https://docs.anheyu.com/initall.html)

# Hexo搭建教程

## 安装hexo

```
npm install -g hexo-cli && hexo -v
```

> `hexo -v`验证是否安装成功

## 初始化 Hexo 项目安装相关依赖

```
可以在你的blog文件夹下直接执行hexo init
也可以：hexo init blog文件夹
cd blog-demo
npm i
```

> **hexo**文件夹介绍：**node_modules**：依赖包  
> **scaffolds**：生成文章的一些模板  
> **source**：用来存放你的文章  
> **themes**：主题  
> **.npmignore**：发布时忽略的文件（可忽略）  
> **_config.landscape.yml**：主题的配置文件  
> **config.yml**：博客的配置文件  
> **package.json**：项目名称、描述、版本、运行和开发等信

## 启动hexo

```
注意：命令拼接符Windows用;，Linux用&&
hexo cl ; hexo s
等价于
hexo clean ; hexo start
```

## workflow自动发布到gh-pages分支（我的优化）

> **原理**：  
> **1.提交代码后github的workflow自动触发**。  
> **2.github的page上执行**`hexo clean;hexo generate`。  
> **3.生成的**`public`**自动发布到**`gh-pages`

----------

> **如何使用：**  
> `gh-pages分支的选择请在Settings-->GitHub Pages-->Build and deployment-->Deploy from branch-->gh-pages分支`。  
> 使用gh-pages分支而不是main分支有几个重要原因：  
> 1.代码分离：将源代码（Hexo博客的原始文件）和生成的静态网站分开存储，使仓库结构更加清晰  
> 2.简化版本控制：您只需要跟踪和管理源代码的变化，而不需要关心每次生成的静态文件的变化  
> 3.自动化部署流程：使用GitHub Actions自动构建和部署到单独的分支，减少了手动操作  
> 4.保持源码私密性选择：如果需要，您可以将源码保持私有，同时发布生成的静态网站  
> 5.减少冲突：避免构建过程中生成的文件与源代码发生合并冲突

**workflows源码**

```
name: 部署博客

on:
  # 手动触发
  workflow_dispatch:
  
  # 定时触发
  schedule:
    - cron: "0 2 * * *"  # 每天UTC 2点
  
  # 在同步Markdown工作流完成后触发
  workflow_run:
    workflows: ["同步 Markdown 到博客"]
    types:
      - completed
    branches:
      - main

# 权限配置
permissions:
  contents: write

# 并发控制
concurrency:
  group: pages-${{ github.ref }}
  cancel-in-progress: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: 检出代码
        uses: actions/checkout@v3
        with:
          submodules: true
          fetch-depth: 0
      
      - name: 设置Node环境
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: 安装依赖
        run: |
          npm install -g hexo-cli
          npm install
      
      - name: 构建站点
        run: |
          hexo clean
          hexo generate
      
      - name: 部署到GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
          publish_branch: gh-pages
          commit_message: '自动部署: ${{ github.event_name }}'
          user_name: 'github-actions[bot]'
          user_email: 'github-actions[bot]@users.noreply.github.com' 
```

## stackedit编辑markdown时需要追加的操作

> 如何使用stacked请看[**这个**](https://kdocs.cn/l/chVIvTvyAE3O)

----------

> **使用方法：**  
> **1.在仓库建一个issues的文件夹（为啥叫issues，请看我的Gmeek的惨痛经历**）  
> **2.GitHub的workflow将会监控issues文件夹**。  
> **3.workflow把issues文件夹提交的md文件先做一些操作然后放到source/_posts中**  
> - md文件中的关键字(标题，类型，便签，置顶序号)提取置换- md文件中的图片链接下载到source/images/文件名（图片持久化，防止第三方链接丢失）

----------

> 优势：  
> 1. 完美和stackedit相结合  
> 2. 多次调用workflow未单线程操作（来晚的workflow等待）  
> 3. 和自动发布的workflow完美衔接，自动发布最终只执行一次（来早的workflow自动放弃）

源码：

```
name: 同步 Markdown 到博客

on:
  workflow_dispatch:  # 允许手动触发
  push:
    paths:
      - 'issues/*.md'  # 当issues目录中的md文件有变动时触发

# 修改并发控制，确保每个提交都能被独立处理
concurrency:
  group: sync-posts-${{ github.workflow }}-${{ github.event.pull_request.number || github.ref }}-${{ github.event.after || github.event.before || github.sha }}
  cancel-in-progress: false  # 不取消运行中的工作流，确保所有变更都被处理

permissions:
  contents: write

jobs:
  sync-to-posts:
    # 只有仓库所有者的提交才会执行此工作流
    if: github.actor == github.repository_owner
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
        with:
          fetch-depth: 2  # 确保获取足够的历史记录比较变更
          token: ${{ secrets.GITHUB_TOKEN }}  # 使用带写权限的token

      - name: 🔍 获取本次提交变更的 issues/*.md 文件
        id: get_changed_files
        env:
          GH_TOKEN: ${{ github.token }}
        run: |
          # 设置Git身份
          git config --global user.name "github-actions[bot]"
          git config --global user.email "github-actions[bot]@users.noreply.github.com"
          
          echo "🔍 当前 GITHUB_SHA: $GITHUB_SHA"
          
          # 获取触发此工作流的提交SHA - 保留原始值
          ORIGINAL_TRIGGER_SHA="${{ github.event.before }}"
          TRIGGER_SHA="$ORIGINAL_TRIGGER_SHA"
          
          if [[ -z "$TRIGGER_SHA" || "$TRIGGER_SHA" == "0000000000000000000000000000000000000000" ]]; then
            # 如果before为空或者是初始提交，使用HEAD~1
            TRIGGER_SHA=$(git rev-parse HEAD~1)
          fi
          echo "🔧 触发此工作流的提交 SHA: $TRIGGER_SHA"
          echo "🔧 当前提交 SHA: $GITHUB_SHA"
          
          # 从触发提交中获取变更文件
          echo "📋 获取本次触发提交中变更的文件..."
          echo "$ git diff --name-status $TRIGGER_SHA $GITHUB_SHA"
          
          # 先尝试直接获取差异
          if ! git diff --name-status "$TRIGGER_SHA" "$GITHUB_SHA" > /tmp/diff_output.txt 2>/tmp/diff_error.txt; then
            # 如果出错了，可能是提交SHA无效
            echo "⚠️ 使用原始SHA获取差异失败，错误信息:"
            cat /tmp/diff_error.txt
            
            # 尝试拉取最新代码解决问题
            echo "🔄 尝试拉取最新的远程仓库内容..."
            git pull --no-rebase
            
            # 再次尝试使用原始SHA
            if ! git diff --name-status "$TRIGGER_SHA" "$GITHUB_SHA" > /tmp/diff_output.txt 2>/tmp/diff_error.txt; then
              echo "⚠️ 拉取后使用原始SHA仍然失败，尝试使用HEAD~1作为基准"
              TRIGGER_SHA=$(git rev-parse HEAD~1)
              
              # 尝试使用HEAD~1
              if ! git diff --name-status "$TRIGGER_SHA" "$GITHUB_SHA" > /tmp/diff_output.txt 2>/tmp/diff_error.txt; then
                echo "⚠️ 使用HEAD~1也失败，将处理当前目录下的所有MD文件"
                # 列出当前所有的issues/*.md文件
                find issues -name "*.md" > /tmp/current_md_files.txt
                if [[ -s "/tmp/current_md_files.txt" ]]; then
                  echo "📄 找到以下MD文件:"
                  cat /tmp/current_md_files.txt
                  cp /tmp/current_md_files.txt /tmp/final_md_files.txt
                  echo "ISSUES_FILES_LIST=/tmp/final_md_files.txt" >> $GITHUB_ENV
                  echo "HAS_MD_FILES=true" >> $GITHUB_ENV
                  # 跳过git diff
                  echo "⏩ 跳过git diff，直接处理所有MD文件"
                  exit 0
                else
                  echo "⚠️ 没有找到MD文件，将终止工作流"
                  echo "HAS_MD_FILES=false" >> $GITHUB_ENV
                  exit 0
                fi
              fi
            fi
          fi
          
          # 如果成功获取差异，读取输出
          CHANGED_FILES=$(cat /tmp/diff_output.txt)
          echo "变更文件列表："
          echo "$CHANGED_FILES"
          
          # 处理删除的文件
          echo "📋 获取删除的文件..."
          # 使用NF保留所有字段，避免awk默认分割空格导致文件名被截断
          # 先提取所有删除的文件到临时文件，避免在管道中创建子shell
          echo "$CHANGED_FILES" | grep "^D" | sed -E 's/^D[[:space:]]+//' > /tmp/deleted_files_temp.txt

          # 在主shell中处理删除文件，确保git操作在同一个shell环境中
          while IFS= read -r file; do
            echo "检查删除文件: $file"
            # 移除可能的引号
            file=$(echo "$file" | sed 's/^"//;s/"$//')
            # 解码转义序列，确保中文文件名能正确显示
            decoded_file=$(printf '%b' "$file")
            echo "解码后的文件路径: $decoded_file"
            
            # 安全检查文件路径
            if [[ "$decoded_file" == issues/* && "$decoded_file" == *.md ]]; then
              echo "🗑️ 检测到删除的md文件: $decoded_file"
              # 获取文件名（不含扩展名）
              FILENAME=$(basename "$decoded_file" .md)
              echo "🔍 提取文件名: $FILENAME"

              if [[ -f "source/_posts/${FILENAME}.md" ]]; then
                echo "🗑️ 删除精确匹配的文件: ${FILENAME}.md"
                git rm -f "source/_posts/${FILENAME}.md"
              fi
            # 获取文件名（不含扩展名）作为目录名
            FILE_BASE=$(basename "$FILENAME" .md)
            # 保留原始文件名，但替换不安全的字符为下划线
            FILE_DIR_NAME=$(echo "$FILE_BASE" | sed 's/[\/\?<>\\:\*\|":]/_/g')
            echo "👀 为文件创建图片目录: $FILE_DIR_NAME (源自: $FILE_BASE)"
            
            IMG_DIR="source/images/$FILE_DIR_NAME"
              if [[ -d "$IMG_DIR" ]]; then
                echo "🗑️ 删除对应的图片目录: $IMG_DIR"
                git rm -rf "$IMG_DIR"
              else
                echo "⚠️ 未找到相关的图片目录"
              fi
              
              # 保存到删除文件列表
              echo "$decoded_file" >> /tmp/deleted_md_files.txt
            fi
          done < /tmp/deleted_files_temp.txt
          
          # 如果删除文件列表存在，读取它
          if [[ -f "/tmp/deleted_md_files.txt" && -s "/tmp/deleted_md_files.txt" ]]; then
            echo "📂 删除的md文件列表已创建，包含以下文件:"
            cat "/tmp/deleted_md_files.txt"

            # 如果有文件被删除，立即提交并推送更改
            if git status --porcelain | grep -q "^D\|^A\|^M"; then
              echo "🚀 发现变更，立即提交删除操作..."
              git commit -m "🗑️ 删除博客文章和对应资源"
              
              echo "🚀 推送删除操作到GitHub..."
              # 拉取最新代码以避免冲突
              git pull --no-rebase
              git push || {
                echo "⚠️ 推送失败，尝试强制推送..."
                git push --force || echo "⚠️ 强制推送也失败，可能需要手动处理冲突"
              }
            fi
          else
            echo "📂 没有找到需要删除的md文件"
            touch "/tmp/deleted_md_files.txt"  # 确保文件存在，即使为空
          fi
          
          # 获取本次提交中新增或修改的文件
          echo "📋 获取新增或修改的文件..."
          # 先匹配A或M开头的行，再用sed提取文件名部分，保留完整文件名
          echo "$CHANGED_FILES" | grep -E "^[AM]" | sed -E 's/^[AM][[:space:]]+//' | while read -r file; do
            echo "检查新增/修改文件: $file"
            
            # 移除可能的引号
            file=$(echo "$file" | sed 's/^"//;s/"$//')
            # 解码转义序列，确保中文文件名能正确显示
            decoded_file=$(printf '%b' "$file")
            echo "解码后的文件路径: $decoded_file"
            
            # 安全检查文件路径
            if [[ "$decoded_file" == issues/* && "$decoded_file" == *.md ]]; then
              echo "📝 检测到新增或修改的md文件: $decoded_file"
              # 保存到修改文件列表
              echo "$decoded_file" >> /tmp/modified_md_files.txt
            fi
          done
          
          # 如果修改文件列表存在，读取它
          if [[ -f "/tmp/modified_md_files.txt" && -s "/tmp/modified_md_files.txt" ]]; then
            echo "📂 新增或修改的md文件列表："
            cat "/tmp/modified_md_files.txt"
          else
            echo "📂 没有找到需要新增或修改的md文件"
            touch "/tmp/modified_md_files.txt"  # 确保文件存在，即使为空
          fi
          
          # 如果没有需要处理的文件，则中止程序
          if [[ ! -s "/tmp/deleted_md_files.txt" && ! -s "/tmp/modified_md_files.txt" ]]; then
            echo "✅ 本次提交没有新增、修改或删除的md文件，中止程序"
            echo "HAS_MD_FILES=false" >> $GITHUB_ENV
            exit 0
          fi
          
          # 确保source/_posts目录存在
          if [[ ! -d "source/_posts" ]]; then
            echo "📁 创建source/_posts目录" 
            mkdir -p "source/_posts"
          fi
          
          # 将新增或修改的md文件写入文件列表 - 确保文件真实存在
          > /tmp/final_md_files.txt
          if [[ -f "/tmp/modified_md_files.txt" && -s "/tmp/modified_md_files.txt" ]]; then
            # 为了正确处理带空格的文件名路径，使用换行符作为分隔符逐行处理
            while IFS= read -r file; do
              if [[ -n "$file" && -f "$file" ]]; then
                echo "$file" >> /tmp/final_md_files.txt
                echo "✅ 确认文件存在: $file"
              elif [[ -n "$file" ]]; then
                echo "⚠️ 文件不存在，跳过: $file"
              fi
            done < "/tmp/modified_md_files.txt"
          else
            echo "📋 没有找到需要处理的文件列表或文件列表为空"
          fi
          
          # 检查最终文件列表是否为空
          if [[ ! -s "/tmp/final_md_files.txt" ]]; then
            echo "⚠️ 所有文件均不存在，中止程序"
            echo "HAS_MD_FILES=false" >> $GITHUB_ENV
            exit 0
          fi
          
          # 设置环境变量指向文件列表
          echo "ISSUES_FILES_LIST=/tmp/final_md_files.txt" >> $GITHUB_ENV
          echo "HAS_MD_FILES=true" >> $GITHUB_ENV
          echo "📂 本次将处理的md文件: $(cat /tmp/final_md_files.txt)"
          
          # 确保拉取最新代码
          echo "🔄 拉取最新的远程更改..."
          git pull --no-rebase
          echo "📋 拉取后的状态:"
          git status

      - name: 🖼️ 处理MD文件中的图片链接
        id: process_images
        if: env.HAS_MD_FILES == 'true'
        run: |
          # 在文件中替换图片链接的函数，避免直接使用perl正则替换
          replace_in_file() {
            local file="$1"
            local old_text="$2"
            local new_text="$3"
            
            # 创建临时文件
            local tmp_file=$(mktemp)
            
            # 处理可能包含正则表达式特殊字符的文本
            # 将需要替换的字符串作为普通文本处理而非正则表达式
            # 先给文件添加一个唯一的分隔符，避免与内容冲突
            local delim=$(date +%s%N)
            
            # 使用 perl 代替 awk，perl 对特殊字符处理更可靠
            perl -e '
              # 从命令行获取参数
              $file = $ARGV[0];
              $old = $ARGV[1];
              $new = $ARGV[2];
              
              # 读取整个文件到变量中
              open(my $fh, "<", $file) or die "无法打开文件 $file: $!";
              local $/;  # 启用整个文件读取模式
              $content = <$fh>;
              close($fh);
              
              # 执行文字替换（非正则表达式）
              # quotemeta 会转义所有特殊字符
              my $count = ($content =~ s/\Q$old\E/$new/g);
              
              # 输出替换后的内容
              print $content;
              
              # 报告替换次数
              warn "✅ 替换完成: 替换了 $count 处匹配项\n";
            ' "$file" "$old_text" "$new_text" > "$tmp_file"
            
            # 检查perl命令是否成功执行
            if [ $? -eq 0 ]; then
              # 将临时文件内容移回原文件
              cat "$tmp_file" > "$file"
              echo "✅ 替换完成: '$old_text' -> '$new_text'"
            else
              echo "❌ 替换失败，保留原始文件"
            fi
            
            # 清理临时文件
            rm -f "$tmp_file"
          }
          
          # 处理每个需要更新的Markdown文件
          while IFS= read -r FILE; do
            echo "🔍 处理文件：$FILE"
            
            # 获取文件名（不含扩展名）作为目录名
            FILE_BASE=$(basename "$FILE" .md)
            # 保留原始文件名，但替换不安全的字符为下划线
            FILE_DIR_NAME=$(echo "$FILE_BASE" | sed 's/[\/\?<>\\:\*\|":]/_/g')
            echo "👀 为文件创建图片目录: $FILE_DIR_NAME (源自: $FILE_BASE)"
            
            # 创建/清空图片目录 - 实现全量更新
            IMG_DIR="source/images/$FILE_DIR_NAME"
            if [[ -d "$IMG_DIR" ]]; then
              echo "🧹 清空现有图片目录，准备全量更新: $IMG_DIR"
              rm -rf "${IMG_DIR:?}"/*
            fi
            
            # 确保图片目录存在
            mkdir -p "$IMG_DIR"
            
            echo "📂 此文件的图片将保存在目录: $IMG_DIR (独立于其他MD文件)"
            
            # 创建临时文件
            TMP_FILE=$(mktemp)
            echo "👀 临时文件路径: $TMP_FILE"
            
            # 复制原始文件内容到临时文件
            cp "$FILE" "$TMP_FILE"
            echo "👀 原始文件大小: $(wc -c < "$FILE") 字节"
            
            # 使用正则表达式查找所有图片链接
            echo "👀 开始查找所有图片链接..."
            ALL_IMAGES=$(grep -oE '!\[[^]]*\]\([^)]+\)|!\[\]\([^)]+\)' "$FILE" || echo "")
            
            echo "👀 找到图片链接数量: $(echo "$ALL_IMAGES" | grep -c '^' || echo 0)"
            
            # 分离GitHub链接和其他链接
            GITHUB_IMAGES=$(echo "$ALL_IMAGES" | grep 'github.com\|githubusercontent.com' || echo "")
            OTHER_IMAGES=$(echo "$ALL_IMAGES" | grep -v 'github.com\|githubusercontent.com' || echo "")
            
            echo "👀 GitHub图片链接数: $(echo "$GITHUB_IMAGES" | grep -c '^' || echo 0)"
            echo "👀 其他图片链接数: $(echo "$OTHER_IMAGES" | grep -c '^' || echo 0)"
            
            # 处理已有的GitHub链接 - 下载到本地
            if [[ -n "$GITHUB_IMAGES" ]]; then
              echo "🖼️ 处理已有的GitHub图片链接..."
              
              echo "$GITHUB_IMAGES" | while read -r IMG_LINK; do
                echo "👀 处理GitHub图片链接: $IMG_LINK"
                
                # 提取链接部分
                IMG_URL=$(echo "$IMG_LINK" | grep -oE 'https://[^)]+')
                
                if [[ -n "$IMG_URL" ]]; then
                  echo "📥 下载GitHub图片: $IMG_URL"
                  
                  # 获取文件名
                  IMG_FILENAME=$(basename "$IMG_URL")
                  
                  # 创建临时图片文件
                  IMG_TMP=$(mktemp)
                  
                  # 下载图片
                  curl -L "$IMG_URL" -o "$IMG_TMP"
                  
                  if [[ -f "$IMG_TMP" && -s "$IMG_TMP" ]]; then
                    # 复制到图片目录
                    cp "$IMG_TMP" "$IMG_DIR/$IMG_FILENAME"
                    echo "👀 保存GitHub图片到: $IMG_DIR/$IMG_FILENAME"
                    
                    # 创建新的相对路径链接
                    NEW_IMG_URL="/images/$FILE_DIR_NAME/$IMG_FILENAME"
                    
                    # 创建新的图片Markdown链接
                    if [[ "$IMG_LINK" =~ !\[\] ]]; then
                      NEW_IMG_LINK="![Image]($NEW_IMG_URL)"
                    else
                      ALT_TEXT=$(echo "$IMG_LINK" | sed -E 's/!\[([^]]*)\].*/\1/')
                      NEW_IMG_LINK="![$ALT_TEXT]($NEW_IMG_URL)"
                    fi
                    
                    # 替换原始链接
                    replace_in_file "$TMP_FILE" "$IMG_LINK" "$NEW_IMG_LINK"
                    echo "👀 替换图片链接: $IMG_LINK -> $NEW_IMG_LINK"
                  else
                    echo "❌ GitHub图片下载失败，保留原始链接"
                  fi
                  
                  # 删除临时图片文件
                  rm -f "$IMG_TMP"
                else
                  echo "⚠️ 无法从GitHub链接提取URL: $IMG_LINK"
                fi
              done
            fi
            
            # 处理其他图片链接（外部链接、相对路径等）
            if [[ -n "$OTHER_IMAGES" ]]; then
              echo "🖼️ 处理其他图片链接..."
              
              echo "$OTHER_IMAGES" | while read -r IMG_LINK; do
                echo "👀 处理图片链接: $IMG_LINK"
                
                # 提取图片URL部分
                URL_PART=$(echo "$IMG_LINK" | sed -E 's/!\[[^]]*\]\(([^)]+)\)/\1/')
                
                # 判断链接类型
                if [[ "$URL_PART" =~ ^http[s]?:// ]]; then
                  # 类型1: 外部HTTP链接
                  echo "🌐 检测到外部HTTP链接: $URL_PART"
                  
                  # 创建临时图片文件
                  IMG_TMP=$(mktemp)
                  echo "👀 临时图片文件: $IMG_TMP"
                  
                  # 尝试下载图片，添加一些额外的HTTP头
                  echo "👀 尝试下载图片..."
                  
                  # 将URL保存到临时文件，避免命令行长度和特殊字符问题
                  URL_FILE=$(mktemp)
                  echo "$URL_PART" > "$URL_FILE"
                  
                  # 使用wget替代curl，更好地处理复杂URL
                  # 添加--content-disposition允许保存文件，添加--trust-server-names接受服务器的文件名
                  wget -q -O "$IMG_TMP" --user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36" \
                    --header="Accept: image/webp,image/apng,image/*,*/*;q=0.8" \
                    --header="Accept-Language: en-US,en;q=0.9" \
                    --tries=3 --timeout=30 \
                    "$(cat "$URL_FILE")" || {
                    
                    # 如果wget失败，尝试使用curl，但使用@文件语法读取URL
                    echo "⚠️ wget下载失败，尝试使用curl下载..."
                    curl -L -s -o "$IMG_TMP" \
                      -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36" \
                      -H "Accept: image/webp,image/apng,image/*,*/*;q=0.8" \
                      -H "Accept-Language: en-US,en;q=0.9" \
                      "@$URL_FILE" || echo "❌ 下载失败: 无法下载图片"
                  }
                  
                  # 清理URL临时文件
                  rm -f "$URL_FILE"
                  
                  if [[ -f "$IMG_TMP" && -s "$IMG_TMP" ]]; then
                    echo "👀 图片下载成功，文件大小: $(wc -c < "$IMG_TMP") 字节"
                    
                    # 确定图片类型和扩展名
                    MIME_TYPE=$(file -b --mime-type "$IMG_TMP" || echo "image/jpeg")
                    echo "👀 MIME类型: $MIME_TYPE"
                    
                    # 为上传的图片生成一个唯一名称
                    FILE_HASH=$(md5sum "$IMG_TMP" | cut -d ' ' -f 1)
                    FILENAME="img_${FILE_HASH:0:10}"
                    
                    case "$MIME_TYPE" in
                      image/jpeg)
                        EXT=".jpg"
                        ;;
                      image/png)
                        EXT=".png"
                        ;;
                      image/gif)
                        EXT=".gif"
                        ;;
                      image/webp)
                        EXT=".webp"
                        ;;
                      *)
                        EXT=".jpg"  # 默认扩展名
                        ;;
                    esac
                    
                    FILENAME="${FILENAME}${EXT}"
                    echo "👀 生成文件名: $FILENAME"
                    
                    # 将图片存入该文件专属的目录
                    IMAGE_PATH="$IMG_DIR/$FILENAME"
                    cp "$IMG_TMP" "$IMAGE_PATH"
                    echo "👀 复制图片到: $IMAGE_PATH"
                    
                    # 添加图片到Git
                    echo "👀 添加图片到Git..."
                    git add "$IMAGE_PATH"
                    
                    # 创建相对路径链接
                    NEW_IMG_URL="/images/$FILE_DIR_NAME/$FILENAME"
                    
                    # 创建新的图片Markdown语法
                    if [[ "$IMG_LINK" =~ !\[\] ]]; then
                      NEW_IMG_LINK="![Image]($NEW_IMG_URL)"
                    else
                      # 提取原始Alt Text
                      ALT_TEXT=$(echo "$IMG_LINK" | sed -E 's/!\[([^]]*)\].*/\1/')
                      NEW_IMG_LINK="![$ALT_TEXT]($NEW_IMG_URL)"
                    fi
                    
                    echo "👀 新的图片链接: $NEW_IMG_LINK"
                    
                    # 替换文件内容
                    replace_in_file "$TMP_FILE" "$IMG_LINK" "$NEW_IMG_LINK"
                    echo "👀 替换图片链接: $IMG_LINK -> $NEW_IMG_LINK"
                    
                    echo "👀 替换后的文件大小: $(wc -c < "$TMP_FILE") 字节"
                  else
                    echo "❌ 图片下载失败或文件为空，保留原始链接"
                  fi
                  
                  # 删除临时图片文件
                  rm -f "$IMG_TMP"
                  
                elif [[ "$URL_PART" =~ ^/ ]]; then
                  # 相对路径，保持原样
                  echo "🔄 检测到相对路径: $URL_PART，保持原样"
                else
                  # 其他类型链接，保持原样
                  echo "⚠️ 无法解析的链接，保持原样: $URL_PART"
                fi
              done
            else
              echo "ℹ️ 没有找到图片链接"
            fi
            
            # 从文件中提取Hexo博客元数据
            # 默认使用文件名作为标题
            POST_TITLE=$(basename "$FILE" .md)
            CURRENT_TIME=$(date "+%Y-%m-%d %H:%M:%S")
            
            # 提取自定义元数据
            CUSTOM_TITLE=$(grep -E '^POST_TITLE:' "$FILE" | sed 's/^POST_TITLE:[[:space:]]*//' || echo "")
            CUSTOM_CATEGORIES=$(grep -E '^POST_CATEGORIES:' "$FILE" | sed 's/^POST_CATEGORIES:[[:space:]]*//' || echo "")
            CUSTOM_TAGS=$(grep -E '^POST_TAGS:' "$FILE" | sed 's/^POST_TAGS:[[:space:]]*//' || echo "")
            CUSTOM_STICKY=$(grep -E '^POST_STICKY:' "$FILE" | sed 's/^POST_STICKY:[[:space:]]*//' || echo "")
            CUSTOM_COVER=$(grep -E '^POST_COVER:' "$FILE" | sed 's/^POST_COVER:[[:space:]]*//' || echo "")
            
            # 如果没有自定义标题，使用文件名
            if [[ -z "$CUSTOM_TITLE" ]]; then
                CUSTOM_TITLE="$POST_TITLE"
            fi
            
            # 尝试从现有博客文章中提取日期信息
            EXISTING_POST_PATH="source/_posts/${POST_TITLE}.md"
            if [[ -f "$EXISTING_POST_PATH" ]]; then
                # 从现有文章提取date字段
                EXISTING_DATE=$(grep -E '^date:' "$EXISTING_POST_PATH" | sed 's/^date:[[:space:]]*//' || echo "")
                if [[ -n "$EXISTING_DATE" ]]; then
                    POST_DATE="$EXISTING_DATE"
                    echo "📅 从现有文章提取日期: $POST_DATE"
                else
                    POST_DATE="$CURRENT_TIME"
                    echo "📅 未找到现有日期，使用当前时间: $POST_DATE"
                fi
            else
                POST_DATE="$CURRENT_TIME"
                echo "📅 新文章，使用当前时间作为创建日期: $POST_DATE"
            fi
            
            # 如果没有自定义封面，且文章中有图片，随机选择一张作为封面
            if [[ -z "$CUSTOM_COVER" ]]; then
                # 查找文章中的图片文件
                IMAGE_FILES=$(find "$IMG_DIR" -type f -name "*.jpg" -o -name "*.png" -o -name "*.gif" -o -name "*.webp" 2>/dev/null)
                if [[ -n "$IMAGE_FILES" ]]; then
                    # 随机选择一张图片
                    RANDOM_IMAGE=$(echo "$IMAGE_FILES" | shuf -n 1)
                    if [[ -n "$RANDOM_IMAGE" ]]; then
                        # 正确处理路径，确保格式为/images/...
                        # 移除完整路径，只保留/images/部分开始的路径
                        RANDOM_IMAGE_PATH="/images/$(basename "$(dirname "$RANDOM_IMAGE")")/$(basename "$RANDOM_IMAGE")"
                        CUSTOM_COVER="$RANDOM_IMAGE_PATH"
                        echo "🖼️ 自动选择图片作为封面: $CUSTOM_COVER"
                    fi
                fi
            fi
            
            # 清理字段值：去除首尾空格，替换中文逗号为英文逗号
            CUSTOM_TITLE=$(echo "$CUSTOM_TITLE" | xargs | sed 's/，/,/g')
            CUSTOM_CATEGORIES=$(echo "$CUSTOM_CATEGORIES" | xargs | sed 's/，/,/g')
            CUSTOM_TAGS=$(echo "$CUSTOM_TAGS" | xargs | sed 's/，/,/g')
            CUSTOM_STICKY=$(echo "$CUSTOM_STICKY" | xargs)
            CUSTOM_COVER=$(echo "$CUSTOM_COVER" | xargs)
            
            # 构建Hexo文章
            echo "---" > "source/_posts/${POST_TITLE}.md"
            echo "title: \"${CUSTOM_TITLE}\"" >> "source/_posts/${POST_TITLE}.md"
            echo "date: ${POST_DATE}" >> "source/_posts/${POST_TITLE}.md"
            echo "updated: \"${CURRENT_TIME}\"" >> "source/_posts/${POST_TITLE}.md"
            
            # 只有在sticky有值且不为空时才添加
            if [[ -n "$CUSTOM_STICKY" && "$CUSTOM_STICKY" != "null" && "$CUSTOM_STICKY" != "undefined" ]]; then
                echo "sticky: \"${CUSTOM_STICKY}\"" >> "source/_posts/${POST_TITLE}.md"
            fi
            
            # 只有在cover有值且不为空时才添加
            if [[ -n "$CUSTOM_COVER" && "$CUSTOM_COVER" != "null" && "$CUSTOM_COVER" != "undefined" ]]; then
                echo "cover: \"${CUSTOM_COVER}\"" >> "source/_posts/${POST_TITLE}.md"
            fi
            
            # 处理分类
            if [[ -n "$CUSTOM_CATEGORIES" ]]; then
                echo "categories:" >> "source/_posts/${POST_TITLE}.md"
                IFS=',' read -ra CATEGORY_ARRAY <<< "$CUSTOM_CATEGORIES"
                for category in "${CATEGORY_ARRAY[@]}"; do
                    CATEGORY_TRIM=$(echo "$category" | xargs)
                    echo "  - \"${CATEGORY_TRIM}\"" >> "source/_posts/${POST_TITLE}.md"
                done
            fi
            
            # 处理标签
            if [[ -n "$CUSTOM_TAGS" ]]; then
                echo "tags:" >> "source/_posts/${POST_TITLE}.md"
                IFS=',' read -ra TAG_ARRAY <<< "$CUSTOM_TAGS"
                for tag in "${TAG_ARRAY[@]}"; do
                    TAG_TRIM=$(echo "$tag" | xargs)
                    echo "  - \"${TAG_TRIM}\"" >> "source/_posts/${POST_TITLE}.md"
                done
            fi
            
            echo "---" >> "source/_posts/${POST_TITLE}.md"
            
            # 添加文章内容（跳过元数据行）
            awk '!/^(POST_TITLE:|POST_CATEGORIES:|POST_TAGS:|POST_STICKY:|POST_COVER:)/' "$TMP_FILE" >> "source/_posts/${POST_TITLE}.md"
            echo "✅ 创建博客文章: source/_posts/${POST_TITLE}.md"
            
            # 添加文章到Git
            git add "source/_posts/${POST_TITLE}.md"
            
            # 删除临时文件
            rm -f "$TMP_FILE"
          done < "${{ env.ISSUES_FILES_LIST }}"
          
          # 提交更改
          if git status --porcelain | grep -q "source/"; then
            echo "🚀 提交博客文章更改..."
            git commit -m "📝 更新博客文章和图片资源"
            
            echo "🚀 准备推送到GitHub..."
            # 在推送前拉取最新代码
            echo "🔄 推送前再次拉取最新更改..."
            git pull --no-rebase
            
            echo "🚀 推送到GitHub..."
            git push || {
              echo "⚠️ 推送失败，尝试强制推送..."
              git push --force || echo "⚠️ 强制推送也失败，可能需要手动处理冲突"
            }
          else
            echo "ℹ️ 没有博客文章需要更新"
          fi

      - name: 📋 总结处理结果
        run: |
          echo "✅ 所有操作完成!"
          echo "✅ issues目录中的Markdown文件已同步到source/_posts目录"
          echo "✅ 图片已处理并保存到source/images目录"
          echo "✅ 更改已提交到Git仓库" 
```

# anzhiyu主题使用

## 下载anzhiyu主题

```
git clone -b main https://github.com/anzhiyu-c/hexo-theme-anzhiyu.git themes/anzhiyu
```

**注意：这个是在你的hexo的目录里面执行**

![](http://www.kdocs.cn/api/v3/office/copy/MWpYNWluNVhYeUhRV3ZZaFljQk5VZWdSZy9CT25KSGx6Rm94T25vSkRBVTNIUUN2YTJUUkRjZUZ3OE9DTVVjUHkyZlFCeFJFQ0lVQUlHU2Q4MDIwb01FTkgxT2FwK1JObnUxbUNOTzZiZDNPZml6YTJSNGwwWGVEbFRTd0l4dXdNdmVkVGV4YWpYUFJQWVAwOEQ2dU5pSUxWZlZ2TG5wdzJGR1pBeVNLallQaUd3UkxPVm9zbWZMeFVCS3JGc0dpcC82Mmd3NUxnOGQvelBTMlo2Q1VZa2NRTGdHVnZFVFdLdG5pK1NxRFJvbEgvNmpFK0lFd0lJZEd5VTQxaUI3QmJQTm5iVHFrT0pnPQ==/attach/object/KXVSLKQ7AAAH4?)

**下载一些必须的插件**

```
npm install hexo-renderer-pug hexo-renderer-stylus --save
```

## 删除anzhiyu的git，否则VS会自动使用anzhiyu的git

![](http://www.kdocs.cn/api/v3/office/copy/MWpYNWluNVhYeUhRV3ZZaFljQk5VZWdSZy9CT25KSGx6Rm94T25vSkRBVTNIUUN2YTJUUkRjZUZ3OE9DTVVjUHkyZlFCeFJFQ0lVQUlHU2Q4MDIwb01FTkgxT2FwK1JObnUxbUNOTzZiZDNPZml6YTJSNGwwWGVEbFRTd0l4dXdNdmVkVGV4YWpYUFJQWVAwOEQ2dU5pSUxWZlZ2TG5wdzJGR1pBeVNLallQaUd3UkxPVm9zbWZMeFVCS3JGc0dpcC82Mmd3NUxnOGQvelBTMlo2Q1VZa2NRTGdHVnZFVFdLdG5pK1NxRFJvbEgvNmpFK0lFd0lJZEd5VTQxaUI3QmJQTm5iVHFrT0pnPQ==/attach/object/DNKSPKQ7AAAHY?)

## 把anzhiyu的主题文件复制换个名字放到hexo的目录下

![](http://www.kdocs.cn/api/v3/office/copy/MWpYNWluNVhYeUhRV3ZZaFljQk5VZWdSZy9CT25KSGx6Rm94T25vSkRBVTNIUUN2YTJUUkRjZUZ3OE9DTVVjUHkyZlFCeFJFQ0lVQUlHU2Q4MDIwb01FTkgxT2FwK1JObnUxbUNOTzZiZDNPZml6YTJSNGwwWGVEbFRTd0l4dXdNdmVkVGV4YWpYUFJQWVAwOEQ2dU5pSUxWZlZ2TG5wdzJGR1pBeVNLallQaUd3UkxPVm9zbWZMeFVCS3JGc0dpcC82Mmd3NUxnOGQvelBTMlo2Q1VZa2NRTGdHVnZFVFdLdG5pK1NxRFJvbEgvNmpFK0lFd0lJZEd5VTQxaUI3QmJQTm5iVHFrT0pnPQ==/attach/object/6SMCVKQ7ADAGG?)

## 把hexo的`_config.yml`里面设置为使用`_config.anzhiyu.yml`

> 不介意的直接使用我的_config.anzhiyu.yml，里面百分之80都已经自定义完成了

----------

> **我已经把我的相关内容给置换，需要的小伙伴直接把下面的内容换成自己的就可以用了**  
> 博客域名：blog.xxx.com  
> 博客网站名：我的博客网站名  
> 博客头像：https://avatars.githubusercontent.com/u/41733240?v=4  
> default_cover：这个属性里的图片需要自己添加

```
menu:
  文章:
    时间流: /archives/ || anzhiyu-icon-box-archive
    分类: /categories/ || anzhiyu-icon-shapes
    标签: /tags/ || anzhiyu-icon-tags

  友链:
    我的Gmeek博客: https://blog.xxx.com/ || anzhiyu-icon-link
    留言板: /comments/ || anzhiyu-icon-envelope

  关于:
    关于本人: /about/ || anzhiyu-icon-paper-plane
    随便逛逛: javascript:toRandomPost() || anzhiyu-icon-shoe-prints1

# nav相关配置
nav:
  enable: false
  travelling: false
  clock: false
  menu:
    - title: 网页
      item:
        - name: 博客
          link: https://blog.anheyu.com/
          icon: /img/favicon.ico

# mourn （哀悼日，指定日期网站简单变灰，不包括滚动条）
# 注意： 仅网站首页变灰，其他页面正常显示
mourn:
  enable: false
  days: [4-5, 5-12, 7-7, 9-18, 12-13]

# Code Blocks (代码相关)
# --------------------------------------

highlight_theme: mac #  darker / pale nighhighlight_copy / light / ocean / mac / mac light / false
highlight_copy: true # copy button
highlight_lang: true # show the code language
highlight_shrink: false # true: shrink the code blocks / false: expand the code blocks | none: expand code blocks and hide the button
highlight_height_limit: 330 # unit: px
code_word_wrap: false

# copy settings
# copyright: Add the copyright information after copied content (複制的内容后面加上版权信息)
# copy: enable 复制后弹窗提示版权信息
copy:
  enable: true
  copyright:
    enable: false
    limit_count: 50

# social settings (社交图标设置)
# formal:
#   name: link || icon
social:
  Github: https://github.com/MyMaskKing || anzhiyu-icon-github
  # BiliBili: https://space.bilibili.com/372204786 || anzhiyu-icon-bilibili

# 作者卡片 状态
author_status:
  enable: true
  # 可以是任何图片，建议放表情包或者emoji图片，效果都很好，[表情包速查](https://emotion.xiaokang.me/)
  statusImg: "https://bu.dusays.com/2023/08/24/64e6ce9c507bb.png"
  skills:
    - 🤖️ 数码科技爱好者
    - 🔍 分享与热心帮助
    - 🏠 在家办公小能手
    - 🔨 设计开发一条龙
    - 🤝 专修交互与设计
    - 🏃 脚踏实地行动派
    - 🧱 团队小组发动机
    - 💢 即将失业程序猿一枚

# search (搜索)
# see https://blog.anheyu.com/posts/c27d.html#搜索系统
# --------------------------------------

# Algolia search
algolia_search:
  enable: false
  hits:
    per_page: 6
  tags:
    # - 前端
    # - Hexo

# Docsearch
# Apply and Option Docs: see https://docsearch.algolia.com/
# Crawler Admin Console: see https://crawler.algolia.com/
# Settings: https://www.algolia.com/
docsearch:
  enable: false
  appId: # see email
  apiKey: # see email
  indexName: # see email
  option:

# Local search
local_search:
  enable: true
  preload: true
  CDN:

# Math (数学)
# --------------------------------------
# About the per_page
# if you set it to true, it will load mathjax/katex script in each page (true 表示每一页都加载js)
# if you set it to false, it will load mathjax/katex script according to your setting (add the 'mathjax: true' in page's front-matter)
# (false 需要时加载，须在使用的 Markdown Front-matter 加上 mathjax: true)

# MathJax
mathjax:
  enable: false
  per_page: false

# KaTeX
katex:
  enable: false
  per_page: false
  hide_scrollbar: true

# Image (图片设置)
# --------------------------------------

# Favicon（网站图标）
favicon: https://avatars.githubusercontent.com/u/41733240?v=4

# Avatar (头像)
avatar:
  img: https://avatars.githubusercontent.com/u/41733240?v=4
  effect: true

# Disable all banner image(是否禁用所有首页顶部图片，true为禁用，false为不禁用)
disable_top_img: false

# The banner image of home page（只禁用首页顶部图片，其他页面顶部图片仍然显示）
index_img: false

# If the banner of page not setting, it will show the top_img
default_top_img: "background: linear-gradient(45deg, rgba(16, 30, 67, 0.7) 0%, rgba(52, 82, 255, 0.7) 30%, rgba(243, 54, 142, 0.7) 70%, rgba(255, 107, 69, 0.7) 100%), url('/img/other/background.jpg') center / cover no-repeat"

# 设置文章的默认封面，使页面更丰富
cover:
  # display the cover or not (是否显示文章封面)
  index_enable: true
  aside_enable: true
  archives_enable: true
  # the position of cover in home page (封面显示的位置)
  # left/right/both
  position: left
  # When cover is not set, the default cover is displayed (当没有设置cover时，默认的封面显示)
  default_cover:
    - /img/blog_cover/cover1.jpg
    - /img/blog_cover/cover2.jpg
    - /img/blog_cover/cover3.jpg
    - /img/blog_cover/cover4.jpg
    - /img/blog_cover/cover5.jpg
    - /img/blog_cover/cover6.jpg

# Replace Broken Images (替换无法显示的图片)
error_img:
  flink: /img/friend_404.gif
  post_page: /img/404.jpg

# A simple 404 page
error_404:
  enable: true
  subtitle: "请尝试站内搜索寻找文章"
  background: https://bu.dusays.com/2023/05/08/645907596997d.gif

post_meta:
  page: # Home Page
    date_type: created # created or updated or both 主页文章日期是创建日或者更新日或都显示
    date_format: simple # date/relative/simple 显示日期还是相对日期 或者 简单日期
    categories: true # true or false 主页是否显示分类
    tags: true # true or false 主页是否显示标籤
    label: false # true or false 显示描述性文字
  post:
    date_type: both # created or updated or both 文章页日期是创建日或者更新日或都显示
    date_format: date # date/relative 显示日期还是相对日期
    categories: true # true or false 文章页是否显示分类
    tags: true # true or false 文章页是否显示标籤
    label: true # true or false 显示描述性文字
    unread: false # true or false 文章未读功能

# 主色调相关配置
mainTone:
  enable: true # true or false 文章是否启用获取图片主色调
  mode: both # cdn/api/both cdn模式为图片url+imageAve参数获取主色调，api模式为请求API获取主色调，both模式会先请求cdn参数，无法获取的情况下将请求API获取，可以在文章内配置main_color: '#3e5658'，使用十六进制颜色，则不会请求both/cdn/api获取主色调，而是直接使用配置的颜色
  # 项目地址：https://github.com/anzhiyu-c/img2color-go
  api: https://img2color-go.vercel.app/api?img= # mode为api时可填写
  cover_change: true # 整篇文章跟随cover修改主色调

# wordcount (字数统计)
# see https://blog.anheyu.com/posts/c27d.html#字数统计
wordcount:
  enable: true
  post_wordcount: true
  min2read: true
  total_wordcount: true

# Display the article introduction on homepage
# 1: description
# 2: both (if the description exists, it will show description, or show the auto_excerpt)
# 3: auto_excerpt (default)
# false: do not show the article introduction
index_post_content:
  method: 3
  length: 500 # if you set method to 2 or 3, the length need to config

# anchor
# when you scroll in post, the URL will update according to header id.
anchor: false

# Post
# --------------------------------------

# toc (目录)
toc:
  post: true
  page: false
  number: true
  expand: true
  style_simple: false # for post

post_copyright:
  enable: true
  decode: false
  author_href:
  location: false
  license: CC BY-NC-SA 4.0
  license_url: https://creativecommons.org/licenses/by-nc-sa/4.0/
  avatarSinks: false # hover时头像下沉
  copyright_author_img_back:
  copyright_author_img_front:
  copyright_author_link: /

# Sponsor/reward
reward:
  enable: false
  QR_code:
    - img: https://npm.elemecdn.com/anzhiyu-blog@1.1.6/img/post/common/qrcode-weichat.png
      link:
      text: 微信
    - img: https://npm.elemecdn.com/anzhiyu-blog@1.1.6/img/post/common/qrcode-alipay.png
      link:
      text: 支付宝

# Post edit
# Easily browse and edit blog source code online.
post_edit: # 目前仅可选择一个平台在线编辑
  enable: false
  # github: https://github.com/user-name/repo-name/edit/branch-name/subdirectory-name/
  # For example: https://github.com/jerryc127/butterfly.js.org/edit/main/source/
  github: false

  # yuque: https://www.yuque.com/user-name/repo-name/
  # 示例: https://www.yuque.com/yuque/yuque/
  # 你需要在语雀文章 Front Matter 添加参数 id 并确保其唯一性（例如 "id: yuque", "id: 01"）
  yuque: false

# Related Articles
related_post:
  enable: true
  limit: 6 # Number of posts displayed
  date_type: created # or created or updated 文章日期显示创建日或者更新日

# figcaption (图片描述文字)
photofigcaption: false

# post_pagination (分页)
# value: 1 || 2 || 3 || 4 || false
# 1: The 'next post' will link to old post
# 2: The 'next post' will link to new post
# 3: 只有下一篇，并且只在文章滚动到评论区时显示下一篇文章(旧文章)
# 4: 只有下一篇，并且只在文章滚动到评论区时显示下一篇文章(旧文章) 显示图片cover
# false: disable pagination
post_pagination: 2

# Displays outdated notice for a post (文章过期提醒)
noticeOutdate:
  enable: true
  style: flat # style: simple/flat
  limit_day: 365 # When will it be shown
  position: top # position: top/bottom
  message_prev: It has been
  message_next: 时过境迁，这篇文章是一年前的文章了，内容可能已经过时，请谨慎参考🥰。

# Share System (分享功能)
# --------------------------------------

# Share.js
# https://github.com/overtrue/share.js
sharejs:
  enable: true
  sites: facebook,twitter,wechat,weibo,qq

# AddToAny
# https://www.addtoany.com/
addtoany:
  enable: false
  item: facebook,twitter,wechat,sina_weibo,email,copy_link

# Comments System
# --------------------------------------

comments:
  # Up to two comments system, the first will be shown as default
  # Choose: Valine/Waline/Twikoo/Artalk/Gitalk
  use: Giscus # Twikoo/Waline/Gitalk
  text: true # Display the comment name next to the button
  # lazyload: The comment system will be load when comment element enters the browser's viewport.
  # If you set it to true, the comment count will be invalid
  lazyload: false
  count: false # Display comment count in post's top_img
  card_post_count: false # Display comment count in Home Page

# giscus
# https://giscus.app/
giscus:
  repo: MyMaskKing/hexo-blog-comments # GitHub repository name
  repo_id: R_kgDOOd_riA # GitHub repository id，从Giscus网站获取
  category_id: DIC_kwDOOd_riM4CpW8o # GitHub repository category id，从Giscus网站获取
  theme:
    light: light
    dark: dark
  option: # options
    data-lang: zh-CN
    data-mapping: pathname # 使用页面路径作为讨论定位依据，避免中文URL问题
    data-reactions-enabled: 1 # 是否启用reactions
    data-emit-metadata: 0
    data-input-position: bottom # 评论框位置
    data-category: Announcements # 确保分类正确传递

# valine
# https://valine.js.org
valine:
  appId: xxxxx # leancloud application app id
  appKey: xxxxx # leancloud application app key
  pageSize: 10 # comment list page size
  avatar: mp # gravatar style https://valine.js.org/#/avatar
  lang: zh-CN # i18n: zh-CN/zh-TW/en/ja
  placeholder: 填写QQ邮箱就会使用QQ头像喔~. # valine comment input placeholder (like: Please leave your footprints)
  guest_info: nick,mail,link # valine comment header info (nick/mail/link)
  recordIP: false # Record reviewer IP
  serverURLs: # This configuration is suitable for domestic custom domain name users, overseas version will be automatically detected (no need to manually fill in)
  bg: /img/comment_bg.png # valine background
  emojiCDN: //i0.hdslb.com/bfs/emote/ # emoji CDN
  enableQQ: true # enable the Nickname box to automatically get QQ Nickname and QQ Avatar
  requiredFields: nick,mail # required fields (nick/mail)
  visitor: false
  master:
    - xxxxx
  friends:
    - xxxxxx
  tagMeta: "博主,小伙伴,访客"
  option:

# waline - A simple comment system with backend support fork from Valine
# https://waline.js.org/
waline:
  serverURL: # Waline server address url
  bg: # Waline background
  pageview: false
  meta_css: false # 是否引入 waline-meta.css ,以便显示 meta图标
  imageUploader: true # 配置为 > 换行后可自定义图片上传逻辑，示例: https://waline.js.org/cookbook/customize/upload-image.html#案例
  # 以下为可选配置，后续若有新增/修改配置参数可在此自行添加/修改
  option:

# Twikoo
# https://github.com/imaegoo/twikoo
twikoo:
  envId: # 填写您的环境ID，例如：https://my-blog-comments.vercel.app (Vercel部署) 或 https://xxx.ap-shanghai.function.tencent.com/twikoo (腾讯云部署)
  region: # 如果使用腾讯云，需要填写区域，例如ap-shanghai，使用Vercel则留空
  visitor: true # 是否开启访问量统计
  option:
    path: location.pathname # 评论区跟随路径变化

# Artalk
# https://artalk.js.org/guide/frontend/config.html
artalk:
  server:
  site:
  visitor: false
  option:

# Chat Services
# --------------------------------------

# Chat Button [recommend]
# It will create a button in the bottom right corner of website, and hide the origin button
chat_btn: false

# The origin chat button is displayed when scrolling up, and the button is hidden when scrolling down
chat_hide_show: false

# chatra
# https://chatra.io/
chatra:
  enable: false
  id:

# tidio
# https://www.tidio.com/
tidio:
  enable: false
  public_key:

# daovoice
# http://daovoice.io/
daovoice:
  enable: false
  app_id:

# crisp
# https://crisp.chat/en/
crisp:
  enable: false
  website_id:

# Footer Settings
# --------------------------------------
footer:
  owner:
    enable: true
    since: 2025
  custom_text: '<span style="font-size: smaller;">📢叮咚叮咚~加油努力~🥰🥰🥰👥<a target="_blank" rel="noopener" href="https://liveuser.030101.xyz/" style="text-decoration: none; color: inherit;">当前在线人数:<span id="liveuser" >加载中...</span></a></span>'
  runtime:
    enable: false
    launch_time: 04/01/2025 00:00:00 # 网站上线时间
    # work_img: https://avatars.githubusercontent.com/u/41733240?v=4
    # work_description: 距离月入25k也就还差一个大佬带我~
    offduty_img: https://npm.elemecdn.com/anzhiyu-blog@2.0.4/img/badge/安知鱼-下班啦.svg
    offduty_description: 下班了就该开开心心的玩耍，嘿嘿~
  # 徽标部分配置项 https://shields.io/
  # https://img.shields.io/badge/CDN-jsDelivr-orange?style=flat&logo=jsDelivr
  bdageitem:
    enable: true
    list:
      - link: https://hexo.io/ #徽标指向网站链接
        shields: https://npm.elemecdn.com/anzhiyu-blog@2.1.5/img/badge/Frame-Hexo.svg #徽标API
        message: 博客框架为Hexo_v5.4.0 #徽标提示语
      - link: https://blog.anheyu.com/
        shields: https://npm.elemecdn.com/anzhiyu-theme-static@1.0.9/img/Theme-AnZhiYu-2E67D3.svg
        message: 本站使用AnZhiYu主题
      # - link: https://www.dogecloud.com/
      #   shields: https://npm.elemecdn.com/anzhiyu-blog@2.2.0/img/badge/CDN-多吉云-3693F3.svg
      #   message: 本站使用多吉云为静态资源提供CDN加速
      # - link: https://github.com/
      #   shields: https://npm.elemecdn.com/anzhiyu-blog@2.1.5/img/badge/Source-Github.svg
      #   message: 本站项目由Github托管
      # - link: http://creativecommons.org/licenses/by-nc-sa/4.0/
      #   shields: https://npm.elemecdn.com/anzhiyu-blog@2.2.0/img/badge/Copyright-BY-NC-SA.svg
      #   message: 本站采用知识共享署名-非商业性使用-相同方式共享4.0国际许可协议进行许可
  socialBar:
    enable: true
    centerImg:
    left:
      - title: Github
        link: https://github.com/anzhiyu-c
        icon: anzhiyu-icon-github
      - title: email
        link: mailto:mymask139@163.com
        icon: anzhiyu-icon-envelope
      - title: 我的Gmeek博客
        link: https://blog.xxx.com/
        icon: anzhiyu-icon-link
      # - title: 微博
      #   link: https://weibo.com/u/6378063631
      #   icon: anzhiyu-icon-weibo
      # - title: facebook
      #   link: https://www.facebook.com/profile.php?id=100092208016287&sk=about
      #   icon: anzhiyu-icon-facebook1
      # - title: RSS
      #   link: atom.xml
      #   icon: anzhiyu-icon-rss
    right:
      - title: Bilibili
        link: https://b23.tv/rGe89DU
        icon: anzhiyu-icon-bilibili
      - title: 抖音
        link: https://v.douyin.com/UFXv95UxBbQ/
        icon: anzhiyu-icon-tiktok
      - title: Youtube  
        link: https://www.youtube.com/channel/UCeHFivb01FfFIL7kciY6KFg
        icon: anzhiyu-icon-play
      # - title: CC
      #   link: /copyright
      #   icon: anzhiyu-icon-copyright-line
  list:
    enable: false
    randomFriends: 3
    project:
      - title: 服务
        links:
          - title: 51la统计
            link: https://v6.51.la/
          - title: 十年之约
            link: https://www.foreverblog.cn/
          - title: 开往
            link: https://github.com/travellings-link/travellings
      # - title: 主题
      #   links:
      #     - title: 文档
      #       link: /docs/
      #     - title: 源码
      #       link: https://github.com/anzhiyu-c/hexo-theme-anzhiyu
      #     - title: 更新日志
      #       link: /update/
      # - title: 导航
      #   links:
      #     - title: 即刻短文
      #       link: /essay/
      #     - title: 友链文章
      #       link: /fcircle/
      #     - title: 留言板
      #       link: /comments/
      # - title: 协议
      #   links:
      #     - title: 隐私协议
      #       link: /privacy/
      #     - title: Cookies
      #       link: /cookies/
      #     - title: 版权协议
      #       link: /copyright/
  footerBar:
    enable: true
    authorLink: /
    cc:
      enable: false
      link: /copyright
    linkList:
      - link: https://github.com/anzhiyu-c/hexo-theme-anzhiyu
        text: 主题
      # - link: https://image.anheyu.com
      #   text: 图床
      # - link: https://beian.miit.gov.cn/
      #   text: 湘ICP备-xxxxxxx号
    subTitle:
      enable: true
      # Typewriter Effect (打字效果)
      effect: true
      # Effect Speed Options (打字效果速度参数)
      startDelay: 300 # time before typing starts in milliseconds
      typeSpeed: 150 # type speed in milliseconds
      backSpeed: 50 # backspacing speed in milliseconds
      # loop (循环打字)
      loop: true
      # source 调用第三方服务
      # source: false 关闭调用
      # source: 1  调用一言网的一句话（简体） https://hitokoto.cn/
      # source: 2  调用一句网（简体） http://yijuzhan.com/
      # source: 3  调用今日诗词（简体） https://www.jinrishici.com/
      # subtitle 会先显示 source , 再显示 sub 的内容
      source: false
      # 如果关闭打字效果，subtitle 只会显示 sub 的第一行文字
      sub:
        - 记录学习、分享经验心得
        - 热爱捣鼓各种有趣的项目
        - 生活明朗，万物可爱，人间值得，未来可期
        - 人生在世不留名，唯有文章惊天下

# Analysis
# --------------------------------------

# Baidu Analytics
# https://tongji.baidu.com/web/welcome/login
baidu_analytics:

# Google Analytics
# https://analytics.google.com/analytics/web/
google_analytics:

# CNZZ Analytics
# https://www.umeng.com/
cnzz_analytics:

# Cloudflare Analytics
# https://www.cloudflare.com/zh-tw/web-analytics/
cloudflare_analytics: 6ed43d34957a49fcb90ec8e43f7db523

# Microsoft Clarity
# https://clarity.microsoft.com/
microsoft_clarity:

# Advertisement
# --------------------------------------

# Google Adsense (谷歌广告)
google_adsense:
  enable: false
  auto_ads: true
  js: https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js
  client:
  enable_page_level_ads: true

# Insert ads manually (手动插入广告)
# ad:
#   index:
#   aside:
#   post:

# Verification (站长验证)
# --------------------------------------

site_verification:
  - name: google-site-verification
    content: xxx
  - name: baidu-site-verification
    content: code-xxx
  - name: msvalidate.01
    content: xxx

# Beautify/Effect (美化/效果)
# --------------------------------------

# Theme color for customize
# Notice: color value must in double quotes like "#000" or may cause error!

theme_color:
  enable: true
  main: "#425AEF"
  dark_main: "#f2b94b"
  paginator: "#425AEF"
  #   button_hover: "#FF7242"
  text_selection: "#2128bd"
  link_color: "var(--anzhiyu-fontcolor)"
  meta_color: "var(--anzhiyu-fontcolor)"
  hr_color: "#4259ef23"
  code_foreground: "#fff"
  code_background: "var(--anzhiyu-code-stress)"
  toc_color: "#425AEF"
  #   blockquote_padding_color: "#425AEF"
  #   blockquote_background_color: "#425AEF"
  scrollbar_color: "var(--anzhiyu-scrollbar)"
  meta_theme_color_light: "#f7f9fe"
  meta_theme_color_dark: "#18171d"

# 移动端侧栏
sidebar:
  site_data:
    archive: true
    tag: true
    category: true
  menus_items: true
  tags_cloud: true
  display_mode: true
  nav_menu_project: true

# 文章h2添加分隔线
h2Divider: false

# 表格隔行变色
table_interlaced_discoloration: false

# 首页双栏显示
article_double_row: false

# The top_img settings of home page
# default: top img - full screen, site info - middle (默认top_img全屏，site_info在中间)
# The position of site info, eg: 300px/300em/300rem/10% (主页标题距离顶部距离)
index_site_info_top: 

# The height of top_img, eg: 300px/300em/300rem (主页top_img高度)
index_top_img_height: 

# The user interface setting of category and tag page (category和tag页的UI设置)
# index - same as Homepage UI (index 值代表 UI将与首页的UI一样)
# default - same as archives UI 默认跟archives页面UI一样
category_ui: # 留空或 index
tag_ui: # 留空或 index

# Footer Background
footer_bg: false

# the position of bottom right button/default unit: px (右下角按钮距离底部的距离/默认单位为px)
rightside-bottom: 100px

# Background effects (背景特效)
# --------------------------------------

# canvas_ribbon (静止彩带背景)
# See: https://github.com/hustcc/ribbon.js
canvas_ribbon:
  enable: false
  size: 150
  alpha: 0.6
  zIndex: -1
  click_to_change: false
  mobile: false

# Fluttering Ribbon (动态彩带特效)
canvas_fluttering_ribbon:
  enable: true
  mobile: true

# canvas_nest(动态粒子特效)
# https://github.com/hustcc/canvas-nest.js
canvas_nest:
  enable: false
  color: "0,0,255" #color of lines, default: '0,0,0'; RGB values: (R,G,B).(note: use ',' to separate.)
  opacity: 0.7 # the opacity of line (0~1), default: 0.5.
  zIndex: -1 # z-index property of the background, default: -1.
  count: 99 # the number of lines, default: 99.
  mobile: false

# Typewriter Effect (打字效果)
# https://github.com/disjukr/activate-power-mode
activate_power_mode:
  enable: false
  colorful: true # open particle animation (冒光特效)
  shake: false #  open shake (抖动特效)
  mobile: false

# Mouse click effects: fireworks (鼠标点击效果: 烟火特效)
fireworks:
  enable: true
  zIndex: 9999 # -1 or 9999
  mobile: false

# Mouse click effects: Heart symbol (鼠标点击效果: 爱心)
click_heart:
  enable: false
  mobile: false

# Mouse click effects: words (鼠标点击效果: 文字)
ClickShowText:
  enable: true
  text:
    - 爱
    - 捣
    - 鼓
    - 的
    - 小
    - 木
    - 水
  fontSize: 15px
  random: true
  mobile: false

# Default display mode (网站默认的显示模式)
# light (default) / dark
display_mode: light

# Beautify (美化页面显示)
beautify:
  enable: true
  field: site # site/post
  title-prefix-icon: '\f0c1'
  title-prefix-icon-color: "#F47466"

# Global font settings
# Don't modify the following settings unless you know how they work (非必要不要修改)
font:
  global-font-size: 16px
  code-font-size:
  font-family:
  code-font-family: consolas, Menlo, "PingFang SC", "Microsoft JhengHei", "Microsoft YaHei", sans-serif

# Font settings for the site title and site subtitle
# 左上角网站名字 主页居中网站名字
blog_title_font:
  font_link:
  font-family: PingFang SC, 'Hiragino Sans GB', 'Microsoft JhengHei', 'Microsoft YaHei', sans-serif

# The setting of divider icon (水平分隔线图标设置)
hr_icon:
  enable: true
  icon: \f0c4 # the unicode value of Font Awesome icon, such as '\f0c4'
  icon-top:

# the subtitle on homepage (主页subtitle)
subtitle:
  enable: true
  # Typewriter Effect (打字效果)
  effect: true
  # Effect Speed Options (打字效果速度参数)
  startDelay: 300 # time before typing starts in milliseconds
  typeSpeed: 150 # type speed in milliseconds
  backSpeed: 50 # backspacing speed in milliseconds
  # loop (循环打字)
  loop: true
  # source 调用第三方服务
  # source: false 关闭调用
  # source: 1  调用一言网的一句话（简体） https://hitokoto.cn/
  # source: 2  调用一句网（简体） http://yijuzhan.com/
  # source: 3  调用今日诗词（简体） https://www.jinrishici.com/
  # subtitle 会先显示 source , 再显示 sub 的内容
  source: false
  # 如果关闭打字效果，subtitle 只会显示 sub 的第一行文字
  sub:
    - 记录学习、分享经验心得
    - 热爱捣鼓各种有趣的项目
    - 生活明朗，万物可爱，人间值得，未来可期

# Loading Animation (加载动画)
preloader:
  enable: true
  # source
  # 1. fullpage-loading
  # 2. pace (progress bar)
  # else all
  source: 3
  # pace theme (see https://codebyzach.github.io/pace/)
  pace_css_url:
  avatar: https://avatars.githubusercontent.com/u/41733240?v=4 # 自定加载动画义头像

# aside (侧边栏)
# --------------------------------------

aside:
  enable: true
  hide: false
  button: true
  mobile: true # display on mobile
  position: right # left or right
  display: # 控制对应详情页面是否显示侧边栏
    archive: true
    tag: true
    category: true
  card_author:
    enable: true
    description: # <div style="line-height:1.38;margin:0.6rem 0;text-align:justify;color:rgba(255, 255, 255, 0.8);">这有关于<b style="color:#fff">产品、设计、开发</b>相关的问题和看法，还有<b style="color:#fff">文章翻译</b>和<b style="color:#fff">分享</b>。</div><div style="line-height:1.38;margin:0.6rem 0;text-align:justify;color:rgba(255, 255, 255, 0.8);">相信你可以在这里找到对你有用的<b style="color:#fff">知识</b>和<b style="color:#fff">教程</b>。</div> # 默认为站点描述
    name_link: /

  card_announcement:
    enable: false
    content: 欢迎来看我的博客鸭~
  card_weixin:
    enable: false
    face: https://avatars.githubusercontent.com/u/41733240?v=4
    backFace: https://bu.dusays.com/2023/05/13/645fa415e8694.png
    title: 公众号
    desc: 快人一步获取最新文章 ▶
  card_recent_post:
    enable: true
    limit: 5 # if set 0 will show all
    sort: date # date or updated
    sort_order: # Don't modify the setting unless you know how it works
  card_categories:
    enable: false
    limit: 8 # if set 0 will show all
    expand: none # none/true/false
    sort_order: # Don't modify the setting unless you know how it works
  card_tags:
    enable: true
    limit: 40 # if set 0 will show all
    color: false
    sort_order: # Don't modify the setting unless you know how it works
    highlightTags:
      - 赚钱
      - 机场
      - cursor
  card_archives:
    enable: true
    type: monthly # yearly or monthly
    format: MMMM YYYY # eg: YYYY年MM月
    order: -1 # Sort of order. 1, asc for ascending; -1, desc for descending
    limit: 8 # if set 0 will show all
    sort_order: # Don't modify the setting unless you know how it works
  card_webinfo:
    enable: true
    post_count: true
    last_push_date: false
    sort_order: # Don't modify the setting unless you know how it works

# busuanzi count for PV / UV in site
# 访问人数
busuanzi:
  site_uv: true
  site_pv: true
  page_pv: true

# Time difference between publish date and now (网页运行时间)
# Formal: Month/Day/Year Time or Year/Month/Day Time
runtimeshow:
  enable: true
  publish_date: 4/1/2025 00:00:00

# Console - Newest Comments
newest_comments:
  enable: true
  sort_order: # Don't modify the setting unless you know how it works
  limit: 6
  storage: 10 # unit: mins, save data to localStorage
  avatar: true

# Bottom right button (右下角按钮)
# --------------------------------------

# Conversion between Traditional and Simplified Chinese (简繁转换)
translate:
  enable: true
  # The text of a button
  default: 繁
  # Right-click menu default text
  rightMenuMsgDefault: "轉為繁體"
  # the language of website (1 - Traditional Chinese/ 2 - Simplified Chinese）
  defaultEncoding: 2
  # Time delay
  translateDelay: 0
  # The text of the button when the language is Simplified Chinese
  msgToTraditionalChinese: "繁"
  # The text of the button when the language is Traditional Chinese
  msgToSimplifiedChinese: "简"
  # Right-click the menu to traditional Chinese
  rightMenuMsgToTraditionalChinese: "转为繁体"
  # Right-click menu to simplified Chinese
  rightMenuMsgToSimplifiedChinese: "转为简体"

# Read Mode (閲读模式)
readmode: true

# 中控台
centerConsole:
  enable: true
  card_tags:
    enable: true
    limit: 40 # if set 0 will show all
    color: false
    sort_order: # Don't modify the setting unless you know how it works
    highlightTags:
      # - Hexo
      # - 前端
  card_archives:
    enable: true
    type: monthly # yearly or monthly
    format: MMMM YYYY # eg: YYYY年MM月
    order: -1 # Sort of order. 1, asc for ascending; -1, desc for descending
    limit: 8 # if set 0 will show all
    sort_order: # Don't modify the setting unless you know how it works

# dark mode
darkmode:
  enable: true
  # Toggle Button to switch dark/light mode
  button: true
  # Switch dark/light mode automatically (自动切换 dark mode和 light mode)
  # autoChangeMode: 1  Following System Settings, if the system doesn't support dark mode, it will switch dark mode between 6 pm to 6 am
  # autoChangeMode: 2  Switch dark mode between 6 pm to 6 am
  # autoChangeMode: false
  autoChangeMode: 1
  start: # 8
  end: # 22

# Don't modify the following settings unless you know how they work (非必要请不要修改 )
# Choose: readmode,translate,darkmode,hideAside,toc,chat,comment
# Don't repeat 不要重複
rightside_item_order:
  enable: false
  hide: # readmode,translate,darkmode,hideAside
  show: # toc,chat,comment

# Lightbox (图片大图查看模式)
# --------------------------------------
# You can only choose one, or neither (只能选择一个 或者 两个都不选)

# medium-zoom
# https://github.com/francoischalifour/medium-zoom
medium_zoom: false

# fancybox
# http://fancyapps.com/fancybox/3/
fancybox: true

# Tag Plugins settings (标籤外挂)
# --------------------------------------

# mermaid
# see https://github.com/mermaid-js/mermaid
mermaid:
  enable: false
  # built-in themes: default/forest/dark/neutral
  theme:
    light: default
    dark: dark

# Note (Bootstrap Callout)
note:
  # Note tag style values:
  #  - simple    bs-callout old alert style. Default.
  #  - modern    bs-callout new (v2-v3) alert style.
  #  - flat      flat callout style with background, like on Mozilla or StackOverflow.
  #  - disabled  disable all CSS styles import of note tag.
  style: flat
  icons: true
  border_radius: 3
  # Offset lighter of background in % for modern and flat styles (modern: -12 | 12; flat: -18 | 6).
  # Offset also applied to label tag variables. This option can work with disabled note tag.
  light_bg_offset: 0

icons:
  ali_iconfont_js: # 阿里图标symbol 引用链接，主题会进行加载 symbol 引用
  fontawesome: false #是否启用fontawesome6图标
  fontawesome_animation_css: #fontawesome_animation 如果有就会加载，示例值：https://npm.elemecdn.com/hexo-butterfly-tag-plugins-plus@1.0.17/lib/assets/font-awesome-animation.min.css

# other
# --------------------------------------

# Pjax
# It may contain bugs and unstable, give feedback when you find the bugs.
# https://github.com/MoOx/pjax
pjax:
  enable: true
  exclude:
    # - xxxx
    # - xxxx

# Inject the css and script (aplayer/meting)
aplayerInject:
  enable: true
  per_page: true

# Snackbar (Toast Notification 弹窗)
# https://github.com/polonel/SnackBar
# position 弹窗位置
# 可选 top-left / top-center / top-right / bottom-left / bottom-center / bottom-right
snackbar:
  enable: true
  position: top-center
  bg_light: "#425AEF" # The background color of Toast Notification in light mode
  bg_dark: "#1f1f1f" # The background color of Toast Notification in dark mode

# https://instant.page/
# prefetch (预加载)
instantpage: true

# https://github.com/vinta/pangu.js
# Insert a space between Chinese character and English character (中英文之间添加空格)
pangu:
  enable: false
  field: site # site/post

# Lazyload (图片懒加载)
# https://github.com/verlok/vanilla-lazyload
lazyload:
  enable: true
  field: site # site/post
  placeholder:
  blur: true
  progressive: true

# PWA
# See https://github.com/JLHwung/hexo-offline
# ---------------
pwa:
  enable: false
  startup_image_enable: true
  manifest: /manifest.json
  theme_color: var(--anzhiyu-main)
  mask_icon: /img/siteicon/apple-icon-180.png
  apple_touch_icon: /img/siteicon/apple-icon-180.png
  bookmark_icon: /img/siteicon/apple-icon-180.png
  favicon_32_32: /img/siteicon/32.png
  favicon_16_16: /img/siteicon/16.png

# Open graph meta tags
# https://developers.facebook.com/docs/sharing/webmasters/
Open_Graph_meta: true

# Add the vendor prefixes to ensure compatibility
css_prefix: true

# 首页顶部相关配置
home_top:
  enable: true # 开启首页顶部模块
  timemode: date #date/updated
  title: 记录踩坑心得与解决方案
  subTitle: 分享技术，热爱生活，捣鼓不停
  siteText: 爱国，爱党，爱人民
  category:
    - name: 科学上网
      path: /categories/科学上网/
      shadow: var(--anzhiyu-shadow-blue)
      class: blue
      icon: anzhiyu-icon-dove
    - name: 踩坑心得
      path: /categories/踩坑心得/
      shadow: var(--anzhiyu-shadow-red)
      class: red
      icon: anzhiyu-icon-fire
    - name: 百宝箱
      path: /categories/百宝箱/
      shadow: var(--anzhiyu-shadow-green)
      class: green
      icon: anzhiyu-icon-book
  default_descr: 欢迎光临我的知识站，这里记录有用的技术心得！
  swiper:
    enable: true # 启用轮播图
    swiper_css: https://npm.elemecdn.com/anzhiyu-theme-static@1.0.0/swiper/swiper.min.css
    swiper_js: https://npm.elemecdn.com/anzhiyu-theme-static@1.0.0/swiper/swiper.min.js
  banner:
    tips: 个人博客
    title: 我的博客网站名
    image: https://avatars.githubusercontent.com/u/41733240?v=4
    link: /about/

# 朋友圈配置
friends_vue:
  enable: false
  vue_js: https://npm.elemecdn.com/anzhiyu-theme-static@1.1.1/friends/index.4f887d95.js
  apiurl: # 朋友圈后端地址
  top_tips: 使用 友链朋友圈 订阅友链最新文章
  top_background:

# 深色模式粒子效果canvas
universe:
  enable: true

# 页面卡片顶部气泡升起效果
bubble:
  enable: false

#  控制台打印信息
console:
  enable: true

# 51a统计配置
LA:
  enable: false
  ck:
  LingQueMonitorID:

# 标签卖萌
diytitle:
  enable: true
  leaveTitle: w(ﾟДﾟ)w 小主不要走！再看看嘛！
  backTitle: ♪(^∇^*)欢迎小主肥来！

# 留言弹幕配置
comment_barrage_config:
  enable: false
  # 同时最多显示弹幕数
  maxBarrage: 1
  # 弹幕显示间隔时间ms
  barrageTime: 4000
  # token，在控制台中获取
  accessToken: ""
  # 博主邮箱md5值
  mailMd5: ""

# 左下角音乐配置项
# https://github.com/metowolf/MetingJS
nav_music:
  enable: true
  console_widescreen_music: false # 宽屏状态控制台显示音乐而不是标签 enable为true 控制台依然会显示
  id: 8152976493
  server: netease
  volume: 0.7 # 默认音量
  all_playlist: https://y.qq.com/n/ryqq/playlist/8802438608

# 路径为 /music 的音乐页面默认加载的歌单 1. nav_music 2. custom
music_page_default: nav_music

# 评论匿名邮箱
visitorMail:
  enable: true
  mail: ""

# ptool 文章底部工具
ptool:
  enable: true
  share_mobile: true
  share_weibo: true
  share_copyurl: true
  categories: false # 是否显示分类
  mode: # 运营模式与责任，不配置不显示

# 欢迎语配置
greetingBox:
  enable: false #开启后必须配置下面的list对应的时间段，不然会出现小白条
  default: 晚上好👋
  list:
    - greeting: 晚安😴
      startTime: 0
      endTime: 5
    - greeting: 早上好鸭👋, 祝你一天好心情！
      startTime: 6
      endTime: 9
    - greeting: 上午好👋, 状态很好，鼓励一下～
      startTime: 10
      endTime: 10
    - greeting: 11点多啦, 在坚持一下就吃饭啦～
      startTime: 11
      endTime: 11
    - greeting: 午安👋, 宝贝
      startTime: 12
      endTime: 14
    - greeting: 🌈充实的一天辛苦啦！
      startTime: 14
      endTime: 18
    - greeting: 19点喽, 奖励一顿丰盛的大餐吧🍔。
      startTime: 19
      endTime: 19
    - greeting: 晚上好👋, 在属于自己的时间好好放松😌~
      startTime: 20
      endTime: 24

# 文章顶部ai摘要
post_head_ai_description:
  enable: true
  gptName: AnZhiYu
  mode: local # 默认模式 可选值: tianli/local
  switchBtn: false # 可以配置是否显示切换按钮 以切换tianli/local
  btnLink: https://afdian.net/item/886a79d4db6711eda42a52540025c377
  randomNum: 3 # 按钮最大的随机次数，也就是一篇文章最大随机出来几种
  basicWordCount: 1000 # 最低获取字符数, 最小1000, 最大1999
  key: xxxx
  Referer: https://xx.xx/

# 快捷键配置
shortcutKey:
  enable: false
  delay: 100 # 所有键位延时触发而不是立即触发（包括shift，以解决和浏览器键位冲突问题）
  shiftDelay: 200 # shift按下延时多久开启

# 无障碍优化（在首页按下「shift + ?」以查看效果）
accesskey:
  enable: true

# 友情链接顶部相关配置
linkPageTop:
  enable: false
  title: 与数百名博主无限进步
  # 添加博主友链的评论自定义格式
  addFriendPlaceholder: "昵称（请勿包含博客等字样）：\n网站地址（要求博客地址，请勿提交个人主页）：\n头像图片url（请提供尽可能清晰的图片，我会上传到我自己的图床）：\n描述：\n站点截图（可选）：\n"

# 缩略图后缀 archive/tag/category 页面单独开启后缀
pageThumbnailSuffix: ""

# 隐私协议弹窗
agreementPopup:
  enable: false
  url: /privacy

# 右键菜单
rightClickMenu:
  enable: true

# 首页随便逛逛people模式 而非技能点模式，关闭后为技能点模式需要配置creativity.yml
peoplecanvas:
  enable: false
  img: https://upload-bbs.miyoushe.com/upload/2024/07/27/125766904/ba62475f396df9de3316a08ed9e65d86_5680958632268053399..png

# 动效
dynamicEffect:
  postTopWave: true # 文章顶部波浪效果
  postTopRollZoomInfo: true # 文章顶部滚动时缩放
  pageCommentsRollZoom: true # 非文章页面评论滚动时缩放显示（仅仅Twikoo生效）

# Inject
# Insert the code to head (before '</head>' tag) and the bottom (before '</body>' tag)
# 插入代码到头部 </head> 之前 和 底部 </body> 之前
inject:
  head:
    # 自定义css
    - <link rel="stylesheet" href="/css/custom.css" media="defer" onload="this.media='all'">
    # LiveUser脚本
    - <script src="https://liveuser.030101.xyz/main.js?sessionId=我的博客网站名"></script>

  bottom:
    # 自定义js
    - <script src="/js/custom.js"></script>
    - <script src="/js/busuanzi_up.js"></script>

# CDN
# Don't modify the following settings unless you know how they work
# 非必要请不要修改
CDN:
  # The CDN provider of internal scripts (主题内部 js 的 cdn 配置)
  # option: local/elemecdn/jsdelivr/unpkg/cdnjs/onmicrosoft/cbd/anheyu/custom
  # Dev version can only choose. ( dev版的主题只能设置为 local )
  internal_provider: local

  # The CDN provider of third party scripts (第三方 js 的 cdn 配置)
  # option: elemecdn/jsdelivr/unpkg/cdnjs/onmicrosoft/cbd/anheyu/custom
  third_party_provider: cbd

  # Add version number to CDN, true or false
  version: true

  # Custom format
  # For example: https://cdn.staticfile.org/${cdnjs_name}/${version}/${min_cdnjs_file}
  custom_format: # https://npm.elemecdn.com/${name}@latest/${file}

  option:
    # main_css:
    # main:
    # utils:
    # translate:
    # random_friends_post_js:
    # right_click_menu_js:
    # comment_barrage_js:
    # ai_abstract_js:
    # people_js:
    # local_search:
    # algolia_js:
    # algolia_search:
    # instantsearch:
    # docsearch_js:
    # docsearch_css:
    # pjax:
    # blueimp_md5:
    # valine:
    # twikoo:
    # waline_js:
    # waline_css:
    # sharejs:
    # sharejs_css:
    # mathjax:
    # katex:
    # katex_copytex:
    # mermaid:
    # canvas_ribbon:
    # canvas_fluttering_ribbon:
    # canvas_nest:
    # lazyload:
    instantpage: https://cdn.jsdelivr.net/npm/instant.page@5.2.0/instantpage.min.js
    # typed:
    # pangu:
    # fancybox_css:
    # fancybox:
    # medium_zoom:
    # snackbar_css:
    # snackbar:
    # activate_power_mode:
    # fireworks:
    # click_heart:
    # ClickShowText:
    # fontawesome:
    # flickr_justified_gallery_js:
    # flickr_justified_gallery_css:
    # aplayer_css:
    # aplayer_js:
    # meting_js:
    # meting_api:
    # prismjs_js:
    # prismjs_lineNumber_js:
    # prismjs_autoloader:
    # artalk_js:
    # artalk_css:
    # pace_js:
    # pace_default_css:
    # countup_js:
    # gsap_js:
    busuanzi: false # 禁用busuanzi计数器
    # rightmenu:
    # waterfall:
    # ali_iconfont_css:
    # accesskey_js:
```

# 博客评论功能的配置

> 使用的**giscus**作为评论系统，基于github的**discussion** 完全免费

----------

> **giscus链接**：https://giscus.app/  
> 可以参照官方链接配置

```
# giscus
# https://giscus.app/
giscus:
  repo: MyMaskKing/hexo-blog-comments # GitHub repository name
  repo_id: R_kgDOOd_riA # GitHub repository id，从Giscus网站获取
  category_id: DIC_kwDOOd_riM4CpW8o # GitHub repository category id，从Giscus网站获取
  theme:
    light: light
    dark: dark
  option: # options
    data-lang: zh-CN
    data-mapping: pathname # 使用页面路径作为讨论定位依据，避免中文URL问题
    data-reactions-enabled: 1 # 是否启用reactions
    data-emit-metadata: 0
    data-input-position: bottom # 评论框位置
    data-category: Announcements # 确保分类正确传递
```

### **QA：需要注意的内容**

> data-mapping: pathname # 使用页面路径作为讨论定位依据，避免中文URL问题

POST_TITLE: Hexo博客搭建：第一章（搭建Hexo博客和使用超绝的安知鱼主题！！！）

POST_CATEGORIES: 百宝箱

POST_TAGS: 博客,教程

POST_STICKY:
<!--stackedit_data:
eyJoaXN0b3J5IjpbNDM1MDMzOTUzLC0xOTkwODY0MDIzXX0=
-->