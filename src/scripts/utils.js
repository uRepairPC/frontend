'use strict'

import StorageData from '@/classes/StorageData'
import { Message } from 'element-ui'
import axios from 'axios'

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
 * @param {Node} node
 */
export function copyNode(node) {
	selectAll(node)

	if (execCopy()) {
		Message('Скопійовано в буфер')
	} else {
		Message('Виникла помилка')
	}
}

/**
 * @param data
 * @param {string} fileName
 */
export function downloadFile(data, fileName) {
	const url = window.URL.createObjectURL(new Blob([data]))
	const link = document.createElement('a')
	link.href = url
	link.setAttribute('download', fileName)
	document.body.appendChild(link)
	link.click()
}

/**
 * @param {string} path
 * @returns {string}
 */
export function getSeverUrlAuth(path) {
	return axios.defaults.baseURL + '/' + path + '?token=' + StorageData.token
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
