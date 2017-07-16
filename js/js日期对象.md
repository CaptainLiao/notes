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



#### toLocaleDateString()   

> `toLocaleDateString()   `函数返回的字符串由于地区、时间、语言等系统设置以及浏览器自身设置等原因，在不同的浏览器中显示的字符串并不一定相同。

````
//不同浏览器上的显示效果并不一定相同

//定义一个"2013-07-21"的Date对象
var date = new Date(2013, 6, 21, 13, 12, 59, 231);
document.writeln( date.toLocaleDateString() );
// IE：      2013年7月21日
// Chrome：  2013年7月21日
// FireFox： 2013/7/21

//定义一个"公元前200-06-28"的Date对象
var date2 = new Date(-199, 5, 28, 8, 24, 35, 105);
document.writeln( date2.toLocaleDateString() );
// IE：      Sun Jun 28 200 B.C.
// Chrome：  200年7月1日 (缺少负号，日期可能存在问题)
// FireFox：200/6/28 (缺少负号)
````

解决办法：利用`getFullYear()`、`getMonth()`、`getDate()`分别获取年、月、日

````
var baz;
(function(){
  var foo = 10;
  var bar = 2;
  baz = function(){
    return foo * bar;
  }
})();
baz();
````
#### 获取上一月的天数总数
````
function getCountDays() {
    var curDate = new Date();
    var curMonth = curDate.getMonth();
    curDate.setMonth(curMonth);
    curDate.setDate(0);
    return curDate.getDate();
}

````










