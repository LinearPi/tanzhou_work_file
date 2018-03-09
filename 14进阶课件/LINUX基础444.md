#### 教学监督热线：400-1567-315

### LINUX基础

#### 知识要点

1. 进程管理
2. `mysql`的安装与配置

主要命令：`ps` ,  `top` ,  `jobs`  , `fg`  , `bg`   ,  `kill`  , `rpm`  , `yum`  

### 进程管理

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

### LINUX 上的mysql安装

`rpm` 软件包的管理工具

`yum`  基于rpm的软件包管理器，可以自动处理依赖关系

```
linux上的mysql安装

查看已经安装的mysql文件
rpm -qa | grep mysql

查看可以按的RPM包
yum list | grep ^mysql

安装mysql开发包及mysql服务端
sudo yum install mysql-devel mysql-server

启动mysql：
sudo service mysqld start
会出现非常多的信息，目的是对mysql数据库进行初始化操作


查看mysql服务是否开机自启动
chkconfig --list | grep mysqld

如果没有启动，可以通过下面语句来启动：
sudo chkconfig mysqld on

#通过命令给root账号设置密码为root
(注意：这个root账号是mysql的root账号，非Linux的root账号)
mysqladmin -u root password 'root'

通过 mysql -u root -p 命令来登录我们的mysql数据库了

进入mysql后
查看编码集
SHOW VARIABLES LIKE '%char%';

查看校对集
SHOW VARIABLES LIKE '%colla%';


改配置文件：

查看服务的状态
service mysqld status
关闭服务
sudo service mysqld stop


进入文件
vi /etc/my.cnf

# 服务端
[mysqld]
character-set-server=utf8
collation-server=utf8_general_ci

# 客户端：
[client]
default-character-set=utf8

重启服务
sudo service mysqld restart
```