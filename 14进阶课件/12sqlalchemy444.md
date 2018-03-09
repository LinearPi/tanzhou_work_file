#### 教学监督热线：400-1567-315

### SQLAlchemy第四节

知识要点：

1.多表查询

2.原生SQL的查询

##### 多表查询

在MySQL中我们讲了多表查询，在`SQLAlchemy`中也有多表查询的概念

将我们之前创建好的五张表导入进来，这五张表有些有联系，有些表之间是没有联系的。

```python
from db_connect import  Base,session
from info import Department,Student,Course,Stu_details,stu_course

# 无联系的两张的查询，只要给出关联条件就可以查询
rs = session.query(Department.d_id,Department.d_name,
                   Course.c_id,Course.c_name).filter(Department.d_id==Course.c_id).all()

#也可以使用join
rs = session.query(Student.s_name,Course.c_name).join(Course,
                                                      Student.d_id==Course.c_id).all()


#多表查询
rs = session.query(Student.s_name,Course.c_name).join(stu_course).filter(Student.s_id==stu_course.c.s_id,
                                                                             Course.c_id==stu_course.c.c_id).all()

print(rs)
```

##### 原生SQL的操作

在实际的使用过程中，有些时候可能会遇到用SQLAlchemy不能够很好利用数据库的特性，或者需要写很多关联的时候，我们也可以写原生的SQL，然后使用SQLAlchemy去执行。

第一种：使用 Engine/ConnectionPooling/Dialect 进行数据库操作，Engine使用ConnectionPooling连接数据库，然后再通过Dialect执行SQL语句。

```python
from db_connect import  engine

# 插入数据
engine.execute(
    "INSERT INTO department(d_name) VALUES('设计')"
)
engine.execute(
    "INSERT INTO course(c_name) VALUES ('音乐鉴赏'),('就业指导')"
)

# 改
engine.execute(
    "UPDATE student SET d_id=3 WHERE s_id=4"
)

# 删
engine.execute(
    "DELETE FROM course WHERE c_id=4"
)

# 查
rs = engine.execute(
    "SELECT * FROM student"
)
print(rs.fetchone())
print(rs.fetchall())
```

第二种：使用 Schema Type/SQL Expression Language/Engine/ConnectionPooling/Dialect 进行数据库操作。Engine使用Schema Type创建一个特定的结构对象，之后通过SQL Expression Language将该对象转换成SQL语句，然后通过 ConnectionPooling 连接数据库，再然后通过 Dialect 执行SQL，并获取结果。

```python
from db_connect import  engine,Base
from sqlalchemy import Column,Integer,String,ForeignKey,Table

#创建user数据表
user = Table('user',Base.metadata,
             Column('id',Integer,primary_key=True),
             Column('name',String(20)),
             )

Base.metadata.create_all()

# 创建连接
conn = engine.connect()

# 插入数据
sql = user.insert().values(name='rose')
conn.execute(sql)
conn.close()

# 删除数据
sql = user.delete().where(user.c.id==2)
conn.execute(sql)
conn.close()

# 更新数据
sql = user.update().where(user.c.name=='xiaoming').values(name='xiaohong')
conn.execute(sql)
conn.close()
```
