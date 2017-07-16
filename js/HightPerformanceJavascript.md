# Hight Performance Javascript

### 脚本加载和运行

​	当浏览器遇到一个`<script>`标签时，无法预知`javascript`是否在`<p>`标签中添加内容。因此，浏览器停下来，运行`javascript`代码，然后继续解析、翻译页面。

​	浏览器必须首先下载外部文件的代码，这要占用一些时间，然后解析并运行代码，这又要占用一些时间。此过程中，页面解析和用户交互是被完全阻塞的。

#### 将脚本放在底部

![img](file:///C:/Users/PC/Desktop/1.png?lastModify=1484110356?lastModify=1484110356)

![2](C:\Users\PC\Desktop\2.png)

#### 合并脚本减少个数

#### 延迟脚本（defer）

`<script src="file1.js" defer></script>`

​	**defer**属性指明元素中所包含的脚本不打算修改DOM，因此代码可以稍后执行。对应的Javascript文件将在`<script>`被解析时启动下载，但代码不会立即执行，直到DOM加载完成（在`onload`事件句柄被调用之前）。拥有defer属性的文件可以用页面的其他资源一起并行下载。

兼容性：只被IE 4+ 和FF 3.5+支持，在其他浏览器，defer属性被忽略。

#### 动态异步加载脚本

​	动态脚本加载时非阻塞`Javascript`下载中最常用的模式，因为它可以跨浏览器，而且简单易用。

```
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'file1.js';
document.getElementsByTagName('head')[0].appendChild(script);
```

​	无论在何处启动下载，文件的下载和运行都不会阻塞其他页面处理过程。甚至可以放在`<head>`部分。

​	当使用动态脚本节点下载时，返回的代码通常立即执行。当脚本是“自运行”类型时，这一机制运行正常，但如果脚本只包含供页面其他脚本调用的调用接口，则会带来问题。此时，需要跟踪脚本下载完成并准备妥善的情况。使用动态`<script>`节点发出时间得到相关信息：

```
function loadScript(url, cb) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    if(script.readyState) {// IE
        script.onreadyStatechange = function () {
         if(script.readyState === 'load' || script.readyState === 'complete') {
             script.onreadystatechange = null;
             cb();
         }
        }
   }else {// Others
      script.onload = function () {
         cb();
        }
   }
    script.src = 'file1.js';
    document.getElementsByTagName('head')[0].appendChild(script);
}
```

​	浏览器不保证文件加载的顺序，下面可以保证脚本按顺序下载并运行：

```
loadScript('file1.js',function () {
   loadScript('file2.js', function () {
      ...
    })
})
```

​	如果多个文件的次序十分重要，更好的方法是讲这些文件按照正确的次序连接成一个文件。

#### XHR 脚本注入

```
var xhr = new XMLHttpRequest();
xhr.open("get", "file1.js", true);
xhr.onreadystatechange = function(){
    if (xhr.readyState == 4){
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
            var script = document.createElement ("script");
            script.type = "text/javascript";
            script.text = xhr.responseText;
            document.body.appendChild(script);
        }
    }
};
xhr.send(null);
```

优点：下载不立即执行的`javascript`代码；同样的代码在所有现代浏览器中都不会引发异常。

缺点：`Javascript`文件必须与页面放置在同一个域内，不能从CDNs 下载。

#### 推荐的非阻塞模式

​	推荐的向页面加载大量脚本的方法分为两个步骤：第一步，包含动态加载`javascript`所需的代码，然后加载页面初始化所需的除`javascript`之外的部分。这部分尽量小，可能只包含`loadScript()`函数。当初始代码准备好之后，用它来加载其余的`javascript`。例如：

```
<script type="text/javascript" src="loader.js"></script>
<script type="text/javascript">
    loadScript("the-rest.js", function(){
        Application.init();
    });
</script>
```

### 管理作用域

#### 作用域链和标识符解析

创建时的作用域链：

​	每创建一个函数，就自动创建了一个仅供`javascript`引擎使用的内部属性。其中一个是[[Scope]]，它包含一个函数被创建的作用域中对象的集合。此集合被称为函数的作用域链。当一个函数创建后，它的作用域链被填充以对象，这些对象代表创建此函数的环境中可访问的数据。

运行时的作用域链：

​	对函数的每次运行而言，每个运行期上下文都是独一的，当运行期上下文被创建时，它的作用域链被初始化，连通运行函数的[[Scope]]属性中所包含的对象。当函数执行完毕，运行期上下文就被销毁。

标识符识别性能：

​	在函数运行过程中，每遇到一个变量，就要在作用域中搜索、查找同名的标识符，搜索工作从作用域链的前端开始，一级一级向上查找，直到标识符被找到，或者没有找到，此时标识符被认为是未定义的。函数运行时每个标识符都要经过这样的搜索过程。正是这种搜索过程影响了性能。

​	所以，函数中局部变量的访问速度总是最快的，而全局变量**通常**是最慢的。

#### 原型

























