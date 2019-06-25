### 背景
在编写 .vue 组件时，可以将状态外置来获取一些额外的好处，譬如有这么一个组件（global-components.vue）：
````js
<template>
  <div>
    <c-popup
      :title="uiState.popup.title"
      :content="uiState.popup.content"
      :visible="uiState.popup.visible"
    ></c-popup>
    <c-notify
      :type="uiState.notify.type"
      :message="uiState.notify.message"
      :visible="uiState.notify.visible"
    ></c-notify>
  </div>
</template>

<script>
  import store from './store';
  export default {
    data() {
      return {
        uiState: store.state
      }
    },
  }  
</script>
````
将组件的状态外置，即 store.js 如下：
````js
export default {
  state: {
    popup: {},
    notify: {}
  },

  setState (key, value) {
    this.state[key] = value;
  },

  clearState () {
    this.state = {};
  }
};
````
组件状态外置有两个好处：
* 单独的 js 文件，可以享受编辑器的代码提示功能
* 可以在任意地方，引入 store.js 就可以修改组件的内部状态

然而这都不是今天讨论的重点，重点是，上面的代码隐藏着一个 bug。

### bug 回放
在 store.js 中，我们通过方法 setState 设置组件的状态，通过 clearState 重置所有组件状态。

对于全局组件，我们希望在路由切换的时候关闭这些组件，自然，可以使用 clearState 来达到这一目的。

一切都很美好。

某天，组里一个同学发现，前进一个页面后再返回，调用 setState，组件状态没有发生变化。

### bug 修复
显然，调用 setState 肯定会更改 state，但 vue 为什么没有观察到这个变化呢？我们再看下 data：
````
data() {
  return {
    uiState: store.state
  }
}
````
嗯，这肯定没有问题。

在 bug 回放中，我们看到，因为路由切换才导致了这个问题，于是猜测是 clearState 的锅——我们粗暴的使用“=”重置 state 为一个新的空对象，而 vue 还保留着原来的那个 state 对象。

更改 clearState 的实现：
````
clearState () {
  Object.keys(this.state).forEach(key => {
    this.state[key] = {};
  })
}
````

所以，我们能学到点什么教训/经验？


