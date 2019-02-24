'use strict'

import { notAuthorizedRoutesName } from '@/router/routes'
import router from './router'
import store from '@/store'

router.beforeEach((to, from, next) => {
	const isLogin = store.state.profile.isLogin

	if (to.path === '/') {
		next({ name: 'dashboard' })
	}
	else if (to.name === 'auth' && isLogin) {
		next({ name: 'dashboard' })
	}
	else if (!notAuthorizedRoutesName.includes(to.name) && !isLogin) {
		next({ name: 'auth' })
	}
	else {
		next()
	}
})

export default router
