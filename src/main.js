'use strict'

import '@babel/polyfill'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import SettingsFrontend from '@/classes/SettingsFrontend'
import prototypes from '@/prototypes'
import directives from '@/directives'
import ElementUI from 'element-ui'
import NProgress from 'nprogress'
import Lang from '@/classes/Lang'
import router from '@/router'
import i18n from '@/locale'
import store from '@/store'
import App from '@/App.vue'
import dayjs from 'dayjs'
import 'dayjs/locale/uk'
import Vue from 'vue'

// Import Service Worker
import '@/scripts/sw'

// Import styles
import '@/styles/index'

// Connect libraries to Vue
Vue.use(ElementUI, {
	i18n: (key, value) => i18n.t(key, value)
})

// Prevent the production tip on Vue startup
Vue.config.productionTip = false

// Other libraries
dayjs.extend(LocalizedFormat)
// TODO Lang.js
// dayjs.locale('uk')
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
