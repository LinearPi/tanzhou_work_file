#### 教学监督热线：400-1567-315

### mysql数据库

#### 知识要点：

1. 数据操作增、删、改
2. 外键约束要求
3. 一对多表关系
4. 一对一表关系
5. 多对多表关系
6. 外键约束的参照操作

### 数据操作

#### 插入数据

方法一：

```sql
INSERT [INTO] table_name [(column_name,...)] 
{VALUES|VALUE} ({expr|DEFAULT},...),(...),...;
```

方法二：

```sql
INSERT [INTO] tbl_name SET col_name={expr|DEFAULT},...;
```

```mysql
#例：
mysql> CREATE TABLE `tb1`(
    -> `id` INT PRIMARY KEY AUTO_INCREMENT,
    -> `name` VARCHAR(20) NOT NULL,
    -> `age` INT DEFAULT 18
    -> );
Query OK, 0 rows affected (0.54 sec)

mysql> INSERT INTO `tb1`(`name`)
    -> VALUES('rose'),
    ->       ('taka')
    -> ;
Query OK, 2 rows affected (0.08 sec)
Records: 2  Duplicates: 0  Warnings: 0

mysql> SELECT * FROM `tb1`;
+----+-------+------+
| id | name  | age  |
+----+-------+------+
|  1 | rose  |   18 |
|  2 | taka  |   18 |
+----+-------+------+
2 rows in set (0.00 sec)

mysql> INSERT INTO `tb1` SET `name`='taka';
Query OK, 1 row affected (0.07 sec)

mysql> INSERT INTO `tb1` SET `name`='budong',`age`=24;
Query OK, 1 row affected (0.07 sec)
```

#### 更新数据

```mysql
UPDATE  tb_name 
SET col_name1={expr1|DEFAULT}[,col_name2={expr2|DEFAULT}]...
[WHERE where_condition];
```

```mysql
#例：
mysql> SELECT * FROM `tb1`;
+----+--------+------+
| id | name   | age  |
+----+--------+------+
|  1 | rose   |   18 |
|  2 | tulple |   18 |
|  3 | taka   |   18 |
|  4 | budong |   24 |
+----+--------+------+
4 rows in set (0.00 sec)

mysql> UPDATE `tb1` SET `age`=`age`+1;
Query OK, 4 rows affected (0.06 sec)
Rows matched: 4  Changed: 4  Warnings: 0

mysql> UPDATE `tb1` SET `age`=20 WHERE `name`='taka';
Query OK, 1 row affected (0.10 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> UPDATE `tb1` SET `age`=21 WHERE `id`<3;
Query OK, 2 rows affected (0.10 sec)
Rows matched: 2  Changed: 2  Warnings: 0

mysql>
```

#### 删除数据

```sql
DELETE FROM tbl_name [WHERE where_conditon]; 
```

不添加WHERE则会删除全部记录

```mysql
#例：
mysql> SELECT * FROM `tb1`;
+----+--------+------+
| id | name   | age  |
+----+--------+------+
|  1 | rose   |   21 |
|  2 | tuple  |   21 |
|  3 | taka   |   21 |
|  4 | budong |   26 |
+----+--------+------+
4 rows in set (0.00 sec)

mysql> DELETE FROM `tb1` WHERE `id`=4;
Query OK, 1 row affected (0.06 sec)

mysql> DELETE FROM `tb1`;
Query OK, 3 rows affected (0.13 sec)

mysql> SELECT * FROM `tb1`;
Empty set (0.00 sec)

mysql>
```

### 外键约束`FOREIGN KEY` 

外键约束`FOREIGN KEY`，保持数据一致性，完整性实现一对一或一对多关系。

##### 外键约束的要求：

数据表的存储引擎只能为InnoDB
外键列和参照列数据类型一致
外键必须关联到键上面去

```mysql
 #添加外键的格式:
ALTER TABLE yourtablename
    ADD [CONSTRAINT 外键名] FOREIGN KEY [id] (index_col_name, ...)
    REFERENCES tbl_name (index_col_name, ...)
    [ON DELETE {CASCADE | SET NULL | NO ACTION | RESTRICT}]
    [ON UPDATE {CASCADE | SET NULL | NO ACTION | RESTRICT}]
```

