'use strict'

import { notAuthorizedRoutesName } from '@/router/routes'
import router from './router'
import store from '@/store'

/**
 * User move to this router on:
 *  - after logout
 *  - breadcrumbs
 *  - logo
 *  - home page
 * @type {string}
 */
export const DEFAULT_ROUTE_NAME = 'home'

router.beforeEach((to, from, next) => {
	const isLogin = store.state.profile.isLogin

	if (to.path === '/' && to.name !== DEFAULT_ROUTE_NAME) {
		next({ name: DEFAULT_ROUTE_NAME })
	}
	else if (to.name === 'auth' && isLogin) {
		next({ name: DEFAULT_ROUTE_NAME })
	}
	else if (!notAuthorizedRoutesName.includes(to.name) && !isLogin) {
		next({ name: 'auth' })
	}
	else {
		next()
	}
})

export default router
