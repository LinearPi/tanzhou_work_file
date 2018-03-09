#### 教学监督热线：400-1567-315

### SQLAlchemy 

#### 知识要点

1. 基本认知
2. 工具准备
3. 连接数据库
4. 声明映像
5. 创建类
6. 类映射到数据库的表中
7. 数据操作

#### 基本认知

ORM 全称 `Object Relational Mapping`对象关系映射。

SQLAlchemy 是一个数据库的ORM框架，python操作数据库的工具ORM 将数据库中的表与面向对象语言中的类建立了一种对应关系。简单来说，使用`SQLAlchemy`可以不用考虑使用的是什么数据库，只要是用`SQLAlchemy`提供的方式写好语句，`SQLAlchemy`会自动根据你连接的数据库把你写的语句转化成对应的数据库`SQL`语句。

#### 工具准备

第一、mysql  数据库。

第二、pymysql 用于连接 MySQL 服务器的一个库

​           通过e装 : pip install pymysql

第三、sqlalchemy 数据库的ORM框架

​           通过pip安装 : pip install sqlalchemy

```
注意：
pip安装是在python的环境变量配置好的前提下打开windows上的命令提示符进行安装。
安装完成后打开python IDLE,通过import sqlalchemy测试是否安装成功。
```

#### 连接数据库

从sqlalchemy中导入create_engin，创建引擎建立与数据库的连接。

`from sqlalchemy import create_engine`

准备连接数据库的数据：
HOSTNAME = '127.0.0.1'        # ip地址
PORT = '3306'                          # 端口号
DATABASE = 'mydb'                # 数据库名
USERNAME = 'taka'                 # 用户名
PASSWORD = 'taka'                 # 用户登录密码

DB_URI的格式:
数据库类型+数据库驱动名称://用户名:密码@机器地址:端口号/数据库名?字符编码
DB_URI=`mysql+pymysql://<username>:<password>@<host>/<dbname>charset=utf8` 

engine = create_engine(DB_URI)

我们可以尝试着测试一下是否连接上:

`print(dir(engine))`,当有打印出方法时，表示连接成功。

```python
# 1.连接数据库
from sqlalchemy import  create_engine

HOSTNAME = '127.0.0.1'  # ip地址
PORT = '3306'  # 端口号
DATABASE = 'mydb'  # 数据库名
USERNAME = 'taka'  # 用户名
PASSWORD = 'taka'  # 用户登录密码
DB_URI = 'mysql+pymysql://{}:{}@{}:{}/{}?charset=utf8'.format(USERNAME, PASSWORD, HOSTNAME, PORT, DATABASE)
engine = create_engine(DB_URI)

if __name__=='__main__':
    print(dir(engine))
```

#### 声明映像

对象关系型映射，数据库中的表与python中的类相对应，创建的类必须继承自sqlalchemy中的基类。

使用Declarative方法定义的映射类依据一个基类，
这个基类是维系类和数据表关系的目录
应用通常只需要有一个base的实例。我们通过declarative_base()功能创建一个基类

```python
# 2. 声明映像
from sqlalchemy.ext.declarative import  declarative_base
Base = declarative_base(engine)
```

#### 创建数据表对应的类

再次强调，我们用类来表示数据库里面的表！！！

这些表的类都继承于我们的Base基类
定义好一些属性，与user表中的字段进行映射并且这个属性要属于某个类型

Column用来创建表中的字段的一个方法

sqlalchemy常用的数据类型
Integer：整形，映射到数据库中的int类型。
String：字符类型，映射到数据库中的varchar类型，使用时，需要提供一个字符长度。

```python
# 3. 创建表对应的类
from sqlalchemy import  Column,Integer,String
class User(Base):
    __tablename__ = 'user'
    id = Column(Integer,primary_key=True,autoincrement=True)
    name = Column(String(50),nullable=False)
    password = Column(String(100))
    def __repr__(self):
        return '<User(id="%s",username="%s",password="%s)>' % (self.id, self.username, self.password)

# 4. 将创建好的user类，映射到数据库的user表中---
Base.metadata.create_all()
```

#### 数据操作

之前的操作都是准备工作，提供一个类似与交互模式的环境，让我们能够进行增删改查的操作。

在我们对表数据进行增删改查之前，先需要建立会话，建立会话之后才能进行操作，就类似于文件要打开之后才能对文件内容操作。

##### 创建会话 

需要定义个session会话对象 
sessionmaker初始化一个类对象

```python
# 5.创建会话
from sqlalchemy.orm import sessionmaker
Session = sessionmaker(engine)
session = Session
```

##### 增

我们通过sqlalchemy往表里面插入数据，需要先有这表的映射，也就是上面我们创建的类，然后我们通过会话来进行需要的操作。
将创建的user对象添加到会话对象中
添加单个对象：
`session.add(user)`
添加多个对象：
`session.add_all([user1,user2,....])`
将会话对象进行提交:
`session.commit()`
如果你不想将修改提交则使用回滚:`session.rollback()`

```python
# 增
def add_user():
    # 添加单个对象
    taka = User(name='taka',password='123456')
    budong = User(name='budong',password='888888')
    session.add(taka)
    session.add(budong)
    # 添加多个对象
    ls = [User(name='which',password='888888'),
          User(name='rose',password='666666')]
    session.add_all(ls)
    # 提交才会生效
    session.commit()
```

##### 查 

通过session的query这个对象完成的
 查找User这张表中的所有数据
session.query(User).all()
 查找User这张表中的第一条数据
session.query(User).first()
 通过username=taka来进行过滤查找
session.query(User).filter_by(username='taka')
 通过get方法，用主键查找对象
session.query(User).get(primary_key)

补充：
filter 引用列名时，使用“类名.属性名”的方式，比较使用两个等号“==”
filter_by 引用列名时，使用“属性名”，比较使用一个等号“=” 赋值这种形式

```python
# 查
def search_user():
    # 查所有的记录
    rs = session.query(User).all()
    print(rs)
    # 查第一条记录
    rs = session.query(User).first()
    print(rs)
    # 查询password='888888'的数据
    rs = session.query(User).filter_by(password='888888').all()
    print(rs)
    # 查询name=‘taka’的数据
    rs = session.query(User).filter(User.name=='taka').all()
    print(rs)
```

##### 改 

先从数据库中找到数据
修改成需要的数据,也可以使用update修改。
改完之后做事物的提交操作:
user = session.query(User).filter_by(id=3)[0]
user.username = 'kakakakak'
session.commit()

```python
# 改
def update():
    # 将name='taka'改成'kakakaka'
    user = session.query(User).filter_by(name='taka').first()
    user.name='kakakaka'
    # 将name='rose'的密码改成‘1123456’
    session.query(User).filter(User.name=='rose').update({User.password:'123456'})
    session.commit()
```

##### 删

先从数据库中获取数据
使用session.delete方法进行删除
做事务的提交操作：
user = session.query(User).filter_by(username='taka').first()
user.delete(user)
session.commit()

```python
# 删
def delete_user():
    rs = session.query(User).filter_by(name='budong')[0]
    session.delete(rs)
    session.commit()
```