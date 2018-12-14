import get from '@/utils/get'
import DrawUtils from './DrawUtils'

const IConfig = {
  // 小程序完整路径 如projects/home/main?p=dc-s&id=${this.id}
  path: '',
  title: '',
  backgroundImage: '',
}

export default function genImageWithQrcode(opts = IConfig) {
  let c = new DrawWithText(opts)

  return c.getImageBase64()
}

class DrawWithText extends DrawUtils {
  constructor(opts) {
    super({canvasW: 214, canvasH: 172})
    this.config = opts
  }

  draw() {
    return this.drawBackgroundImage({
      imgSrc: this.config.backgroundImage,
      width: 214,
      height: 172,
    })
      .then(res => {
        this.drawTextWithBorder({
          x: 30,
          y: 8,
          
          text: this.config.title,
          lineHeght: 46,
          fontSize: 14,
          color: 'rgba(154, 96, 45, 1)',
          backgroundColor: 'rgba(255, 247, 229, 1)'
        })

        return get(res[0], 'res.bd.data')
      })
  }
}

