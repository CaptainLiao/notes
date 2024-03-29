这是部门同事的一次内部分享，听完后受益颇多，趁着记忆还算新鲜，赶紧记录一波。

## 从 dev-tool 看页面 parse 过程


### request - response
当浏览器发送一个请求到接受所有响应数据，这个过程发生了什么？

开发模式下打开航班管家 H5，通过`dev-tool`分析`jipiao/`文件请求，看从`Connection Start`到`Content Download`期间，浏览器做了哪些事：
![](https://images2018.cnblogs.com/blog/1085489/201804/1085489-20180409165448717-24368741.png)
图（1）请求并得到一个网络资源/文件的过程、及时间

结合图1及相关资料，浏览器按时间顺序经历了如下事件：
1. Queued. 浏览器在以下事件发生时产生排队请求：有更高优先级权限的请求；已经打开 6 个同源限制的 TCP 链接；浏览器会短暂分配磁盘缓存中的空间。
2. Stalled. 当产生Queued 时，请求会被阻塞。
3. DNS Lookup. 浏览器正在查询请求的 IP 地址。
4. Proxy negotiation. 浏览器正在和代理服务器协商请求。
5. Request sent. 开始发送请求。
6. Waiting(TTFB). 浏览器正在等待响应的第一个字节。TTFB表示`Time To First Byte`。它包括1次往返延迟的时间和服务端准备响应的时间。
7. Content Download. 浏览器正在接收响应。

### Parse Html
HTML 的解析算法并不是传统的自顶向下或自底向上，它包含两个步骤： tokenization 和 tree construction。这里好像比较复杂（其实是我说不明白），但至少要明白解析的顺序是自顶向下的。

当然，解析并不一直一帆风顺，当遇到以下情况，解析过程将被阻塞：
* HTML的响应流被阻塞在了网络中
* 有未加载完的脚本
* 执行脚本前，此时还有未加载完的样式文件
* 执行脚本

### 解析脚本和样式的顺序

#### 解析脚本
同步过程。当解析过程中遇到了`<script>`标签，会停止继续解析直到脚本执行完成。如果脚本是外链资源，则需要等待资源加载并执行完毕才能继续向下解析。

#### 猜测预加载技术
现代主流浏览器都用到了这个优化技术。

当执行脚本的时候，浏览器会启动另一个线程来向下解析文档，找到需要从网络加载的链接并加载它们，加载这些资源的请求是并发的。注意，这项技术不会修改 DOM 树，它仅解析对外部资源（如外部脚本，样式表和图像）的引用。

#### 样式
异步过程，解析样式不会阻塞DOM构建，但会阻塞构建渲染树。不过，在文档解析阶段，脚本会询问样式信息。如果样式尚未加载并解析，脚本将得到错误的答案，显然这会导致很多问题。

所以，当有一个仍在加载和解析的样式表时，Firefox将阻止所有脚本。 Webkit仅在脚本尝试访问某些可能受卸载样式表影响的样式属性时才阻止脚本。

### Rendering engines
当`html`文件的相应字节被浏览器接受后（通常是8K一个包），“渲染引擎”便开始工作了：

TL;DR
渲染引擎将解析到的 HTML 文档标签转换为 DOM 树，并解析内联和嵌入的样式，它们一起合并形成“渲染树”;
渲染树由一个个包含颜色、尺寸等属性的矩形构成，并按照正确的顺序显示在屏幕上；
布局计算每个节点对象的确切位置和大小；
最后是绘制，使用 UI backend layer 把渲染树绘制到屏幕上。

为了更好的用户体验（user experience），渲染引擎会解析一部分内容就显示一部分，不会等到所有的 HTML 都被解析才开始构建和布局渲染树。

+--------------+     +------------+    +---------+     +-----------+
| 解析HTML     |     |            |    |         |     |           |
| 构建DOM树    +---^--> 构建渲染树  +---->  布局    +----->  绘制     |
|              |  |  |            |    |         |     |           |
+--------------+  |  +------------+    +---------+     +-----------+
+--------------+  |
|              |  |
|解析stylesheet --+
|构建 CSSOM    |
+--------------+

简要总结渲染引擎的工作：
* 解析 HTML 标签构建 DOM 树
* 解析 CSS 样式构建 CSSOM 树
* 将DOM 与 CSSOM 合并成一个渲染树
* 将渲染树的各个节点绘制到屏幕上

## 使用 dev-tool 进行页面性能分析
我们使用chrome浏览器的dev-tool进行页面性能分析，录制的是航班管家h5(本地)首页初始加载的情况。
![](https://images2018.cnblogs.com/blog/1085489/201804/1085489-20180409112952869-8467908.png)
图（2）概览

我们将图2放大一点：
![](https://images2018.cnblogs.com/blog/1085489/201804/1085489-20180409094654722-123460611.png)
图（3）

`Main`项表示浏览器主要流程时序，`Network`项表示网络请求时序。

### parse html

结合图2、图3的`Main`项可以看到，

第一步：发送了一个请求->`Send Request(home)`，对应`network`中灰色的`home(wtest.133.cn)`，它表示请求`https://wtest.133.cn/dev/lfy/hangban/vue/jipiao/home`这个html页面，响应数据是分段发送的，浏览器接受到**数据片段**即开始`Parse Html`。**并且在`Parse Html(home[1...54])`过程中，并行发送了从`alpaca.css`到`resize-vue.js`的 7 个请求。**

第二步：等待资源加载完毕，执行脚本后，继续`Parse Html(home[55...])`

第三步：`DOMContentLoaded`事件完成，开始渲染页面。此时执行延迟脚本，发送图2中第一个红线框的JS请求，等待响应。

第四步：浏览器接受响应，执行脚本后，发送第二个红线框的 JS 请求，等待响应。

第五步：浏览器接受响应，执行脚本。end。

### 优化
通过以上分析，我们已经清楚了时间都被浪费在了哪些地方：
* alpaca.css 加载时间过长
* 红线框 JS 的请求优先级过低
* JS 请求 Stalled 时间过长
* 浏览器并发数量限制

优化举措：
* 将css文件内敛到 html 文件中
* 将首页渲染必需的 JS 同步加载，非必需的延迟加载
* 经分析，JS 文件 Stalled 的时间过长原因是：内部require资源都是动态加载，每次都会耗费性能查找。需要改成静态加载。


## 扩展

#### 猜测预加载技术

我们知道，JS 加载和执行过程中会阻塞页面`Parse`。但仔细观察图3，请求几乎都是同时发送的，这是为什么呢？

为了减少阻塞时间，现代浏览器使用了一种“猜测预加载”的技术。当渲染被阻塞的时候，它会做以下事情：

* 轻量级的HTML（或CSS）扫描器（scanner）继续在文档中扫描
* 查找那些将来可能能够用到的资源文件的url
* 在渲染器使用它们之前将其下载下来

但是，猜测预加载不能发现通过javascript脚本来加载的资源文件（如，document.write()），[参见](http://www.cnblogs.com/yuezk/archive/2013/01/11/2855698.html)。


更多：
[详谈合成层（composite layers）](https://juejin.im/entry/59dc9aedf265da43200232f9)
[How browsers work](http://taligarsiel.com/Projects/howbrowserswork1.htm#Rendering_engines)

fuck this shit!