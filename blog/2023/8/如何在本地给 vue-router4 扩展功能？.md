## 如何在本地给 vue-router4 扩展功能？

### 背景
前段时间给基于 vue3 的 H5 项目做一些优化，该项目经常会有一些页面间的通信，譬如选择地址、乘机人等信息后回填到上一个页面。对于这种简单、频繁的通信，实在不想搞成**重火力**（eg:pinia）。最好让使用者用完即走，不用操心除业务逻辑之外的任何事情。

### 路由控制页面通信
既然是页面间的通信，那么使用路由来控制是非常自然的，具体使用方式如下：
````js
// A 页面跳转 B 页面时，传递 callback 回调函数
import { useRouter } from 'vue-router'
const router = useRouter()
router.push({
  path: '/some/page/b',
  callback: dataFromB => {
    handleData(dataFromB)
  }
})

// B 页面，在某个时机（提交时）调用 callback，再返回 A 页面
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
const address = {}
const tapSubmit = () => {
  if (route.callback) route.callback(address)
  router.back()
}
````
可以看到，我们通过熟悉的回调函数方式实现了页面间的数据通信。对使用者来说，几乎没有增加心智负担。

*唯一的限制是：A 页面必须被`keepAlive`。*显然这是合理的，难道阁下希望回到 A 页面时，数据全部重新渲染一次？

### 处理 vue-router 类型限制
`vue-router 4`版本通过`typescript`严格限制了其参数类型，`callback`可不在其参数类型声明里面。直接使用上述方案，只会得到**红线警告**以及**编译错误**。

所以，我们要在【本地】扩展`vue-router`的接口。

#### 首先增加 callback 参数类型
新建`vue-router.d.ts`类型声明文件，为接口`RouteLocationNormalizedLoaded`增加`callback`字段。
```js
import 'vue-router'

declare module 'vue-router' {
  interface RouteLocationNormalizedLoaded {
    callback?: anyFn
  }
}

```

#### 其次重写 `vue-router`
通过重写`useRoute`和`useRouter`，处理生产和消费`callback`的逻辑：

```ts
// src/lib/vue-router/index.ts
import { anyFn } from '@/@types'
import {
  useRouter as rawUseRouter,
  useRoute as rawUseRoute,
  useLink,
  RouteLocationRaw,
  createRouter,
  createWebHistory,
  onBeforeRouteLeave,
  onBeforeRouteUpdate,
  isNavigationFailure,
} from '../../../node_modules/vue-router'

export {
  useRouter,
  useRoute,
  useLink,
  createRouter,
  createWebHistory,
  onBeforeRouteLeave,
  onBeforeRouteUpdate,
  isNavigationFailure,
}

const map: Record<string, anyFn | undefined> = {}

function useRoute() {
  const route = rawUseRoute()

  route.callback = map[route.path]

  return route
}

function useRouter() {
  const router = rawUseRouter()
  const newRouter = {
    ...router,
    push(to: RouteLocationRaw) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const opts = to as any

      if (map[opts.path]) map[opts.path] = void 0
      if (typeof opts === 'object' && opts.callback) {
        map[opts.path] = opts.callback
      }

      return router.push(opts)
    },
  }

  return newRouter
}

```

### 最后更改项目解析`vue-router`的地址
一般情况下，我们在项目中这样导入：`import {} from vue-router`。当 vite 构建项目时，会将其引用地址解析到`node_modules`中。所以，我们还需要更改这个地址解析流程，使其能够解析到我们自建的`vue-router.ts`文件中。

好在 vite 已经提供了这个能力：
```js
// vite.config.ts

{
  resolve: {
    alias: [
      //... 其他配置
      {
        find: /^vue-router$/,
        replacement: pathResolve('src/lib/vue-router/index.ts'),
      },
    ]
  }
}

```

完。