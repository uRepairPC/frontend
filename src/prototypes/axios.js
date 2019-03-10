'use strict'

import { axiosBaseUrl } from '@/data/env'
import { Message } from 'element-ui'
import store from '@/store'
import axios from 'axios'

// All request send to: http(s)://example.com/api/*
axios.defaults.baseURL = axiosBaseUrl

axios.interceptors.response.use(
	(resp) => {
		// Notification
		if (resp.config.method !== 'get' && resp.data.message) {
			Message({ message: resp.data.message, type: 'success' })
		}

		return resp
	},
	(err) => {
		// Fatal error
		if (!err || !err.response) {
			return Promise.reject(err)
		}

		const { response, config } = err

		// User is not auth
		if (response.status === 401) {

			// User is auth, probably token is expired, try renew
			// And send last request again
			if (!config._retry && store.state.profile.isLogin) {
				config._retry = true

				// FIXME Block multiple request, queue/wait

				// Refresh token
				return axios.post('auth/refresh')
					.then(({ data }) => {
						axios.defaults.headers['Authorization'] = 'Bearer ' + data.token
						config.headers['Authorization'] = 'Bearer ' + data.token
						localStorage.setItem('token', data.token)

						return axios({
							...config,
							url: config.url.replace(/^api\//, '')
						})
					})
					.catch(() => store.commit('profile/CLEAR_ALL'))
			}

			store.commit('profile/CLEAR_ALL')
		}

		// Notification
		if (response.data && typeof response.data === 'object' && response.data.message) {
			Message({ message: response.data.message, type: 'error' })
		}
		else if (response.status === 404) {
			Message({ message: 'Ресурс не знайдений', type: 'warning' })
		}

		return Promise.reject(err)
	}
)

export default (Vue) => Vue.prototype.$axios = axios
