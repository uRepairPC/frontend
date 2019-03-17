'use strict'

import * as roles from '@/enum/roles'

/**
 * Colors uses in ElTag component.
 * @type {object}
 * @see https://element.eleme.io/#/en-US/component/tag
 */
export const COLORS = {
	[roles.ADMIN]: 'danger',
	[roles.WORKER]: 'warning',
	[roles.USER]: 'info'
}

/**
 * Get list of all roles.
 * @type {object}
 */
export const list = {
	[roles.ADMIN]: {
		color: COLORS[roles.ADMIN],
		name: 'Адміністратор'
	},
	[roles.WORKER]: {
		color: COLORS[roles.WORKER],
		name: 'Робітник'
	},
	[roles.USER]: {
		color: COLORS[roles.USER],
		name: 'Користувач'
	}
}
