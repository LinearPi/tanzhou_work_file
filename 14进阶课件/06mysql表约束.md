#### 教学监督热线：400-1567-315

### mysql数据库

#### 知识要点：

1. 表结构操作
2. 非空约束
3. 唯一约束
4. 主键约束
5. 自增长
6. 默认约束
7. 外键约束

### 表结构的操作

`ALTER TABLE 'tbname'`

增加 ：ADD
删除 ：DROP 
修改 ：MODIFY

### 非空约束

`NULL`  字段值可以为空

`NOT NULL`  字段值不能为空

```
例：
mysql> CREATE TABLE `tb11`(
    -> `id` INT,
    -> `name` VARCHAR(20)
    -> );
Query OK, 0 rows affected (0.11 sec)

mysql> DESC `tb11`;
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| id    | int(11)     | YES  |     | NULL    |       |
| name  | varchar(20) | YES  |     | NULL    |       |
+-------+-------------+------+-----+---------+-------+
2 rows in set (0.00 sec)

mysql> INSERT INTO `tb11`
    -> VALUES(1,'aa'),
    ->       (2,'bb');
Query OK, 2 rows affected (0.00 sec)
Records: 2  Duplicates: 0  Warnings: 0
mysql> INSERT INTO `tb11`(`id`)
    -> VALUES(3);
Query OK, 1 row affected (0.00 sec)
mysql> SELECT * FROM `tb11`;
+------+------+
| id   | name |
+------+------+
|    1 | aa   |
|    2 | bb   |
|    3 | NULL |
+------+------+
3 rows in set (0.00 sec)
mysql> ALTER TABLE `tb11`
    -> MODIFY `name` VARCHAR(20) NOT NULL;
ERROR 1138 (22004): Invalid use of NULL value
mysql> DELETE FROM `tb11`
    -> WHERE `name` is NULL
    -> ;
Query OK, 1 row affected (0.00 sec)

mysql> ALTER TABLE `tb11`
    -> MODIFY `name` VARCHAR(20) NOT NULL;
Query OK, 0 rows affected (0.08 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql>
```

### 唯一约束

确保字段中的值的唯一`unique key` 

```
添加唯一约束
ALTER TABLE tbl_name ADD [CONSTRAINT[symbol]]
UNIQUE [INDEX|KEY] [index_name] [index_type]
(index_col_name)

删除唯一约束
ALTERT TABLE tbl_name DROP {INDEX|KEY} index_name
```

```
例：
mysql> SELECT * FROM `tb11`;
+------+------+
| id   | name |
+------+------+
|    1 | aa   |
|    2 | bb   |
+------+------+
2 rows in set (0.00 sec)
mysql> INSERT INTO `tb11`
    -> VALUES(2,'cc')
    -> ;
Query OK, 1 row affected (0.00 sec)
mysql> SELECT * FROM `tb11`;
+------+------+
| id   | name |
+------+------+
|    1 | aa   |
|    2 | bb   |
|    2 | cc  |
+------+------+
3 rows in set (0.00 sec)

mysql> CREATE TABLE `tb2`(
    -> `id` INT UNIQUE KEY,
    -> `name` VARCHAR(20) NOT NULL
    -> );

mysql> ALTER TABLE `tb2`
    -> MODIFY `id` INT NOT NULL UNIQUE KEY,
    -> ADD UNIQUE KEY(`name`)
    -> ;
```

### 主键约束

主键保证记录的唯一性
主键自动为`NOT NULL`
每张数据表只能存在一个主键
`NOT NULL + UNIQUE KEY`

一个`UNIQUE KEY` 又是一个`NOT NULL`的时候，那么它被当做`PRIMARY KEY `主键
当一张表里没有一个主键的时候，第一个出现的非空且为唯一的列被视为有主键。

```
添加主键约束
ALTER TABLE tbl_name ADD [CONSTRAINT[sysbol]]
PRIMARY KEY [index_type] (index_col_name)

删除主键约束
ALTER TABLE tbl_name DROP PRIMARY KEY

```

```
例：
mysql> CREATE TABLE `tb3`(
    -> `id` INT PRIMARY KEY,
    -> `name` VARCHAR(20) NOT NULL UNIQUE KEY
    -> );
mysql> ALTER TABLE `tb3`
    -> DROP PRIMARY KEY
    -> ;
mysql> ALTER TABLE `tb3`
    -> DROP KEY `name`
    -> ;
```

### 自增长`AUTO_INCREMENT `

`AUTO_INCREMENT` 自动编号，且必须与主键组合使用
默认情况下，起始值为1，每次的增量为1。
当插入记录时，如果为`AUTO_INCREMENT`数据列明确指定了一个数值，则会出现两种情况，

情况一，如果插入的值与已有的编号重复，则会出现出错信息，因为AUTO_INCREMENT数据列的值必须是唯一的；

情况二，如果插入的值大于已编号的值，则会把该插入到数据列中，并使在下一个编号将从这个新值开始递增。也就是说，可以跳过一些编号。如果自增序列的最大值被删除了，则在插入新记录时，该值被重用。

```
例：
mysql> INSERT INTO `tb3`(`name`)
    -> VALUES('aa'),
    ->       ('bb')
    -> ;
mysql> INSERT INTO `tb3`(`name`,`id`)
    -> VALUES ('cc',2);
ERROR 1062 (23000): Duplicate entry '2' for key 'PRIMARY'
mysql> INSERT INTO `tb3`(`name`,`id`)
    -> VALUES ('cc',5);
Query OK, 1 row affected (0.00 sec)

mysql> INSERT INTO `tb3`(`name`)
    -> VALUES ('dd')
    -> ;
```

### 默认约束`DEFAULT `

`DEFAULT `（默认约束）
初始值设置，插入记录时，如果没有明确为字段赋值，则自动赋予默认值。

```
添加/删除默认约束
ALTER TABLE tbl_name ALTER [COLUMN] col_name
{SET DEFAULT literal | DROP DEFAULT}
```

```
例：
mysql> CREATE TABLE `tb4`(
    -> `id` INT PRIMARY KEY AUTO_INCREMENT,
    -> `name` VARCHAR(20) NOT NULL
    -> )AUTO_INCREMENT=10
    -> ;
mysql> INSERT INTO `tb4`(`name`)
    -> VALUES('aa'),
    ->       ('bb')
    -> ;
mysql> ALTER TABLE `tb4`
    -> ADD `age` INT NOT NULL DEFAULT 18
    -> ;
mysql> ALTER TABLE `tb4`
    -> ALTER `name` SET DEFAULT 'xx'
    -> ;
    
```

### 外键约束`FOREING KEY `

```
外键约束要求数据表的存储引擎只能为InnoDB

查看当前mysql服务器支持的存储引擎
SHOW ENGINES \G

编辑数据表的默认存储引擎

MySQL配置文件  ->/etc/my.cnf

[mysqld]
default-storage-engine=INNODB

改完配置文件要重启服务

sudo service mysqld restart
```

```
例：
mysql> CREATE TABLE `department`(
    -> `d_id` INT PRIMARY KEY AUTO_INCREMENT,
    -> `name` VARCHAR(20) NOT NULL
    -> );
Query OK, 0 rows affected (0.02 sec)

mysql> CREATE TABLE `students`(
    -> `s_id` INT PRIMARY KEY AUTO_INCREMENT,
    -> `name` VARCHAR(20) NOT NULL,
    -> `dept_id` INT,
    -> FOREIGN KEY(`dept_id`) REFERENCES `department`(`d_id`)
    -> );
Query OK, 0 rows affected (0.02 sec)

mysql>
```