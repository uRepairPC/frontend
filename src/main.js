'use strict'

import SettingsGlobal from '@/classes/SettingsGlobal'
import prototypes from '@/prototypes'
import Lang from '@/classes/Lang'
import router from '@/router'
import i18n from '@/locale'
import App from '@/App.vue'
import store from '@/store'
import Vue from 'vue'

// Import Service Worker, socket.io and libraries
import '@/libraries/element'
import '@/scripts/sw'
import '@/socket'

// Prevent the production tip on Vue startup
Vue.config.productionTip = false

/**
 * Install global prototypes
 * @var {Array} prototypes
 * @example Vue.$axios | this.$axios
 */
prototypes.forEach((prototype) => {
  Vue.use(prototype)
})

// Set init config
Lang.init()
SettingsGlobal.init()
store.dispatch('profile/init')

new Vue({
  el: '#app',
  store,
  router,
  i18n,
  render: h => h(App)
})
