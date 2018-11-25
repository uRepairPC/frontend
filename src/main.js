'use strict'

import VueSocketIO from 'vue-socket.io'
import ElementUI from 'element-ui'
import router from './router'
import App from './App.vue'
import store from './store'
import '@babel/polyfill'
import Vue from 'vue'

// Import styles
import './styles/index'

// Prevent the production tip on Vue startup
Vue.config.productionTip = false

// TODO Move to const (config) + replace to instance socket.io client
Vue.use(new VueSocketIO({
	debug: true,
	connection: 'http://localhost:3000'
}))
Vue.use(ElementUI)

new Vue({
	el: '#app',
	store,
	router,
	render: h => h(App)
})
