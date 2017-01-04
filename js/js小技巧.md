# JS 小技巧

## 一、字符相关

### 1.1 字符串拼接变量

```
var a = 123;
document.body.innerHTML = '<p id="'+a+'">aaa</p>'

> "<p id="123">aaa</p>"
```

```
var a = 123;
document.body.innerHTML = '<p id='+a+'ff>aaa</p>'
"<p id=123ff>aaa</p>"
```


## 二、Date相关

### 2.1 时间戳和日期字符串相互转换

```
/*
* 获取当前时间戳（以S为单位）
*/
var timestamp = Data.parse(new Date());
timestamp = timestamp / 1000;
console.log("当前的时间戳为："+ timestamp);
/*
* 获取某个时间格式的时间戳
*/
var stringTime = "2016-07-10 10:20:20";
var timestamp2 = Date.parse(new Data(stringTime));
timestamp2 = timestamp2 / 1000;
console.log("当前的时间戳为："+ timestamp2);
/*
* 将时间戳转换成时间格式字符串
*/
var timestamp3 = 1403058804;
var newDate = new Date();
newDate.setTime(timestamp3 * 1000);

// Wed Jun 18 2014 
console.log(newDate.toDateString());

// Wed, 18 Jun 2014 02:33:24 GMT 
console.log(newDate.toGMTString());

// 2014-06-18T02:33:24.000Z
console.log(newDate.toISOString());

// 2014-06-18T02:33:24.000Z 
console.log(newDate.toJSON());

// 2014年6月18日 
console.log(newDate.toLocaleDateString());

// 2014年6月18日 上午10:33:24 
console.log(newDate.toLocaleString());

// 上午10:33:24 
console.log(newDate.toLocaleTimeString());

// Wed Jun 18 2014 10:33:24 GMT+0800 (中国标准时间)
console.log(newDate.toString());

// 10:33:24 GMT+0800 (中国标准时间) 
console.log(newDate.toTimeString());

// Wed, 18 Jun 2014 02:33:24 GMT
console.log(newDate.toUTCString());

```



