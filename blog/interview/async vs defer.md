如何理解 `script` 标签属性 async 和 defer？

对于这个问题，通常我们关心两个方面：
*  async 和 defer 用来干啥
*  是否阻塞页面渲染 

### [MDN 解释](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)
首先我们看看 MDN 是如何解释这两个属性的。

#### async
async 在 HTML5 中首次出现。如果值为 true，则指示浏览器应该尽可能的异步加载脚本，下载完成后立即执行（不保证顺序）。

*如果缺少 src 属性值（譬如内联脚本），async 不生效*

动态插入脚本（document.createElement（））默认异步加载。

#### defer
该属性用来指示浏览器，脚本在 document 解析完成后、DOMContentLoaded 触发前执行。

*如果缺少 src 属性值（譬如内联脚本），defer 不生效*

含有 defer 属性的脚本，按照在 document 中出现的顺序依次执行。

### 是否阻塞页面渲染
通过 MDN 的描述，我们看到，对于 defer 脚本，由于它的执行时间在 document 解析完成后、DOMContentLoaded 触发前，所以它不会阻塞渲染；async 是否阻塞渲染取决于它的执行时机——如果 async 脚本在 document 解析过程中执行，那么一定会阻塞渲染，否则就不会。

![](image/async_defter.png)




