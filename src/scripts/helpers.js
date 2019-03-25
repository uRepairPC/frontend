'use strict'

/**
 * @param {*} input
 * @return {boolean}
 */
export const isArray = (input) => {
	return !!input && typeof input === 'object' && !!Array.isArray(input)
}

/**
 * Return a random number between min and max (both included).
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}
