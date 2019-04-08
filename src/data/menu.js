'use strict'

import * as permissions from '@/enum/permissions'
import sections from '@/data/sections'
import * as types from '@/enum/types'
import router from '@/router'

/**
 * Display on sidebar. Route name must be equal to
 * template.sidebar store for show on left sidebar.
 * In store menu will be filtered by permissions
 * @type {object} of objects
 */
export default {
	[sections.home]: {
		icon: 'home',
		title: 'Головна сторінка',
		route: { name: sections.home }
	},
	// TODO Permissions
	[sections.requests]: {
		icon: 'description',
		title: 'Заявки',
		route: { name: sections.requests },
		history: {
			show: true
		},
		children: {
			// TODO Permissions
			add: {
				title: 'Створити заявку',
				icon: 'add',
				type: types.PRIMARY,
				action: () => router.push({ name: `${sections.requests}-create` })
			}
		}
	},
	[sections.users]: {
		icon: 'people_outline',
		title: 'Користувачі',
		route: { name: sections.users },
		permissions: permissions.USERS_VIEW,
		history: {
			show: true,
			callback: (obj) => `[${obj.id}] ${obj.last_name} ${obj.first_name}`
		},
		children: {
			// TODO After logout (role: user), and again login (role: admin) - btn not visible
			add: {
				title: 'Створити користувача',
				icon: 'add',
				type: types.PRIMARY,
				permissions: permissions.USERS_CREATE,
				action: () => router.push({ name: `${sections.users}-create` })
			}
		}
	},
	[sections.roles]: {
		icon: 'group',
		title: 'Групи',
		route: { name: sections.roles },
		permissions: permissions.GROUPS_VIEW,
		history: {
			show: true
		},
		children: {
			add: {
				title: 'Створити групу',
				icon: 'add',
				type: types.PRIMARY,
				permissions: permissions.GROUPS_MANAGE,
				action: () => router.push({ name: `${sections.roles}-create` })
			}
		}
	},
	[sections.equipments]: {
		icon: 'storage',
		title: 'Обладнання',
		route: { name: sections.equipments },
		permissions: permissions.EQUIPMENTS_VIEW,
		history: {
			show: true,
			callback: (obj) => `[${obj.id}] ${obj.serial_number || ''} / ${obj.inventory_number || ''}`
		},
		children: {
			add: {
				title: 'Створити обладнання',
				icon: 'add',
				type: types.PRIMARY,
				permissions: permissions.EQUIPMENTS_CREATE,
				action: () => router.push({ name: `${sections.equipments}-create` })
			}
		}
	},
	[sections.settings]: {
		icon: 'settings',
		title: 'Конфігурація',
		route: { name: sections.settings },
		permissions: [
			permissions.EQUIPMENTS_VIEW,
			permissions.OTHER_GLOBAL_SETTINGS
		],
		children: {
			[sections.settingsGlobal]: {
				title: 'Глобальні налаштування',
				icon: 'dashboard',
				tag: 'page',
				permissions: permissions.OTHER_GLOBAL_SETTINGS,
				route: { name: sections.settingsGlobal }
			},
			[sections.settingsTypes]: {
				title: 'Типи обладнання',
				icon: 'dashboard',
				tag: 'page',
				permissions: permissions.EQUIPMENTS_VIEW,
				route: { name: sections.settingsTypes }
			},
			[sections.settingsManufacturers]: {
				title: 'Виробники обладнання',
				icon: 'dashboard',
				tag: 'page',
				permissions: permissions.EQUIPMENTS_VIEW,
				route: { name: sections.settingsManufacturers }
			},
			[sections.settingsModels]: {
				title: 'Моделі обладнання',
				icon: 'dashboard',
				tag: 'page',
				permissions: permissions.EQUIPMENTS_VIEW,
				route: { name: sections.settingsModels }
			}
		}
	}
}
