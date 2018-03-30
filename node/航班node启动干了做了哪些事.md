> 唯一比不知道代码为什么崩溃更可怕的事情是，不知道为什么一开始它是工作的
>                                                          ——liaodaye

每天进行航班项目本地开发，第一步总是启动服务，频繁且理所当然，以至于我在相当长一段时间内忽略了它。直到某天，为了找到一个全局函数(requireAsyn)的出处，翻遍了整个项目也没有找到，我才知道问题的严重性，其实，它才是整个项目最关键的部分，后面的开发工作无非是页面/功能的堆叠而已。

今天，恰好有点小时间，带着“航班项目是如何启动并运行起来？”的这个问题，看一看大神们是如何做的。

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
`vscode`自带的代码跳转功能很好用，一下就找到了位于项目根目录的`app.js`文件，内容虽多，但我们目的也很明确——找到`app.start`方法。于是，整个文件的主要逻辑就清晰的展现在我们面前：
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


###`` app.start() 原来在这里
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




