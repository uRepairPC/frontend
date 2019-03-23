'use strict'

/**
 * @param {*} input
 * @returns {boolean}
 */
export const isArray = (input) => {
	return !!input && typeof input === 'object' && !!Array.isArray(input)
}
