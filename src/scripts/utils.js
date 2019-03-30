'use strict'

/**
 * @param {String, Node} node
 */
export function selectAll(node) {
	if (!(node instanceof Node)) {
		node = document.querySelector(node)
	}

	window.getSelection().selectAllChildren(node)
}

/**
 * @return {boolean}
 */
export function execCopy() {
	return document.execCommand('copy')
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
