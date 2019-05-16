'use strict'

import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import SettingsGlobal from '@/classes/SettingsGlobal'
import locale from 'element-ui/lib/locale/lang/ua'
import VueSocketIO from 'vue-socket.io-extended'
import prototypes from '@/prototypes'
import directives from '@/directives'
import ElementUI from 'element-ui'
import NProgress from 'nprogress'
import router from '@/router'
import App from '@/App.vue'
import store from '@/store'
import dayjs from 'dayjs'
import io from '@/socket'
import 'dayjs/locale/uk'
import Vue from 'vue'

// Import Service Worker
import '@/scripts/sw'

// Import styles
import '@/styles/index'

// Connect libraries to Vue
Vue.use(ElementUI, { locale })
Vue.use(VueSocketIO, io)

// Prevent the production tip on Vue startup
Vue.config.productionTip = false

// Other libraries
dayjs.extend(LocalizedFormat)
dayjs.locale('uk')
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
SettingsGlobal.init()
store.dispatch('profile/init')

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
