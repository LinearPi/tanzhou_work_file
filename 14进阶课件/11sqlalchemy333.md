#### 教学监督热线：400-1567-315

### SQLAlchemy第三节

#### 知识要点：表关系的实现

##### 1.代码复用。

在我们用sqlalchemy操作数据库时，有部分代码可以重复使用，我们将这部分放到一个模块中，后面使用就可以调用这个模块，导入里面的方法。



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

# 2. 声明映像
from sqlalchemy.ext.declarative import  declarative_base
Base = declarative_base(engine)



# 5.创建会话
from sqlalchemy.orm import sessionmaker
Session = sessionmaker(engine)
session = Session()

```

##### 2.一对多表关系的实现

我们在讲mysql的时候学院与学生的关系是一对多关系，下面是通过SQLAlchemy来表示这种关系。

```python
from connect import Base,session
from sqlalchemy import  Column,Integer,String,ForeignKey
from sqlalchemy.orm import relationship

class Department(Base):
    __tablename__ = 'department'
    d_id = Column(Integer,primary_key=True,autoincrement=True)
    d_name = Column(String(100))

    student = relationship('Student',backref='department')
    def __repr__(self):
        return '<Department(d_id="%s",d_name="%s")>' % (self.d_id, self.d_name)

class Student(Base):
    __tablename__ = 'student'

    s_id = Column(Integer,primary_key=True,autoincrement=True)
    s_name = Column(String(50))
    d_id = Column(Integer,ForeignKey('department.d_id'))

    def __repr__(self):
        return '<Student(s_id="%s",s_name="%s",d_id="%s")>' % (self.s_id, self.s_name, self.d_id)

Base.metadata.create_all()
```

讲`relationship`之前，先回顾一下，外键它是一个约束，但是并不是代表了关系，之前所讲的一对多，一对一和多对多关系都是在我们的逻辑上，外键约束不能代表这种关系，注意分清外键是约束，没有代表关系。

而在SQLAlchemy里面，这个`relationship`代表了一对多的关系，当然我们可以通过参数改变关系，它默认是一对多的关系，而这个关系是`SQLAlchemy`里面的，和数据库没有关系,但是`relationship`是和外键一起使用的。

通过`relationship`在学院的类中增加了一个学生的属性，在学生的类中增加学生的属性。这样我们就可以通过这个属性查出某个学院的所有的学生的列表，也可以查出某个学生的所属学院，还可以通过学院的学生列表往这个学院中添加学员。

##### 3.一对一表关系实现

我们在讲mysql的时候学生表与学生详细信息表的关系是一对一关系，下面是通过SQLAlchemy来表示这种关系。

```python
class Student(Base):
    __tablename__ = 'student'
    s_id = Column(Integer,primary_key=True,autoincrement=True)
    s_name = Column(String(50))
    d_id = Column(Integer,ForeignKey('department.d_id'))

    stu_details = relationship('Stu_details',uselist=False)
    def __repr__(self):
        return '<Student(s_id="%s",s_name="%s",d_id="%s")>' % (self.s_id, self.s_name, self.d_id)

class Stu_details(Base):
    __tablename__ = 'stu_details'
    id = Column(Integer,primary_key=True,autoincrement=True)
    age = Column(Integer)
    city = Column(String(100))
    s_id = Column(Integer,ForeignKey('student.s_id'),unique=True)

    student = relationship('Student')
```

在这里实现一对一关系和我们mysql中稍微的差别，我们通过外键加唯一键实现mysql层面的一对一，通过`relationship`中的`uselist=False`实现python层面的表关系。

##### 4.多对多关系的实现

我们在讲mysql的时候学生与课程的关系是多对多关系，下面是通过SQLAlchemy来表示这种关系。

```python
stu_course = Table('stu_course',Base.metadata,
	Column('s_id',Integer,ForeignKey('students.s_id'),primary_key=True),
	Column('c_id',Integer,ForeignKey('course.c_id'),primary_key=True)
	)
class Students(Base):
	__tablename__ = 'students'

	s_id = Column(Integer,primary_key=True)
	s_name = Column(String(100))

	course = relationship('Course',secondary=stu_course)

class Course(Base):
	__tablename__ = 'course'

	c_id = Column(Integer,primary_key=True)
	c_name = Column(String(100))

	students = relationship('Students',secondary=stu_course)
```

在多对多的关系中，我需要再建立一张表，通过这张表，我们建立多对多的关系。使用`relationship`当中`secondary`参数来获取中间表，表示多对多关系。



### 总结

在数据库中外键只有约束的功能，但是在`SQLAlchemy`中，`relationship`表示了关系，但是这个关系只是在`SQL Alchemy`里面，和数据库并没有关系，在`SQLALchemy`里面，其实也是转成`SQL`语句去做的，但是使用`SQLAlchemy`给我们提供的这个方法，可以让我们写跟少的`SQL`语言或者代码。



