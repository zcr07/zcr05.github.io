
## 安装软件介绍

⭐

**目前网上****(含ChatGPT)**给出的最优方案就是使用**Termux(**[去官网点我](https://github.com/termux/termux-app)**)+QEMU**

----------

**正在使用的方案(魔改后的Termux)：**

A：已经内置了**alpine系统的Termux(**[去官网点我](https://github.com/FakeRajbhx/alpine-term)**)(****配置过低时使用)**

原博客使用教程：[点我](https://www.cnblogs.com/yanqb/p/17367504.html)

直接查看使用教程：[点我](https://kdocs.cn/l/cheRD9wHnLXd?linkname=zvWJTuBssB)

优点：

-   内置docker，sshd，Nginx

-   apk大小为606M

-   可以在更低配置上运行(高配置手机可能无法运行)

缺点：

-   基于QEMU，每次重启都要重新设置映射端口(命令如下)

`hostfwd_add tcp::2222-:22`

B：内置了**alpine系统的Termux增强版(****🌟****优先推荐使用)**

原博客使用教程：[点我](https://blog.csdn.net/LJZxiaolongbao/article/details/139145986)

直接查看使用教程：[点我](https://www.cnblogs.com/yanqb/p/17367504.html)

直接下载APK：[点我](https://d.icdown.club/repository/main/Alpine_Termux.apk)

优点：

-   魔改了QEMU，端口映射一次设置就可以了

-   apk大小为126M

缺点：

-   没有内置docker，sshd，需要手动安装

-   无法在低配置上运行(高配置手机可以运行)

**测试的安卓配置：**

1.  `CPU：1.3GHz晓龙450八核`

1.  `4G运行内存+32G储存空间`

1.  `Android7.1.2`

----------

国外大佬使用原版**Termux**的视频（[点我](https://www.youtube.com/watch?v=xiMJpaWi5Nk)）

## A：内置了**alpine系统的Termux使用教程**

> APK源和DNS更换这一步，如果**没有魔法网络**请**务必提前做了**，否则都会从国外的镜像来下载软件

### apk安装完成后左滑，在**弹出画面中选择****QEMU****，输入下面****端口映射命令(SSH连接使用)**

```
hostfwd_add tcp::2222-:22 
```

注意：正常情况输入完成回车是没有任何打印内容的

### 左滑弹出画面选择**[2]/dev/ttyS0****，等待alpine系统启动完成后****切换到root**

> 登录用户 `alpine` 密码: `alpine`  
> 切换到`root`账户，输入`sudo -s` 密码：`alpine`

### 修改sshd的配置文件

```
方式1：
sed -i 's/PasswordAuthentication no/PasswordAuthentication yes/g' /etc/ssh/sshd_config
sed -i 's/PermitRootLogin no/PermitRootLogin yes/g' /etc/ssh/sshd_config
service sshd restart
```

```
#方式2：
apt install vim #可能需要安装vim
vim /etc/ssh/sshd_config
#修改下面内容为yes：
PasswordAuthentication yes
PermitRootLogin yes
#重启sshd服务
service sshd restart
```

### 设置内置Docker服务为开机自启

```
rc-update add docker
service docker start

#后台启动
setsid containerd
setsid dockerd
# 测试
docker info
```

### 修改docker的镜像源

> vi /etc/docker/daemon.json  
> 把下面内容复制进去

```
{
    "registry-mirrors": [
    "https://docker.1panelproxy.com",
    "https://2a6bf1988cb6428c877f723ec7530dbc.mirror.swr.myhuaweicloud.com",
    "https://docker.m.daocloud.io",
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com",
    "https://your_preferred_mirror",
    "https://dockerhub.icu",
    "https://docker.registry.cyou",
    "https://docker-cf.registry.cyou",
    "https://dockercf.jsdelivr.fyi",
    "https://docker.jsdelivr.fyi",
    "https://dockertest.jsdelivr.fyi",
    "https://mirror.aliyuncs.com",
    "https://dockerproxy.com",
    "https://mirror.baidubce.com",
    "https://docker.m.daocloud.io",
    "https://docker.nju.edu.cn",
    "https://docker.mirrors.sjtug.sjtu.edu.cn",
    "https://docker.mirrors.ustc.edu.cn",
    "https://mirror.iscas.ac.cn",
    "https://docker.rainbond.cc"
    ]
}
```

**检测镜像源是否被使用**

```
docker info
```

### (国内使用必须配置)APK源和DNS更换，时区修改

> 更换阿里云+DNSPOD 的DNS

```
sed -i '/^#/! s/^/#/' /etc/apk/repositories
echo 'https://mirrors.aliyun.com/alpine/v3.9/main' >> /etc/apk/repositories
echo 'https://mirrors.aliyun.com/alpine/v3.9/community' >> /etc/apk/repositories

sed -i '/^#/! s/^/#/' /etc/resolv.conf
echo 'nameserver 223.5.5.5' >> /etc/resolv.conf
echo 'nameserver 223.6.6.6' >> /etc/resolv.conf

apk update
```

> 时区修改

```
setup-timezone
等到提示Which timezone are you in? ('?' for list) [UTC]，然后输入
Asia/Shanghai
```

### (补充)安装Docker Compose

> 1.检查最新版本号：

```
DOCKER_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | jq -r .tag_name)
```

⭐

遇到mksh: adk: inaccessible or not found

请执行`apk update;apk add curl;apk add jq`

> 2.下载并安装 Docker Compose:

```
curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

> 3.给 Docker Compose 添加执行权限并检查版本

```
chmod +x /usr/local/bin/docker-compose
docker-compose --version
```

## B：内置alpine系统的Termux增强版**使用教程**

### apk安装后会有弹出画面，点击Settings设置SSH服务端口映射

![](http://www.kdocs.cn/api/v3/office/copy/RGFzMEkxT0VSa0ErVFNEbmlxTmxXTll5bTRTTjNpd0pXb2paTzJGbnQvVFBKT1ZGZFZaaGtXdzVZaXdaK0IvNXNvemUyUGxDZm5jRXlvNHdVRnlEelBRa2ZmeGw0V0xWLzVqV2VKbFBuQ2M5MFJGM2h6SUxsZWZ4bVBhTGVyMmZ2TFVubXJGOE9zRzE4Uk1XM2ZxRHR3MG5TVFJPRmdLUVR5bytTYjVPT2JJNDRPQi9uZllUOWllVms1Ym91eTVERXZLdDk4ejZ4QXgwS1BIOEVleVd1Y2d0S3JUNkUwUEtaaUdnaEpjSE9lUDNVWjcrcVk1Qi9LZStxMDgvT0dIcXh3TE5ybUpORDdVPQ==/attach/object/HJEDEXI7ABQGO?)

```
tcp:2022:22
#端口：2022是你用XShell连接时用的
#端口：22是alpinex系统的默认端口
```

### 系统启动完成后直接输入root免密登录

> APK源和DNS更换这一步，如果**没有魔法网络**请**务必提前做了**，否则都会从国外的镜像来下载软件  
> [**点我**](https://kdocs.cn/l/cheRD9wHnLXd?linkname=R3mSsqR6Oa)**去看修改APK源和DNS方法**

### 安装SSH服务

```
apk update
#安装ssh
apk add openssh
#启动ssh
rc-service sshd start
# 设置开机启动
rc-update add sshd
```

> 修改ssd_config的配置文件，并且设置root密码，运行root登录

```
sed -i 's/PermitRootLogin no/PermitRootLogin yes/g' /etc/ssh/sshd_config
passwd abc123456 #设置root密码
```

### 安装docker服务

```
#安装docker
apk add docker
#启动docker
service docker start
docker version
#开机自启
rc-update add docker boot
```

> 修改Docker镜像源：[**点我**](https://kdocs.cn/l/cheRD9wHnLXd?linkname=hxebueOkWr)

> 安装Docker Compose ：[**点我**](https://kdocs.cn/l/cheRD9wHnLXd?linkname=No8HoMRicO)

## 补充资料

### 安卓APK(linux系统)

> 这是我在找**安卓**上的**linux系统apk**的时候找到的软件，下面的软件都支持linux系统，**最好用的是****userLand****，谷歌商店评分4.7。**

⭐

**limbo虚拟机(最后一次更新2022年)**

下载：[https://wwvj.lanzoum.com/iRlCB2su0toj](https://wwvj.lanzoum.com/iRlCB2su0toj)密码:h1xb

Git网址：[https://github.com/limboemu/limbo](https://github.com/limboemu/limbo)

----------

**AidLux 智能物联网(AIoT)应用 开发和部署平台**

下载地址：[https://community.aidlux.com/aidluxdownload](https://community.aidlux.com/aidluxdownload)

如果进入**error模式**可能是**储存空间不足**，参考[解决方案](https://community.aidlux.com/postDetail/1389)

----------

**UserLAnd(自带镜像商店，需要魔法上网)**

下载：[https://wwvj.lanzoum.com/iix662sucebi](https://wwvj.lanzoum.com/iix662sucebi)密码:9y3n

Git网址：[https://github.com/CypherpunkArmory/UserLAnd](https://github.com/CypherpunkArmory/UserLAnd)

**注意：UserLAnd 的 ssh server 端口为 2022**

`用户密码：cyj cyj123456`

`vnc:123456`

**快速开始**

[https://github.com/CypherpunkArmory/UserLAnd/wiki/Getting-Started-in-UserLAnd](https://github.com/CypherpunkArmory/UserLAnd/wiki/Getting-Started-in-UserLAnd)

### Linux镜像

> 提示：为lambo软件用的

⭐

国外的一款**tiny极简镜像**，几十M就可以运行一个轻量服务器。

[https://distro.ibiblio.org/tinycorelinux/downloads.html](https://distro.ibiblio.org/tinycorelinux/downloads.html)

![](http://www.kdocs.cn/api/v3/office/copy/RGFzMEkxT0VSa0ErVFNEbmlxTmxXTll5bTRTTjNpd0pXb2paTzJGbnQvVFBKT1ZGZFZaaGtXdzVZaXdaK0IvNXNvemUyUGxDZm5jRXlvNHdVRnlEelBRa2ZmeGw0V0xWLzVqV2VKbFBuQ2M5MFJGM2h6SUxsZWZ4bVBhTGVyMmZ2TFVubXJGOE9zRzE4Uk1XM2ZxRHR3MG5TVFJPRmdLUVR5bytTYjVPT2JJNDRPQi9uZllUOWllVms1Ym91eTVERXZLdDk4ejZ4QXgwS1BIOEVleVd1Y2d0S3JUNkUwUEtaaUdnaEpjSE9lUDNVWjcrcVk1Qi9LZStxMDgvT0dIcXh3TE5ybUpORDdVPQ==/attach/object/3ZFAKTY7AAQAG?)

如何切换Root([来自官网的提示](https://detailed.wordpress.com/2017/08/10/tiny-core-linux/))

`sudo su`

### Debian(Ubuntu)安装docker

> 使用**userland**下在的**Ubuntu**来安装docker，**能启动但是直接停止运行了**，出错内容是少一些软件，但是无法安装这些软件，可能必须要通过**QEMU来套娃**吧。

⭐

1.  先升级一下apt

`sudo apt-get update && sudo apt-get upgrade`

1.  实现安装一些docker的必须依赖

`sudo apt-get install -y ca-certificates curl gnupg lsb-release software-properties-common`

1.  执行下面的快捷安装命令

`curl -fsSL` [`https://get.docker.com`](https://get.docker.com/) `-o get-docker.sh`

`sudo sh get-docker.sh --version 20.0 --mirror Aliyun`

注意：使用快捷命令安装的docker是**最新版**，可能会出现问题`/etc/init.d/docker: 62: ulimit: error setting limit (Operation not permitted)`

解决方案可参考：方案1（[点我查看](https://github.com/docker/cli/issues/4807)） 方案2[（点我查看）](https://blog.csdn.net/asd54090/article/details/140996510)

[https://github.com/CypherpunkArmory/UserLAnd/issues/1023](https://github.com/CypherpunkArmory/UserLAnd/issues/1023)

[乌班图中卸载docker](https://www.cnblogs.com/dachenyi/p/18329788)

[乌班图的官方docker安装和卸载](https://docs.docker.com/engine/install/ubuntu/)

sudo apt-get install -y docker-ce=5:24.0.7-1ubuntu.22.04jammy docker-ce-cli=5:20.10.213-0ubuntu-kinetic

### 🔥🔥🔥AlpLinux内存和硬盘扩容

#### 内存扩容

1.  **创建 Swap 文件**：

```
dd if=/dev/zero of=/swapfile bs=1M count=1024
```

上述命令创建了一个 1024MB 的 Swap 文件。您可以根据需要调整 `count` 的值来改变 Swap 的大小。

1.  **设置 Swap 文件权限**：

```
chmod 600 /swapfile
```

1.  **格式化为 Swap**：

```
mkswap /swapfile
```

1.  **启用 Swap**：

```
swapon /swapfile
```

1.  **验证 Swap 是否启用**：

```
free -m
```

您应该能看到 Swap 的使用情况。

1.  **设置开机自动启用 Swap**：

编辑 `/etc/fstab` 文件，添加以下行：

```
/swapfile none swap sw 0 0
```

**在启动脚本中添加** `**swapon /swapfile**`

1.  编辑 `/etc/local.d/swap.start` 文件（如果不存在就创建）：

```
vi /etc/local.d/swap.start
```

1.  添加内容：

```
#!/bin/sh
swapon /swapfile
```

1.  赋予执行权限：

```
chmod +x /etc/local.d/swap.start
```

1.  启用 `local` 服务（开机自动执行）：

```
rc-update add local default
```

----------

#### 💾 扩展存储容量（扩展文件系统）

1.  **安装必要的工具**：

```
apk add --no-cache cfdisk e2fsprogs-extra
```

这将安装 `cfdisk` 和 `resize2fs` 工具，用于分区和扩展文件系统。

1.  **使用 cfdisk 调整分区大小**：

```
cfdisk /dev/sda
```

在 cfdisk 中，选择根分区（例如 `/dev/sda1`），选择 "Resize"，输入新的大小，然后选择 "Write" 保存更改，最后选择 "Quit" 退出。

1.  **扩展文件系统**：

```
resize2fs /dev/sda1
```

这将扩展文件系统以使用新的分区大小。

1.  **验证扩展结果**：

```
df -h
```

## Termux魔改版虚拟机(目前Docker可用)

⭐

[这篇博客](https://blog.csdn.net/LJZxiaolongbao/article/details/139145986)**提供了两个软件**

**A：Zerotermux**

网址：[https://github.com/hanxinhao000/ZeroTermux](https://github.com/hanxinhao000/ZeroTermux)

**B：alpine_Termux（魔改版）**

**魔改版按下面命令安装ssh**

1.  `apk update`

1.  `apk add openssh`

1.  `service sshd start # 启动 SSH 服务`

1.  `rc-update add sshd # 设置 SSH 服务在系统启动时自动启动`

1.  `sed -i 's/PermitRootLogin no/PermitRootLogin yes/g' /etc/ssh/sshd_config`

1.  `passwd` #默认用cyj123456

**C：alpine_Termux（官方版）**[**点我**](https://github.com/FakeRajbhx/alpine-term)

-   关于官方版的使用文档请参考：[点我](https://www.cnblogs.com/yanqb/p/17367504.html)

----------

目前按照**C方案****安装成功docker，但是docker源配置请参考：**[解决方案Link](https://blog.csdn.net/liu854046222/article/details/146000198)

4G运行的手机上面，方案B的docker能起到无法执行运行镜像，方案C是没问题的

docker run -d --restart=always -v /data/alist:/opt/alist/data -p 1744:5244 --name="alist" xhofe/alist-aria2

docker run hello-world
<!--stackedit_data:
eyJoaXN0b3J5IjpbODg2MDkyMDE0LC0xMjUwNjMwOThdfQ==
-->