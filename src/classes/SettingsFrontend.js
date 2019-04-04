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
					StorageData.settings = { ...data, timestamp: +serverTimestamp }
					store.commit('template/SET_SETTINGS', { ...data, timestamp: +serverTimestamp })
					SettingsFrontend.updateDOM()
				})
				.finally(() => {
					hasRequest = false
				})
		}
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
	 * Store resource.
	 *
	 * @param {*} data
	 * @param {AxiosRequestConfig} config
	 * @return {Promise<AxiosPromise<any>>}
	 */
	static fetchStore(data = null, config = null) {
		return axios.post(API_POINT, data, config)
	}

	/* | -------------------------------------------------------------------------------------
	 * | - Getters -
	 * | -------------------------------------------------------------------------------------
	 */

	static get HEADER_NAME() {
		return 'app-settings-modified'
	}
}
