## 概览

### [从输入URL到页面加载发生了什么](https://github.com/skyline75489/what-happens-when-zh_CN/blob/master/README.rst)
<details>

* 解析URL
* 检查 HSTS（http strict transport security） 列表
* DNS 解析，得到 ip
* 根据 ip 和端口，进行 TCP 连接
* 使用 http 协议发送请求
* http 服务器处理请求，返回处理结果
* [浏览器的背后工作](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/constructing-the-object-model?hl=zh-CN)
  * 解析—— html、js、css
  * 渲染—— dom + cssom -> renderTree -> paint -> composite
</details>

### web 性能
#### 加载性能
<details>
* 优化内容效率
  * tree shaking
  * 代码拆分，延迟加载非关键代码
  * 源码压缩
  * GZIP 压缩
  * 缓存

</details>

#### 渲染性能
<details>


</details>

#### 性能优化策略
<details>
* HTTP
  * 减少 HTTP 请求
  * 图片合并、懒加载、使用css3替代
  * 域名发散
  * DNS 预解析
  * 避免重定向
  * 使用 [HTTP2.0](https://developers.google.com/web/fundamentals/performance/http2?hl=zh-CN)
* 缓存
  * 静态文件使用 CDN
  * 缓存头（Cache-Control、Expires、ETag、Last-Modified）
  * 缓存 Ajax（Get 请求可缓存）
* Gzip
* CSS
  * 样式表放顶部
  * 避免 CSS 表达式
  * 减少嵌套
* JS
  * 精简 JS 脚本（删除重复脚本、组件化、模块化）
    * treeShaking
    * code split
  * 脚本放在底部，外部脚本开启 [async、defer](../async vs defer.md) 属性
  * 使用 requestAnimationFrame
  * 
</details>

### [web 安全](https://eggjs.org/zh-cn/core/security.html)
<details>

* XSS: 对网页注入脚本，使用 js 窃取用户信息，诱导用户操作
* CSRF: 伪造用户请求向网站发起恶意请求
* 钓鱼攻击：利用网站跳转链接或图片制造钓鱼陷阱
* http parameter pollution：利用对参数格式验证的不完善，对服务器进行参数注入攻击
* 中间人攻击
* server-side request forgery
</details>

### http 协议
<details>

* http1.0
* [http2.0](https://developers.google.com/web/fundamentals/performance/http2?hl=zh-CN)
  * 二进制分帧层，单个连接多路复用，请求和响应并行发送
  * 服务端推送
  * 标头压缩
* status code
  * 1xx
  * 2xx
  * 3xx
  * 4xx
  * 5xx
<details/>