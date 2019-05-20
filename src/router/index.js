'use strict'

import { notAuthorizedRoutesName } from '@/router/routes'
import { includePermission } from '@/scripts/utils'
import NProgress from '@/libraries/nprogress'
import sections from '@/enum/sections'
import router from '@/router/router'
import store from '@/store'

/**
 * User move to this router on:
 *  - after logout
 *  - breadcrumbs
 *  - logo
 *  - home page
 * @type {string}
 */
export const DEFAULT_ROUTE_NAME = sections.home

router.beforeEach((to, from, next) => {
  const isLogin = store.state.profile.isLogin
  NProgress.start()

  // Guard - User not auth or/and Auth page
  if (to.path === '/' && to.name !== DEFAULT_ROUTE_NAME) {
    return next({ name: DEFAULT_ROUTE_NAME })
  } else if (to.name === sections.auth && isLogin) {
    return next({ name: DEFAULT_ROUTE_NAME })
  } else if (!notAuthorizedRoutesName.includes(to.name) && !isLogin) {
    return next({ name: sections.auth })
  }

  // Guard - User auth and permissions
  if (to.meta.permissions && !includePermission(to.meta.permissions)) {
    return next({ name: to.meta.failRouteName || sections.home })
  }

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
