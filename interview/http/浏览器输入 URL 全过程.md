https://zhuanlan.zhihu.com/p/133906695

1、输入地址
2、浏览器查找域名的 IP 地址
3、浏览器向 web 服务器发送一个 HTTP 请求
4、服务器的永久重定向响应
6、服务器处理请求
7、服务器返回一个 HTTP 响应
8、浏览器显示 HTML
9、浏览器发送请求获取嵌入在 HTML 中的资源（如图片、音频、视频、CSS、JS等等）

### 1、输入地址
当我们开始在浏览器中输入网址的时候，浏览器其实就已经在智能的匹配可能得 url 了，他会从历史记录，书签等地方，找到已经输入的字符串可能对应的 url，然后给出智能提示，让你可以补全url地址。对于 google的chrome 的浏览器，他甚至会直接从缓存中把网页展示出来，就是说，你还没有按下 enter，页面就出来了。


### [构建文档模型](https://web.dev/critical-rendering-path-constructing-the-object-model/)
渲染页面前，需构建 DOM 和 CSSOM 树。
#### TL;DR #
* 字节码 → 字符 → tokens → nodes → object model.
* HTML 转化成 DOM; CSS 转化为 CSSOM.
* DOM and CSSOM 是独立的数据结构.
* Chrome DevTools Timeline allows us to capture and inspect the construction and processing costs of DOM and CSSOM.
