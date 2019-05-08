'use strict'

import { notAuthorizedRoutesName } from '@/router/routes'
import sections from '@/data/sections'
import router from '@/router/router'
import NProgress from 'nprogress'
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
  NProgress.start()
  const isLogin = store.state.profile.isLogin

  if (to.path === '/' && to.name !== DEFAULT_ROUTE_NAME) {
    next({ name: DEFAULT_ROUTE_NAME })
  } else if (to.name === sections.auth && isLogin) {
    next({ name: DEFAULT_ROUTE_NAME })
  } else if (!notAuthorizedRoutesName.includes(to.name) && !isLogin) {
    next({ name: sections.auth })
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
