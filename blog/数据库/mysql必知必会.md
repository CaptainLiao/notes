数据库：保存有组织的数据的容器。

表：【某种特定类型】数据的结构化清单，每个表的名字时唯一的。

列：表中的一个字段。所有表都是有一个或多个列组成的。
  *数据类型：每个列都有相应的数据类型，它限制该列中存储的数据。

行：表中的一个记录。

主键（primary key）：唯一标识表中每行的这个列（或这组列）。
  * 应该总是定义主键
  * 主键的最好习惯
    * 不更新主键列中的值；
    * 不重用主键列的值；
    * 不在主键列中使用可能会更改的值。
  
外键：外键为某个表中的一列，它包含另一个表的主键值。


创建计算字段
-----
直接从数据库中检索出转换、计算或格式化过的数据；而不是检索出数据，然后再在客户机应用程序或报告程序中重新格式化。

计算字段并不实际存在于数据库表中。计算字段是运行时在 SELECT 语句内创建的。

### 拼接字段 Concat
````
SELECT Concat(Trim(vend_name), '(', Trim(vend_country), ')') AS vend_title
FROM vendors
ORDER BY vend_name;
````

### 执行算术计算
计算字段的另一常见用途是对检索出的数据进行算术计算。MySQL 支持 + - * / 四种运算。
````
SELECT prod_id,
       quantity,
       item_price,
       quantity*item_price AS expanded_price
FROM orderitems
where order_num = 20005;
````
输出中显示的 expanded_price 列为一个计算字段，此计算为quantity*item_price 。客户机应用现在可以使用这个新计算列，就像使用其他列一样。

SELECT 子句顺序：
SELECT
FROM
WHERE
GROUP BY
HAVING
ORDER BY
LIMIT


联结
----
### 创建联结
````
SELECT vend_name, prod_name, prod_price
FROM vendors, products
WHERE vendors.vend_id = products.vend_id
ORDER BY vend_name, prod_name;
````

### 内部连接
下面的 SELECT 语句返回与前面例子完全相同的数据：
````
SELECT vend_name, prod_name, prod_price
FROM vendors INNER JOIN products
ON vendors.vend_id = products.vend_id
ORDER BY vend_name, prod_name;
````


插入数据 INSERT
-------
### 插入完整的行
````
INSERT INTO Customers
VALUES(NULL,
    'Pep E. LaPew',
    '100 Main Street',
    'Los Angeles',
    'CA'
    'USA');
````
应该尽量避免使用。上面的SQL语句高度依赖于表中列的定义次序，并且还依赖于其次序容易获得的信息。推荐下面的使用方式：
````
INSERT INTO Customers(cust_name,
    cust_email,
    cust_address,
    cust_city,
    cust_state,
    cust_country)
VALUES('Pep E. LaPew',
    NULL,
    '100 Main Street',
    'Los Angeles',
    'CA'
    'USA'),
    ('LOP E. LaPew',
    133.@136.cn,
    '100 Main Street',
    'Los Angeles',
    'CA'
    'CHINA');
````








