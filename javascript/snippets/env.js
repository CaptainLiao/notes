import cookie from 'js-cookie';

const UA = window.navigator.userAgent;
const partner = cookie.get('partner');

const env = {
  ua: UA
};

if (/(iphone|ipad|ipod)/i.test(UA)) {
  env.os = 'ios';
  const rer = /OS ([\d_]+)/.exec(UA);
  if (rer) {
    env.os_version = rer[1].replace('_', '.');
  }
} else if (/android/i.test(UA)) {
  env.os = 'android';
  const rer = /Android ([\d.]+)/.exec(UA);
  if (rer) {
    env.os_version = rer[1];
  }
} else {
  env.os = 'unknown';
}

if (/micromessenger/i.test(UA)) {
  env.isWeixin = true;

  const checkMiniProgram = () => {
    env.isWeixinMiniProgram = window.__wxjs_environment === 'miniprogram';
  };

  if (window.WeixinJSBridge && window.WeixinJSBridge.invoke) {
    checkMiniProgram();
  } else {
    document.addEventListener('WeixinJSBridgeReady', checkMiniProgram, false);
  }
} else if (partner) {
  env.isPartner = true;
  env.partner = partner;
} else {
  if (window.NativeAPI && window.NativeAPI.sendToNative) {
    env.isNative = true;
  } else if (/^hbgj|^gtgj/.test(cookie.get('appName'))) {
    env.isNative = true;
  } else {
    document.addEventListener('WebViewJavaScriptBridgeReady', () => {
      if (window.NativeAPI && window.NativeAPI.sendToNative) {
        env.isNative = true;
      }
    }, false);
  }
}

export default env;
