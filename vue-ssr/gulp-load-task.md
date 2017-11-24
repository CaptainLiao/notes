# gulp-load-task 解决 gulpfile.js 过大的问题 
当我们在项目中使用`gulp`来实现前端自动化时，常常因任务太多导致`gulpfile.js`越来越臃肿，增加后期维护/变更成本。在计算机科学领域中，**分治**可以将我们的项目变得井然有序。所以，我们利用这个理念，将`gulp task`拆分至不同的文件中，`gulpfile.js`作为入口文件，来解决这个问题。

项目结构：
````shell
|--app
|--gulp
|----task
|------task1.js
|------task2.js
|--gulpfile.js
````
其中，假设task1.js：
````
// $ 是对 gulp-load-plugins 的引用
module.exports = function(gulp, $) {
  gulp.task('task1', function () {
    return gulp.src('xx/xx')
      .pipe($.pluginName())
  });
}
````
我们设想在`gulpfile.js`使用`gulp-load-task`:
````
let path = require('path')
let taskDir = path.join(__dirname, 'gulp', 'task')
require('gulp-load-task)(taskDir)
````
### gulp-load-task 实现
`gulp-load-task.js`[源码在这里](https://github.com/CaptainLiao/notes/blob/master/vue-ssr/gulpfile.js)，做了两件事：

- 扫描`taskDir`下的所有文件，生成关系表
- 加载关系表中的每一个`.js`文件

值得一提的是，源码中用到了两个非常巧妙的方法来实现上述目的：`reduce`和`Object.defineProperty`

#### 生成关系表
用 reduce 将数组转化为对象，有种函数式编程的感觉，很巧妙。部分代码如下：
````
let taskModules = {} // 任务关系表
taskModules = fs
  .readdirSync(dir)
  .filter(f => /\.js$/.test(f))
  .reduce((result, file) => {
    let filePath = path.resolve(dir, file)
    let fileName = path.basename(file, '.js')
    result[fileName] = filePath

    return result  // (1)
  }, {});
````
#### 加载文件
经过步骤（1），我们得到了一组*任务对象*集合，接下来，需要将里面的文件逐一导入。
````
Object
  .keys(taskModules)
  .forEach(taskName => {
    require(taskModules[taskName])(gulp, $)
  })
````
到这里，所有的功能都已经实现，然而源码实现却有所不同。在源码中，我将`taskModules`做了一次转化，在每个属性中添加了`getter`方法并返回`require(...)`。有兴趣的话可以看一下。

### 发布到 NPM
参考：http://www.jianshu.com/p/f5d4c891830f
````
npm login

npm publish 
````


