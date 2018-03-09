#### 教学监督热线：400-1567-315

### LINUX基础

#### 知识要点

1. `alias`别名
2. 压缩解压
3. 打包
4. 链接命令
5. 文件权限

主要命令：`alias`  , `gzip`  , `bzip2`  ,  `tar`  , `ln`  , `chmod` 

#### 别名`alias` 

查看别名`alias`

定义命令别名格式：alias 新的命令='原命令 -选项/参数'

```shell
[taka@taka ~]$ alias ll
alias ll='ls -l --color=auto'
[taka@taka ~]$ alias la='ls -a'
```

取消别名：`unalias` 别名  

```shell
[taka@taka ~]$ unalias la
[taka@taka ~]$ la
-bash: la: command not found
```

这种定义别名的方式只在当次登录有效，如果要永久定义生效，可以修改用户（非全部用户）自己的`alias` ，修改~/.bashrc文件，在文件中加上自己定义的`alias` 。

这个修改要在下次登录才能生效，如果要立即生效则输入`source ~/.bashrc` 。

### 压缩解压

`linux`标准压缩工具`gzip`  ,`.bzip2` 

##### .gz格式压缩:

gzip 源文件
压缩为.gz格式的压缩文件，源文件会消失

gzip -c 源文件 > 压缩文件
压缩为.gz格式，使用了-c，并使用输出重定向，源文件保留

gzip -r 目录
压缩目录下所有的子文件，但是不能压缩目录

.gz格式解压缩
gzip -d 压缩文件
gunzip 压缩文件

```shell
例：
[taka@taka ~]$ ls
a  b  ff.py  pass  shishi.py
[taka@taka ~]$ gzip shishi.py
[taka@taka ~]$ ls
a  b  ff.py  pass  shishi.py.gz
[taka@taka ~]$ gzip -d shishi.py.gz 
[taka@taka ~]$ ls
a  b  ff.py  pass  shishi.py
[taka@taka ~]$ gzip -c shishi.py > shishi.py.gz
[taka@taka ~]$ ls
a  b  ff.py  pass  shishi.py  shishi.py.gz
[taka@taka ~]$ mv shishi.py a
[taka@taka ~]$ ls a
shishi.py
[taka@taka ~]$ gzip a
gzip: a is a directory -- ignored
[taka@taka ~]$ gzip -r a
[taka@taka ~]$ ls
a  b  ff.py  pass  shishi.py.gz
[taka@taka ~]$ ls a
shishi.py.gz
[taka@taka ~]$ gunzip -r a
[taka@taka ~]$ ls a
shishi.py
[taka@taka ~]$
```

##### `bzip2`格式压缩：

bzip2 源文件
压缩为.bz2格式，不保留源文件
bzip2 -k 源文件
压缩之后保留源文件

注：bzip2命令不能压缩目录

.bz2格式解压缩
bzip2 -d 压缩文件
bunzip2 压缩文件
解压缩，-k 保留压缩文件

```shell
例：
[taka@taka ~]$ ls
a  b  f1  ff1   shishi.py
[taka@taka ~]$ bzip2 shishi.py
[taka@taka ~]$ ls
a  b  f1  ff1  shishi.py.bz2
[taka@taka ~]$ bzip2 -d shishi.py.bz2 
[taka@taka ~]$ ls
a  b  f1  ff1  shishi.py
[taka@taka ~]$ bzip2 -k shishi.py 
[taka@taka ~]$ ls
a  b  f1  ff1  shishi.py  shishi.py.bz2
```

### 打包`tar` 

命令格式：tar -cvf 打包文件名 源文件

-c 打包
-v 显示过程
-f 指定打包后的文件名

解打包命令：

命令格式：tar -xvf 打包文件名
-x 解包

```shell
[taka@taka ~]$ cd a
[taka@taka a]$ ll
总用量 8
drwxrwxr-x. 2 taka taka 4096 7月  10 14:38 d1
-rw-rw-r--. 1 taka taka  959 7月  10 11:10 f1
-rw-rw-r--. 1 taka taka    0 7月   8 05:55 ff1
[taka@taka a]$ ll d1
总用量 4
-rw-rw-r--. 1 taka taka 822 7月  10 11:12 shishi.py
[taka@taka a]$ tar -cf x.tar d1 f1 ff1
[taka@taka a]$ ls
d1  f1  ff1  x.tar
[taka@taka a]$ mkdir d2
[taka@taka a]$ ls
d1  d2  f1  ff1  x.tar
[taka@taka a]$ ls
d1  d2  f1  ff1  x.tar
[taka@taka a]$ cd d2
[taka@taka d2]$ ls
[taka@taka d2]$ tar -xf ../x.tar
[taka@taka d2]$ ls
d1  f1  ff1
[taka@taka d2]$ ls d1
shishi.py
[taka@taka d2]$ 
```

