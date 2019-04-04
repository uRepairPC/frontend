'use strict'

import StorageData from '@/classes/StorageData'
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

			SettingsFrontend.fetchRequest()
				.then(({ data }) => {
					StorageData.settings = { ...data, timestamp: +serverTimestamp }
					store.commit('template/SET_SETTINGS', { ...data, timestamp: +serverTimestamp })
				})
				.finally(() => {
					hasRequest = false
				})
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
	static fetchRequest(config = null) {
		return axios.get(API_POINT, config)
	}

	/* | -------------------------------------------------------------------------------------
	 * | - Getters -
	 * | -------------------------------------------------------------------------------------
	 */

	static get HEADER_NAME() {
		return 'app-settings-modified'
	}
}
