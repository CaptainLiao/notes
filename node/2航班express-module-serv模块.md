## 功能
航班项目基础框架依赖`express-module-serv`包，是一个支持`AMD`,`CMD`和`UMD`规范的前端模块化系统服务的`express`应用模块启动器，[详见](https://www.npmjs.com/package/express-module-serv)。

主要用来解决模块加载、模块依赖两个问题：
1. 当请求`someurl/m-loader.js`时，通过`scriptsMiddleware`中间件生成内容，并发送响应实体
2. 当请求路径类似`someurl/m?m=vue/projects/jipiao`时，通过`depsStreamMiddleware`中间件生成内容，并发送响应。

## m-loader.js




