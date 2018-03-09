#### 教学监督热线：400-1567-315

### LINUX基础

#### 知识要点

1. 查找命令
2. 帮助命令总结
3. 读取文件信息
4. 管道
5. 输出
6. vim 编辑器
7. 安装python

主要命令：  `find` , `locate` ,`less` ,  `more` , `cat` , `grep`  , `echo` , `vim` 

#### 1.查找命令

##### 命令搜索

`whereis` 搜索命令位置和帮助文档的位置

`which` 搜索位置和命令的别名

```
[taka@taka ~]$ whereis ls
ls: /bin/ls /usr/share/man/man1/ls.1.gz
[taka@taka ~]$ which ls
alias ls='ls --color=auto'
	/bin/ls
[taka@taka ~]$
```

##### 文件查找

`find` 命令格式：`find [-path] -options` 

```
path :要查找的目录，默认是当前目录
option:
-name 按文件名的某种规则的查找
-type 按文件类型查找
-size 按文件大小查找
通配符：
*匹配任意内容
?匹配任意一个字符
[]匹配任意一个中括号内的字符
```

```shell
[taka@taka ~]$ find /bin -name 'ping*'
/bin/ping6
/bin/ping
[taka@taka ~]$cd /bin
[taka@taka bin]$ find -name 'ping*'
./ping6
./ping
[taka@taka bin]$ find -name 'ping?'
./ping6
[taka@taka bin]$ find -size 60k
./sed
```

`locate`命令

安装：`sudo yum install mlocate`

locate 是在数据库中按文件名搜索，要查找的文件名中含有的字符串，搜索数据速度更快。搜索的数据库是： /var/lib/mlocate/mlocate.db  ，这个数据库，每天自动更新一次，在使用locate之前，可以使用updatedb命令，手动更新数据库。

初始化： sudo updatedb

```
[taka@taka ~]$ sudo yum install mlocate

[taka@taka ~]$ sudo updatedb
[taka@taka ~]$ locate ff*
/home/taka/ff1.txt
/home/taka/ff2.txt
/home/taka/ff3.txt
[taka@taka ~]$ 
```

```
[taka@taka ~]$ ls
a  b  ff.py  pass
[taka@taka ~]$ locate ff.py
/home/taka/ff.py
/usr/lib/python2.6/toaiff.py
/usr/lib/python2.6/toaiff.pyc
/usr/lib/python2.6/toaiff.pyo
[taka@taka ~]$ touch shishi.py
[taka@taka ~]$ ls
a  b  ff.py  pass  shishi.py
[taka@taka ~]$ locate shishi.py
[taka@taka ~]$ locate shishi.py
[taka@taka ~]$ sudo updatedb
[sudo] password for taka: 
[taka@taka ~]$ locate shishi.py
/home/taka/shishi.py
[taka@taka ~]$ 
```

`grep` 字符串搜索命令

在文件中搜索符合条件的字符串，包含匹配，包含字符串中的行
可使用正则表达式来匹配的内容。

命令格式：grep [选项] 字符串 文件名

常用选项：
-n 显示行号
-i 忽略大小写
-v 排除指定字符串

```
[taka@taka ~]$ grep root /etc/passwd
root:x:0:0:root:/root:/bin/bash
operator:x:11:0:operator:/root:/sbin/nologin
[taka@taka ~]$ grep -n root /etc/passwd
1:root:x:0:0:root:/root:/bin/bash
11:operator:x:11:0:operator:/root:/sbin/nologin
[taka@taka ~]$ grep -v root /etc/passwd
```

#### 2.帮助命令总结

`help`   简单帮助

`command(out)  --help`  外部命令

`help command(build_in)`  内部命令

```
例：
[taka@taka ~]$ help pwd

[taka@taka ~]$ ls --help
```

`man` 命令，查看帮助信息时和`less`命令 查看文档一样

#### 3.读取文件信息

`less`: 进入文件里面，可反复读取文件内容。

```
less 命令使用技巧：
直接上下键到跳行
下一行： e
上一行： y
下一页： 空格键 或 f 或 z
上一页： b 或 w
/string ： 向下搜寻string这个字符串
？string : 向上搜寻string这个字符串
n,N  ：n 继续下一个搜寻，N进行反向搜寻
帮助信息：h
退出 ： q 
```

`more` ：进入文件里面，只能向下读取，只能读取一次。

`cat` : 获取文件所有内容输出。

#### 4.管道

将一个程序或命令的的输出作为另一个程序或命令的的输入

管道可以把一系列命令连接起来，可以将前面的命令的输出作为后面命令的输入。使用管道符‘|‘来建立一个管道行。

```
[taka@taka ~]$ man man
[taka@taka ~]$ man man | more

```

#### 5.输出

```
标准输出 echo 
>   将内容写入一个文件中，如果这个文件存在则会删掉原来的内容
>>  将内容写入一个文件的末尾
例：
[taka@taka ~]$ echo 12345
12345
[taka@taka ~]$ ls
a  b  ff.py  pass  shishi.py
[taka@taka ~]$ echo 12345 > ff.py
[taka@taka ~]$ cat ff.py
12345
[taka@taka ~]$ cat /etc/passwd >> ff.py     
[taka@taka ~]$ cat ff.py

[taka@taka ~]$ cat ff.py | grep -n root
2:root:x:0:0:root:/root:/bin/bash
12:operator:x:11:0:operator:/root:/sbin/nologin
[taka@taka ~]$ 

```

#### 6.vim编辑器

安装vim

`sudo yum install vim`

工作模式：命令模式、输入模式、末行模式

模式之间切换，
多次按ESC可以进入命令模式
在命令模式下，按 i或o或a进入输入模式
在命令模式下，按shift+; ，末行出现:冒号则进入末行模式
按ESC回到命令模式

进入与退出：
vi filename 进入
当打开一个文件时处于命令模式

在末行模式下输入q退出文件
wq 保存退出
q! 不保存退出

移动光标
命令模式和编辑模式下都可以用上下左右键（或者h,j,k,l）

输入文本
在命令模式下
按 i 从光标所在位置前面开始插入资料
按 a 从光标所在位置后面开始输入资料
按 o 在光标所在行下方新增一行并进入输入模式
进入输入模式后，在最后一行会出现--INSERT--的字样

复制与粘贴
在命令模式下
yy 复制整行内容到vi缓冲区
yw 复制当前光标到单词尾内容到vi缓冲区
y$ 复制当前光标到行尾的内容到vi缓冲区
y^ 复制当前光标到行首的内容到vi缓冲区

p 读取vi缓冲区的内容，并粘贴到光标当前的位置

删除与修改
命令模式下
dd 删除光标所在行
x  删除光标所在字符
u  撤销上一次操作

保存文档
:q  结束编辑不保存退出，如果有修改不会退出
:q! 放弃所做的更改强制退出
:w  保存更改
:wq 保存更改并退出

### 安装python

python -V   查询本机python系统

sudo yum install epel-release
sudo yum install python34 

