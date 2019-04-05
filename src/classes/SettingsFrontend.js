'use strict'

import StorageData from '@/classes/StorageData'
import { setFavicon } from '@/scripts/dom'
import { server } from '@/data/env'
import store from '@/store'
import axios from 'axios'

/** @type {string} */
export const API_POINT = 'settings/frontend'

/** @type {boolean} */
let hasRequest = false

export default class SettingsFrontend {

	static init() {
		const settings = StorageData.settings

		if (settings.timestamp) {
			store.commit('template/SET_SETTINGS', settings)
			SettingsFrontend.updateDOM()
		} else {
			SettingsFrontend.checkUpdate(-1)
		}
	}

	/**
	 * Compare local timestamp and server.
	 * If different - update.
	 *
	 * @param {number|string} serverTimestamp
	 */
	static checkUpdate(serverTimestamp) {
		const localTimestamp = StorageData.settings.timestamp || 0

		if (+localTimestamp !== +serverTimestamp && !hasRequest) {
			hasRequest = true

			SettingsFrontend.fetchGet()
				.then(({ data }) => {
					SettingsFrontend.updateData(data, +serverTimestamp)
					SettingsFrontend.updateDOM()
				})
				.finally(() => {
					hasRequest = false
				})
		}
	}

	/**
	 * @param {object} data
	 * @param {number} timestamp
	 */
	static updateData(data, timestamp) {
		StorageData.settings = { ...data, timestamp }
		store.commit('template/SET_SETTINGS', { ...data, timestamp })
	}

	static updateDOM() {
		const data = StorageData.settings

		// Favicon
		if (data.favicon) {
			setFavicon(server + data.favicon)
		}

		// Meta title
		if (data.meta_title) {
			const el = document.querySelector('head title')
			if (el) {
				el.innerText = data.meta_title
			}
		}
	}

	/* | ------------------------------------------------------------------------------------------------
	 * | - Requests -
	 * | ------------------------------------------------------------------------------------------------
	 */

	/**
	 * Get resource.
	 *
	 * @param {AxiosRequestConfig} config
	 * @return {Promise<AxiosPromise<any>>}
	 */
	static fetchGet(config = null) {
		return axios.get(API_POINT, config)
	}

	/**
	 * Store resource and update global data.
	 *
	 * @param {*} data
	 * @param {AxiosRequestConfig} config
	 * @return {Promise<AxiosPromise<any>>}
	 */
	static fetchStore(data = null, config = null) {
		return axios.post(API_POINT, data, config)
			.then((res) => {
				SettingsFrontend.updateData(res.data.settings, res.data.modified)
				SettingsFrontend.updateDOM()
				return res
			})
	}

	/* | -------------------------------------------------------------------------------------
	 * | - Getters -
	 * | -------------------------------------------------------------------------------------
	 */

	static get HEADER_NAME() {
		return 'app-settings-modified'
	}

	static get rows() {
		return [
			{ title: 'Назва', attr: 'app_name', type: 'text' },
			{ title: 'Favicon', attr: 'favicon', type: 'img', mimes: 'image/png, image/x-icon' },
			{ title: 'Назва вкладки', attr: 'meta_title', type: 'text' },
			{ title: 'Фотографія при авторізації', attr: 'logo_auth', type: 'img', mimes: 'image/jpeg, image/jpg, image/png' },
			{ title: 'Фотографія в шапці', attr: 'logo_header', type: 'img', mimes: 'image/jpeg, image/jpg, image/png' },
			{ title: 'Фотографія в шапці і назва - разом', attr: 'name_and_logo', type: 'bool' }
		]
	}
}
