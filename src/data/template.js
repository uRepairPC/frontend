'use strict'

import sections from '@/data/sections'
import * as roles from '@/enum/roles'
import store from '@/store'

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
				text: 'Додати заявку',
				icon: 'add',
				action: () => this.$router.push({ name: 'requests-create' })
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
		}
	},
	[sections.equipments]: {
		icon: 'storage',
		title: 'Обладнання',
		route: { name: sections.equipments },
		access: [roles.ADMIN, roles.WORKER],
		history: {
			show: true
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

let menu = {}

for (const [key, obj] of Object.entries(list)) {
	if (obj.access && typeof obj.access === 'object' && Array.isArray(obj.access)) {
		if (!obj.access.includes(store.state.profile.user.role)) {
			continue
		}
	}

	menu[key] = obj
}

export { menu }
