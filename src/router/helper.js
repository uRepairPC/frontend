'use strict'

/**
 * File Import Assistant.
 * @param {String} name
 * @return {function(): (Promise<*>|*)}
 */
export function load(name) {
	return () => import(`@/${name}.vue`)
}

/**
 * File Import Assistant (Component).
 * @param {String} component
 * @return {function(): (Promise<*>|*)}
 */
export function loadComponent(component) {
	return load(`components/${component}`)
}

/**
 * File Import Assistant (Component).
 * @param {String} page
 * @return {function(): (Promise<*>|*)}
 */
export function loadPage(page) {
	return load(`pages/${page}`)
}
