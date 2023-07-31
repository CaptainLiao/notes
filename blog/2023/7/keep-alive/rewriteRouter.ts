import { RouteRecordRaw } from 'vue-router'
import get from '@/utils/get'

import { removeKeepAliveInclude, addPushAndReplaceAlive } from './index'

export function rewriteRouter(router) {
  const addRoute = router.addRoute.bind(router)
  const removeRoute = router.removeRoute.bind(router)
  router.addRoute = (route: RouteRecordRaw, others: unknown) => {
    if (others) {
      throw new Error('addRoute 不支持传递两个以上参数')
    }
    addComponentName([route].filter(Boolean))
    return addRoute(route)
  }
  router.removeRoute = (routeName: string) => {
    removeKeepAliveInclude(routeName)
    return removeRoute(routeName)
  }

  addPushAndReplaceAlive(router)
}

function addComponentName(list) {
  if (list.length === 0) return

  list.forEach(async (route: RouteRecordRaw) => {
    const routeComp = route.component as any
    if (routeComp && get(route, 'meta.keepAlive') === true) {
      if (!route.name) {
        throw new Error(`${route.path} 开启了 keepAlive，还须设置 name。`)
      }

      if (typeof routeComp === 'function') {
        route.component = () =>
          routeComp().then((comp) => {
            comp.default.name = route.name
            return comp
          })
      } else if (routeComp.then) {
        routeComp.then((comp) => {
          comp.default.name = route.name
          return comp
        })
      } else {
        routeComp.name = route.name
      }
    }

    addComponentName(route.children || [])
  })
}
