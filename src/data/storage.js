'use strict'

import { isArray } from '@/scripts/helpers'

/** @type {string} */
export const COLUMN_USERS = 'column_users'

/** @return {array|null} */
export function getColumnUsers() {
	if (localStorage.getItem(COLUMN_USERS)) {
		try {
			const data = JSON.parse(localStorage.getItem(COLUMN_USERS))
			return isArray(data) ? data : null

		} catch (e) {
			return null
		}
	}

	return null
}

/**
 * @param {array} arr
 * @example
 *  ['first_name', 'last_name']
 */
export function setColumnUsers(arr) {
	localStorage.setItem(COLUMN_USERS, JSON.stringify(arr))
}
