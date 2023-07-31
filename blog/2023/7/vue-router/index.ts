import { fArgVoid } from '@/@types'
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

import { addPushAndReplaceAlive } from '../../router/keep-alive'

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

const map: Record<string, fArgVoid | undefined> = {}

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

  addPushAndReplaceAlive(newRouter)
  return newRouter
}
