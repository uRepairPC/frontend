'use strict'

import template from '@/store/modules/template'
import * as roles from '@/enum/roles'
import store from '@/store'

/** @var {array} */
const sidebarKeys = Object.keys(template.state.sidebar)

/**
 * Display on sidebar. Route name must be equal to
 * template.sidebar store for show on left sidebar.
 * @type {array} of objects
 */
export const menu = [
	{
		icon: 'home',
		title: 'Головна сторінка',
		route: { name: 'home' }
	},
	{
		icon: 'description',
		title: 'Заявки',
		route: { name: 'requests' },
		historyRemove: 'REMOVE_SIDEBAR_REQUEST'
	},
	{
		icon: 'people_outline',
		title: 'Користувачі',
		route: { name: 'users' },
		historyCb: item => `[${item.id}] ${item.last_name} ${item.first_name}`,
		historyRemove: 'REMOVE_SIDEBAR_USER'
	},
	{
		icon: 'storage',
		title: 'Обладнання',
		route: { name: 'equipments' },
		historyRemove: 'REMOVE_SIDEBAR_EQUIPMENT',
		access: [roles.ADMIN, roles.WORKER]
	},
	{
		icon: 'people',
		title: 'Працівники',
		route: { name: 'workers' },
		access: [roles.ADMIN]
	},
	{
		icon: 'settings',
		title: 'Конфігурація',
		route: { name: 'config' },
		access: [roles.ADMIN, roles.WORKER]
	}
]
	.filter((item) => {
		if (item.access && typeof item.access === 'object' && Array.isArray(item.access)) {
			return item.access.includes(store.state.profile.user.role)
		}

		return true
	})
	.map((item) => {
		return { ...item, history: sidebarKeys.includes(item.route.name) }
	})
