## 基础知识

💡

1.  ps > File1时**优先执行管道符，管道符是先删除文件后再重新新建**

-   ls a.txt xxx.txt >> #标准输出

-   ls a.txt xxx.txt 2>> #异常输出

-   ls a.txt xxx.txt &> #标准和异常都输出

-   ls a.txt xxx.txt > a.log 2>&1 #**2>&1把异常改写成标准输出**

1.  **cd - 返回进入此目录之前所在的目录**

1.  systemctl enable httpd --now **#启动服务并设置开机自启**

1.  nohup **#告诉系统即使终端关闭也不要停止这个命令**

> 发展史：unix(19700101)->linux(1991)

### 云计算机

👋

Iaas 提供基础网络储存等，类似于毛胚房

Paas 可以直接进行开发测试，类似于公寓，只需要做自己想做的就好

Saas 所有软件都已经安装好，可以直接用，无需关注其他

### 系统层面

uname #查看内核名字

-   -r 显示内核版本

lscpu #查看Cpu信息

hostname #查看主机名 hostnamectl set-hostname aaa

alias 别名=真实命令 #设置临时别名

-   unalias 别名 #取消临时别名

poweroff #关机

```
/etc/shells #查看系统支持的shell解析器
/ect/rocky-release #查看系统版本（仅限rocky Linux）
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTI0MDAzNjM3XX0=
-->