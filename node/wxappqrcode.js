const request = require('request')
const fs = require('fs')

/**
 * 生成微信小程序二维码
 * 
 * @param {Object} {
 *   appid,
 *   secret,
 *   url, // 详见https://developers.weixin.qq.com/miniprogram/dev/api/qrcode.html,
 *   params,
 *   qrname = 'wxqr.jpg' // 生成的二维码图片名，可选
 * } 
 * @return null
 */
function createwxaqrcode({
  appid,
  secret,
  url,
  postParams,
  qrname = 'wxqr.jpg'
}) {
  return request.get(
    `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`,
    (err,httpResponse,body) => {
      let access_token = JSON.parse(body).access_token
      return request.post({
        url: `${url}${access_token}`,
        json: postParams
      })
      .pipe(fs.createWriteStream(qrname))
    }
  )
}

createwxaqrcode({
  appid: 'wxc0ebb192b589112e',
  secret: '7f08a79ffd83a63d057d3b325b1b3fed',
  url: 'https://api.weixin.qq.com/wxa/getwxacode?access_token=',
  postParams: {
    path: '/projects/home/main?p=cart-list',
    is_hyaline: true,
    width: 430,
  }
})




