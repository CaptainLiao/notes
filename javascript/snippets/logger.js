const Level = {
  DEBUG: 10,
  INFO: 20,
  WARN: 30,
  ERROR: 40
};

const logger = new Logger();

logger.hook = function(target) {
  ['debug','info','warn','error'].forEach(key => {
    const old = target[key];
    target[key] = function(...args) {
      old && old.call(target, ...args);
      logger[key](...args);
    };
  });
};

export default logger;

function Logger() {
  this.__appid = null;
  this.__info = {}; // 有方法名info()
  this.__cache = [];
}

// 删掉...
Logger.prototype.setDefaultChannel = function() {};

Logger.prototype.setAppid = function(appid) {
  this.__appid = appid;
};

Logger.prototype.setInfo = function(key, val) {
  this.__info[key] = val;
};

Logger.prototype.debug = function(...args) {
  this.print(Level.DEBUG, ...args);
};

Logger.prototype.info = function(...args) {
  this.print(Level.INFO, ...args);
};

Logger.prototype.warn = function(...args) {
  this.print(Level.WARN, ...args);
};

Logger.prototype.error = function(...args) {
  this.print(Level.ERROR, ...args);
};

Logger.prototype.print = function(level, ...args) {
  const path = window.location.pathname;
  const alen = args.length;
  let e = null;

  if (alen === 0 || level < Level.ERROR || !this.__appid) return;

  const msg = args.map((arg) => {
    return toString(arg);
  }).join(' ');

  if (findAndUpdate(this.__cache, `(${path}) ${msg}`)) {
    return;
  }

  // 如果最后一项是错误类型，则补充栈或其他信息
  if (isError(args[alen-1])) {
    e = getErrorDetail(args[alen-1]);
  }

  const data = {
    appid: this.__appid,
    l: level,
    t: new Date().getTime(),
    info: JSON.stringify(this.__info),
    path,
    msg,
  };

  if (e) {
    data.type = e.type;
    data.detail = e.detail;
  }

  _send(data);
};

function findAndUpdate(cache, key) {
  let found = false;
  for (let i = 0; i < cache.length; i++) {
    if (cache[i] === key) {
      found = true;
      cache.splice(i, 1);
      break;
    }
  }
  cache.push(key);
  if (cache.length > 20) {
    cache.splice(0, cache.length - 20);
  }
  return found;
}

function toString(arg) {
  if (arg === null || typeof arg !== 'object') {
    return ''+arg;
  }
  if (arg instanceof Error) {
    return arg.message;
  } else if (arg.name && arg.message) { // error like
    return arg.message;
  } else {
    return JSON.stringify(arg);
  }
}

function getErrorDetail(e) {
  if (e && e.name && e.message) {
    return {
      type: e.name,
      msg: e.message,
      detail: e.stack || (e.data && JSON.stringify(e.data))
    };
  } else {
    return null;
  }
}

function isError(arg) {
  if (arg && arg.name && arg.message) {
    return true;
  }
  return false;
}

const __send = __xhr;

function _send(data) {
  let s = JSON.stringify(data);
  __send('https://xxx.xxx.com/log', s);
}

function noop() {}


function __xhr(url, data) {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.onload = xhr.onerror = xhr.ontimeout = noop;
  xhr.setRequestHeader('content-type', 'text/plain;charset=UTF-8');
  xhr.send(data);
}
