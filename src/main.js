'use strict'

import '@babel/polyfill'
import filterComponents from '@/components/filters/index'
import locale from 'element-ui/lib/locale/lang/ua'
import prototypes from '@/prototypes'
import directives from '@/directives'
import ElementUI from 'element-ui'
import NProgress from 'nprogress'
import router from '@/router'
import App from '@/App.vue'
import moment from 'moment'
import store from '@/store'
import Vue from 'vue'

// Import styles
import '@/styles/index'

// Connect libraries to Vue
Vue.use(ElementUI, { locale })

// Prevent the production tip on Vue startup
Vue.config.productionTip = false

// Other libraries
moment.locale('uk')
NProgress.configure({ showSpinner: false })

/**
 * Install global prototypes
 * @var {Array} prototypes
 * @example Vue.$axios | this.$axios
 */
prototypes.forEach((prototype) => {
	Vue.use(prototype)
})

/**
 * Install global directives
 * @var {Array} directives
 */
directives.forEach((directive) => {
	Vue.use(directive)
})

/**
 * Install global Filter Components
 * @example <filter-core />
 * @see @/components/filters
 */
filterComponents.forEach((component) => {
	Vue.use(component)
})

// Set user from localStorage
store.dispatch('profile/init')

new Vue({
	el: '#app',
	store,
	router,
	render: h => h(App)
})
