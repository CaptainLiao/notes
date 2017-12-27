# 如何使不同时区的时间与京8区一致？（JS实现）

一般而言，我们都以时间戳的方式存储某个时间。在需要的时候提取出来，根据不同业务需求进行转化：
````
function transfromDate(time) {
  // 假设time是时间戳，如：1514273945276
  let curDate = new Data(time);
  // todo
}
````
这里存在一个潜在问题——改变本机的时区，`curDate`的值会发生变化！shit！！！

>当Date作为构造函数调用并传入多个参数时，所定义参数代表的是当地时间
>[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date)

即，构造出的日期用来显示时，会被转换为本地时间（调用 toString 方法）：
````
>new Date()
<Tue Dec 26 2017 15:47:50 GMT+0800 (中国标准时间)
````

## GMT AND UTC
`GMT+0800`是个什么东西呢？我们先来介绍一些可能当年在地理课上学习过的基本概念。

以前人们通过观察太阳的位置来决定时间（比如：使用日晷），这就使得不同经纬度的地区时间是不一样的。后来人们进一步规定以子午线为中心，向东西两侧延伸，每 15 度划分一个时区，刚好是 *24* 个时区。然后因为一天有 24 小时，地球自转一圈是 360 度，360 度 / 24 小时 = 15 度/小时，所以**每差一个时区，时间就差一个小时**。

**GMT：**
最开始的标准时间（子午线中心处的时间）是英国伦敦的皇家格林威治天文台的标准时间（因为它刚好在本初子午线经过的地方），这就是我们常说的 `GMT`（Greenwich Mean Time）。

然后其他各个时区根据标准时间确定自己的时间，*往东的时区时间早*（表示为 GMT+hh:mm）、*往西的时区时间晚*（表示为 GMT-hh:mm）。比如，中国标准时间是东八区，我们的时间就总是比 `GMT` 时间早 8 小时，他们在早晨 9 点，我们才凌晨 1 点。

所以，`GMT+0800` 表示早于格林威治时间8小时。

**UTC：**
但是`GMT`其实是根据地球自转、公转计算的（太阳每天经过英国伦敦皇家格林威治天文台的时间为中午 12 点），不是非常准确，于是后面提出了根据原子钟计算的标准时间 `UTC`（Coordinated Universal Time）。

一般情况下，GMT 和 UTC 可以互换，但是实际上，GMT 是一个时区，而 UTC 是一个时间标准。

## JS使不同时区的时间与京8区一致
要计算不同时区相对于京8区的时间偏差，我们要借助 `Javascript` 中的 `Date` 对象的实例方法 `getTimezoneOffset()`:
>getTimezoneOffset() 方法返回协调世界时（UTC）相对于当前时区的时间差值，单位为分钟。
>如果本地时区早于协调世界时(UTC)，则该差值为负值，如果晚于协调世界时则为正值

### 对比：

|                       |  东时区  |  格林威治  |  西时区  |
| ---------------------:|:------------:| -------------:| -----------:|
|  GMT +/-              |     +    |           |    -     |
|  getTimezoneOffset()  |   < 0    |           |    > 0   |
|  早/晚                |     早    |           |    晚    |



完整代码：
````
/**
 * 获取绝对时间
 * 即无论你在哪个时区，得到的时间和京8区的时间一致
 * 
 * @param {Date} time 
 * @returns {years,month, day, hours, minutes, seconds}
 */
function getAbsTime(time) {
  try {
    let currentZoneTime = new Date(time);
    let currentZoneHours = currentZoneTime.getHours();
    let offsetZone = currentZoneTime.getTimezoneOffset() / 60;

    // 下面两行的逻辑有些繁复，注释以免自己懵逼
    // 因 offsetZone 带有正负
    // 再 offsetZone > 0 表示西时区（西区晚），则相对于京8区实际晚了 |offsetZone| + 8 个小时
    // 又 offsetZone < 0 表示东时区（东区早），则相对于京8区实际早了 -|offsetZone| + 8 个小时
    offsetZone += 8;
    currentZoneTime.setHours(currentZoneHours + offsetZone);
    return transfromDate(currentZoneTime)
  } catch(e) {
    throw e
  }
}
````

####部分类容节选自：
https://segmentfault.com/a/1190000004292140
https://www.cnblogs.com/liyunhua/p/4661070.html
