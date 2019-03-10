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
