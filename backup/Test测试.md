
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

![Image](https://raw.githubusercontent.com/MyMaskKing/MyMaskKing.github.io/main/assets/images/Test测试/img_3b908c20b8.png)

![Image](https://raw.githubusercontent.com/MyMaskKing/MyMaskKing.github.io/main/assets/images/Test测试/img_877224537a.png)
<!--stackedit_data:
eyJoaXN0b3J5IjpbOTA2MzgzMzYzXX0=
-->
