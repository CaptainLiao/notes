//import API from './api'
import get from '@/utils/get'

export default function getImageBase64(opts) {
  let c = new convertImage(opts)
  return c.getImageBase64()
}

class convertImage {
  constructor(opts = {}) {
    let config = {
      ...opts,
      qrcode: {
        page: 'projects/home/pages/trip/main',
        scene: 'sdfsdf',
      } 
    }
    let imageW = 375
    let imageH = 667
    let width = wx.getSystemInfoSync().windowWidth

    // 图片实际宽度为 750，所以这里对画布进行 2 倍缩放
    this.scale = 2 * width / imageW
    this.config = config
    this.canvas = {
      width: width * 2, 
      height: imageH * this.scale,
      ...config.canvas
    }
    this.ctx = wx.createCanvasContext(get(config, 'canvas.id'));
  }

  getImageBase64() {
    return this.__draw()
      .then(() => {
        let ctx = this.ctx
        ctx.restore()

        return new Promise((resolve) => {
          ctx.draw(false, () => resolve())
        })
          .then(() => {
            // 生成指定大小图片，并返回图片路径
            return wx.canvasToTempFilePathAsync({
              x: 0,
              y: 0,
              canvasId: this.canvas.id 
            })
          })
          .then(res => res.tempFilePath)
          .catch((err) => {
            console.error("canvas生成图片失败",err)
            throw err
          }); 
      })
  }

  __draw() {
    // let {
    //   page,
    //   scene
    // } = this.config.qrcode

    // let getWxqrcode = () => API.getWxqrcode({
    //     page,
    //     scene,
    //   })
    //   .catch(e => console.log('getWxqrcode error', e));

    return Promise.all([
      //getWxqrcode(),
      this.__drawBg(),
    ])
      .then(res => {
        this.__drawTitle()
        this.__drawDialog()

        let wxqrCode = get(res[0], 'res.bd.data', 'https://oss.133.cn/201811/2018112214264589006.jpg')
        return this.__drawWxqr({imgSrc: wxqrCode})
      })
  }

  __drawBg() {
    let ctx = this.ctx;
    return wx.getImageInfoAsync({ 
      src: 'https://cdn.133.cn/ticket/images/hangban/vue/delaycare/share_to_friends2.png' 
    })
      .then(res => {
        ctx.drawImage(res.path, 0, 0, this.canvas.width, this.canvas.height)
        ctx.save()
      })
  }

  __drawTitle() {
    let ctx = this.ctx
    let scale = this.scale
    let font = parseInt(14*scale)
    ctx.font = `${font}px medium PingFangSC serif`
    ctx.beginPath()
    ctx.fillStyle = '#fff'
    ctx.fillText('延误1分钟瓜分最低1000元', 152*scale, 36*scale)
    ctx.save()
  }

  __drawDialog() {
    let ctx = this.ctx
    let text = '我去上海的航班担心延误'
    let scale = this.scale
    let font = parseInt(14*scale)

    ctx.font = `${font}px PingFangSC serif`
    let mText = ctx.measureText(text)
    let rectW = mText.width + 40*scale
    let rectH = 46*scale
    let startX = 126*scale
    let startY = 80*scale

    fillRoundRect(ctx,startX,startY,rectW,rectH,10,'rgba(255, 247, 229, 1)')
    ctx.save()

    // 填充文字
    ctx.beginPath()
    ctx.fillStyle = 'rgba(154, 96, 45, 1)'
    ctx.fillText(text, startX+18*scale, startY + 29*scale)
    ctx.save()
  }

  __drawWxqr({
    imgSrc = 'https://cdn.133.cn/ticket/images/hangban/vue/delaycare/wxqr.jpg',
    x = 64.5 * this.scale,
    y = 240 * this.scale,
    width = 58 * this.scale,
    height = 58 * this.scale,
  } = {}) {
    return wx.getImageInfoAsync({ 
      src: imgSrc 
    })
      .then(res => {
        let ctx = this.ctx
        ctx.beginPath()
        ctx.fillStyle = '#fff'
        ctx.arc(x*2+width, y*2+width, width + 10, 0, Math.PI*2)
        ctx.clip()
        ctx.fill()

        ctx.drawImage(res.path, x*2, y*2, width*2, height*2)
        ctx.save()
      })
  }
}

/**
 * 该方法用来绘制一个有填充色、底边带斜箭头的圆角矩形
 * http://1017401036.iteye.com/blog/2311141
 * 
 * @param ctx:canvas的上下文环境
 * @param x:左上角x轴坐标
 * @param y:左上角y轴坐标
 * @param width:矩形的宽度
 * @param height:矩形的高度
 * @param radius:圆的半径
 * @param fillColor:填充颜色
**/
function fillRoundRect(ctx,x,y,width,height,radius,/*optional*/fillColor='#000000'){
	//圆的直径必然要小于矩形的宽高		
	if(2*radius>width || 2*radius>height) return false
	
	ctx.save()
	ctx.translate(x,y)
	//绘制圆角矩形的各个边
	drawRoundRectPath(ctx,width,height,radius)
  ctx.fillStyle = fillColor
	ctx.fill()
	ctx.restore()
}

function drawRoundRectPath(ctx,width,height,radius){
	ctx.beginPath(0);
	//从右下角顺时针绘制，弧度从0到1/2PI
	ctx.arc(width-radius,height-radius,radius,0,Math.PI/2);

  //矩形下边线
	ctx.lineTo(radius,height)

	//左下角圆弧，弧度从1/2PI到PI
	ctx.arc(radius,height-radius,radius,Math.PI/2,Math.PI);

	//矩形左边线
	ctx.lineTo(0,radius);

	//左上角圆弧，弧度从PI到3/2PI
	ctx.arc(radius,radius,radius,Math.PI,Math.PI*3/2);

	//上边线
	ctx.lineTo(width-radius,0);

	//右上角圆弧
	ctx.arc(width-radius,radius,radius,Math.PI*3/2,Math.PI*2);

	//右边线
	ctx.lineTo(width,height-radius);
	ctx.closePath();
}
