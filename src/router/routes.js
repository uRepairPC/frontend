'use strict'

import { loadPage, loadLayout } from './helper'
import sections from '@/data/sections'

/** @type {object} */
const notAuthorizedRoutes = {
	path: `/${sections.auth}`,
	component: loadLayout('NotAuthorized'),
	children: [
		{
			path: '/',
			name: sections.auth,
			component: loadPage('Auth')
		}
	]
}

/** @type {object} */
const authorizedRoutes = {
	path: '',
	component: loadLayout('Default'),
	children: [
		{
			path: '/',
			name: sections.home,
			component: loadPage('Home')
		},
		// ------------------------------------------------ Requests
		{
			path: `/${sections.requests}`,
			name: sections.requests,
			component: loadPage('requests/Index')
		},
		// ------------------------------------------------ Users
		{
			path: `/${sections.users}`,
			name: sections.users,
			component: loadPage('users/Index')
		},
		{
			path: `/${sections.users}/:id(\\d+)`,
			name: `${sections.users}-id`,
			component: loadPage('users/One')
		},
		{
			path: `/${sections.users}/create`,
			name: `${sections.users}-create`,
			component: loadPage('users/Create')
		},
		// ------------------------------------------------ Roles
		{
			path: `/${sections.roles}`,
			name: sections.roles,
			component: loadPage('roles/Index')
		},
		{
			path: `/${sections.roles}/:id(\\d+)`,
			name: `${sections.roles}-id`,
			component: loadPage('roles/One')
		},
		{
			path: `/${sections.roles}/create`,
			name: `${sections.roles}-create`,
			component: loadPage('roles/Create')
		},
		// ------------------------------------------------ Equipments
		{
			path: `/${sections.equipments}`,
			name: sections.equipments,
			component: loadPage('equipments/Index')
		},
		{
			path: `/${sections.equipments}/:id(\\d+)`,
			name: `${sections.equipments}-id`,
			component: loadPage('equipments/One')
		},
		{
			path: `/${sections.equipments}/create`,
			name: `${sections.equipments}-create`,
			component: loadPage('equipments/Create')
		},
		// ------------------------------------------------ Settings
		{
			path: `/${sections.settings}`,
			component: loadPage('settings/Core'),
			children: [
				{
					path: `/${sections.settings}`,
					name: sections.settings,
					component: loadPage('settings/Index')
				},
				{
					path: `/${sections.settings}/global`,
					name: `${sections.settingsGlobal}`,
					component: loadPage('settings/Global')
				},
				// ------------------------------------------------ Settings
				{
					path: `/${sections.requestsStatuses}/statuses`,
					name: `${sections.requestsStatuses}`,
					component: loadPage('settings/requests/Statuses')
				},
				// ------------------------------------------------ Settings - Equipments
				{
					path: `/${sections.settings}/manufacturers`,
					name: `${sections.equipmentsManufacturers}`,
					component: loadPage('settings/equipments/Manufacturers')
				},
				{
					path: `/${sections.settings}/types`,
					name: `${sections.equipmentsTypes}`,
					component: loadPage('settings/equipments/Types')
				},
				{
					path: `/${sections.settings}/models`,
					name: `${sections.equipmentsModels}`,
					component: loadPage('settings/equipments/Models')
				}
			]
		}
	]
}

/**
 * For route guard.
 * @type {array}
 */
export const notAuthorizedRoutesName = notAuthorizedRoutes.children
	.map(route => route.name)

export default [
	notAuthorizedRoutes,
	authorizedRoutes
]
