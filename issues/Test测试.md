
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

![](http://www.kdocs.cn/api/v3/office/copy/eFJCbDJ2T013anliL3NET2JQTms3cVh6VmNsSHpicFkzNVRzTGNwUDIvQkJFdEF5RTJPNkE2MmpMMWozQTVBVFQ3eWhZeFJVWFNJeitUdkwrY2M2cXVPZjJJQWFCTGlXcThuYlRsTS9YQlFPTE5PUzlQZm1OTnNocTdLd3FjSkRJdE1oTkIxTHJYNzRRVFlJZFgrVDhGeW80YlhnN2FqbkQ5R2JGU25kY2ZycjBmUjA0Tld4NW5WZ0ZLdHpybnVybUVWanhITTV1b1lIa00xME5rcmkzUDl4REZadjZyMGN6U2JXWlB6Q2l6TjVwTXpLa2tjRTRRVFFObllEVi92M2EzYWc4aDd6YlJnPQ==/attach/object/XEX5E2A7ABQFE?)

![](http://www.kdocs.cn/api/v3/office/copy/eFJCbDJ2T013anliL3NET2JQTms3cVh6VmNsSHpicFkzNVRzTGNwUDIvQkJFdEF5RTJPNkE2MmpMMWozQTVBVFQ3eWhZeFJVWFNJeitUdkwrY2M2cXVPZjJJQWFCTGlXcThuYlRsTS9YQlFPTE5PUzlQZm1OTnNocTdLd3FjSkRJdE1oTkIxTHJYNzRRVFlJZFgrVDhGeW80YlhnN2FqbkQ5R2JGU25kY2ZycjBmUjA0Tld4NW5WZ0ZLdHpybnVybUVWanhITTV1b1lIa00xME5rcmkzUDl4REZadjZyMGN6U2JXWlB6Q2l6TjVwTXpLa2tjRTRRVFFObllEVi92M2EzYWc4aDd6YlJnPQ==/attach/object/2ZQ5G2A7AAAAE?)
<!--stackedit_data:
eyJoaXN0b3J5IjpbOTA2MzgzMzYzXX0=
-->