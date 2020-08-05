### 背景
机票 H5 基于 VUE 进行开发，是一个成熟的、多人协作的 webapp，承接了大量第三方渠道。

不同的渠道有不同的需求，比如有个别渠道需要更换样式/图标，以符合他们的视觉规范。虽然我们对色值做了全局的配置，但由于各种原因，还是有部分色值被硬编码到代码中了，图标也分散在各个文件中。

针对这一问题，我们提出了几个解决方案。

### 方案一：重构
重新设计项目结构，实现全局样式、图标的可配置化。
特点：1）工作量太大；2）不可避免的，还是有人会硬编码。

### 方案二：切换分支/重开一个新项目
针对不同的渠道，使用不同的代码库。
特点：1）完全的定制化；2）维护起来很难受

### 方案三：编译时替换
同一个代码库，根据渠道改变编译方法。
特点：1）代码无入侵；2）渠道隔离互不影响；3）维护简单

根据项目背景，方案三是最合适不过的了。

### 换肤实现
思路其实挺简单：在 webpack 编译项目的过程中，替换掉原有的样式、图标。

所以，我们需要写一个 webpack loader。npm 上有一个[string-replace-loader](https://www.npmjs.com/package/string-replace-loader)，但是我们并不想 npm install 它，而是选择在本地写一个 loader——webpack-replace-loader.js（见底部）。

剩下的就是配置 vue.config.js。
````js
const path = require('path');

const REPLACE_OPTIONS = [
  {search: '#F54194', replace: '#5565F0', flags: 'ig'},
]

module.exports = {
  configureWebpack: {
    resolveLoader: {
      modules: ['node_modules','./'],
    },
  },

  chainWebpack: (config) => {
    config.module
      .rule('replace-x') // replace-x 表示规则名称，随意，转化成 webpack 配置时，被忽略
      .test(/\.(vue|js)/) // 匹配文件的后缀
      .use('webpack-replace-loader') // 使用一个loader，这里的名字也可以任意写，转化成 webpack 配置时，被忽略
        .loader('webpack-replace-loader') // 这才是实际调用的loader
        .options({ // loader 所用的参数
          multiple: [
            ...REPLACE_OPTIONS,
            {search: 'assets/images/trip.png', replace: 'assets/images/jipiao.png', flags: 'ig'},
          ]
        });
    
    config.module.rule('replace-scss')
      .test(/\.scss/)
      .use('webpack-replace-loader')
        .loader('webpack-replace-loader')
        .options({
          multiple: REPLACE_OPTIONS
        })
        .end()
      .use('sass-loader')
        .loader('sass-loader')
        .end();
  },
}
````
### vue.config.js 配置注意事项
1）本地 loader 需要设置 resolveLoader，这样 webpack 才能找到

2）替换 .scss 文件中的内容时，需要先使用 sass-loader，否则，通过 @import 导入的 scss 文件会被 webpack-replace-loader 忽略。


附：
// webpack-replace-loader.js
````js
var loaderUtils = require('loader-utils');
// Characters needed to escape
var escapeArray = ['\'','"', '/', '[', ']', '-', '.', '(', ')', '$', '^', '*', '+', '?', '|', '{', '}'];

function warning (num) {
  var arr = [
    '[webpack-replace-loader: Error] The configuration rule of webpack is not allowed! -> https://github.com/beautifulBoys/webpack-replace-loader',
    '[webpack-replace-loader: Error] The property "search" and "replace" is essential',
    '[webpack-replace-loader: Error] The property "arr" should be an Array.'
  ];
  throw new Error(arr[num]);
}
// The string that needs to be matched is escaped
function stringEscape (str) {
  let stringArray = str.toString().split('');

  for (let j = 0; j < stringArray.length; j++) {
    for (let i = 0; i < escapeArray.length; i++) {
      if (stringArray[j] === escapeArray[i]) {
        stringArray[j] = '\\' + escapeArray[i];
      }
    }
  }

  return stringArray.join('');
}
function replaceFunc (configArray, source) {
  for (let i = 0; i < configArray.length; i++) {
    source = source.replace(new RegExp(stringEscape(configArray[i].search), configArray[i].flags), configArray[i].replace);
  }
  return source;
}

module.exports = function (source, map) {
  this.cacheable();
  var options = loaderUtils.getOptions(this);
  let configArray = [];
  if (options.hasOwnProperty('multiple')) {
    if (Array.isArray(options.multiple)) {
      for (let i = 0; i < options.multiple.length; i++) {
        let option = options.multiple[i];
        if (option.hasOwnProperty('search') && option.hasOwnProperty('replace')) {
          configArray.push({
            search: option.search,
            replace: option.replace,
            flags: option.flags ? option.flags : ''
          });
        } else {
          warning(1);
        }
      }
    } else {
      warning(2);
    }

  } else {
    if (options.hasOwnProperty('search') && options.hasOwnProperty('replace')) { // 对象形式存在
      configArray.push({
        search: options.search,
        replace: options.replace,
        flags: options.flags ? options.flags : ''
      });
    } else {
      warning(0);
    }
  }

  source = replaceFunc(configArray, source);

  this.callback(null, source, map);
  return source;
};

````

