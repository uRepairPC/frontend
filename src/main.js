'use strict'

import SettingsGlobal from '@/classes/SettingsGlobal'
import locale from 'element-ui/lib/locale/lang/ua'
import prototypes from '@/prototypes'
import ElementUI from 'element-ui'
import NProgress from 'nprogress'
import router from '@/router'
import App from '@/App.vue'
import store from '@/store'
import Vue from 'vue'

// Import Service Worker and socket.io
import '@/scripts/sw'
import '@/socket'

// Connect libraries to Vue
Vue.use(ElementUI, { locale })

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

// Set init config
SettingsGlobal.init()
store.dispatch('profile/init')

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
