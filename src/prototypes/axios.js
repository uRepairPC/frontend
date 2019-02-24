'use strict'

import store from '../store'
import axios from 'axios'

// http(s)://example.com/api/*
axios.defaults.baseURL = 'api'

axios.interceptors.response.use(
	(response) => {
		const message = response.data.result || response.data.error

		if (message) {
			// TODO Notification
			// message
		}

		return response
	},
	(err) => {
		if (!err.response) {
			return Promise.reject(err)
		}

		const { response } = err

		if (response.status === 401) {
			store.commit('profile/CLEAR_ALL')
		}

		if (response.data) {
			// TODO Notification
			// response.data.error || `[${response.status}] Error`
		}

		return Promise.reject(err)
	}
)

export default (Vue) => Vue.prototype.$axios = axios
