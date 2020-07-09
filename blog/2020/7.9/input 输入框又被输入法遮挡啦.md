在安卓手机端，input 输入框被输入法遮挡出现的机率几乎是 100%。如果领导们不在意，我们就睁一只眼闭一只眼。但如果要认真起来解决问题，却发现并不是很容易，然而今天并不是来倒苦水的，直接进入正题。

我们先看看 iPhone 的优异表现：
![](./h5deq-4am5t.gif)

他苹果婊能做到，我们安卓鸡怎么不行？

### 默默无闻 focusin
当一个元素聚焦时会出发 focusin 事件，可以把它看作是可以冒泡的 focus event。

要的就是**冒泡**。

### 安卓鸡的春天
有了`focusin`，再也不用干单独处理每一个 input 输入框这种体力活儿了。上代码：
````js
const isIos = /iphone|ipod|ipad/i.test(navigator.appVersion)

// 苹果会自动将 input 滚动到可见视口内
if (isIos) return;

document.documentElement.addEventListener('focusin', e => {
  // 只处理 input 元素
  if (e.target.tagName.toLowerCase() !== 'input') return;

  // 无法确定输入法的弹窗什么时候会弹出来，这里通过4次循环（共2秒）将 input 滚动到可见视口内
  const scrollToView = (count) => {
      if (count >= 4) return clearTimeout(this.__timerId);

      this.__timerId = setTimeout(() => {
        this.$refs.bookInputRef.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
        scrollToView(count + 1)
      }, 500)
    }

    scrollToView(0);
})
````

