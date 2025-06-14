
# 博客发布到GitHub Pages,需公开你的git仓库（方式1）

### 自己用workflow后实现了自动发布

> **1. 发布到github需要把你的仓库设置成public**。  
> **2. 进入自己的仓库做一些设置：settings-->pages-->Source(Deploy from a branch)-->Branch(gh-pages)**

![](http://www.kdocs.cn/api/v3/office/copy/alFYa2hKNzRFbFRZeFljTTN3MVRjbTVPMmFRN1d3Z3pWTjAxbXF2aWlMQU5YUFRtVllWN0R1RXQvTEszeERIK2FCUkwvc25JRk1CdGRjL2h2S1V3MVZiaTJTS0FsVlk1YVJieWxHUVUxVnBOUWRZeStxYThJZ3JjbGc5Q3VKdDFMQ0o3SWVtZ2hpZzNUSVZRd3BJZ21PeEdqL0hyRkdIWmlwQ1owMU5WZExkSnlCTWJmRGN5UEd4SW9rOFFhditYNUJudWY0OGZwd0JmSVFpVkMzbjNYUDlnWnJmRktSSFJvN2VEZjJBUDBER1ErNUI1RzJ6c3BNR29ONm54Zm1yalV4Y2ZubDBuN1A0PQ==/attach/object/MFSDJKQ7ADQFG?)

### 正常的操作可以参考其他人的做法（要做以下设置）

```
// Git BASH终端
hexo clean && hexo generate && hexo deploy  
```

# 博客发布到Cloudflare,你的git仓库是隐私的（方式2）

> Cloudflare你必须要了解的知识  
> worker：适合放一些API之类的服务  
> pages：放一些静态网站

----------

> 发布到Cloudflare我也做了两种方式  
> 方式1：直接使用git的gh-pages分支  
> 方式2：直接使用git的main分支,在cloudflare上实现编译发布

## 方式1:直接使用git的gh-pages分支

### 点击`Workers和Pages`,然后使用Pages,连接到自己的git

![](http://www.kdocs.cn/api/v3/office/copy/alFYa2hKNzRFbFRZeFljTTN3MVRjbTVPMmFRN1d3Z3pWTjAxbXF2aWlMQU5YUFRtVllWN0R1RXQvTEszeERIK2FCUkwvc25JRk1CdGRjL2h2S1V3MVZiaTJTS0FsVlk1YVJieWxHUVUxVnBOUWRZeStxYThJZ3JjbGc5Q3VKdDFMQ0o3SWVtZ2hpZzNUSVZRd3BJZ21PeEdqL0hyRkdIWmlwQ1owMU5WZExkSnlCTWJmRGN5UEd4SW9rOFFhditYNUJudWY0OGZwd0JmSVFpVkMzbjNYUDlnWnJmRktSSFJvN2VEZjJBUDBER1ErNUI1RzJ6c3BNR29ONm54Zm1yalV4Y2ZubDBuN1A0PQ==/attach/object/LFDUDKQ7ABADQ?)

### 选择gh-pages分支，然后一路next等着部署成功就好了

![](http://www.kdocs.cn/api/v3/office/copy/alFYa2hKNzRFbFRZeFljTTN3MVRjbTVPMmFRN1d3Z3pWTjAxbXF2aWlMQU5YUFRtVllWN0R1RXQvTEszeERIK2FCUkwvc25JRk1CdGRjL2h2S1V3MVZiaTJTS0FsVlk1YVJieWxHUVUxVnBOUWRZeStxYThJZ3JjbGc5Q3VKdDFMQ0o3SWVtZ2hpZzNUSVZRd3BJZ21PeEdqL0hyRkdIWmlwQ1owMU5WZExkSnlCTWJmRGN5UEd4SW9rOFFhditYNUJudWY0OGZwd0JmSVFpVkMzbjNYUDlnWnJmRktSSFJvN2VEZjJBUDBER1ErNUI1RzJ6c3BNR29ONm54Zm1yalV4Y2ZubDBuN1A0PQ==/attach/object/KCKUFKQ7ADAC2?)

## 方式2：直接使用git的main分支,在cloudflare上实现编译发布

### 前面的步骤请参考`方式1`，区别是使用main分支，需要设置`构建命令`

> 生成分支：main  
> 构建命令：chmod +x build.sh && ./build.sh  
> 输出目录：publish

![](http://www.kdocs.cn/api/v3/office/copy/alFYa2hKNzRFbFRZeFljTTN3MVRjbTVPMmFRN1d3Z3pWTjAxbXF2aWlMQU5YUFRtVllWN0R1RXQvTEszeERIK2FCUkwvc25JRk1CdGRjL2h2S1V3MVZiaTJTS0FsVlk1YVJieWxHUVUxVnBOUWRZeStxYThJZ3JjbGc5Q3VKdDFMQ0o3SWVtZ2hpZzNUSVZRd3BJZ21PeEdqL0hyRkdIWmlwQ1owMU5WZExkSnlCTWJmRGN5UEd4SW9rOFFhditYNUJudWY0OGZwd0JmSVFpVkMzbjNYUDlnWnJmRktSSFJvN2VEZjJBUDBER1ErNUI1RzJ6c3BNR29ONm54Zm1yalV4Y2ZubDBuN1A0PQ==/attach/object/CRZELKQ7ADAEE?)

### 部署成功的日志，确认都是`对号`

![](http://www.kdocs.cn/api/v3/office/copy/alFYa2hKNzRFbFRZeFljTTN3MVRjbTVPMmFRN1d3Z3pWTjAxbXF2aWlMQU5YUFRtVllWN0R1RXQvTEszeERIK2FCUkwvc25JRk1CdGRjL2h2S1V3MVZiaTJTS0FsVlk1YVJieWxHUVUxVnBOUWRZeStxYThJZ3JjbGc5Q3VKdDFMQ0o3SWVtZ2hpZzNUSVZRd3BJZ21PeEdqL0hyRkdIWmlwQ1owMU5WZExkSnlCTWJmRGN5UEd4SW9rOFFhditYNUJudWY0OGZwd0JmSVFpVkMzbjNYUDlnWnJmRktSSFJvN2VEZjJBUDBER1ErNUI1RzJ6c3BNR29ONm54Zm1yalV4Y2ZubDBuN1A0PQ==/attach/object/76JERKQ7ADAEE?)

### 查看cloudflare给你的博客的网站，然后去访问

![](http://www.kdocs.cn/api/v3/office/copy/alFYa2hKNzRFbFRZeFljTTN3MVRjbTVPMmFRN1d3Z3pWTjAxbXF2aWlMQU5YUFRtVllWN0R1RXQvTEszeERIK2FCUkwvc25JRk1CdGRjL2h2S1V3MVZiaTJTS0FsVlk1YVJieWxHUVUxVnBOUWRZeStxYThJZ3JjbGc5Q3VKdDFMQ0o3SWVtZ2hpZzNUSVZRd3BJZ21PeEdqL0hyRkdIWmlwQ1owMU5WZExkSnlCTWJmRGN5UEd4SW9rOFFhditYNUJudWY0OGZwd0JmSVFpVkMzbjNYUDlnWnJmRktSSFJvN2VEZjJBUDBER1ErNUI1RzJ6c3BNR29ONm54Zm1yalV4Y2ZubDBuN1A0PQ==/attach/object/ETOETKQ7ACADK?)

POST_TITLE: Hexo博客搭建：第二章（Hexo博客的GithubPages和CF发布）

POST_CATEGORIES: 百宝箱

POST_TAGS: 博客,教程

POST_STICKY:
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTY1NjU5ODEwM119
-->