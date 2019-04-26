'use strict'

import VueRouter from 'vue-router'
import routes from './routes'
import Vue from 'vue'

Vue.use(VueRouter)

export default new VueRouter({
	// Do not include mode history to support SPA
	scrollBehavior: () => ({ y: 0 }),
	routes
})
