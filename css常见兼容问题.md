## CSS常见兼容性问题

### CSS Hack

#### 1. IE条件注释

IE条件注释法，即在正常代码之外添加判别IE浏览器或对应版本的条件注释，符合条件的浏览器或者版本号才回执行里边的代码。

```
<!--  lt是小于 gt是大于 lte是小于等于 gte是不小于 !是不等于 -->
<!-- [if IE]>
	你想要执行的代码 
<![endif]-->
<!-- [if lt IE 8]>
	你想要执行的代码 
<![endif]-->
<!-- [if ! IE 8]>
	你想要执行的代码 
<![endif]-->
```

#### 2. CSS 属性前缀

CSS属性前缀法，即是给css的属性添加前缀。比如 * 可以被IE6/IE7识别，但 _ 只能被IE6识别，IE6-IE10都可以识别 "\9"，IE6不能识别!important  FireFox不能识别 * _  \9

```
可以先使用“\9"标记，将IE分离出来，再用”*"分离出IE6/IE7，最后可以用“_”分离出IE6
.type{
	color: #111; /* all */

	color: #222\9; /* IE */
	*color: #333; /* IE6/IE7 */
	_color: #444; /* IE6 */
	}
所以可以按着优先级就能给特定的版本捎上特定颜色
```

```
一般来说，只有IE6不支持 !important 
所以可以这样
#example{
    width: 100px !important; /* IE7  FF */
    width: 110px; /* IE6 */

因为!important 具有最高优先级，所以此种方式可以区别出来~
```

#### 3. 选择器前缀

选择器前缀法，顾名思义，就是给选择器加上前缀。

```
IE6可识别 *div{color:red;}  
IE7可识别 *+div{color:red;}
```

### 主要的兼容性问题

#### 1. 最主要也是最常见的——reset css

就是浏览器对标签的默认支持不同，所以我们要统一，就要进行CSS reset . 最简单的初始化方法是 *{margin:0; padding:0;} 但不推荐，而且它也并不完善。

#### 2. IE6双边距bug

块属性标签添加了浮动float之后，若在浮动方向上也有margin值，则margin值会加倍。其实这种问题主要就是会把某些元素挤到了第二行

```
<style type="text/css">
	html,body,div{ margin: 0;padding: 0;}
	.wrap{width: 200px; height: 200px; border: 1px solid #333;}
	.box{float: left; /* display:inline */ ;margin-left: 10px; width: 80px; height: 80px; background-color: green;}
	</style>
</head>
<body>
<div class="wrap">
	<div class="box"></div>
	<div class="box"></div>
</div>
<script type="text/javascript">
</script>
</body>
```

IE6下左边的双边距 ~![img](http://img1.tuicool.com/2QBjE3N.png!web)

IE7的没问题          ~![img](http://img0.tuicool.com/qm6FZj.png!web)

解决的方式有两个：

1.给float元素添加display：inline 即可正常显示

2.就是hack处理了，对IE6进行 _margin-left:5px;

#### 3.上下margin重合问题

相邻的两个div margin-left margin-right 不会重合，但相邻的margin-top margin-bottom会重合。

解决办法就是不要同时采用top和bottom ,统一一些~

#### 4.有些浏览器解析img标签也有不同， 

img是行内的，一般都会紧接着排放，但是在有些情况下还是会突然出现个间距，解决办法是给它来个浮动  float

#### 5. 标签属性min-height是不兼容的

```
.box{min-height:100px;height:auto !important; height:100px; overflow:visible;}
```

另一方面，IE是不支持min-height这类属性的，所以有些时候也可以考虑使用CSS表达式

```大幅度
#container{ 
    min-width:600px;
    width: expression(document.body.clientWidth < 600? "600px":"auto");
}   
```

#### 6. 超链接样式混乱

主要是其CSS属性的排序问题。一般来说，最好按照这个顺序：L-V-H-A 

```
简单的记法是  love  hate 

a:link{}  a:visited{}  a:hover{}  a:active{}
```

#### 7. chrome下默认会将小于12px的文本强制按照12px来解析。解决办法是给其添加属性：

```
-webkit-text-size-adjust: none; 
-webkit-transform: scale(0.84,0.84);
```

#### 8. png24位的图片在IE6下面会出现背景，所以最好还是使用png8格式的

#### 9. 两种盒子模式：IE盒子模式和W3C标准模式，所以对象的实际宽度也要注意。

IE/Opera：对象的实际宽度 = (margin-left) + width + (margin-right)

Firefox/Mozilla：对象的实际宽度= (margin-left) + (border-left-width) + (padding- left) + width + (padding-right) + (border-right-width) + (margin-right)

#### 10. 消除ul、ol等列表的缩进

样式应写成:list-style:none;margin:0px;padding:0px; 其中margin属性对IE有效，padding属性对FireFox有效

#### 11. CSS控制透明度问题

一般就直接 opacity: 0.6 ; IE就 filter: alpha(opacity=60)

但在IE6下又有问题，所以又得弄成 filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=60);

#### 12. 有些时候图片下方会出现一条间隙，通常会出现在FF和IE6下面比如

```
<div><img src="1.jpg"/></div>

一般给img添加vertical-align属性即可，比如top middle center
img{verticle-align:center;}
```

#### 13. IE6下div高度无法小于10px

比如定义一条高2px的线条，FF和IE7都正常

![img](http://img0.tuicool.com/nAn2ya.png!web)

但IE6就是10px

![img](http://img2.tuicool.com/byAB73a.png!web)

解决的办法有两种：添加overflow属性或设置fontsize大小为高度大小  如：

```
<div style="height:2px;overflow:hidden;background:#000000;width:778px;"></div>

<div style="height:2px;font-size:2px;background:#000000;width:778px;">&nbps;</div>
```

#### 14. 容器不扩展问题

容器不扩展问题是我们经常遇到的。比如我们创建了一个div嵌套结构:
HTML：

<div id="divGroup">
  <div id="a">子容器a</div>
  <div id="b">子容器b</div>
</div>
CSS：

divGroup{

    border:2px solid #333;
}

a,#b{

    border:2px solid #333;
    float:left;
    margin:5px;
}[url=]![img](http://common.cnblogs.com/images/copycode.gif)[/url]

IE预览结果：

![img](http://pic002.cnblogs.com/images/2012/67078/2012011314483556.jpg)
Firefox预览结果：
![img](http://pic002.cnblogs.com/images/2012/67078/2012011314490844.jpg)

可见外层的高度并没有随着子容器的高度自动扩展，却是形成了一条线。这是因为当子容器成为浮动元素后，并脱离了文档流。因此父容器认为自己内容为空，从而造成了这样的结果。
解决问题：
解决方案是在容器的末尾加入个清理浮动的div。
修改后的HTML：

<div id="divGroup">
  <div id="a">子容器a</div>
  <div id="b">子容器b</div>
  <div .="clear:both;"></div>
</div>
如果还想防止这个元素占据父元素的高度，可以进一步优化成<div .="clear:both;display:block;font:0px/0px sans-serif;"> </div>，这样这个清除浮动的容器被认为是个不占任何高度的空格字符。在网页中的任何地方，当遇到容器不扩展时，只需加入此段便能修复问题。

#### 15. IE8和FireFox父子元素上下margin叠加问题：

解决问题：给父元素设置overflow:hidden




