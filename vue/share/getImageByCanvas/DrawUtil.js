// interface IDraw {
//   draw() {}
// }

/**
 * 注意！
 * 1、每个继承自 DrawUtils 的子类，都需要实现接口 IDraw 
 * 2、所有内容都应该在二维码绘制之前完成，位于二维码之后绘制的内容不会显示
 * @export DrawUtils
 * @class DrawUtils
 */
export default class DrawUtils {
  constructor({canvasW, canvasH}) {
    let canvas = document.createElement('canvas')
    let w = document.documentElement.clientWidth + "px"
    let h = '100%'
    canvas.width = canvasW;
    canvas.height = canvasH;
    canvas.style.width = `width: ${w}`
    canvas.style.height = `height: ${h}`

    this.canvas = canvas
    this.ctx = canvas.getContext('2d');
    this.scale = 2
  }

  getImageBase64() {
    // draw 绘制，由继承类实现
    if (typeof this.draw !== 'function') 
      throw new Error('需要实现 draw 方法！') 

    return this.draw()
      .then(() => {
        let imageBase64 = this.canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream")

        return imageBase64
      })
  }

  drawBackgroundImage({
    imgSrc,
    width = 750,
    height = 1334
  }) {
    return new Promise((resolve, reject) => {
      let ctx = this.ctx
      let img = new Image(); 
      img.src = getImage(imgSrc)
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
        return resolve()
      }
      img.onerror = reject
    })
  }

  drawWeixinQrcode({
    imgSrc = 'https://cdn.133.cn/ticket/images/hangban/vue/delaycare/wxqr.jpg',
    x = 129,
    y = 480,
    width = 116,
    height = 116,
  } = {}) {
    return new Promise((resolve, reject) => {
      let ctx = this.ctx
      let scale = this.scale
      x = x * scale
      y = y * scale

      let img = new Image();
      img.src = getImage(imgSrc)
      img.onload = () => {
        ctx.beginPath()
        ctx.fillStyle = '#fff'
        ctx.arc(x+width, y+width, width + 10, 0, Math.PI*2)
        ctx.clip()
        ctx.fill()

        // drawImage 后面不能再画其他
        ctx.drawImage(img, x, y, width*scale, height*scale)

        return resolve()
      }
      img.onerror = reject
    })
  }

  drawText({
    x,
    y,
    fontSize,
    color,
    text,
  }) {
    let ctx = this.ctx
    ctx.font = `${fontSize*this.scale}px medium PingFangSC serif`
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.fillText(text, x*this.scale, y*this.scale)
  }

  drawTextWithBorder({
    x = 126,
    y = 80,
    fontSize,
    color,
    text,
    lineHeght,
    backgroundColor,
    broderRadius = 10
  }) {
    let ctx = this.ctx
    let scale = this.scale

    ctx.font = `${fontSize*scale}px PingFangSC serif`
    let mText = ctx.measureText(text)
    let rectW = mText.width + 40*scale
    let rectH = lineHeght*scale
    let startX = x*scale
    let startY = y*scale

    fillRoundRect(ctx,startX,startY,rectW,rectH, broderRadius, backgroundColor);

    // 填充文字
    ctx.beginPath()
    ctx.fillStyle = color
    // 文字距离左边 36，垂直居中
    ctx.fillText(text, startX+36, startY + 58)
  }
}


function getImage(src) {
  return `${window.HLCX_H5_BASE_URL}/api/picImage/transferImage?path=${src}`
}

/**
 * 该方法用来绘制一个有填充色、底边带斜箭头的圆角矩形
 * http://1017401036.iteye.com/blog/2311141
 * 
 * @param cxt:canvas的上下文环境
 * @param x:左上角x轴坐标
 * @param y:左上角y轴坐标
 * @param width:矩形的宽度
 * @param height:矩形的高度
 * @param radius:圆的半径
 * @param fillColor:填充颜色
**/
function fillRoundRect(cxt,x,y,width,height,radius,/*optional*/fillColor){
	//圆的直径必然要小于矩形的宽高		
	if(2*radius>width || 2*radius>height) return false
	
	cxt.save()
	cxt.translate(x,y)
	//绘制圆角矩形的各个边
	drawRoundRectPath(cxt,width,height,radius)
	cxt.fillStyle=fillColor||"#000"
	cxt.fill()
	cxt.restore()
}

function drawRoundRectPath(cxt,width,height,radius){
	cxt.beginPath(0);
	//从右下角顺时针绘制，弧度从0到1/2PI
	cxt.arc(width-radius,height-radius,radius,0,Math.PI/2);

  //矩形下边线
	cxt.lineTo(radius,height)

	//左下角圆弧，弧度从1/2PI到PI
	cxt.arc(radius,height-radius,radius,Math.PI/2,Math.PI);

	//矩形左边线
	cxt.lineTo(0,radius);

	//左上角圆弧，弧度从PI到3/2PI
	cxt.arc(radius,radius,radius,Math.PI,Math.PI*3/2);

	//上边线
	cxt.lineTo(width-radius,0);

	//右上角圆弧
	cxt.arc(width-radius,radius,radius,Math.PI*3/2,Math.PI*2);

	//右边线
	cxt.lineTo(width,height-radius);
	cxt.closePath();
}
