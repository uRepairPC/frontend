'use strict'

import { loadPage, loadLayout } from './helper'

const notAuthorizedRoutes = {
	path: '/auth',
	component: loadLayout('NotAuthorized'),
	children: [
		{
			path: '/',
			name: 'auth',
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
			name: 'home',
			component: loadPage('Home')
		},
		{
			path: '/requests',
			name: 'requests',
			component: loadPage('requests/Index')
		},
		{
			path: '/users',
			name: 'users',
			component: loadPage('users/Index')
		},
		{
			path: '/users/:id',
			name: 'users-id',
			component: loadPage('users/One')
		},
		{
			path: '/workers',
			name: 'workers',
			component: loadPage('workers/Index')
		}
	]
}

export const notAuthorizedRoutesName = notAuthorizedRoutes.children.map(route => route.name)

export default [
	notAuthorizedRoutes,
	authorizedRoutes
]
