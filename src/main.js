import App from './App.vue'
import Vue from 'vue'

// Import styles
import './style.css'

// Prevent the production tip on Vue startup
Vue.config.productionTip = false

const app = new Vue({
	el: '#app',
	render: h => h(App)
})
