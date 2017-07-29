# AJAX-HTTP全接触

## `XMLHttpRequest` 对象

### 1. 创建`XHR`

```javascript
var xhr;
if(window.XMLHttpRequest) {
  xhr = new XMLHttpRequest(); // IE7+,Firefox,Chrome,Opera,Safari
}else {
  xhr = new ActiveXObject("Microsoft.XMLHTTP"); // IE5, IE6
}
```

### 2. Ajax-HTTP 请求

#### 2.1 HTTP请求介绍

**一个完整的HTTP请求过程，通常有下面7个步骤：**

- 建立TCP连接
- Web浏览器向Web服务器发送请求命令
- Web浏览器发送请求头信息
- Web服务器应答
- Web服务器发送应答头信息
- Web服务器向浏览器发送数据
- Web服务器关闭TCP连接

**一个HTTP请求一般由四部分组成：**

- HTTP请求的方法或动作，GET/POST/DELETE

- 正在请求的URL

- 请求头

- ```javas
  Accept:application/json, text/javascript, */*; q=0.01
  Accept-Encoding:gzip, deflate
  Accept-Language:zh-CN,zh;q=0.8
  Connection:keep-alive
  Content-Length:34
  Content-Type:application/x-www-form-urlencoded; charset=UTF-8
  Host:www.imooc.com
  Origin:http://www.imooc.com
  Referer:http://www.imooc.com/video/5647
  User-Agent:Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36
  X-Requested-With:XMLHttpRequest
  ```

- 请求体，包含提交的查询字符串、表单信息等

*请求头和请求体一般用一行空格隔开*

**一个HTTP响应一般有三部分组成：**

- 一个数字和文字组成的状态码，用来显示请求是成功还是失败
- 响应头，包含服务器类型、时间日期、内容类型和长度等
- 响应体

#### 2.2 XHR 发送请求

* `open(method, url, async)`

  `async`: true 表示异步（默认），false表示同步

* `setRequestHeader("Content-type","application/x-www-form-urlencoded")`

* `send(string)`

#### 2.3 XHR取得响应

```{javas
xhr.onreadystatechange = function() {
  if(xhr.readyState === 4) {
    if(xhr.status > 200 && xhr.status < 300) {
      alert(xhr.responseText);
    }
  }
}
```

## 二、HTTP状态码



## 三、跨域

### 3.1域名的组成方式

`http://www.baidu.com:8080/scripts/jquery.js`

* `http://`：协议
* `www`：子域名
* `baidu.com`：主域名
* `8080`：端口号
* `scripts/jquery.js`：服务器资源地址

当协议、子域名、主域名、端口号任意一个不同时，都算作不同域

不同域之间相互通信请求资源，就是**跨域**

### 3.2 跨域的处理方法

#### 3.2.1 代理（后台配置）

*  通过在同域名的web服务器端创建一个代理

  北京服务器（域名： www.beijing.com）

  上海服务器（域名：www.shanghai.com）

* 在北京服务器的后台（www.beijing.com/proxy-shanghaiservice.php）来调用上海服务器（www.shanghai.com/service.php）的服务，然后再把响应结果返回给前端，这样前端调用北京同域名的服务就和调用上海的服务效果相同了。

#### 3.2.2 JSONP

*解决GET请求的跨域*

```javas
//在www.aaa.com页面中：
<script>
	function jsonp(json) {
      alert(json['name']);
	}
</scriipt>
<script src="http://www.bb.com/jsonp.js"></script>
// 在www.bb.com即服务器地址的内容为：
jsonp({
  'name': 'fay',
  'age': 25
});

// 在jQuery中使用jsonp
dataType: "jsonp",
jsonp: "callbackname"  // 取值随意
```

#### 3.2.3 XHR2

*`XMLHttpRequest`Level2 IE8- 不支持*

在服务器端做一些改造：

`header("Access-Control-Allow-Origin: *")`

`header("Access-Control-Allow-Methods: POST,GET")`













