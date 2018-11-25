'use strict'
/* eslint-disable */

import { Message } from 'element-ui'
import router from '../router'
import axios from 'axios'
import Vue from 'vue'

axios.defaults.baseURL = 'http://localhost:8000'

axios.interceptors.response.use(
	(resp) => {
		return resp
	},
	(err) => {
		if (!err.response) {
			return Promise.reject(err)
		}

		const { response } = err

		if (response.status === 401) {
			router.push({ name: 'dashboard' })
			Vue.$store.commit('CLEAR_USER')
			localStorage.removeItem('user')
		}

		if (response.data && response.data.message) {
			Message.error(response.data.message)
		}

		return Promise.reject(err)
	}
)

Vue.prototype.$axios = axios
