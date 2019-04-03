'use strict'

/**
 * @param {*} input
 * @return {boolean}
 */
export function isObject(input) {
	return !!input && typeof input === 'object'
}

/**
 * @param {*} input
 * @return {boolean}
 */
export const isArray = (input) => {
	return isObject(input) && Array.isArray(input)
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
