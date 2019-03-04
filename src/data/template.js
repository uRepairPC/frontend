'use strict'

/* eslint-disable */

import template from '@/store/modules/template'

/** @var {array} */
const sidebarKeys = Object.keys(template.state.sidebar)

/**
 * Display on sidebar. Route name must be equal to
 * template.sidebar store for show on left sidebar.
 * TODO Role visible
 * @type {array}
 */
export const menu = [
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
		historyRemove: 'REMOVE_SIDEBAR_EQUIPMENT'
	},
	{
		icon: 'people',
		title: 'Працівники',
		route: { name: 'workers' }
	},
	{
		icon: 'settings',
		title: 'Конфігурація',
		route: { name: 'config' }
	}
]
	.map((item) => {
		return { ...item, history: sidebarKeys.includes(item.route.name) }
	})
