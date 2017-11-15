let fs = require('fs');
let path = require('path');


loadTasks();

function loadTasks(taskDir) {
  let gulp = require('gulp');
  let loadPlugins = require('gulp-load-plugins');

  let defaultOpts = {
    taskDir: taskDir ? taskDir : path.join(__dirname, 'gulp', 'tasks'),
    pkgFile: path.resolve(__dirname, 'package.json')
  };
  let $ = loadPlugins({
    config: defaultOpts.pkgFile,
  });

  let gulpTasks = getTasks(defaultOpts.taskDir);
  Object.keys(gulpTasks)
    .forEach(function (taskName) {
      gulpTasks[taskName](gulp, $);
    });
}

function getTasks(dir) {
  let taskModules = {};
  taskModules = fs.readdirSync(dir)
    .filter(f => /\.js$/.test(f))
    .reduce((result, file) => {
      let filePath = path.resolve(dir, file);
      let fileName = path.basename(file, '.js');
      result[fileName] = filePath;
      return result
    }, {});
  return _setObjGetter(taskModules, (taskPath) => {
    try {
      return require(taskPath)
    } catch (e) {
      return void 0
    }
  })
}

function _setObjGetter(obj, fn) {
  let isObj = Object.prototype.toString.call(obj) === '[object Object]';
  if (!isObj) return obj;
  return Object.keys(obj)
    .reduce((result, key) => {
      Object.defineProperty(result, key, {
        enumerable: true,
        get: () => {
          return fn(obj[key]);
        }
      });
      return result;
    }, {})
}