##### 一对多关系

举例，学校中一个学院可以有很多的学生，而一个学生只属于某一个学院（通常情况下），学院与学生之间的关系就是一对多的关系，通过外键关联来实现这种关系。

```mysql
#例：
#创建学院表：
mysql> CREATE TABLE `department`(
    -> `id` INT PRIMARY KEY AUTO_INCREMENT,
    -> `name` VARCHAR(15) NOT NULL
    -> );
Query OK, 0 rows affected (0.61 sec)

#创建学生表：
mysql> CREATE TABLE `student`(
    -> `id` INT PRIMARY KEY AUTO_INCREMENT,
    -> `name` VARCHAR(20) NOT NULL,
    -> `dept_id` INT,
    -> FOREIGN KEY (`dept_id`) REFERENCES `department`(`id`)
    -> );
Query OK, 0 rows affected (0.51 sec)

#插入数据
mysql> INSERT INTO `department`(`name`)
    -> VALUES('A'),
    ->       ('B')
    -> ;
Query OK, 2 rows affected (0.10 sec)
Records: 2  Duplicates: 0  Warnings: 0

mysql> INSERT INTO `student`(`name`,`dept_id`)
    -> VALUES('s1',1),
    ->       ('s2',2),
    ->       ('s3',2)
    -> ;
Query OK, 3 rows affected (0.08 sec)
Records: 3  Duplicates: 0  Warnings: 0
```

##### 一对一关系

举例，学生表中有学号、姓名、学院，但学生还有些比如电话，家庭住址等比较私密的信息，这些信息不会放在学生表当中，会新建一个学生的详细信息表来存放。这时的学生表和学生的详细信息表两者的关系就是一对一的关系，因为一个学生只有一条详细信息。用外键加主键的方式来实现这种关系。

```mysql
#例：
#学生表：
mysql> DESC `student`;
+---------+-------------+------+-----+---------+----------------+
| Field   | Type        | Null | Key | Default | Extra          |
+---------+-------------+------+-----+---------+----------------+
| id      | int(11)     | NO   | PRI | NULL    | auto_increment |
| name    | varchar(20) | NO   |     | NULL    |                |
| dept_id | int(11)     | YES  | MUL | NULL    |                |
+---------+-------------+------+-----+---------+----------------+
3 rows in set (0.06 sec)

#建立详细学生表：
mysql> CREATE TABLE `student_details`(
    -> `id` INT PRIMARY KEY,
    -> `age` INT,
    -> `gender` CHAR(1),
    -> FOREIGN KEY (`id`) REFERENCES `student`(`id`)
    -> );
Query OK, 0 rows affected (0.67 sec)

mysql>
```

##### 多对多关系

举例，学生要报名选修课，一个学生可以报名多门课程，一个课程有很多的学生报名，那么学生表和课程表两者就形成了多对多关系。对于多对多关系，需要创建第三张关系表，关系表中通过外键加主键的形式实现这种关系。

```mysql
#例：
#建立课程表：
mysql> CREATE TABLE `course`(
    -> `id` INT PRIMARY KEY AUTO_INCREMENT,
    -> `name` VARCHAR(20) NOT NULL,
    -> );
Query OK, 0 rows affected (1.18 sec)

#学生与课程多对多关系表
mysql> CREATE TABLE `select`(
    -> `s_id` INT,
    -> `crs_id` INT,
    -> PRIMARY KEY (`s_id`,`crs_id`),
    -> FOREIGN KEY (`s_id`) REFERENCES `student` (`id`),
    -> FOREIGN KEY (`crs_id`) REFERENCES `course` (`id`)
    -> );
Query OK, 0 rows affected (0.50 sec)
```

##### 外键约束的参照操作：

```mysql
1.CASCADE从父表删除或更新时自动删除或更新子表中的匹配行
2.SET NULL从父表删除或更新行时，设置子表中的外键列为NULL。
如果使用该选项，必须保证子表列没有指定NOT NULL
3.RESTRICT拒绝对父表的删除或更新操作
4.NO ACTION标准的SQL关键字，在mysql中与RESTRICT作用相同
```