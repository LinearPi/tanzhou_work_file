### django基础

知识点：

1. 基本认知
2. 工具准备
3. 新建项目
4. 目录及文件说明
5. 开发服务器
6. 创建视图函数
7. 新建应用(app)

#### 1.基本认知

`Django `是用`Python`开发的一个免费开源的Web框架，可以用于快速搭建高性能，优雅的网站！

`Web`应用框架（`Web application framework`）是一种开发框架，用来支持动态网站，网络应用程序及网络服务的开发。

![web应用框架](图片1.png)

http服务器：用来接受用户请求，并将请求转发给web应用框架进行处理。Web应用框架处理完以后再发送给http服务器，http服务器再返回给用户。

#### 2.工具准备

linux  +   python3   +   pycharm + mysql

python3：virtualenv，django，pymysql

安装django:   `pip install django==1.11`

首先，我们要保证我们使用的python3环境中安装好了django模块。

```shell
检测是否安装成功：
pyvip@ubuntu:~$ workon
envpy3
py2env
pyvip@ubuntu:~$ workon envpy3
(envpy3) pyvip@ubuntu:~$ python
Python 3.5.2 (default, Sep 14 2017, 22:51:06) 
[GCC 5.4.0 20160609] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import django
>>> django.get_version()
'1.11.7'
>>> 

注：在linux下通过workon命令，可以查看当前系统中存在的虚拟环境，
通过workon envpy3命令进入这个虚拟环境中。
在虚拟机环境中进入python3，然后导入django模块，当我们用django.get_version()能查看到版本号时，就证明安装成功了。
```

关于虚拟环境的几条命令：

```
mkvirtualenv envname：创建运行环境envname
workon命令查看目前有哪些虚拟环境
workon envname 快速进入虚拟环境
deactivate: 退出终端环境
```

#### 3.新建项目

`django-admin startproject hello_django`

通过上面的命令创建一个django的项目。

```shell
(envpy3) pyvip@ubuntu:~$ ls
test.py  tktest  tools
(envpy3) pyvip@ubuntu:~$ cd tktest
(envpy3) pyvip@ubuntu:~/tktest$ ls
(envpy3) pyvip@ubuntu:~/tktest$ django-admin startproject hello_django
(envpy3) pyvip@ubuntu:~/tktest$ ls
hello_django
(envpy3) pyvip@ubuntu:~/tktest$ cd hello_django
(envpy3) pyvip@ubuntu:~/tktest/hello_django$ ls
hello_django  manage.py
(envpy3) pyvip@ubuntu:~/tktest/hello_django$ 
```

项目创建完成后，在本地建立相同的项目名称的空目录，打开pycharm设置好代码同步，接下来就可以用pycharm进行django的开发了。

#### 4.Django目录及文件说明

```
(envpy3) pyvip@ubuntu:~/tktest$ cd hello_django/
(envpy3) pyvip@ubuntu:~/tktest/hello_django$ tree
├── hello_django
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── manage.py

manage.py django中的一个命令行工具
__init__.py 空文件，告诉python这个目录是python包
setting.py 配置文件，包含数据库信息，调试标志，静态文件等。
urls.py  Django项目的URL声明
wsgi.py 部署服务器用到的
```

#### 5.开发服务器

因为我们用的是linux上面的环境，所以为了让我们在windows的浏览器上能访问到我们的服务器，那么需要修改setting.py的文件，将里面的`ALLOWED_HOSTS = []` 改成`ALLOWED_HOSTS = ['*']`，这样才能使我们在本地能访问到我们linux上面的服务器。

接下来就要验证一下你的Django项目是否工作。

`python  manage.py runserver 0:8000`

在我们的xshell的hello_django的目录下输入上面的命令，当你看到下面的内容时说明服务器已经启动。

```
(envpy3) pyvip@ubuntu:~/tktest/hello_django$ python manage.py runserver 0:8000
Performing system checks...

System check identified no issues (0 silenced).

You have 13 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions.
Run 'python manage.py migrate' to apply them.

November 11, 2017 - 14:12:29
Django version 1.11.7, using settings 'hello_django.settings'
Starting development server at http://0:8000/
Quit the server with CONTROL-C.

```

当服务启动后，我们打开浏览器输入ip:端口回车就能看到`It workd!`的页面，这就说明我们已经访问到了我们linux上面的django开发服务器了。

#### 6.创建视图函数

在pycharm的hello_django目录下创建views.py视图函数。

```python
# hello_django/views.py
from django.http import HttpResponse

def index(request):
    return HttpResponse('hello django!')
```

定义试图函数相关的URL（hello_django/urls.py）

```python
# hello_django/urls.py
from django.conf.urls import url
from django.contrib import admin
from . import views
urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^hello/', views.index),
]
```

文件保存好后，检查服务器是否正常运行，然后在浏览器上输入`ip地址:8000端口/hello`就能在网页上查看到`hello django!`

#### 7.新建应用(app)

一个项目可以包含多个应用,下面是创建应用的命令：

`python manage.py startapp books`

```shell
(envpy3) pyvip@ubuntu:~/tktest/hello_django$ python manage.py startapp books
(envpy3) pyvip@ubuntu:~/tktest/hello_django$ ls
books  db.sqlite3  hello_django  manage.py
(envpy3) pyvip@ubuntu:~/tktest/hello_django$ 
```

应用创建成功后，在pycharm中右键选中项目，选择`Deployment`>>`Download from test`，将我们在linux上创建的应用下载到本地上来。（这里的test是我们之前创建同步代码的连接名称）