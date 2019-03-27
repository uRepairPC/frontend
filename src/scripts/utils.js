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
