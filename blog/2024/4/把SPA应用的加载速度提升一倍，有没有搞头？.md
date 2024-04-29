众所周知，**纯前端渲染**的单页应用（SPA）渲染比较慢，其中一个问题是：先加载公共js，再根据路由动态加载页面需要的js。如下图：
![](https://img2024.cnblogs.com/blog/1085489/202404/1085489-20240429085917702-1300665796.png)
1. `commons.e7c0f857.js`加载并解析完毕后（2.53s）
2. 再发起对`order.15cd187e.js`的加载(2.24s)。

*本文以 VUE 项目为例。*

### 为什么会出现串行加载的情况
诚然，这是由于[路由懒加载](https://router.vuejs.org/zh/guide/advanced/lazy-loading)造成的。但`import()`说这个锅它不想背，因为动态加载，本来就是在需要的时候才去加载。

### 把串行加载改造成并行加载
想要加速js加载过程，必须将上述js进行并行加载，这看起来和动态加载十分矛盾。

不过，我们暂且不要考虑那么多，先看看能不能做。

一个常见的路由配置如下：
````js
{
 path: '/domestic/detail',
 component: () =>
   import(
     /* webpackChunkName: "jipiao/search/domestic" */ '../domestic/detail'
   ),
}
````
要实现文件的并行加载，我们只需要两步操作:
1.  找到`path`需要的全部js/css文件，得到一个配置文件
2.  当请求到达服务器时，将匹配到的文件写入到`html`后，再返回给浏览器

#### 生成 path 对应的配置文件
如果你用的是`webpack`进行打包，很容易通过自定义插件，在`emit hook`得到`path`对应的js/css依赖文件，最终生成一个配置文件。以下代码仅作参考：
````js

class PreloadChunkPlugin {
  apply(compiler) {
    const webpackChunkNameMap = pathList.reduce((acc, item) => {
      acc[item.webpackChunkName] = {
        path: item.path,
        chunks: []
      }
      return acc
    }, {})
    
    const mode = compiler.options.mode;
    compiler.hooks.emit.tapAsync(pluginName, (compilation, callback) => {
      const chunkDepSet = compilation.chunks.reduce((acc, chunk) => {
        const chunkName = chunk.name
        if (chunkName && webpackChunkNameMap[chunkName]) {
          if (!acc[chunkName]) acc[chunkName] = {
            chunkSet: new Set(),
            chunkIdSet: new Set()
          }
          ;[...chunk._groups].forEach(chunkGroup => {
            chunkGroup.chunks.forEach(subChunk => {
              const hash = mode === 'production' ? subChunk.contentHash.javascript.substring(0, 8) : ''
              acc[chunkName].chunkSet.add(`${(subChunk.name || subChunk.id)}${hash ? '.' + hash : ''}.js`)
              acc[chunkName].chunkIdSet.add(subChunk.id)
            })
          })
        }
        return acc
      }, {})

      const pathMap = {}
      Object.keys(chunkDepSet).forEach(key => {
        const {
          chunkSet,
          chunkIdSet,
        } = chunkDepSet[key]
        pathMap[webpackChunkNameMap[key].path] = {
          chunks: [...chunkSet],
          chunkIds: [...chunkIdSet]
        }
      })

      fs.writeFileSync(
        path.resolve(__dirname, '../../app/assets-path2chunks.json'),
        JSON.stringify(pathMap)
      );

      callback();
    });
}
````

当然，`vite`插件也可以在`generateBundle`中做到。

好了，假设我们已经得到了最终的配置文件:
````json
{
  '/domestic/detail': ['detail.js', 'other.js']
}
````
#### 动态写入到 html 文件中
我们的项目恰好使用node服务来返回 html，所以比较容易实现，根据请求的路径来匹配对应的依赖文件，然后写入到`html`中，再返回给服务器。

如果你使用的是`nginx`，也可以考虑编写`lua`脚本，实现动态写入的过程。

下图是改造后的效果：
![](https://img2024.cnblogs.com/blog/1085489/202404/1085489-20240429085936580-166302439.png)

### 问题
q: 为什么不用多页？
a: 多页应用之间跳转比较慢，应用之间通信也相对麻烦。改造对业务也有侵入。

q: 为什么不用服务端渲染（ssr）
a: ssr 效果当然更好。但我们项目很大，改造成本过高。新项目当然推荐！
