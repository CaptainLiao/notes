### getImageData
`ctx.getImageData`方法返回一个`ImageData`对象，它有三个属性——width、height、data，其中 data 包含了图片色值数据。
> data属性返回一个 Uint8ClampedArray，它可以被使用作为查看初始像素数据。每个像素用4个1bytes值(按照红，绿，蓝和透明值的顺序; 这就是"RGBA"格式) 来代表。每个颜色值部份用0至255来代表。每个部份被分配到一个在数组内连续的索引，左上角像素的红色部份在数组的索引0位置。像素从左到右被处理，然后往下，遍历整个数组。——[MDN ImageData](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas)

根据这一特性，我们可以轻松提取图片的主色——出现次数最多的颜色。

````js
function fetchImageMainColor(imgSrc) {
    const canvas = document.getElementById('canvas')
    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight

    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.src = imgSrc
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
      const color = getMainColor(data);
    }
}
````
通过遍历 data 数组，找到出现最多次数的那个色值，注意，透明的颜色被我们过滤掉了：
````js
function getMainColor(data) {
  const temp = {}
  const len = data.length

  let max = 0;
  let color = ''
  let i = 0
  while(i < len) {
    if (data[i + 3] !== 0) {
      const k = `${data[i]}, ${data[i + 1]}, ${data[i + 2]}, ${(data[i + 3] / 255)}`
      temp[k] = temp[k] ? temp[k] + 1 : 1
      if (temp[k] > max) {
        max = temp[k]
        color = k
      }
    }
    i += 40 // 可以适当增加
  }

  return color
}
````

### 其他方法
[前端图片主题色提取](https://cloud.tencent.com/developer/article/1132389)
[color-thief库](https://github.com/lokesh/color-thief)