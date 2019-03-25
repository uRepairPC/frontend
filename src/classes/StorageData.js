'use strict'

import { isArray } from '@/scripts/helpers'

/** @type {string} */
const COLUMN_USERS = 'column_users'

export default class StorageData {

	/* | -------------------------------------------------------------------------------------
	 * | - Columns -
	 * | -------------------------------------------------------------------------------------
	 */

	static get columnUsers() {
		return this.getArray(COLUMN_USERS)
	}

	static set columnUsers(value) {
		this.setArray(COLUMN_USERS, value)
	}

	/* | -------------------------------------------------------------------------------------
	 * | - Common functions -
	 * | -------------------------------------------------------------------------------------
	 */

	/**
	 * @param {string} key
	 * @return {Array}
	 */
	static getArray(key) {
		if (localStorage.getItem(key)) {
			try {
				const data = JSON.parse(localStorage.getItem(key))
				return isArray(data) ? data : []

			} catch (e) {
				return []
			}
		}

		return []
	}

	/**
	 * @param {string} key
	 * @param {Array} value
	 */
	static setArray(key, value) {
		if (!value) {
			return
		}

		localStorage.setItem(key, JSON.stringify(isArray(value) ? value : [value]))
	}
}
