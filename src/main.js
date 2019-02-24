'use strict'

import '@babel/polyfill'
import prototypes from '@/prototypes'
import ElementUI from 'element-ui'
import router from '@/router'
import App from '@/App.vue'
import store from '@/store'
import Vue from 'vue'

// Import styles
import '@/styles/index'

// Connect libraries
Vue.use(ElementUI)

// Prevent the production tip on Vue startup
Vue.config.productionTip = false

/**
 * Install global prototypes
 * @var {Array} prototypes
 * @example Vue.$axios | this.$axios
 */
prototypes.forEach(prototype => {
	Vue.use(prototype)
})

// Set user from localStorage
store.dispatch('profile/init')

new Vue({
	el: '#app',
	store,
	router,
	render: h => h(App)
})
