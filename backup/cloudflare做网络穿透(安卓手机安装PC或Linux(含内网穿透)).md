⭐

1.  下载cloudflare的安装包

`curl -L` [`https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64`](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64) `-o /usr/local/bin/cloudflared`

1.  赋予执行权限

`chmod +x /usr/local/bin/cloudflared`

1.  确认是否安装成功

`cloudflared version`

1.  执行

`cloudflared service install 你的密钥`

**卸载命令**：`cloudflared service uninstall`

**Docker版看这里**

**参考这个链接**：[点我](https://sspai.com/post/79278)

**docker的附加参数：**

-   --link alist:alist #容器间相互通信

-   --network host #容器内的应用就能直接访问宿主机的 localhost

`docker run --link alist:alist cloudflare/cloudflared:latest tunnel --no-autoupdate run --token 你的token`

已废弃部分

⭐

1.  下载cloudflare的ubuntu文件

`curl -L --output cloudflared.deb` [`https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb`](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb)

注意：这里curl可能会碰到https无法下载的问题，建议把文件放到http（**AList**）下面

1.  sudo dpkg -i cloudflared.deb

注意：这里可能会报错package architecture (amd64) does not match system (arm64)

解决：sudo dpkg -i --force-architecture cloudflared.deb （[点击参考](https://github.com/kubernetes/minikube/issues/10001)）

1.  sudo cloudflared service install 你的密钥

成功会显示：`Illegal instruction`

## 网页版SSH内网穿透

⭐

1.  **将服务器连接到 Cloudflare：**

-   **创建 Cloudflare Tunnel：** 登录到 Cloudflare Zero Trust 仪表板，导航至“Networks” > “Tunnels”，点击“Create a tunnel”。选择“Cloudflared”作为连接器类型，输入隧道名称，然后点击“Save tunnel”。

-   **安装并运行** `**cloudflared**`**：** 根据您的服务器操作系统，下载并安装 `cloudflared`。在服务器上运行提供的命令以启动 `cloudflared`，这将建立服务器与 Cloudflare 之间的隧道连接。

-   **配置公共主机名：** 在隧道的“Public Hostnames”选项卡中，选择一个域名和子域名（例如 [`ssh.example.com`](https://ssh.example.com/)），将其指向您的 SSH 服务（通常是 `localhost:22`）。保存主机名设置。

1.  **配置 Cloudflare Access 应用程序：(****下面的步骤一定要做！****)**

-   **创建应用程序：** 在 Cloudflare Zero Trust 仪表板中，转到“Access” > “Applications”，点击“Add an application”，选择“Self-hosted”。

-   **设置应用程序详细信息：** 输入应用程序名称，设置“Application domain”为之前配置的公共主机名（例如 [`ssh.example.com`](https://ssh.example.com/)）。

-   **配置访问策略：** 在“Policies”选项卡中，添加相应的访问策略，指定允许访问该应用程序的用户或组。(**必须配置一个Everyone的mail策略，否则无法收到邮件)**

-   **启用浏览器渲染：** 在“Advanced settings”下的“Browser rendering settings”中，将“Browser rendering”设置为“SSH”。保存应用程序设置。

1.  **用户访问 SSH 终端：**

-   **访问公共主机名：** 用户在浏览器中访问配置的公共主机名（例如 [`https://ssh.example.com`](https://ssh.example.com/)）。

-   **身份验证：** 用户将根据之前配置的访问策略进行身份验证。

-   **Linux账户验证**：输入alpine，密码alpine

-   **使用浏览器终端：** 成功验证后，Cloudflare 将在浏览器中呈现一个 SSH 终端，用户可以直接在其中操作服务器，无需在客户端安装任何额外的软件或管理 SSH 密钥。

## CF节点优选

⭐

CloudFlare公共优选Cname域名地址1：[点我](https://www.wetest.vip/)

CloudFlare公共优选Cname域名地址2：[点](https://www.wetest.vip/)[我](https://blog.nbvil.com/nat/saasip/)

CloudFlare优质IP：[点我](https://stock.hostmonit.com/CloudFlareYes)

CloudFlare公共优选教程1：[点我](https://www.youtube.com/watch?v=uCgRb7KfANo)

CloudFlare公共优选教程2：[点我](https://www.youtube.com/watch?v=oTwnwZEJpWo&feature=youtu.be)

CDN优选域名和IP教程：[点我](https://www.freedidi.com/10143.html)

[**在线TCP延迟测试**](https://www.itdog.cn/tcping/)

域名价格表：[点我](https://www.baota.me/post-410.html)

节点优选流程如下

步骤

主域名A

加速域名B

第一步：

在CF的ZeroTrust的Tunnels中，把**A,B都映射到alist网站上**(alist.A和alist.B)

第二步：

1.回退源设置成【alist.B】

2.自定义主机设置成**【alist.A】**

第三步：

第二步的2中会生成一些DNS解析，添加到A的DNS中([#1](https://kdocs.cn/l/cheRD9wHnLXd?linkname=o71OFSy27a))

设置一个优选节点到**【fast.B】**

第四步：

把【alist.A】指向到【fast.B】,关闭CF的代理

温馨提示：

### #1关于回退源中自定义主机的DNS认证的解决办法

⭐

**解决灵感的帖子：**[**点我**](https://blog.tsinbei.com/archives/1267/)

如果回退源中-->自定义主机验证-->主机名的状态(**验证失败**)

请：假设**回退域名**（[callback.tsinbei.com](https://callback.tsinbei.com/)）

**自定义主机域名**（[custom.tsinbei.com](https://custom.tsinbei.com/)）(**验证失败**)

那么**自定义主机域名****中设置一个CNAME** ：`csutome`指向[`callback.tsinbei.com`](https://callback.tsinbei.com/)

温馨提示：无论使用何种方法验证，验证成功后均可以删除验证记录（TXT 或 CNAME）并进行自选。经测试，同一个主机名验证成功一次后就不会再次验证。

### #2网页版SSH做CDN加速时候遇到的问题

⭐

1.  在**加速域名B**的**回退源**设置了自定义主机**ssh.A**

1.  **主域名ssh.A****这里的cname****不是****指向****fast.B**

1.  **主域名ssh.A****保持隧道****Tunnels****自动生成的配置(ssh.A)，并且小黄云CF代理要开着,否则ssh.A无法访问**

1.  **并且ssh.A也要去做一个application**

### #3自定义主机证书的自动续订的问题

⭐

自定义主机(主域名)**ssh.A下面****加一个CNAME**

### **自定义主机名的 DCV 委派**

_`acme-challenge.<hostname>` `<hostname>.``6ec077ddb0899695.dcv.cloudflare.com`

CNAME的Key里面只需要写sub域名**ssh**，cloudflare会自动补充完整域名的，但是value里面要写**ssh.A**

_`acme-challenge``**.ssh**` `**ssh.A.**``<hostname>.``6ec077ddb0899695.dcv.cloudflare.com`

温馨提示：实际内容请参考“**自定义主机名的 DCV 委派**”

### CF加速成功验证

⭐

[**在线网站测试**](https://www.itdog.cn/http/)

![](http://www.kdocs.cn/api/v3/office/copy/TCtnSVpVN0JkUCtmN053dHFCOUxzUmNzZUxvbW9VelQzL3F0Mkh5TUg1bWNwUmFSL2drWjZwNWlWQVFWaUl3dlpqd2ZuMkVqQXBFUUlVQjdDanpCVUNhMnpzQVc2L3lTMDZoNEVlMmtlakR5VUZtbkVleUtSUlJaR1NlMTBFNVhSZ3NmL2xVLytONXVVeWFqMG1TY0ZWVFpYajlHa2xrcCtmR1dtNzdDNnV4aUE4UERYVnhwZkp3aGFSZXJkaVFCN1UxYmVOZ0xta1ZtRmtUYTZsY1pnc3JjRU41a0o2QkVobFpQKzVhTGh4VGlWa0ZEZUFIeHNvaGo1aDVmaUFybVhwUHNDazVaa0xnPQ==/attach/object/XEX5E2A7ABQFE?)

![](http://www.kdocs.cn/api/v3/office/copy/TCtnSVpVN0JkUCtmN053dHFCOUxzUmNzZUxvbW9VelQzL3F0Mkh5TUg1bWNwUmFSL2drWjZwNWlWQVFWaUl3dlpqd2ZuMkVqQXBFUUlVQjdDanpCVUNhMnpzQVc2L3lTMDZoNEVlMmtlakR5VUZtbkVleUtSUlJaR1NlMTBFNVhSZ3NmL2xVLytONXVVeWFqMG1TY0ZWVFpYajlHa2xrcCtmR1dtNzdDNnV4aUE4UERYVnhwZkp3aGFSZXJkaVFCN1UxYmVOZ0xta1ZtRmtUYTZsY1pnc3JjRU41a0o2QkVobFpQKzVhTGh4VGlWa0ZEZUFIeHNvaGo1aDVmaUFybVhwUHNDazVaa0xnPQ==/attach/object/2ZQ5G2A7AAAAE?)

## 踩到的坑

⭐

![](http://www.kdocs.cn/api/v3/office/copy/TCtnSVpVN0JkUCtmN053dHFCOUxzUmNzZUxvbW9VelQzL3F0Mkh5TUg1bWNwUmFSL2drWjZwNWlWQVFWaUl3dlpqd2ZuMkVqQXBFUUlVQjdDanpCVUNhMnpzQVc2L3lTMDZoNEVlMmtlakR5VUZtbkVleUtSUlJaR1NlMTBFNVhSZ3NmL2xVLytONXVVeWFqMG1TY0ZWVFpYajlHa2xrcCtmR1dtNzdDNnV4aUE4UERYVnhwZkp3aGFSZXJkaVFCN1UxYmVOZ0xta1ZtRmtUYTZsY1pnc3JjRU41a0o2QkVobFpQKzVhTGh4VGlWa0ZEZUFIeHNvaGo1aDVmaUFybVhwUHNDazVaa0xnPQ==/attach/object/37FR4WA7AAQBG?)

在**cloudflare中配置公共主机名**的时候，一定**不要设置路径**，**否则可能会造成js,css无法正常返回**

## 关于内网穿透的一些补充内容

⭐

用**cpolar**也可以做**内网穿透**（不过没有试验过，教程如下）

图文教程：[点我](https://developer.aliyun.com/article/1487189?spm=5176.26934562.main.1.763bb724frQ2gg)

油管视频：[点我](https://www.youtube.com/watch?v=nMsyAUfPshE&t=246s)

官方教程：[点我](https://www.cpolar.com/blog/cpolar-quick-start-tutorial-ubuntu-series)

docker版安装：[点我](https://www.cpolar.com/blog/docker-container-installation-cpolar)

#### **cpolar的部署（Alpine服务器）**

1.  查看AlpineLinux架构

```
lscpu
```

1.  下载cpolar并解压

> 当前使用版本：[https://wwvj.lanzoum.com/iHbEy2tefv7e](https://wwvj.lanzoum.com/iHbEy2tefv7e)

```
curl -L https://www.cpolar.com/static/downloads/releases/3.3.12/cpolar-stable-linux-amd64.zip -o cpolar-stable-linux-amd64.zip
unzip cpolar-stable-linux-amd64.zip 
mv cpolar /usr/local/bin/
```

1.  制作alpine服务（service）文件（cpolar的配置文件yml）

> mkdir -p /etc/cpolar  
> vi /etc/cpolar/cpolar.yml

```
# vi: set shiftwidth=2 tabstop=2 softtabstop=2 ai expandtab:
authtoken: your_auth_token
tunnels:
  website:
    addr: 8080
    proto: http
  ssh:
    proto: tcp
    addr: 22
```

1.  制作alpine服务（service）文件（脚本）

> touch /etc/init.d/cpolar  
> vi /etc/init.d/cpolar

```
#!/sbin/openrc-run

name="cpolar"
command="/usr/local/bin/cpolar"
command_args="--config /etc/cpolar/cpolar.yml -log /var/log/cpolar/access.log"
pidfile="/run/cpolar.pid"
depend() {
    need net
    before docker
}
start() {
    ebegin "Starting cpolar"
    start-stop-daemon --start --background --pidfile $pidfile --exec $command -- $command_args
    eend $?
}
stop() {
    ebegin "Stopping cpolar"
    start-stop-daemon --stop --pidfile $pidfile
    eend $?
}
```

> chmod +x /etc/init.d/cpolar

1.  使用cpolar服务

```
rc-update add cpolar default

rc-service cpolar status
#可使用选项
#  -start
#  -restart
#  -stop
#  -status
```

1.  开启cpolar隧道

```
cpolar authtoken xxxxxxx
```

> 检证命令：  
> `cpolar http 8080`

**实验完毕，垃圾别用！！！**

![](http://www.kdocs.cn/api/v3/office/copy/TCtnSVpVN0JkUCtmN053dHFCOUxzUmNzZUxvbW9VelQzL3F0Mkh5TUg1bWNwUmFSL2drWjZwNWlWQVFWaUl3dlpqd2ZuMkVqQXBFUUlVQjdDanpCVUNhMnpzQVc2L3lTMDZoNEVlMmtlakR5VUZtbkVleUtSUlJaR1NlMTBFNVhSZ3NmL2xVLytONXVVeWFqMG1TY0ZWVFpYajlHa2xrcCtmR1dtNzdDNnV4aUE4UERYVnhwZkp3aGFSZXJkaVFCN1UxYmVOZ0xta1ZtRmtUYTZsY1pnc3JjRU41a0o2QkVobFpQKzVhTGh4VGlWa0ZEZUFIeHNvaGo1aDVmaUFybVhwUHNDazVaa0xnPQ==/attach/object/7CEEE3Q7AAAFU?)
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTQwMDI3NTUwN119
-->
