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
    const CANVAS = document.createElement('canvas')
    // 设置画布本身的大小
    CANVAS.width = canvasW
    CANVAS.height = canvasH

    this.ctx = setupCanvas(CANVAS)
    this.canvas = CANVAS
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
    width = 375,
    height = 667
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
      let img = new Image();
      img.src = getImage(imgSrc)
      img.onload = () => {
        ctx.beginPath()
        ctx.fillStyle = '#fff'
        let r = width/2
        ctx.arc(x+r, y+r, r + 5, 0, Math.PI*2)
        ctx.clip()
        ctx.fill()

        // drawImage 后面不能再画其他
        ctx.drawImage(img, x, y, width, height)

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
    ctx.font = `${fontSize}px medium PingFangSC serif`
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.fillText(text, x, y)
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
    let extraWidth = 40
    ctx.font = `${fontSize}px PingFangSC serif`
    let rectW = ctx.measureText(text).width + extraWidth
    let rectH = lineHeght

    fillRoundRect(ctx, x, y, rectW, rectH, broderRadius, backgroundColor);

    // 填充文字
    ctx.beginPath()
    ctx.fillStyle = color
    // 水平垂直居中
    ctx.textBaseline = 'bottom'
    ctx.fillText(text, x + extraWidth/2, y + lineHeght/2)
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

function setupCanvas(canvas) {
  const UI_WIDTH = 375
  const DOC_WIDTH = document.documentElement.clientWidth
  const DPR = window.devicePixelRatio
  let scale = (DPR * DOC_WIDTH/UI_WIDTH).toFixed(2)
  
  // 设置画布本身的大小
  canvas.width *= scale
  canvas.height *= scale

  let ctx = canvas.getContext('2d')
  ctx.scale(scale, scale)

  return ctx
}
