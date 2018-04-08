这是部门同事的一次内部分享，听完后受益颇多，趁着记忆还算新鲜，赶紧记录一波。

# 使用 dev-tool 进行页面性能分析

## 前置概念
1.  等待事件 waiting
2.  带宽

### 延迟
客户端`client`向服务器`server`发送一个请求，到客户端接收到第一个字节的这段时间，称为等待时间（waiting）。

### 带宽
带宽表示资源的下载速度。我们常说的带宽 2M，其实指的是带宽为 2M/s，表示每秒可下载 2M 的网络资源。

### 从`Connection Start`到`Content Download`
![](https://images2018.cnblogs.com/blog/1085489/201804/1085489-20180408174731802-1839510318.png)

图示请求并得到一个网络资源/文件的过程、及时间。名词解释：
* Queueing. 浏览器在以下事件发生时产生排队请求：
  + 有更高优先级权限的请求
  + 已经打开 6 个同源限制的 TCP 链接
  + 浏览器会短暂分配磁盘缓存中的空间
* Stalled.阻塞。 当产生Queueing 时，请求会被阻塞。
* DNS Lookup. DNS 查询。浏览器正在查询请求的 IP 地址。
* Proxy negotiation.浏览器正在和代理服务器协商请求。
* Request sent。开始发送请求。
* Waiting(TTFB).浏览器正在等待响应的第一个字节。TTFB表示`Time To First Byte`。它包括1次往返延迟的时间和服务端准备响应的时间。
* Content Download.浏览器正在接收响应。

