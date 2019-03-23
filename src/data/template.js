'use strict'

import sections from '@/data/sections'
import * as roles from '@/enum/roles'
import router from '@/router'
import store from '@/store'

/**
 * @param {*} input
 * @returns {boolean}
 */
const isArray = (input) => {
	return !!input && typeof input === 'object' && !!Array.isArray(input)
}

/**
 * Display on sidebar. Route name must be equal to
 * template.sidebar store for show on left sidebar.
 * @type {object} of objects
 */
const list = {
	[sections.home]: {
		icon: 'home',
		title: 'Головна сторінка',
		route: { name: sections.home }
	},
	[sections.requests]: {
		icon: 'description',
		title: 'Заявки',
		route: { name: sections.requests },
		history: {
			show: true
		},
		actions: {
			add: {
				text: 'Створити заявку',
				icon: 'add',
				action: () => router.push({ name: 'requests-create' })
			}
		}
	},
	[sections.users]: {
		icon: 'people_outline',
		title: 'Користувачі',
		route: { name: sections.users },
		history: {
			show: true,
			callback: (obj) => `[${obj.id}] ${obj.last_name} ${obj.first_name}`
		},
		actions: {
			add: {
				text: 'Створити користувача',
				icon: 'add',
				access: [roles.ADMIN],
				action: () => router.push({ name: 'users-create' })
			}
		}
	},
	[sections.equipments]: {
		icon: 'storage',
		title: 'Обладнання',
		route: { name: sections.equipments },
		access: [roles.ADMIN, roles.WORKER],
		history: {
			show: true
		},
		actions: {
			add: {
				text: 'Створити обладнання',
				icon: 'add',
				action: () => router.push({ name: 'equipments-create' })
			}
		}
	},
	[sections.workers]: {
		icon: 'people',
		title: 'Працівники',
		route: { name: sections.workers },
		access: [roles.ADMIN]
	},
	[sections.config]: {
		icon: 'settings',
		title: 'Конфігурація',
		route: { name: sections.config },
		access: [roles.ADMIN, roles.WORKER]
	}
}

/*
 * Filter array by depends user role.
 */

const userRole = store.state.profile.user.role
let menu = {}

for (const [key, obj] of Object.entries(list)) {
	if (isArray(obj.access)) {
		if (!obj.access.includes(userRole)) {
			continue
		}
	}

	if (obj.actions && typeof obj.actions === 'object') {
		Object.entries(obj.actions).forEach(([actionKey, action]) => {
			if (isArray(action.access)) {
				if (!action.access.includes(userRole)) {
					delete obj.actions[actionKey]
				}
			}
		})
	}

	menu[key] = obj
}

export { menu }
