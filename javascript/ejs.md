# 客户端EJS使用指南

## 一、注意事项

#### 1.1 EJS在客户端使用`include`失效

解决方法：一个替代的方案是`gulp-file-include`

`````javas
// gulpfile.js
// include 文件 task
var includefile = require("gulp-file-include")
gulp.task('includeFile', function () {
    gulp.src(["./lizhan/*", "./lizhan/comm/*", "!./lizhan/comm/_*.html"])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest("./dist/lizhan/"))
        .pipe(livereload());
});

// 在HTML中引入 => @@include("filename")
// @@include('user/index.ejs')
// @@include('user/show.ejs')
`````

#### 1.2 如何给动态添加的元素绑定事件

解决方法：在`ajax`回调函数中，重新获取目标元素，再添加事件

`````javas
$(ele).on("click",function(e){
	var _this = $(e.target) || $(this);
  	// todo...
  	e.stopPropagation();
})
`````

> 一个奇怪的bug...
>
> 再给动态生成的元素添加事件的时候，页面有多个`<a>`标签，如果使用$(".addr_operBtn").find("a").eq(0).on("click", function(){})，事件只有第一个元素有用，但给`<a>`标签添加一个class，直接选中元素添加事件则都可以

## 二、语法篇

#### 2.1 常用语法

- 用<%...%>包含js代码
- 用<%=...%>输出变量 变量若包含 '<' '>' '&'等字符 会被转义
- 用<%-...%>输出变量 不转义
- 用<%- include('user/show') %>引入其他模板 *包含 ./user/show.ejs*
- 用<%# some comments %>来注释，不执行不输出
- <%% 转义为 '<%'
- <% ... -%> 删除新的空白行模式?
- <%_ ... _%> 删除空白符模式

#### 2.2 基本用法

```
<!doctype html>
<head>
    <title>Document</title>
</head>
<body>
<p id="show"></p>
<script id="users" type="text/template">
    <% if(names.length) { %>
    <ul>
        <% names.forEach(function(item){ %>
        <li>
            <%= item %>
        </li>
       <% }) %>

    </ul>
    <% } %>
</script>

<script src="node_modules/ejs/ejs.min.js"></script>
<script>
    onload = function(){
        var users = document.getElementById('users').innerHTML;
        var show = document.getElementById("show");
        var name = ['loki'];
        var html = ejs.render(users, { names: name });
        show.innerHTML = html;
    }
</script>
</body>
</html>
```

```
<script src="ejs.js"></script>
<script>
  var people = ['geddy', 'neil', 'alex'],
      html = ejs.render('<%= people.join(", "); %>', {people: people});
</script>
```