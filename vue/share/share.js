import shareInApp from '@/projects/promotion/utils/shareInApp'
import getImageBase64 from './getImageBase64'

// 在高版本(>7.1.2)客户端，可以调用小程序分享给好友；生成图片分享到朋友圈
// 在低版本，只能生成一个 H5 的链接分享给好友/朋友圈
// http://192.168.0.41/hbgjclient/doc/hloneapi/index.html#/api?id=apns-%E6%8E%A8%E9%80%81%E9%80%9A%E7%9F%A5
export default {
  toMiniprogram,
  toTimeline,
  toWeixin
}

/**
 * 调起客户端分享，给朋友一个小程序
 * 
 * @param {String} appId 小程序 appId 选填
 * @param {String} path 小程序对应的页面路径 如`projects/home/main?p=dc-s&id=${id}`,
 * @param {String} title 分享的标题
 * @param {Image} backgroundImage 背景图片
 */
function toMiniprogram({
  appId = 'gh_4ec8fccb7b51', // 航班管家 appid
  path,
  title,
  backgroundImage,
}) {

  let shareInfo = {
    smallApp: {
      title,
      xcxAppId: appId,
      xcxUrl: path,
      background: backgroundImage,
      // 0 正式版 1 开发版 2 体验版，似乎在安卓上才生效
      miniProgramType: 1
    },
    type: 'weixin',
  }

  return shareInfo && shareInApp.invokeShareAction(shareInfo);
}

/**
 * 生成图片后，调起客户端分享，发表到朋友圈
 * 
 * @param {String} path 小程序对应的页面路径 如`projects/home/main?p=dc-s&id=${id}`
 * @param {String} title 分享的标题
 * @param {Image} backgroundImage 背景图片
 * @returns 
 */
function toTimeline({
  path,
  title,
  backgroundImage,
}) {
  return getImageBase64({
    path,
    title,
    backgroundImage,
  })
    .then((imgBase64='') => {
      imgBase64 = imgBase64.split(',')[1]
      let shareInfo = {
        type: 'pengyouquan',
        imageBase64: imgBase64,
        picType:'pengyouquan'
      }
      return shareInfo && shareInApp.invokeShareAction(shareInfo);
    })
}

/**
 * 生成一个 H5 链接，分享给微信好友/朋友圈
 */
function toWeixin({
  title,
  desc,
  link,
  backgroundImage,
}) {
  let shareInfo = {
    title,
    desc,
    link,
    imgUrl: backgroundImage,
    type: 'weixin,pengyouquan',
  }

  return shareInfo && shareInApp.invokeShareAction(shareInfo);
}