### 打包压缩`tar.gz` `tar.bz2`

先打包再压缩
命令格式：
tar -zcf 压缩包名.tar.gz  源文件
解压缩：
tar -zxf 压缩包名.tar.gz

.tar.bz2压缩格式
tar -jcf 压缩包名.tar.bz2 源文件
解压缩：
tar -jxf 压缩包名.tar.bz2

```shell
例：
[taka@taka a]$ ls
d1  d2  f1  ff1  x.tar
[taka@taka a]$ ls d1
shishi.py
[taka@taka a]$ tar -zcf y.tar.gz d1 f1 ff1
[taka@taka a]$ ls
d1  d2  f1  ff1  x.tar  y.tar.gz
[taka@taka a]$ mkdir d3
[taka@taka a]$ cd d3
[taka@taka d3]$ ls
[taka@taka d3]$ tar -zxf ../y.tar.gz 
[taka@taka d3]$ ls
d1  f1  ff1
[taka@taka d3]$ ls d1
shishi.py
[taka@taka d4]$ cd ..
[taka@taka a]$ ls
d1  d2  d3  f1  ff1  x.tar  y.tar.gz
[taka@taka a]$ tar -jcf z.tar.bz2 d1 f1 ff1
[taka@taka a]$ ls
d1  d2  d3  f1  ff1  x.tar  y.tar.gz  z.tar.bz2
[taka@taka a]$ mkdir d4
[taka@taka a]$ cd d4
[taka@taka d4]$ tar -jxf ../z.tar.bz2 
[taka@taka d4]$ ls
d1  f1  ff1
[taka@taka d4]$ 
```

### 链接命令

命令格式： ln -s  源文件 目标文件

选项 ： -s 创建软链接

```shell
例：
[taka@taka ~]$ touch ff
[taka@taka ~]$ echo 1234 > ff
[taka@taka ~]$ cat ff
1234
[taka@taka ~]$ ln ff ff.hard
[taka@taka ~]$ ln -s ff ff.soft
[taka@taka ~]$ echo 'abcd' >> ff
[taka@taka ~]$ cat ff
1234
abcd
[taka@taka ~]$ cat ff.hard
1234
abcd
[taka@taka ~]$ cat ff.soft
1234
abcd
[taka@taka ~]$ rm ff
[taka@taka ~]$ cat ff.hard
1234
abcd
[taka@taka ~]$ cat ff.soft
cat: ff.soft: 没有那个文件或目录
```

### 文件权限

`ls -l` 查看文件信息，别名位`ll`

```shell
例：
[taka@taka b]$ ls
[taka@taka b]$ touch file.py
[taka@taka b]$ ll
总用量 0
-rw-rw-r--. 1 taka taka 0 7月  10 16:05 file.py
[taka@taka b]$
```

`-rw-rw-r--` 这10个字符的确定了文件类型和用户对文件的权限。

第1个字符代表文件类型：- 表示普通文件

后面9位每3位为一组 （rwx），读（r），写（w），执行（x）

第1组是u所有者的权限：rw- 代表文件的所有者taka用户有读和写的权限。 

第2组是g所属组的权限：rw- 代表与文件所有者在同一组的用户有读写的权限

第3组是o其他人的权限：r-- 代表其他的用户有读权限。

改变权限`chmod`

```shell
例：
[taka@taka ~]$ cd b
[taka@taka b]$ ll
总用量 4
-rw-rw-r--. 1 taka taka 11 7月  10 16:14 file.py
[taka@taka b]$ chmod u+x file.py
[taka@taka b]$ ll
总用量 4
-rwxrw-r--. 1 taka taka 11 7月  10 16:14 file.py
[taka@taka b]$ chmod u=rwx,g=rx,o=rx file.py
[taka@taka b]$ ll
总用量 4
-rwxr-xr-x. 1 taka taka 11 7月  10 16:14 file.py
[taka@taka b]$ chmod o-x file.py
[taka@taka b]$ ll
总用量 4
-rwxr-xr--. 1 taka taka 11 7月  10 16:14 file.py
[taka@taka b]$ 
```

通过符号更改权限外，也可以通过数字来更改
r 对应数字 4， w 对应数字 2，x 对应数字 1  。 那么rwx 就是数字7.

```shell
例：
[taka@taka b]$ chmod 755 file.py
[taka@taka b]$ ll
总用量 4
-rwxr-xr-x. 1 taka taka 11 7月  10 16:14 file.py
[taka@taka b]$ 
```