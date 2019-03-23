'use strict'

import * as types from '@/enum/types'
import * as roles from '@/enum/roles'

/**
 * Colors uses in ElTag component.
 * @type {object}
 * @see https://element.eleme.io/#/en-US/component/tag
 */
export const COLORS = {
	[roles.ADMIN]: types.DANGER,
	[roles.WORKER]: types.PRIMARY,
	[roles.USER]: types.SUCCESS
}

/**
 * Get list of all roles.
 * @type {object}
 */
export const list = {
	[roles.ADMIN]: {
		color: COLORS[roles.ADMIN],
		name: 'Адміністратор',
		nameMultiple: 'Адміністратори'
	},
	[roles.WORKER]: {
		color: COLORS[roles.WORKER],
		name: 'Робітник',
		nameMultiple: 'Робітники'
	},
	[roles.USER]: {
		color: COLORS[roles.USER],
		name: 'Користувач',
		nameMultiple: 'Користувачі'
	}
}
