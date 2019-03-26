'use strict'

import { loadPage, loadLayout } from './helper'
import sections from '@/data/sections'

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

const authorizedRoutes = {
	path: '',
	component: loadLayout('Default'),
	children: [
		{
			path: '/',
			name: sections.home,
			component: loadPage('Home')
		},
		{
			path: `/${sections.requests}`,
			name: sections.requests,
			component: loadPage('requests/Index')
		},
		{
			path: `/${sections.users}`,
			name: sections.users,
			component: loadPage('users/Index')
		},
		{
			path: `/${sections.users}/create`,
			name: `${sections.users}-create`,
			component: loadPage('users/Create')
		},
		{
			path: `/${sections.users}/:id`,
			name: `${sections.users}-id`,
			component: loadPage('users/One')
		},
		{
			path: `/${sections.workers}`,
			name: sections.workers,
			component: loadPage('workers/Index')
		},
		{
			path: `/${sections.equipments}`,
			name: sections.equipments,
			component: loadPage('equipments/Index')
		},
		{
			path: `/${sections.equipments}/create`,
			name: `${sections.equipments}-create`,
			component: loadPage('equipments/Create')
		},
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
					path: `/${sections.settings}/manufacturers`,
					name: `${sections.settingsManufacturers}`,
					component: loadPage('settings/Manufacturers')
				},
				{
					path: `/${sections.settings}/types`,
					name: `${sections.settingsTypes}`,
					component: loadPage('settings/Types')
				},
				{
					path: `/${sections.settings}/models`,
					name: `${sections.settingsModels}`,
					component: loadPage('settings/Models')
				}
			]
		}
	]
}

export const notAuthorizedRoutesName = notAuthorizedRoutes.children.map(route => route.name)

export default [
	notAuthorizedRoutes,
	authorizedRoutes
]
