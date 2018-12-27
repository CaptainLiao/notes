const qs = require('./querystring');

// 最基础的request（简化版的fetch）
//
// 参数示例:
// {
//   url,
//   method: 'GET',
//
//   # 对应XHR的withCredentials，只对跨域请求有意义
//   # 参考：https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials
//   withCredentials: false,
//
//   # name建议都小写，尤其是content-type
//   headers: {
//     content-type: 'application/x-www-form-urlencoded',
//     authorization: 'Basic XXXXX'
//   }
//
//   # data在Message中的实际表现形式由method和Content-Type共同决定
//   data: {
//     a: 1
//   }
// }
//
// 返回Response:
// {
//   status,
//   headers,
//   body,
// }
//
module.exports = rawRequest;
function rawRequest(options) {
  let headers = options.headers || {};
  let contentType = headers['content-type'];

  if (!options.method) {
    options.method = 'GET';
  }

  if (options.data) {
    if (options.method === 'GET') {
      options.url += '?' + qs.stringify(options.data);
      options.data = '';
    }

    if (/x-www-form-urlencoded/.test(contentType)) {
      options.data = qs.stringify(options.data);
    } else if (/json/.test(contentType)) {
      options.data = JSON.stringify(options.data);
    }
  }

  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(options.method, options.url);

    for (let k in options.headers) {
      xhr.setRequestHeader(k, options.headers[k]);
    }

    if (options.withCredentials) {
      xhr.withCredentials = true;
    }

    xhr.onload = () => {
      resolve(response());
    };
    xhr.onerror = () => {
      reject(new Error('网络异常'));
    };
    xhr.ontimeout = () => {
      reject(new Error('请求超时'));
    };

    xhr.send(options.data);

    function response() {
      let status = xhr.status === undefined ? 200 : xhr.status;
      let headers = parseHeaders(xhr.getAllResponseHeaders() || '');
      let body = xhr.response || xhr.responseText;
      let r = {
        status,
        headers
      };

      let contentType = headers.get('content-type');
      let sniffedType = sniffmime(body);
      if (sniffedType && sniffedType !== contentType) {
        contentType = sniffedType;
      }

      if (contentType === 'application/json') {
        try {
          r.body = JSON.parse(body);
        } catch (e) {
          r.body = body;
        }
      } else {
        r.body = body;
      }

      return r;
    }
  });
}


// 没有单独弄个Header，所有field name必须全部小写
function parseHeaders(rawHeaders) {
  let keys = [],
      entries = [],
      headers = {};

  rawHeaders.replace(/^(.*?):\s*([\s\S]*?)$/gm, (m, key, value) => {
    key = key.toLowerCase();
    keys.push(key);
    entries.push([key, value]);
    if (headers[key]) {
      headers[key] += ',' + value;
    } else {
      headers[key] = value;
    }
  });

  return {
    keys: () => keys,
    entries: () => entries,
    get: n => headers[normalizeName(n)],
    has: n => normalizeName(n) in headers
  };
}

// normalize header field name
function normalizeName(name) {
  if (typeof name !== 'string') {
    name = String(name);
  }
  if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
    throw new TypeError('Invalid character in header field name');
  }
  return name.toLowerCase();
}

// 简单地猜测输入的类型
function sniffmime(str) {
  // NOTE:
  // 虽然数字,字符串,true,false,null这些都是合法的JSON值,但是
  // 单独出现在请求返回里不太正常.
  if (/^\s*(\{|\[)/.test(str)) {
    return 'application/json';
  } else {
    return null;
  }
}
