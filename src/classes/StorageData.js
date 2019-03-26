'use strict'

import { isArray } from '@/scripts/helpers'

/** @type {string} */
const COLUMN_USERS = 'column_users'

/** @type {string} */
const COLUMN_EQUIPMENTS = 'column_equipments'

/** @type {string} */
const TOKEN = 'token'

/** @type {string} */
const PROFILE = 'profile'

export default class StorageData {

	/* | -------------------------------------------------------------------------------------
	 * | - Columns -
	 * | -------------------------------------------------------------------------------------
	 */

	/* Column Users -------------------------------------------------------------------------- */

	/** @return {Array} */
	static get columnUsers() {
		return this.getArray(COLUMN_USERS)
	}

	static set columnUsers(value) {
		this.setArray(COLUMN_USERS, value)
	}

	/** @return {boolean} */
	static removeColumnUsers() {
		return this.remove(COLUMN_USERS)
	}

	/* Column Equipments -------------------------------------------------------------------- */

	/** @return {Array} */
	static get columnEquipments() {
		return this.getArray(COLUMN_EQUIPMENTS)
	}

	static set columnEquipments(value) {
		this.setArray(COLUMN_EQUIPMENTS, value)
	}

	/** @return {boolean} */
	static removeColumnEquipments() {
		return this.remove(COLUMN_EQUIPMENTS)
	}

	/* Token -------------------------------------------------------------------------------- */

	/** @return {string} */
	static get token() {
		return this.getString(TOKEN)
	}

	static set token(value) {
		this.setString(TOKEN, value)
	}

	/** @return {boolean} */
	static removeToken() {
		return this.remove(TOKEN)
	}

	/* Profile ------------------------------------------------------------------------------ */

	/** @return {object} */
	static get profile() {
		return this.getObject(PROFILE)
	}

	static set profile(value) {
		this.setObject(PROFILE, value)
	}

	/** @return {boolean} */
	static removeProfile() {
		return this.remove(PROFILE)
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
	 * @param value
	 */
	static setArray(key, value) {
		if (!value) {
			return
		}

		localStorage.setItem(key, JSON.stringify(isArray(value) ? value : [value]))
	}

	/**
	 * @param {string} key
	 * @returns {string}
	 */
	static getString(key) {
		const item = localStorage.getItem(key)

		if (!item) {
			return ''
		}

		if (typeof item === 'object') {
			return ''
		}

		if (typeof item === 'number') {
			return item.toString() || ''
		}

		return item || ''
	}

	/**
	 * @param {string} key
	 * @param value
	 */
	static setString(key, value) {
		localStorage.setItem(key, value)
	}

	/**
	 * @param {string} key
	 * @param value
	 */
	static setObject(key, value) {
		if (!value || typeof value !== 'object') {
			return
		}

		localStorage.setItem(key, JSON.stringify(value))
	}

	/**
	 * @param {string} key
	 * @return {object}
	 */
	static getObject(key) {
		if (localStorage.getItem(key)) {
			try {
				const data = JSON.parse(localStorage.getItem(key))
				return data && typeof data === 'object' ? data : {}

			} catch (e) {
				return {}
			}
		}

		return {}
	}

	/**
	 * @param key
	 * @return {boolean}
	 */
	static remove(key) {
		if (localStorage.getItem(key) === null) {
			return false
		}

		localStorage.removeItem(key)
		return true
	}
}
