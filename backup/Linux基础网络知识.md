1. Wan/Lan
路由器-->交换机
网络设备的架构：一对一，一对多，多对多(星状集群)
2. 网络模型
💡网络层常见的协议：IP协议、ICMP协议和ARP协议等
ARP协议：就是把ip地址解析为mac地址
arm -a 
---
ICMP协议：例（ping命令）
---
四层协议：TCP/UPD
七层协议：Http/Https
数据发送
数据接收
协议数据单元
设备与层的对应关系
3. IP地址
平常的IP4地址192.168.1.1，子网掩码：255.255.255.0是十进制，IP6是16进制
👋IP类别优先看子网掩码，例：192.168.25.1/16是B类地址
子网掩码
A类/8（255.0.0.0）
B类/16(255.255.0.0)
C类/24(255.255.255.0)
其中8是因为255的2进制是8个1，下面的D，E类IP主要用于政府和医院等机构
私网IP段
🔔平常的家庭网络和公司都是私有网络，公网是全球唯一的
⭐网关使用的IP一般是xx.xx.xx.1或者xx.xx.xx.254,.255是不能使用的，只作为广播使用
简单记法:10-10,172.16-172.31,192.168-192.168
10.0.0.0 - 10.255.255.255
172.16.0.0 - 172.31.255.255
192.168.0.0 - 192.168.255.255
4. 交换机
转发原理
1. 初始化
2. 各个PC的MAC地址学习
👋交换机自主学习老化时间300s更新一次
3. 广播未知数据帧
4. PC回应
5. 交换机实现单薄通信
常用命令
enable 进入管理员模式
configure terminal 进入全局配置模式
interface fastEthernet 0/1 进入端口 fastEthernet：端口类型
show mac address-table 查看各个PC的Mac地址
vlan(虚拟局域网)
交换机和PC之间通过默认的vlan1进行静态交互，但是在同一台交换机内有不同网段PC的情况，通过在交换机内配置vlan名(或ID)，根据vlan找到其他交换机的同名vlan内的PC设备实现通信
目的：减少交互(广播)，减少因广播带来的延迟
vlan种类
💡（静态）基于端口，（动态）基于 MAC，基于 IP 
相关命令
#管理员模式
#创建Vlan第一种方法
swich#configure terminal
Switch(config)#vlan 5
Switch(config-vlan)#name 5hhh
#创建Vlan第二种方法
swich#vlan database 
Switch(vlan)#vlan 17 name 17v
#查看Vlan
swich#show vlan brief
swich#show vlan id 5
#把端口加到vlan中
Switch(config-if)#switchport access vlan 5
Switch(config)#interface range fastEthernet 0/2-10
Switch(config-if-range)#switchport access vlan 17
#删除vlan 方法1
swich#no vlan 5
#删除vlan 方法2,database下删除
switch(vlan)#no vlan 17trunk(交换机之间互通)
🔔由于n个vlan，交换机之间不会配置n个端口，所以通过trunk对数据包进行标识来实现不同网段PC在多个交换机内的通信。
注意：配置trunk后是通过vlanID(非名字)来进行查找的
#对交换机的端口进行trunk开通
Switch(config)#interface fastEthernet 0/24
Switch(config-if)#switchport mode trunk
Switch#show interface f 0/24 switchport
>>>Administrative Mode: trunk
>>>Operational Mode: trunk
>>>Trunking VLANs Enabled: ALL
#查看端口的信息
Switch#show interfaces f0/24 switchport问题1:在交换机中，不同vlangroup的同网段不能通信吗？
         交换机1（192.10.1.1 vlan:v1） 交换机2（192.10.1.2 vlan:v2）
回答1：不可以通信
5. 路由
问题2:交换机和路由器有什么区别
答案2：
交换机：同网段pc在不同交换机实现通信，通过vlan+trunk实现，端口可以绑定不同网段的pc,只需要在某个端口(254)开放trunk即可
路由器：不同网段的pc实现通信，但是路由器的端口必须绑定的是同网段的pc
📌网络协议->ARP协议：解决ip和mac地址的映射
ICMP协议：通过ip发送数据包检测双向的网络是否互通，例如ping
路由器(通过网关进行查找)：
1. 识别数据包的目标ip
2. 维护和检测发现的路径
Route#configure terminal
#进入路由器接口
Route(config)#in gigabitEthernet 0/0
#添加路由ip
Router(config-if)#ip address 192.168.2.254 255.255.255.0
#进制路由器接口关闭
Router(config-if)#no shutdown
#查看路由表
Route#show ip route6. VMWare
👋虚拟网络：
1. VMnet0(桥接模式)：接入宿主机的网络，相当于多了一个设备，和宿主机同一个网段
2. VMnet8(NAT)：把请求发送给宿主机，宿主机再转发请求
3. 上记以外(仅主机模式)：相对交换机的VLAN网络分区，不同网络端不能相互通信