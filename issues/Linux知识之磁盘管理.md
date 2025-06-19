#### 磁盘管理

👋

#### **MBR(主启动记录模式)**

**最多4个主分区，1个扩展分区(无法储存数据，只能在创建逻辑分区保存数据)**

1.  先分区

fdisk /dev/sdb

-   n新建分区

-   p打印分区信息

1.  格式化分区

mkfs -t xfs /dev/sdb1

修改分区类型 mkfs.xfs -f /dev/sdb1

1.  挂载分区

mount /dev/sdb1 /data #临时修改

vi /etc/fstdb #永久修改

mount -a #读取mount(/etc/fstdb)的内容

#### **GPT分区（推荐）**

**无限分区**

1.  先分区

parted /dev/sdb

(parted)mktable gpt

(parted)mkpart

(parted)print

1.  格式化和挂载

#### 逻辑分区 （底层的空间单位为PE,默认4M）

**如果不指定PE单位的话，例如设置lv=9M，就会给3个PE=12M，浪费了3M无法使用**

**工作中通常不指定PE，lvm会自动指定PE来提高分区效率的**

vgcreate 物理卷组 /dev/sdc1

vgcreate -s 1M 物理卷组 /dev/sdc2 **#1M这个物理卷组分配单位是1M，而不是默认的4M**

vgextend 物理卷组 /dev/sdc2 **#扩容物理卷组**

vgs

pvdisplay vgdisplay lvdisplay #查看详细信息

lvcreate -L 1G -n 逻辑卷名 物理卷组

lvcreate -l 40 -n 逻辑卷名 物理卷组 **#划分40M逻辑磁盘**

mkfs.xfs /dev/ansible/nginx #格式化

lvextend -L +200M /dev/ansible/nginx

xfs_growfs /dev/ansible/nginx **#格式化扩容空间(仅适用于xfs)**

resize2fs /dev/ansible/nginx **#格式化****扩容或缩小****空间(仅适用于ext系列**

#### 逻辑分区删除

lvremove /dev/ansbile/nginx

vgremove /物理卷组

pvremove /dev/sdc1

**补充**

跨系统格式：exFAT

XFS:大量的小文件或非常大的文件，并且需要高性能和可扩展性

EXT4:需要稳定性和广泛支持的通用应用，或者需要经常调整文件系统大小的场景

lsblk -f #查看所有的磁盘信息(**已格式化的会显示磁盘类型**)

**blkid 设**

**/etc/fstdb的内容格式：**

硬盘路径(/dev/sab) 挂载点(/test) xfs 挂载选项(**defaults**) 是否备份(0) 检查文件系统的顺序(0)

----------

📌**对象存储：**非DB类的结构化(图片视频)数据存储系统**(磁盘内容访问次数收费)**，例如百度云盘WEB

**块存储：**类似于使用主机内置**硬盘**(**硬盘使用时长收费**)。使用前需要进行分区和格式化。

使用技术(读写效率高，安全性低)：

-   yum -y install targetcli **#服务端(提供磁盘卷)**

-   yum -y install iscsi-initiator-utils.x86_64 **#客户端**

**文件存储**：类似于**NFS**以**文件形式**存储数据**(磁盘使用量收费)**，形成一个有层次的树形结构虚拟磁盘。用户可以通过共享网络协议挂载（如NFS、CIFS）访问这些文件。

使用技术(读写效率高，安全性低)：

-   yum -y install nfs-utils **#(服务端及客户端)**

-   vim /etc/exports　**#(服务端配置)**

　/share 192.168.71.0/24(rw,no_root_squash)　**#设置访问者可以读写，不能使用root**

-   exportfs -vr **#检查是否配置成功(服务端配置)**

-   systemctl status rpcbind **#(服务端配置)**

-   systemctl status nfs-server **#(服务端配置)**

-   showmount -e 192.168.71.11 **#(客户端配置)**

-   vim /etc/fstdb **#(客户端配置)**
192.168.71.11:/share /testNFS nfs4 defaults 0 0
---
POST_TITLE:  Linux知识之磁盘管理

POST_CATEGORIES: 知识分享

POST_TAGS: Linux,学习

POST_STICKY:
<!--stackedit_data:
eyJoaXN0b3J5IjpbNzk0MjExNDM4LC0xODU3NzQ3Njk1XX0=
-->