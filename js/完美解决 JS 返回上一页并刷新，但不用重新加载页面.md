# 完美解决 JS 返回上一页并刷新，但不用重新加载页面

### 需求

有三个页面A、B、C，点击A=>B，点击B=>C，在C中添加内容，点击确定返回到B，此时B页面需展示在C中添加的内容，同时，点击B页面的返回按钮需返回到A。（当然，A、B、C中都有返回按钮可以返回到之前的页面）

### 分析需求

显然，此需求有两个功能：

* 页面中的返回上一页功能
* C中添加内容，返回B后刷新页面，同时保证B页面返回功能的正常使用

### 解决方案

针对第一个问题，我们很容易想到`history.back()`或者`history.go(-1)`

难点在第二个问题，最开始我是这样解决的：`loacation.href = document.referrer`，此时，B页面内容正确显示，但**点击返回按钮却到了C**。

分析原因，原来是`loacation.href`相当于重新加载了一次B页面，那么当前B页面的上一页自然就是C了。

有没有办法使得B页面不重新加载，但更新内容呢？

使用Ajax！！！**浏览器加载页面后，会缓存HTML，每次加载页面都会执行一遍`JS`**

1、C 页面点击确定后使用`history.go(-1)`，返回到B页面

2、在 B 页面通过`$.ajax()`获取内容

````
var xhr = $.ajax({
  type: 'GET',
  url: '/api/xxx/xx',
  timeout: 5000,
  dataType: 'json',
  beforeSend: function(XHR){
    // todo
  },
  success: function(json){
    //
  },
  error: function(){},
  complete: function(xhr,status){}
})
````

3、重点，使用自执行函数渲染页面

````
<script>
	function B(){};
	B.prototype.getData(){
      var xhr = $.ajax({...})
	};
	B.prototype.renderPage(){
      this.getDate();
      // render...
	};
	!function(window){
      var b = new B();
      b.renderPage();
	}(window)
</script>
````

这下应该成了吧。NO! C点击确定后返回到B，B内容依然没有更新。。。

这是为什么呢？

百度搜索无果，情急之下只有求救大神

大神说，可能是`GET`请求发出后，由于URL没有变化，浏览器可能会从缓存中读取数据而导致内容更新失败。

* 使用POST请求，强制从服务器获取数据
* 仍然使用GET，改变当前页面的`url`，方法是在`url`末尾添加一段随机字符串

两种方法都能实现需求，这里再说说方法二：

````
var xhr = $.ajax({
  type: 'GET',
  url: '/api/xxx/xx',
  timeout: 5000,
  dataType: 'json',
  data: {flag: new Data().getTime().toString(36)}, // 在GET方法内添加一个任意key，随机字符串改变
  beforeSend: function(XHR){
    // todo
  },
  success: function(json){
    //
  },
  error: function(){},
  complete: function(xhr,status){}
})
````
![](http://images2015.cnblogs.com/blog/1085489/201702/1085489-20170210162457276-1741060678.gif)




