
## 3996 条路由？
![](https://img2023.cnblogs.com/blog/1085489/202308/1085489-20230808091919118-1153265185.png)

`addRoute`函数用了大约1s才执行完毕。通过观察，发现居然有3996条路由记录。

![](https://img2023.cnblogs.com/blog/1085489/202308/1085489-20230808092026967-1045300519.png)

可是项目并没有这么多的页面啊~

### 重复路由
````js
let routes: Array<RouteRecordRaw> = [
  {
    path: '/promotion/ticket-list-jegotrip',
    component: () =>
      import(
        /* webpackChunkName: "promotion/ticket-list-jegotrip" */ './pages/ticket-list-jegotrip/index.vue'
      ),
  },
]

const routerFiles = import.meta.globEager('./**/routes.ts')
Object.keys(routerFiles).forEach((key) => {
  routes = [...routes, ...routerFiles[key].default]
  routes.forEach((item) => {
    router.addRoute(item)
  })
})

````
仔细看，这里的`router.addRoute`会重复添加路由，由于大部分路由没有填写`name`，使得`addRoute`的时候不会自动去重。

修复这个问题倒也简单：
````js
routes.forEach((item) => router.addRoute(item))

const routesFiles = import.meta.globEager('./**/routes.ts')
Object.keys(routesFiles).forEach((key) => {
  const moduleRoutes = routesFiles[key].default || []
  moduleRoutes.forEach((item) => {
    router.addRoute(item)
  })
})
````
![](https://img2023.cnblogs.com/blog/1085489/202308/1085489-20230808091944819-486661638.png)


## 如果真有上千条路由怎么优化呢？

答案还是`addRoute`。只不过我们不在初始化阶段就添加全部路由，而是在需要的时候添加，就是`beforeEach`中添加：
```js
const routesFiles = import.meta.globEager('./**/routes.ts')
const allRoutes = Object.keys(routesFiles)
  .map((key) => routesFiles[key].default || [])
  .flat(Infinity)

router.beforeEach((to, from, next) => {
  const { path } = router.resolve(to)

  if (hasAddRoute(path)) return next()

  const matchedRoute = allRoutes.find(i => i.path === path)
  if (!matchedRoute) throw `${path} 不存在`

  router.addRoute(matchedRoute)
  // https://router.vuejs.org/zh/guide/advanced/dynamic-routing.html
  return to.fullPath
})
```
这里还有一些优化点：
1.  如何使 hasAddRoute 的效率更高，比如做到时间复杂度为O(1)?
2.  打开一个页面后，能否预测下一个页面的路由进而提前添加，减少页面跳转时延？
3.  能否减少路由（allRoutes）生成时间？

等咱们项目真增长到这个程度再说吧，哈哈哈哈~
