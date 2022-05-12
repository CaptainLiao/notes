
## 强制缓存
### Expires
Expires 响应头包含日期/时间，即在此时候之后，响应过期。

如果在Cache-Control响应头设置了 "max-age" 或者 "s-max-age" 指令，那么 Expires 头会被忽略。

### Cache-Control
Cache-Control 通用消息头字段，被用于在http请求和响应中。缓存指令是单向的，这意味着在请求中设置的指令，不一定被包含在响应中。

* no-cache 在发布缓存副本之前，强制要求缓存把请求提交给原始服务器进行验证(协商缓存验证)
* no-store 缓存不应存储有关客户端请求或服务器响应的任何内容，即不使用任何缓存
* max-age=<seconds> 设置缓存存储的最大周期，超过这个时间缓存被认为过期(单位秒)。与Expires相反，时间是相对于请求的时间

## 协商缓存
### Last-Modified/If-Modified-Since
Last-Modidied 是一个响应首部，包含源头服务器资源修改的日期及时间。

If-Modified-Since 是一个条件式请求首部，资源时间到期且已修改，返回200。时间到期且未修改，返回304。仅支持`GET``HEAD`请求。

### Etag/If-None-Match
ETag HTTP响应头，是资源的特定版本的标识符。这可以让缓存更高效，并节省带宽，更精确。

If-None-Match 是一个条件式请求首部。

## 浏览器启发式缓存策略
如果一个可以缓存的请求没有设置Expires和Cache-Control，但是响应头有设置Last-Modified信息，这种情况下浏览器会有一个默认的缓存策略：(当前时间 - Last-Modified)*0.1[chromium](https://source.chromium.org/chromium/chromium/src/+/main:net/http/http_response_headers.cc;l=1112)，这就是启发式缓存。


## H5 缓存技术
* 浏览器缓存机制
* Dom Storgage（sessionStorage 和 localStorage）存储机制
* Application Cache（AppCache）机制
* Indexed Database （IndexedDB）
* File System API

