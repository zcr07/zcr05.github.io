
# 先要知道的一些内容

## **手机的系统架构是什么？如何看？**

> 手机的 CPU 通常使用 ARM 架构（如 ARMv7, ARMv8）或较少见的 x86 架构。ARM 架构是当前手机领域最常见的架构。

一些手机可以在【关于手机-->硬件信息中查看】

其他还是用第三方软件(如DevCheck[https://wwvj.lanzoum.com/b0065zsiaj](https://wwvj.lanzoum.com/b0065zsiaj)密码:cp5o)查看
![输入图片说明](/imgs/2025-04-21/3FYke9HgcxrdFiJD.png)
![输入图片说明](/imgs/2025-04-21/ZRqkMeDoNDOEU66j.png)![](http://www.kdocs.cn/api/v3/office/copy/dDQwOXhUeXF3Z0x1a2gxM3J6Vnp5ejBQOVZGZWVzR1U2QXdoSEhSU1g1aWN0a1BoaUk2N2h3d1QzT0dPRXBrNXlzYVZWeTc2RXJ2K0xxc1B1QWZMbUxPUzcrZ0RCb0dzQ2EvY3pNYXArenE3VGpuSnRYc2xpNFUwS1cwU01MWXdPWk81ZElGS1FzZ1JGN21Ra1A0R3pXcDUwUkFuNTlydWxPNWlOUDF6VmVsMWtJaUpQKzVQTXNhRmVaZkVTWmVGdFliMk5ZTS84dWhlbENKc25obWlyVTRCQ2JCTW5pMkppWldTL3UwUjlQVUxIZTc5T05nN0w3c053R3p4N3VSTVMzOFptUStJMWhFPQ==/attach/object/37FR4WA7AAQBG?)

## **linux，乌班图，德班系统是在什么系统架构上运行的？**

> Linux、Ubuntu 和 Debian 操作系统可以运行在多种系统架构上，主要包括：  
> **x86（i386）**：32 位架构，适用于较旧的计算机系统。  
> **x86_64（amd64）**：64 位架构，广泛应用于现代桌面和服务器处理器。  
> **ARM（armel、armhf、arm64）**：常用于移动设备、嵌入式系统和单板计算机，如树莓派。  
> **其他架构**：如 PowerPC（ppc64el）、MIPS（mips、mipsel、mips64el）、RISC-V（riscv64）等，针对特定硬件平台。

要确定 Linux 系统运行在哪种架构上

```
#Linux系统
uname -m

#Debian 和其衍生系统（如 Ubuntu）
dpkg --print-architecture
```

## **什么架构的系统可以支持Docker运行？**

> Docker支持在多种系统架构上运行  
> **x86-64**：适用于大多数桌面和服务器级处理器。  
> **ARM**：常见于移动设备和嵌入式系统。  
> **s390x**：IBM大型机系统的架构。  
> **ppc64le**：IBM Power处理器的架构。
<!--stackedit_data:
eyJoaXN0b3J5IjpbNTAxNDgzNzE0XX0=
-->