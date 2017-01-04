# JavaScript Date 对象

### 基本语法

#### 实例化

```
var myDate = new Date();
```

> Date 对象会自动把当前日期和时间保存为其初始值。

### Date 对象方法

| 方法                | 描述                            |
| ----------------- | ----------------------------- |
| getDate()         | 从 Date 对象返回一个月中的某一天 (1 ~ 31)。 |
| getDay()          | 从 Date 对象返回一周中的某一天 (0 ~ 6)。   |
| getMonth()        | 从 Date 对象返回月份 (0 ~ 11)。       |
| getFullYears()    |                               |
| getHours()        |                               |
| getMinutes()      |                               |
| getMilliseconds() | 返回 Date 对象的毫秒(0 ~ 999)。       |
| setTime()         | 以毫秒设置 Date 对象。                |
| parse()           | 返回1970年1月1日午夜到指定日期（字符串）的毫秒数   |

 ### Date 实用方法

#### 判断某天是星期几

````
var today = new Date().getDay();
console.log("今天是星期" + ['一','二','三','四','五','六','日'][today-1]);
var str = "今天是星期" + "日一二三四五六".charAt(new Date().getDay());alert(str);  
console.log("今天是星期" + '一二三四五六日'.substring(today-1,today));
````

> substring(start, stop)
>
> start：必需。规定要提取子串的第一个字符的位置













