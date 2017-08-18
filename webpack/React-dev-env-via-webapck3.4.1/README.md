# webpack3.4.1搭建react单页应用
本 DEMO 使用 react@15.6.1+webpack@3.4.1+es2015，都是当前最新版本，可以完整运行。
两种模式：
- 开发模式
  * 模块热替换
  * css module

- 生产模式
  * code splitting
  * 提取 CSS
  * 资源打包压缩
  * 缓存优化

## 安装
`npm install`

## 开发模式
`npm start`

## 生产模式
`npm run build`

## 相关依赖说明
####[react.js](https://facebook.github.io/react/index.html) [必需]
> React是用来构建用户界面的js库，属于view层。  
  它有两大特点：1，单向数据绑定；2，虚拟DOM  
  安装：`npm install --save react`
  
---

####[react-dom.js](https://npm.taobao.org/package/react-dom) [必需]
> react.js 主要用来创建元素和组件，当你想在html中渲染你的组件的时候，  
你还得需要react-dom.js。同时，react-dom.js依赖于react.js。  
安装：`npm install --save react-dom`

---

####[webpack](https://doc.webpack-china.org/guides/) [必需]
> 安装：`npm install --save-dev webpack`  
备注：webpack不同版本的配置差异较大，本 demo 使用 3.4.1版本  
webpack -h 查看帮助 
[webpack 构建解惑](https://segmentfault.com/a/1190000005089993#articleHeader3)

---

####[webpack-dev-server](https://github.com/webpack/webpack-dev-server) [开发需要]
> 它是一个用来组织包装webpack使其变成中间件的容器。（中间件的用途就是在输入和输出的过程中加工的一种手段）  
webpack本身只负责打包编译，webpack-dev-server是协助我们开发的服务器，这个服务器底层是靠express操作的。  
我们的页面如何在这个服务器上更新呢，首先是取得webpack打包好的资源，这就需要在`请求`到`响应`的过程中通过  
express的中间件取得资料， 而方法就是通过webpack-dev-server  
详见 server.js。  
安装：`npm install --save-dev webpack-dev-server`  

####这个中间件有两点好处：  

1. 直接在内存中操作文件，而非磁盘中。这样处理速度更快。  
1. 在监视（watch）模式下，如果文件改变，中间件立即停止提供之前的bundle，并且会延迟  
请求回应，直到新的编译完成，如此一来，文件修改后，你可以直接刷新页面，而不用等待编译。

---


####[babel-core](https://npm.taobao.org/package/babel-core) [必需]  
> Babel是一个转换编译器，它能将ES6转换成可以在浏览器中运行的代码。  
作为下一代javascript语言标准，请拥抱ES6(ES2015)吧！`babel-core` 是Babel编译器的核心。  
安装：`npm install --save-dev babel-core`

---

####[babel-loader](https://npm.taobao.org/package/babel-loader) [必需]  
> loader 用于转换应用程序的资源文件，他们是运行在nodejs下的函数，  
使用参数来获取一个资源的来源并且返回一个新的来源针对webpack的babel加载器。  
`babel-loader` 就是告诉webpack去加载我们写的使用了es6语法的js文件。  
安装：`npm install --save-dev babel-loader`

---

#### [babel-plugin-transform-runtime](http://babeljs.io/docs/plugins/transform-runtime/#why) [开发需要]
> 在大多数情况下，你需要安装babel-plugin-transform-runtime作为开发版本的依赖（设置--save-dev）
和下面的 `babel-runtime` 搭配使用
安装：`npm install --save-dev babel-plugin-transform-runtime`

#### [babel-runtime](http://babeljs.io/docs/plugins/transform-runtime/#why) [必需]
> babel-runtime作为生产版本依赖（设置 --save）
[Runtime transform/runtime 转化器详解](https://segmentfault.com/a/1190000009065987)  
安装：`npm install --save babel-runtime`

---

####[babel-preset-latest](http://babeljs.io/docs/plugins/preset-latest/) [必需]  
> es2015,es2016,es2017转码规则。为所有es6插件所设置的babel预设，  
有了它，诸如，es6的箭头函数，类，等等语法特性才能向es5转换。  
安装：`npm install --save-dev babel-preset-latest`

---

####[babel-preset-react](https://github.com/babel/babel) [必需]  
> react转码规则。为所有react插件所设置的babel预设。有了它，才能识别转译jsx语法等。  
安装：`npm install --save-dev babel-preset-react`

---

####[react-hot-loader](https://github.com/gaearon/react-hot-loader/tree/master/docs#starter-kits) [开发需要]  
> 可以使react组件在浏览器上实时更新并保持组件状态  
安装：`npm install --save-dev react-hot-loader@3.0.0-beta.3`  
备注：用的是3.0最新版本，这版本很强大。

---

####[babel-preset-stage-X](https://npm.taobao.org/package/babel-preset-stage-0) [必需]  
> ES7不同阶段语法提案的转码规则（共有4个阶段），选装**一个**  
在进行实际开发时，可以根据需要来设置对应的stage。如果省事懒得折腾，一般设置为stage-0即可。  
npm install --save-dev babel-preset-stage-0  

[stage-X详解](http://www.cnblogs.com/flyingzl/p/5501247.html)

---

####[redbox-react](https://github.com/KeywordBrain/redbox-react) [开发需要]  
> 这个插件将会以一个非常优雅的方式将你的错误呈现在页面上，这样就省去了查看console.log的麻烦；

---

####[html-webpack-plugin](https://npm.taobao.org/package/html-webpack-plugin) [必需]  
> 一个服务于webpack打包资源的简易的HTML文件生成器,它可以动态生成HTML  
之所以要动态生成，主要是希望webpack在完成前端资源打包以后，自动将打包后的资源路径和版本号写入HTML中，达到自动化的效果
安装：`npm install --save-dev html-webpack-plugin`  

---

####[rimraf](https://npm.taobao.org/package/rimraf) [小工具]
> 一个基于node的深层删除工具，用于每次build前清空文件夹 
安装：`npm install --save-dev rimraf`

---

## 参考资料
如果你对 webpack 本身还不太熟悉，以下文档可能对你有用：
[webpack3.41 中文文档](https://doc.webpack-china.org/guides/)
[webpack 构建解惑](https://segmentfault.com/a/1190000005089993#articleHeader3)

React相关：
[React 中文文档](https://discountry.github.io/react/)
[react-router-dom 英文文档](https://reacttraining.com/react-router/web/example/basic)
[初探 React Router 4.0](http://blog.csdn.net/sinat_17775997/article/details/69218382)
[Redux 中文文档](http://cn.redux.js.org/index.html)


