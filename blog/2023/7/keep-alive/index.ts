import { reactive } from 'vue'
import { RouteLocationRaw, RouteLocationNormalizedLoaded, Router } from 'vue-router'
import get from '@/utils/get'

const keepAliveIncludes: string[] = reactive([])
const keepAlivePath2Name: Record<string, string> = {}

export { keepAliveIncludes, addKeepAliveInclude, removeKeepAliveInclude, addPushAndReplaceAlive }

function addKeepAliveInclude(route: RouteLocationNormalizedLoaded) {
  const keepAlive = get(route, 'meta.keepAlive')
  const routeName = route.name as string

  if (keepAlive && routeName) {
    if (keepAliveIncludes.indexOf(routeName) < 0) {
      keepAliveIncludes.push(routeName)
      keepAlivePath2Name[route.path] = routeName
    }
  }
}

function addPushAndReplaceAlive(router: Router) {
  router.pushAlive = (to: RouteLocationRaw) => {
    pruneKeepAliveCache(to, router)
    return router.push(to)
  }
  router.replaceAlive = (to: RouteLocationRaw) => {
    pruneKeepAliveCache(to, router)
    return router.replace(to)
  }
}

function pruneKeepAliveCache(route: RouteLocationRaw, router: Router) {
  const resolved = getResolvedRoute(route, router) || {}
  const routeName = resolved.name
  const routePath = resolved.path

  const keepAliveName = routeName || keepAlivePath2Name[routePath]
  removeKeepAliveInclude(keepAliveName)
}

function removeKeepAliveInclude(keepAliveName: string) {
  if (keepAliveName) {
    const idx = keepAliveIncludes.indexOf(keepAliveName)
    if (idx >= 0) {
      keepAliveIncludes.splice(idx, 1)
    }
  }
}

function getResolvedRoute(route, router) {
  const to = router.resolve(route)
  const lastMatched = to.matched[to.matched.length - 1]
  const redirect = lastMatched && lastMatched.redirect
  const newTargetLocation = typeof redirect === 'function' ? redirect(to) : redirect
  if (typeof newTargetLocation === 'string') {
    return getResolvedRoute(newTargetLocation, router)
  }

  return to
}
