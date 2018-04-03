> 唯一比不知道代码为什么崩溃更可怕的事情是，不知道为什么一开始它是工作的
>                                                          ——liaodaye

每天进行航班项目本地开发，第一步总是启动服务，频繁且理所当然，以至于我在相当长一段时间内忽略了它。直到某天，为了找到一个全局函数(requireAsyn)的出处，翻遍了整个项目也没有找到，我才知道问题的严重性，其实，它才是整个项目最关键的部分，后面的开发工作无非是页面/功能的堆叠而已。

今天，恰好有点小时间，带着“航班项目是如何启动并运行起来？”的这个问题，看一看大神们是如何做的。稍作记录，整理成文，以便再次翻看。

## 项目启动

国际惯例，`node`启动服务命令一般都放在`bin`文件中。依次进入`app/bin/www`，有代码简化如下：
````
var app = require('../app');

app.start(function(app){
  app.set('port', process.env.PORT || 3001);

  var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
  });

});
````
emm，看到这里，我猜测`app`代表整个项目，`start`方法表示启动这个项目。为了验证这个想法，得继续看看`../app.js`做了什么事。

### 找到 app.start()
`vscode`自带的代码跳转功能很好用，一下就找到了位于项目根目录的`app.js`文件，内容虽多，但我们目的也很明确——找到`app.start`方法。

于是，整个文件的主要逻辑就清晰的展现在我们面前：
````
var express = require('express')
var boot = require('express-app-boot')(__dirname);
var app = express();

boot(app, 'boot')
  .beforeStart(cb)

module.exports = app
````
仔细认真的检查，依然没有找到`app.start()`，很方。

但我发现，其中唯一与变量`app`相关的是`boot`，到这里只能大胆猜测执行`boot(app, 'boot')`后，会在`app`上挂载`start`方法。


### app.start() 原来在这里
`boot`来自`express-app-boot`这个 npm 包，打开后有如下内容：
````
var loader = require('./lib/config-loader');
var executor = require('./lib/executor');

module.exports = function bootFactory(appRootDir) {

  return function boot(app, bootDir) {
    var appCfg = loader.loadAppCfg(app, appRootDir);
    var bootCfg = loader.loadBootCfg(app, appRootDir, bootDir);
    var preprocess = executor(app, bootCfg.before);

    app.beforeStart = function app$beforeStart(cb) {
      preprocess = preprocess.then(function() {
        if (typeof cb === 'function') return cb(app);
      });
      return app;
    };
    app.start = function app$start(cb) {
      return preprocess
        .then(() => executor(app, bootCfg.after))
        .then(function() {
          if (typeof cb === 'function') 
          return cb(app)
        })
    }

    return app;
  }
};
````
`bootFactory`暂且可以叫做“启动指引工厂”，是一个高阶函数。它返回一个`boot`函数，在`boot`函数里做了五件事情：
1. 加载应用根目录中的 app.xxx.yml 配置文件（航班项目并没有这个配置文件，略去）
2. 加载应用根目录中的 boot.xxx.yml 配置文件
3. 执行 boot.xxx.yml 文件中 before 下的配置
4. app 挂载 beforeStart 方法
5. app 挂载 start 方法

### 阶段总结：
到这里，关于航班项目的启动过程已经有了一个初步的了解，可用如下伪代码表示这个过程：
````
step01：启动 express 应用，取名 app
step02: 读取应用根目录下的 boot.xxx.yml 配置文件，执行其中 before 参数下的内容，接着给 app 挂载 beforeStart、start方法
step03: 待 step02 完成后，执行 app.beforeStart(cb)，回调里面是一系列的 app.use()
step04: 待 step03 完成后，执行 app.start(cb)，启动服务

````
结合代码，我们可以很直观的看到 step01、step03、step04 做的事情，但 step02 却像一个黑盒子，由此带来了新的疑云：`boot.xxx.yml`中的配置项用来干嘛？`m-loader.js`是何方神圣？各方依赖又是如何处理的？

## m-loader.js 始末
这次，我们将深入 step02，看看在服务启动之前，应用做了哪些准备工作。

让我们回到`express-app-boot`包，从`var bootCfg = loader.loadBootCfg(app, appRootDir, bootDir)`开始。

`bootCfg`对应`boot.yml`配置文件，`bootCfg.before`是一个数组，我们截取其中的一个`bootCfg.before[0]`记为`task`：

````
var task = {
    path: 'load-module',
    name: 'add load module route',
    params: {
      debug: false,
      routePath: '/m',
      loaderPath: '/m-loader.js', // 这里我们见到了`m-loader.js`请记住它
      pathSettings: {
        base: '../public/scripts',
        path: {
          css: '../styles',
          images: '../images',
          common: '../../common',
          regenerator-runtime: '../../boot/load-module/transformers/regenerator/runtime.min.js',
          vueify: '../../node_modules/vueify'
          lodash: '../../node_modules/lodash'
        }
      },
      transformerSettings: {
        cssWrapper: {
          staticPath: ../public
          routePath: ./
        }
      }
    }
}

````
紧接着，执行`var preprocess = executor(app, bootCfg.before)`，即执行`require('app/boot/load-module/index.js')(app, task)`,

load-module/index.js:
````
var moduleServ = require('express-module-serv');
.
.
.
module.exports = function(app, params){

  var transformers = [
    require('./transformers/css-module')(merge({debug: params.debug}, valByKeyPath('transformerSettings.cssWrapper', params))),
    svgWrapper(valByKeyPath('transformerSettings.svgWrapper', params)),
    cmdWrapper(),
    addComma()
  ].filter(Boolean);

  params.transformers = transformers;
  moduleServ(app, params);
};
````
`load-module/index.js`给参数添加了一个 transformers 属性，便交给`moduleServ`执行。得，我们先去`express-module-serv`包：
````
var scriptsMiddleware = require('./lib/scriptsMiddleware');
module.exports = function(app, options) {
  options = options || {};
  var routePath = options.routePath || '/m',
    loaderPath = options.loaderPath || '/mloader.js',
    pathSettings = options.pathSettings;

  app.use(loaderPath, scriptsMiddleware(loaderPath, routePath, options));
};
````
还记得`options.loaderPath`的值吗？它就是`/m-loader.js`。所以，当浏览器请求加载`m-loader.js`时，会执行`scriptsMiddleware()`中间件:
````
var promiseScript = fs.readFileSync(pUtil.resolve(__dirname, '../client/promise.js'));
var loaderScript = fs.readFileSync(pUtil.resolve(__dirname, '../client/loader.js'));
var scriptsContent = promiseScript + ';\n' + loaderScript;

module.exports = function(loaderPath, routePath, options){

  return function _scriptsMiddleware(req, res, next){
    res.status(200).end('(function(w){' + scriptsContent + '})(window);');
  };
};
````





