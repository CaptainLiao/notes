## 背景
解决 vue 项目页面前进刷新后退不刷新的问题，社区中已经有现成的轮子了：[vue-page-stack](https://github.com/hezhongfeng/vue-page-stack), [vue-navigation](https://github.com/zack24q/vue-navigation)等。它们默认把所有页面都进行缓存。而我现在维护的项目，使用部分页面进行缓存，直接用上面的库改动较大。

目前需要人工判断导航的目标页面是否缓存，非常不方便，也容易出现问题（譬如在 beforeEnter 钩子中使用 next 跳转到其他页面)。所以我们需要一个折中的方案。

## 目标
本方案主要实现以下目标：

1. 页面开发人员决定是否缓存页面
2. 自动创建、销毁缓存页面（前进刷新，后退不刷新）
3. 不侵入现有业务

## 实现
[源码](https://github.com/CaptainLiao/keep-alive-page)

Vue 提供的`keep-alive`组件，可以帮助我们进行页面缓存，利用`include`属性，让我们可以灵活的指定哪些页面可以缓存。

当路由前进时，根据条件判断是否缓存对应页面；当路由后退时，删除对应的缓存页面。

通过重写`router.push`、`router.replace`函数，判断页面前进或后退——调用它们即表示路由前进：
````js
  let _isRouteForward = false

  const _push = router.push.bind(router);
  const _replace = router.replace.bind(router);
  router.push = (...args) => {
    _isRouteForward = true
    _push(...args)
  }
  router.replace = (...args) => {
    _isRouteForward = true
    _replace(...args)
  }
````
在`afterEach`中，重置`_isRouteForward`，并缓存页面对应的组件
````js
  router.afterEach((to, from) => {
    _isRouteForward = false

    const matchedInfo = getMatchedComponent(to, router)
    if (!matchedInfo) return

    if (!matchedInfo.id) {
      _store.commit(`${_moduleName}/addKeepAliveComp`, {
        name: matchedInfo.keepAliveName,
        id: Date.now()
      })
    }
  })
````

在`beforeEach`中，删除已经缓存的组件：
````js
router.beforeEach((to, from, next) => {
    const matchedInfo = getMatchedComponent(to, router)
    if (!matchedInfo) return next()

    if (matchedInfo.id && _isRouteForward) {
      _store.commit(`${_moduleName}/removeKeepAliveComp`, matchedInfo.index)
      return Vue.nextTick(() => next())
    }

    return next()
  })
````

## 使用
````js
import Vue from 'vue'
import keepAlivePage from './keep-alive-page'
import store from './store'
import router from './router'

Vue.use(keepAlivePage);
keepAlivePage(router, store);

new Vue({
  router,
  store,
  render(h) {
    return h('keep-alive-page', [
      h('router-view')
    ])
  }
})
````

## 更多
本方案有诸多不足，只解决了公司项目的一些些痛点，更推荐大家使用`vue-navigation`等库。

另外，如果只考虑使用`history`模式，还可以在`vue-router`实例化之前，监听`popstate`事件，判断浏览器后退。

````js
let _isRouteBack = false

window.addEventListner('popstate', () => {
  _isRouteBack = true
})
````

