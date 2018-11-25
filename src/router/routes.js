'use strict'

import { loadPage, loadLayout } from './helper'

export default [
	{
		path: '',
		component: loadLayout('NotAuthorized'),
		children: [
			{
				path: '/auth',
				name: 'auth',
				component: loadPage('Auth')
			}
		]
	},
	{
		path: '',
		component: loadLayout('Default'),
		children: [
			{
				path: '/dashboard',
				name: 'dashboard',
				component: loadPage('Dashboard')
			}
		]
	}
]
