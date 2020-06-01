# koa2
自学koa2

线上测试数据库两张表：1、用户表;2:、设备表

写接口对其进行CRUD操作

koa.js 为文件主要入口，引入了koa框架、koa-router路由、koa2-cors跨域、bodyParser和自写的controller

DB.js 连接数据库

controller.js 读取API文件下的每个js文件，统一进行路由处理

API文件下的js文件 为对应数据表进行crud操作
***

# 数据库操作语句
因为直接对数据库操作，因此又去学了数据库部分语句补充在从次
### 基本查询
```
SELECT * FROM <表名> WHERE <条件表达式>
```
### 条件查询
```
SELECT * FROM students WHERE id=1

SELECT * FROM students WHERE score >= 80 AND gender = 'M';

SELECT * FROM students WHERE score >= 80 OR gender = 'M';

SELECT * FROM students WHERE NOT class_id = 2      （WHERE  class_id <> 2）

// 优先级NOT AND OR

WHERE score >= 60 AND score <= 90

WHERE score BETWEEN 60 AND 90
```
### 投影查询
```
SELECT 列1, 列2, 列3 FROM <表名>

SELECT 列1 别名1, 列2 别名2, 列3 别名3 FROM<表名>

SELECT id, score points, name FROM students;
```
### 排序
```
SELECT * FROM students ORDER BY score; // 默认ASC升序

SELECT * FROM students ORDER BY score DESC; // 降序

SELECT * FROM students ORDER BY score, id; // 先按score升序，如果score相同按id升序
```
### 分页查询
```
// LIMIT <M> OFFSET <N>
// LIMIT:pageSize
// OFFSET:pageSize*(pageIndex-1)

SELECT * FROM students LIMIT 3 OFFSET 0; // 一页三个，第一页

SELECT * FROM students LIMIT 3 OFFSET 3; //  一页三个，第二页

SELECT CEILING(COUNT(*) / 3) FROM students; // 获取总页数
```
### 聚合查询
```
// 获取数量
SELECT COUNT(*) FROM students; 

// 某列总和
SELECT SUM(score) FROM students

// 某列平均
SELECT AVG(score) FROM students

// 某列最大
SELECT MAX(score) FROM students

// 某列最大
SELECT MIN(score) FROM students
```

### 分组聚合
```
// 分别搜索各个班级人的数量 

SELECT class_id, COUNT(*) num FROM students GROUP BY class_id;

// 统计各班的男生和女生人数：

SELECT class_id, gender, COUNT(*) num FROM students GROUP BY class_id, gender;
```

### 多表查询
```
SELECT
s.id sid,
s.name,
s.gender,
s.score,
c.id cid,
c.name cname
FROM students s, classes c;
```

### 连接查询
```
SELECT s.id, s.name, s.class_id, c.name class_name, s.gender, s.score
FROM students s
INNER JOIN classes c
ON s.class_id = c.id;
```
INNER JOIN只返回同时存在于两张表的行数据

RIGHT OUTER JOIN返回右表都存在的行

LEFT OUTER JOIN则返回左表都存在的行

FULL OUTER JOIN则是选出左右表都存在的记录：

### 插入数据,可以通过where实现多条数据改动
```
INSERT INTO students (class_id, name, gender, score) VALUES (2, '大牛', 'M', 80);

INSERT INTO students (class_id, name, gender, score) VALUES(1, '大宝', 'M', 87),(2, '二宝', 'M', 81);
```

### 更新数据，没有where整张表被更新
```
UPDATE students SET name='大牛', score=66 WHERE id=1;
```

### 删除数据，没有where整张表被删除
```
DELETE FROM students WHERE id=1;
```

### 插入或替换：如果我们希望插入一条新记录（INSERT），但如果记录已经存在，就先删除原记录，再插入新记录
```
REPLACE INTO students (id, class_id, name, gender, score) VALUES (1, 1, '小明', 'F', 99);
```

### 插入或更新：如果我们希望插入一条新记录（INSERT），但如果记录已经存在，就更新该记录
```
INSERT INTO students (id, class_id, name, gender, score) VALUES (1, 1, '小明', 'F', 99) ON DUPLICATE KEY UPDATE name='小明', gender='F', score=99;
```

### 插入或忽略：如果我们希望插入一条新记录（INSERT），但如果记录已经存在，就啥事也不干直接忽略
```
INSERT IGNORE INTO students (id, class_id, name, gender, score) VALUES (1, 1, '小明', 'F', 99);
```

### 事务
把多条语句作为一个整体进行操作的功能。可以确保该事务范围内的所有操作都可以全部成功或者全部失败。如果事务失败，那么效果就和没有执行这些SQL一样，不会对数据库数据有任何改动。

```
BEGIN;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;

UPDATE accounts SET balance = balance + 100 WHERE id = 2;

ROLLBACK;
```
Isolation Level | 脏读(Dirty Read) | 不可重复读(Non Repeatable Read) | 幻读(Phantom Read)
-|-|-
Read Uncommitted |	Yes | Yes   | Yes
Read Committed	 |  -   | Yes	| Yes
Repeatable Read	 |  -   |  -	| Yes
Serializable	 |  -	|  -    |  - 

脏读：一个事务会读到另一个事务更新后但未提交的数据，如果另一个事务回滚，那么当前事务读到的数据就是脏数据

不可重复读：在一个事务内，多次读同一数据，在这个事务还没有结束时，如果另一个事务恰好修改了这个数据，那么，在第一个事务中，两次读取的数据就可能不一致

幻读：在一个事务中，第一次查询某条记录，发现没有，但是，当试图更新这条不存在的记录时，竟然能成功，并且，再次读取同一条记录，它就神奇地出现了。

在MySQL中，如果使用InnoDB，默认的隔离级别是Repeatable Read。