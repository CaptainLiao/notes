## node、express开发多人博客

#### 1. supervisor

在开发过程中，每次修改代码保存后，我们都需要手动重启程序，才能查看改动的效果。使用 supervisor 可以解决这个繁琐的问题，全局安装 supervisor：

`npm install -g supervisor`

运行`supervisor --harmony app.js`启动程序。

#### 2. req
**`req.query`：**解析后的 url 中的 querystring，如` ?name=haha，req.query `的值为` {name: 'haha'}`

**`req.params`：**解析 url 中的占位符，如 `/:name`，访问` /haha，req.params` 的值为` {name: 'haha'}`

**`req.body`：** 解析后请求体，需使用相关的模块，如 `body-parser`，请求体为` {"name": "haha"}`，则` req.body `为` {name: 'haha'}`

#### 3. exports && module.exports

[参考连接](http://www.ghostchina.com/module-exports-and-exports-in-node-js/)

**模块内部大概是这样：**

`module.exports = exports = {}`

* exports是module.exports的一个引用
* require引用模块后，返回给调用者的是module.exports而不是exports
* `exports.xxx`，相当于在**导出对象上挂属性**，该属性对调用模块直接可见
* `exports =`相当于给exports对象重新赋值，调用模块不能访问exports对象及其属性
* 如果此模块是一个类，就应该直接赋值`module.exports`，这样调用者就是一个类构造器，可以直接new实例

**分别该如何使用？**

总结下，有两点：

1. 对于要直接导出的属性（方法），可以简单直接挂到`exports`对象上即`exports.xxxx=function(){}`
2. 对于类，为了直接使导出的内容作为类的构造器可以让调用者使用new操作符创建实例对象，应该把构造函数挂到`module.exports`对象上，不要和导出属性值混在一起





******

### `Mongodb`

`MongoDB`[在windows 下安装及配置方法](http://yunkus.com/mongodb-install-config-in-window-environment/)

> * 切换到当前文件夹
>
>   `cd Program Files\mongodb\bin`
>
>
> * 指定数据存放目录，并开始一个mongodb服务 
>
>   `./mongod.exe --dbpath "d:\program files\MongoDB\data" --storageEngine "mmapv1"`
>
> * 新开一个cmd窗口，进入bin目录，输入 `./mongo`连接数据库（默认连接test数据库）
>
> * 启动出错：`Detected unclean shutdow n - d:\program files\MongoDB\data\mongod.lock is not empty.`
>
>   修复：`./mongod.exe --repair --dbpath "d:\program files\MongoDB\data" --storageEngine "mmapv1"`，再次启动
>
>   **只要操作mongodb数据库，服务就要一直开着**

