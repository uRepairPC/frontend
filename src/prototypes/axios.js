'use strict'

import { Message, Notification, Loading } from 'element-ui'
import { isArray, isObject } from '@/scripts/helpers'
import StorageData from '@/classes/StorageData'
import { axiosBaseUrl } from '@/data/env'
import * as types from '@/enum/types'
import store from '@/store'
import axios from 'axios'

// All request send to: http(s)://example.com/api/*
axios.defaults.baseURL = axiosBaseUrl

axios.interceptors.response.use(
	(resp) => {
		// Notification
		if (resp.config.method !== 'get' && resp.data.message) {
			Message({ message: resp.data.message, type: types.SUCCESS })
		}

		return resp
	},
	async (err) => {
		// Fatal error
		if (!err || !err.response) {
			return Promise.reject(err)
		}

		const { response, config } = err

		// User is not auth
		if (response.status === 401) {

			// FIXME Multiple request with 401 status code

			// Disable all interface
			const loadingService = Loading.service({
				lock: true,
				text: 'Оновлюється токен безпеки',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, .7)'
			})

			// User is auth, probably token is expired, try renew
			// And send last request again
			if (!config._retry && store.state.profile.isLogin) {
				config._retry = true

				// Refresh token
				const res = await axios.post('auth/refresh')
					.then(({ data }) => {
						axios.defaults.headers['Authorization'] = 'Bearer ' + data.token
						config.headers['Authorization'] = 'Bearer ' + data.token
						StorageData.token = data.token

						return axios({
							...config,
							// TODO Check on prod
							url: config.url.replace(/^api\//, '')
						})
					})
					.catch(() => {
						store.commit('profile/CLEAR_ALL')
					})

				// Enable interface
				loadingService.close()

				return res
			}

			store.commit('profile/CLEAR_ALL')
		}

		// No access, etc
		if (response.status === 403) {
			store.dispatch('profile/update')
		}

		// Notification
		if (isObject(response.data)) {
			if (response.data.message) {
				Message({ message: response.data.message, type: types.ERROR })
			}

			// Show validate form if exists from backend
			if (isObject(response.data.errors)) {
				let message = ''

				/**
				 * @example {'image.png': ['File not saved']}
				 *  <strong>image.png</strong>
				 *  <ul>
				 *    <li>File not saved<li>
				 *    ...
				 *  </ul>
				 */
				Object.entries(response.data.errors).forEach(([key, val]) => {
					message += `<strong>${key}</strong>:<br>`
					if (isArray(val)) {
						message += '<ul>'
						val.forEach((error) => {
							message += '<li>' + error.replace(/<(?:.|\n)*?>/gm, '') + '</li>'
						})
						message += '</ul>'
					}
				})

				Notification.error({ title: 'Помилка валідації', duration: 6000, dangerouslyUseHTMLString: true, message })
			}
		}
		else if (response.status === 404) {
			Message({ message: 'Ресурс не знайдений', type: types.WARNING })
		}

		return Promise.reject(err)
	}
)

export default (Vue) => Vue.prototype.$axios = axios
