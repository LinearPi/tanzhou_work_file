#### 教学监督热线：400-1567-315

### LINUX基础

#### 知识要点

1. 进程管理
2. 程序安装与管理

主要命令：`ps` ,  `top` ,  `jobs`  , `fg`  , `bg`   ,  `kill`  , `rpm`  , `yum`  

### 进程管理

**1.进程的概念**

计算机实际上可以做的事情实质上非常简单，比如计算两个数的和，再比如在内存中寻找到某个地址等等。这些最基础的计算机动作被称为指令 (instruction)。所谓的程序(program)，就是这样一系列指令的所构成的集合。通过程序，我们可以让计算机完成复杂的操作。程序大多数时候被存储为可执行的文件。这样一个可执行文件就像是一个菜谱，计算机可以按照菜谱作出可口的饭菜。

[进程](http://www.cnblogs.com/vamei/archive/2012/09/20/2694466.html)是程序的一个具体实现。大家可以简单的理解为进程就是正在进行中的程序。一般来说，一个程序就是一个进程，但是很多情况下，程序为啦完成更多的事情，往往一个程序有多个进程。

**2.进程监视** 

查看所有进程 ： `ps aux` 

选项：

-a 显示一个终端所有进程
-u 显示进程的归属用户及内存使用情况
-x 显示没有控制终端的进程

```
ps 输出：
USER: 启动进程的用户
PID: 进程的ID号
%CPU: 进程占用的CPU百分比
%MEM: 进程占用的物理内存百分比
VSN: 进程使用的虚拟内存总量，单位KB
RSS:该进程占用实际物理内存的大小，单位KB
TTY: 该进程在哪个终端中运行
STAT: 进程状态
START: 启动进程的时间
TIME: 进程消耗CPU的时间
COMMAND: 产生此进程的命令名
STAT常见状态：
R 运行， S 睡眠，T 停止，s 包含子进程，+ 位于后台
```

动态查看系统运行情况`top`

选项：
-d 设置更新的时间间隔
-n 显示更新的次数，然后退出

```
top命令的交互模式当中可以执行的命令
h  显示交互模式的帮助
P  以CPU使用率排序，由大到小，默认
M  按内存占有大小排序，由大到小
N  以进程ID大小排序，由大到小
q  退出top程序
```

Linux 的进程分为前台进程和后台进程
前台进程占用终端窗口

`Ctrl + Z` 让正在前台执行的进程暂停

`jobs` 获取当前的后台作业号

```
进程例子：
[taka@taka ~]$ vi shishi.py
#!/usr/bin/env python3
import time
a = 0
while True:
    with open('insert.txt','a') as f1:
        f1.write(str(a)+'\n')
    a += 2
    time.sleep(2)
[taka@taka ~]$ python shishi.py
```

`fg`将进程从后台调到前台执行
`bg` 将进程放到后台执行

`kill`删除执行中的程序

常用的信号量：

```
HUP  1  终端断线 
INT  2  中断（同 Ctrl + C）
QUIT 3  退出（同 Ctrl + \） 
TERM 15 终止
KILL 9  强制终止 
CONT 18 继续（与STOP相反， fg/bg命令） 
STOP 19 暂停（同 Ctrl + Z）
```

`kill -9 进程id `  杀死进程

一般在命令之后加“&”，就可以放到后台执行。

### 程序安装与管理

`RPM`包管理机制最早是有`Red Hat`公司研制，然后由开源社区维护，是c`entos`上主要的软件包管理机制。

`yum`  基于`rpm`的软件包管理器，可以自动处理依赖关系

使用`yum`可以很方便的安装的软件，如`MySQL`等等，但是`yum`源一般比较的旧，不是特别的新，我们可以使用[163源](http://mirrors.163.com/.help/centos.html)，这样下载的时候会快一些，软件版本也会高一点。

```
[root@taka taka]# cd /
[root@taka /]# mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
[root@taka /]# yum install wget
[root@taka /]# cd /etc/yum.repos.d
[root@taka yum.repos.d]# wget http://mirrors.163.com/.help/CentOS6-Base-163.repo
[root@taka yum.repos.d]# yum clean all
[root@taka yum.repos.d]# yum makecache
#按照以上步骤就可安装163源
```

`yum`源很方便，但是有时候我们需要安装高版本的软件的时候，`yum`安装就满足不了我们要求，这个时候我们可以去下载`rpm`包，然后用`rpm`包去安装。

`rpm`总结

```
rpm -qa  |grep mysql  #查看已安装的某个软件
rpm -e mysql-...  #删除某个安装包
rpm -ivh mysql...  #安装某个安装包

#选项
-a 显示安装的所有软件列表
-e 从系统中移除指定的软件包
-h 安装软件时输出hash记号：#
-i 安装软件时显示软件包的相关信息
-l 显示软件包中的列表
-v 安装软件时显示命令的执行过程
-q 使用询问模式，当遇到任何问题时，rpm指令会先询问用户
-p 查询软件包的文件
```

在`Linux`上除了``yum``和`rpm`安装之外，还有源码包的安装，上次我们安装`python3`的时候就是使用源码安装的。

在Linux上，不是所有的有的软件都能通过`yum`或者`rpm`等其他类似的包管理工具就能安装好，很多时候需要自己去编译安装，各种软件的编译安装所需要的依赖也不一样，但是在网上都可以找到资料，大家安装的时候可以先找找资料然后多操作几次就行。

##### 安装软件方式

yum install vim 

rpm -ivh

源码包安装python3.6

#### 远程连接linux上面的mysql

1.创建mysql的普通用户

```shell
创建一个管理员用户taka账号，密码为 taka：
CREATE USER 'taka'@'%'IDENTIFIED BY 'taka';
给这个用户授予所有远程访问，这个用户主要用于管理整个数据库，备份，还原等操作。
GRANT ALL ON *.* TO 'taka'@'%';
使授权立即生效：
FLUSH PRIVILEGES;
```

2.修改配置文件，让3306端口对外开放

```shell
查看防火墙状态
service iptables status
编辑/etc/sysconfig/iptables 文件 打开3306端口
加上这句
-A INPUT -m state --state NEW -m tcp -p tcp --dport 3306 -j ACCEPT
重启iptables
service iptables restart
查看状态
service iptables status
```

3.在cmd中测试ip及端口

```shell
windows cmd 
ping ip  #地址看是否能ping 通
打开Telnet客户端
telnet ip 端口 #是否能连上相应的端口
```

4.远程连接数据库

```shell
到cmd中输入xxxxx是你linux的ip地址
mysql -hxxxxx -P3306 -utaka -p
```

```
注意：
vbox上面，网络连接方式是桥接模式。或是用的vm:
在Linux使用ifconfig 查看到的ip地址。
mysql -h172.16.201.130 -P3306 -utaka -p

vbox上面，网络连接方式是nat端口转发方式：
mysql -h127.0.0.1 -P2222 -utaka -p
```