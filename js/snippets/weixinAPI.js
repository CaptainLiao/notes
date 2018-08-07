/* global wx:false */
const rawRequest = require('./raw-request');

const ua = navigator.userAgent.toLowerCase();
const inWechat = ua.indexOf('micromessenger') !== -1;
const isIOS = /iphone|ipad/.test(ua);
const appid = window.config.appid;

const jsApiList = [
  // 腾讯微博已经没有了
  'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone', 'startRecord', 'stopRecord',
  'translateVoice', 'hideOptionMenu', 'playVoice', 'uploadVoice', 'downloadVoice', 'onVoicePlayEnd'
];

// iOS下配置的URL必须是初始入口地址(A)，之后pushState(B)的都不用再配置。
// 但是当用location的方式跳去其他页面时，由于bfcache页面并不会被销毁，
// 再返回的时候会触发pageshow事件，此时参与配置的URL是最后离开时的URL(B)
// 而不是(A)。
let initialUrl = window.location.href.split('#')[0];
let lastUrl = null;

// =0: 初始
// -1: 错误
// >0: 成功
let readyState = 0;

let __queue = []; // 等待执行的队列
function queue(f) {
  if (inWechat) {
    if (readyState > 0) {
      f();
    } else {
      config();
      __queue.push(f);
    }
  }
}

function run() {
  if (readyState > 0) {
    const q = __queue.slice();
    __queue = [];
    q.forEach(f => f());
  }
}

// iOS微信版本6.6.6之前离开再回来会触发pageshow，此时需要修改入口地址为当前地址
window.addEventListener('pageshow', () => {
  initialUrl = window.location.href.split('#')[0];
  console.info('wx.config on pageshow');
  config();
});

// routechange是我们自定义的事件，每次路由改变后触发
window.addEventListener('routechange', () => {
  config();
});

// TODO: URL快速变换时会有问题

function config() {
  if (!inWechat) {
    return;
  }

  let url = isIOS ? initialUrl : window.location.href.split('#')[0];
  if (url === lastUrl) {
    return;
  }
  lastUrl = url;
  readyState = 0;

  const loc = window.location;
  rawRequest({
    url: `//${loc.host}${window.config.host_common_path.h5}/vue/api/wechat/config`,
    method: 'GET',
    data: {
      appid,
      url
    }
  }).then(r => {
    let opts = r.body;
    opts.debug = false;
    opts.jsApiList = jsApiList;

    // 微信配置失败的时候两个回调都会被执行，先error后ready
    wx.config(opts);
    wx.ready(() => {
      console.info('微信配置成功');
      readyState += 1;
      // 单页应用第二次及以后的配置时，出错时先ready后error，非单页不用考虑
      setTimeout(run, 50);
    });
    wx.error((res) => {
      console.error('微信配置失败', res);
      // 失败了则直接设置到-1，即使后执行了ready，也只是增加到0，依然不能表示成功
      readyState = -1;
      lastUrl = null;
    });
  });
}

module.exports = jsApiList.reduce((r, name) => {
  r[name] = (o) => {
    queue(() => {
      wx[name](o);
    });
  };
  return r;
}, {
  getUserInfo() {
    // TODO
  },

  share(o) {
    queue(() => {
      wx.onMenuShareTimeline(o);
      wx.onMenuShareAppMessage(o);
      wx.onMenuShareQQ(o);
      wx.onMenuShareQZone(o);
    });
  }
});
