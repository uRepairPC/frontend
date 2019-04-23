'use strict'

import '@babel/polyfill'
import SettingsFrontend from '@/classes/SettingsFrontend'
import filterComponents from '@/components/filters/index'
import prototypes from '@/prototypes'
import directives from '@/directives'
import ElementUI from 'element-ui'
import NProgress from 'nprogress'
import Lang from '@/classes/Lang'
import router from '@/router'
import store from '@/store'
import i18n from '@/locale'
import App from '@/App.vue'
import Vue from 'vue'

// Import styles
import '@/styles/index'

// Connect libraries to Vue
Vue.use(ElementUI, {
	i18n: (key, value) => i18n.t(key, value)
})

// Prevent the production tip on Vue startup
Vue.config.productionTip = false

// Other libraries
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

// Set init config
Lang.init()
SettingsFrontend.init()
store.dispatch('profile/init')

new Vue({
	el: '#app',
	store,
	router,
	i18n,
	render: h => h(App)
})
