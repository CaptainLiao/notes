在 Java 程序中，可以使用 Java DataSource 和 JDBC DataSource 操作数据库。虽然我们学习了用[JDBC DriverManager]来连接关系型数据库，但在实际的编程中，还需要更多操作。

### DataSource
如果你希望所开发的系统具有松散耦合的连接、用于事务管理的连接池、支持分布式系统等特性，那么 JDBC DataSource 将是一个绝佳选择。Java DataSource接口存在于javax.sql包中，它只声明了两个重载方法getConnection（）和getConnection（String str1，String str2）。

### JDBC DataSource
数据库供应商们可以通过不同的方法实现 DataSource 接口。例如，MySQL JDBC Driver 通过`com.mysql.jdbc.jdbc2.optional.MysqlDataSource`类实现了 DataSource 接口，而 Oracle 使用的是`oracle.jdbc.pool.OracleDataSource`类。

这些实现类提供了访问数据库服务的方法。JDBC DataSource 实现类提供了一些公共的能力：
* 通过缓存 PreparedStatement 来加速处理
* 连接超时设置
* 日志
* 结果集的最大阈值

### JDBC DataSource 小栗子
通过创建一个名为 JDBCDataSource 的项目来学习 MySQL 和 Oracle DataSoure 的基本实现类是如何获取数据连接的。项目截图如下：


