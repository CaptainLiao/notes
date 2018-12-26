import API from '../api'
import get from '@/utils/get'
import DrawUtils from './DrawUtils'

const IConfig = {
  // 小程序完整路径 如projects/home/main?p=dc-s&id=${this.id}
  path: '',
  title: '',
  backgroundImage: '',
}

export default function genImageWithQrcode(opts = IConfig) {
  let c = new DrawWithQrcode(opts)

  return c.getImageBase64()
}

class DrawWithQrcode extends DrawUtils {
  constructor(opts) {
    super({canvasW: 375, canvasH: 667})
    this.config = opts
  }

  draw() {
    // https://developers.weixin.qq.com/miniprogram/dev/api/getWXACodeUnlimit.html
    let [page, scene] = this.config.path.split('?')
    let getWxqrcode = () => API.getWxqrcode({
        page,
        scene: `?${scene}`,
      })

    return Promise.all([
      getWxqrcode(),
      this.drawBackgroundImage({
        imgSrc: this.config.backgroundImage,
        width: 375,
        height: 667,
      }),
    ])
      .then(res => {
        this.drawText({
          x: 152,
          y: 36,
          fontSize: 14,
          color: '#fff',
          text: '延误1分钟瓜分最低1000元',
        })
        this.drawTextWithBorder({
          x: 126,
          y: 80,
          
          text: this.config.title,
          lineHeght: 46,
          fontSize: 14,
          color: 'rgba(154, 96, 45, 1)',
          backgroundColor: 'rgba(255, 247, 229, 1)'
        })

        return get(res[0], 'res.bd.data')
      })
      .then(wxqrCode => {
        // 最后才画二维码，不然后面画的内容不会显示
        return this.drawWeixinQrcode({
          x: 129,
          y: 480,
          width: 116,
          height: 116,
          imgSrc: wxqrCode,
        })
      })
  }
}

