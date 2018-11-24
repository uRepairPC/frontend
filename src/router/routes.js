'use strict'

import { loadPage } from './helper'

export default [
	{
		path: '/test',
		name: 'test',
		component: loadPage('Test')
	}
]
