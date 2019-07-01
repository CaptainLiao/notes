### 背景
我们的项目通过重写`console`对象上的方法实现日志上报的功能，截取代码片段如下：
````js
Class Logger() {
  debug() {},
  info() {},
  warn() {},
  ...
}

const logger = new Logger();
logger.hook = function(target) {
  ['debug','info','warn','error'].forEach(key => {
    const old = target[key];
    target[key] = function(...args) {
      old && old(...args);
      logger[key](...args);
    };
  });
};

logger.hook(console);
````
然而在极少部分手机(iPhone 5s 9.3.1)中，在页面上使用`console`打印内容，会导致页面渲染失败，也不会向后台发送任何内容。

### fixed
经过千辛万苦的排查，发现问题出现在`old && old(...args)`。由于我们重写了`console`对象上的方法，导致执行`console.warn()`等方法时，丢失了对应的上下文。需更改为：
````
old && old.call(target, ...args);
````
