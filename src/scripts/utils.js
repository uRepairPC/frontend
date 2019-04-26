'use strict'

import { isArray, isObject } from '@/scripts/helpers'
import StorageData from '@/classes/StorageData'
import { server } from '@/data/env'
import store from '@/store'

/**
 * @param {string} path
 * @returns {string}
 */
export function getApiAuth(path) {
	return server + '/api/' + path + '?token=' + StorageData.token
}

/**
 * @param {number} bytes
 * @param {number} decimals
 * @return {string}
 * @see https://stackoverflow.com/questions/15900485/
 */
export function formatBytes(bytes, decimals = 2) {
	if (!bytes) {
		return '0 Bytes'
	}

	const k = 1024
	const dm = decimals < 0 ? 0 : decimals
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

	const i = Math.floor(Math.log(bytes) / Math.log(k))

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

/**
 * @param {string|null} input
 * @return {string|null}
 */
export function withoutLastSlash(input) {
	if (!input) {
		return input
	}

	if (input.slice(-1) === '/') {
		return input.slice(0, input.length - 1)
	}

	return input
}

/**
 * Check permission(s) with user permissions.
 * findPermissions is null - available to all.
 *
 * @param {array|string|null} findPermissions
 * @param {array} comparePermissions
 * @return {boolean}
 */
export function includePermission(findPermissions, comparePermissions = store.state.profile.permissions) {
	if (!findPermissions) {
		return true
	}

	if (isArray(findPermissions)) {
		return findPermissions.some(permission => comparePermissions.includes(permission))
	}

	return comparePermissions.includes(findPermissions)
}

/**
 * Recursively go around the object (children)
 * and check for permissions.
 *
 * @param {object} data
 */
export function filterByPermission(data) {
	const result = {}

	for (const [key, obj] of Object.entries(data)) {
		if (!includePermission(obj.permissions)) {
			continue
		}

		result[key] = { ...obj }

		if (isObject(obj.children)) {
			result[key].children = filterByPermission(obj.children)
		}
	}

	return result
}
