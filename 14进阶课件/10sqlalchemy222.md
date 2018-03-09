#### 教学监督热线：400-1567-315

### SQLAlchemy第二节

#### 知识要点

1. 常用过滤方法
2. Column类常用参数
3. sqlalchemy常用数据类型
4. 表关系的实现

#### 常用过滤方法

filter和filter_by的区别：

filter 引用列名时，使用“类名.属性名”的方式，比较使用两个等号“==”
filter_by 引用列名时，使用“属性名”，比较使用一个等号“=”

```
等于:
session.query(User).filter(User.username == 'taka').all()

不等于:
session.query(User).filter(User.username != 'taka').all()

模糊匹配like:
session.query(User).filter(User.username.like('taka%')).all()

成员所属（in_）：
session.query(User).filter(User.username.in_(['tk','塔卡','taka'])).all()

不属于notin:
session.query(User).filter(~User.username.in_(['tk','塔卡','taka'])).all()
session.query(User).filter(User.username.notin_(['tk','塔卡','taka'])).all()

为空is null:
session.query(User).filter(User.username==None).all()
# 或者是
session.query(User).filter(User.username.is_(None)).all()

不为空is not null:
session.query(User).filter(User.username != None).all()
# 或者是
session.query(User).filter(User.username.isnot(None)).all()

多个条件and:
session.query(User).filter(User.username=='taka',User.password=='123456').all()
session.query(User).filter_by(username='tk',password='1234').all()

条件或or:
from sqlalchemy import or_ 
session.query(User).filter(or_(User.username=='tk',User.password=='123456')).all()
```



#### Column常用参数

1. primary_key：主键，True和False。
2. autoincrement：是否自动增长，True和False。
3. unique：是否唯一。
4. nullable：是否可空，默认是True。
5. default：默认值。



#### sqlalchemy常用数据类型

1. Integer：整型，映射到数据库中的int类型。
2. String：字符类型，映射到数据库中的varchar类型，使用时，需要提供一个字符长度。
3. Text：文本类型，映射到数据库中的text类型。
4. Boolean：布尔类型，映射到数据库中的tinyint类型，在使用的时候，传递True/False进去。

5. Date：日期类型，没有时间。映射到数据库中是date类型，
  在使用的时候，传递datetime.date()进去。
6. DateTime：日期时间类型。映射到数据库中的是datetime类型，
  在使用的时候，传递datetime.datetime()进去。
7. Float：浮点类型。

