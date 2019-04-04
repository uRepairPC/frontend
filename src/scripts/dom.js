'use strict'

import { Loading, Message } from 'element-ui'

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
 * @param {string} text
 * @returns {ElLoadingComponent}
 */
export function runLoadingService(text) {
	return Loading.service({
		lock: true,
		text,
		spinner: 'el-icon-loading',
		background: 'rgba(0, 0, 0, .7)'
	})
}

/**
 * Changing website favicon dynamically.
 * @see https://stackoverflow.com/a/260876/9612245
 */
export function setFavicon(href) {
	const link = document.querySelector('link[rel*=\'icon\']') || document.createElement('link')
	link.type = 'image/x-icon'
	link.rel = 'shortcut icon'
	link.href = href
	document.getElementsByTagName('head')[0].appendChild(link)
}
