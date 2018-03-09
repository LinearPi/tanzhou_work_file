#### 教学监督热线：400-1567-315

### MySQL数据库

#### 知识要点

1. 进入`mysql`
2. 创建/删除数据库
3. 创建表
4. 表结构

#### 进入mysql

`mysql`配置文件及目录

`windows`上面是安装目录下的my.ini

`linux`是`etc/my.cnf`

想要进入数据库先要满足几个条件：

1.`mysql`服务已经开启。

2.你有用户名及密码。

`linux` 上查看服务：`service mysqld status` 

`windows`上打开任务管理器查看服务

##### 连接数据库

```
本地连接：
mysql -u用户名 -p
输入密码

远程连接：
mysql  -hIP地址  -P端口 -u用户 -p
输入密码
```

判断是否在哪个数据库里:
`SELECT DATABASE();`

查看当前用户：
`SELECT user();` 

查看有哪些数据库：
`SHOW DATABASES;`

#### 创建数据库

`CREATE  {DATABASE | SCHEMA} [IF NOT EXISTS] db_name`

```
mysql> CREATE DATABASE `mydb`;
Query OK, 1 row affected (0.00 sec)
mysql> CREATE DATABASE `mydb`;
ERROR 1007 (HY000): Can't create database 'mydb'; database exists
mysql> CREATE DATABASE IF NOT EXISTS `mydb`;
Query OK, 1 row affected, 1 warning (0.00 sec)
mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mydb               |
| mysql              |
| performance_schema |
| sys                |
| test               |
+--------------------+
6 rows in set (0.00 sec)
mysql>
```

#### 删除数据库

`DROP {DATABASE | SCHEMA} [IF EXISTS] dbname;`

```
mysql> DROP DATABASE `mydb`;
Query OK, 0 rows affected (0.00 sec)
mysql> DROP DATABASE `mydb`;
ERROR 1008 (HY000): Can't drop database 'mydb'; database doesn't exist
mysql> DROP DATABASE IF EXISTS `mydb`;
Query OK, 0 rows affected, 1 warning (0.00 sec)
mysql>
```

##### 注意：

```
MySQL 语句的规范
关键字与函数名称全部大写
数据库名称、表名称、字段名称全部小写，用反引号括起来
SQL语句必须以分号结尾
```

##### 打开数据库

USE 数据库名称

进入mysql后，使用`SELECT DATABASE();` 后会发现当前并没有进入到某个数据库中，需要使用`use`来进入某个数据库中。

##### 查看数据库中的表

数据表（或称表）
是数据库最重要的组成部分之一，是其他对象的基础

查看数据表列表
`SHOW TABLES [FROM db_name]`

`SHOW TABLES`查看当前数据库中的数据表。

`SHOW TABLES FROM 'mysql'`查看`mysql`这个数据库中的数据表。

##### 创建数据表

```
CREATE TABLE [IF NOT EXISTS] table_name(
   column_name data_type,
)
```

```
例：
mysql> CREATE TABLE `tb1`(
    -> `id` INT,
    -> `name` VARCHAR(20)
    -> );
Query OK, 0 rows affected (0.02 sec)
mysql>
```

数据类型：
INT   整数类型
VARCHAR  变长字符串

查看创建的表:

`SHOW CREATE TABLE tb_name;(\G)`

```
例：
mysql> SHOW CREATE TABLE `tb1`\G
************** 1. row **********************
       Table: tb1
Create Table: CREATE TABLE `tb1` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8
1 row in set (0.00 sec)
mysql>
```

查看数据表结构
`DESCRIBE tb_name;`
`SHOW COLUMNS FROM 'tb_name';` 

```
例：
mysql> DESCRIBE `tb1`;
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| id    | int(11)     | YES  |     | NULL    |       |
| name  | varchar(20) | YES  |     | NULL    |       |
+-------+-------------+------+-----+---------+-------+
2 rows in set (0.00 sec)
```

##### 删除数据表

`DROP TABLE 'tablename';` 

##### 修改数据表结构

```
添加单列:
ALTER TABLE tb1_name ADD [COLUNM] col_name
column_definition [FIRST|AFTER col-name]
```

```
例：
mysql> ALTER TABLE `tb1`
    -> ADD `age` INT
    -> ;
Query OK, 0 rows affected (0.03 sec)
Records: 0  Duplicates: 0  Warnings: 0
mysql> ALTER TABLE `tb1`
    -> ADD `number` INT FIRST
    -> ;
Query OK, 0 rows affected (0.03 sec)
Records: 0  Duplicates: 0  Warnings: 0
```

```
添加多列:
ALTER TABLE tbl_name ADD [COLUMN]
(col_name column_definition,...)
```

```
例：
mysql> ALTER TABLE `tb1`
    -> ADD (`aa` INT,
    ->      `bb` INT,
    ->      `cc` INT
    -> );
Query OK, 0 rows affected (0.02 sec)
Records: 0  Duplicates: 0  Warnings: 0
mysql>
```

```
删除数据表中的列
ALTER TABLE tbl_name DROP [COLUMN] col_name ;
```

```
例：
mysql> ALTER TABLE `tb1`
    -> DROP `aa`
    -> ;
Query OK, 0 rows affected (0.03 sec)
Records: 0  Duplicates: 0  Warnings: 0
mysql> ALTER TABLE `tb1`
    -> DROP `bb`,
    -> DROP `cc`
    -> ;
Query OK, 0 rows affected (0.03 sec)
Records: 0  Duplicates: 0  Warnings: 0
```

##### 向数据表中输入数据

`INSERT [INTO] tb1_name [(col_name,..)] VALUES(val,...)`

```
例：
mysql> INSERT INTO `tb1`(`id`,`name`)
    -> VALUES(1,'rose'),
    ->       (2,'taka')
    -> ;
Query OK, 2 rows affected (0.00 sec)
Records: 2  Duplicates: 0  Warnings: 0
```