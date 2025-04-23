⭐⭐

**AList的docker****安装可以参考：**[**点我**](https://blog.csdn.net/2202_75326331/article/details/139613342)

docker版密码生成：

`# 随机生成一个密码`

`docker exec -it alist ./alist admin random`

``# 手动设置一个密码,`NEW_PASSWORD`是指你需要设置的密码``

`docker exec -it alist ./alist admin set NEW_PASSWORD`

----------

**AList官方的docker部署文档**：[点我](https://alist.nn.ci/zh/guide/install/docker.html#%E9%95%9C%E5%83%8F%E7%89%88%E6%9C%AC)

----------

**安卓版**参考这个[油管视频](https://www.youtube.com/watch?v=ZI539379XnY&t=192s)

----------

**无意中刷到的一个**[油管视频](https://blog.nbvil.com/nat/nat-cf/)**也是做的内网穿透访问AList,用的是Docker-Compose**

```
version: '3.3'
services:
  alist:
    image: 'xhofe/alist:latest'  # 使用 latest 稳定版
    container_name: alist
    volumes:
      - './alist:/opt/alist/data'  # 文件映射到当前目录，方便管理
    ports:
      - '5244:5244'
    environment:
      - PUID=0
      - PGID=0
      - UMASK=022
    restart: unless-stopped

  cloudflared:
    image: cloudflare/cloudflared:latest
    container_name: cloudflared
    restart: unless-stopped
    command: tunnel run
    environment:
      - TUNNEL_TOKEN=<your-tunnel-token>  # 提供 Token
```

```
docker-compose -f alist-compose.yml up -d
```





<!--stackedit_data:
eyJoaXN0b3J5IjpbMjE0MTYxNDMzNV19
-->
