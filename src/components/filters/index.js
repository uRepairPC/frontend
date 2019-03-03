'use strict'

import TableButtons from './TableButtons'
import Columns from './Columns'
import Search from './Search'
import Basic from './Basic'
import Core from './Core'

/*
 * Do not use require.context due to the fact
 * that components are not visible ide.
 */

export default [
	(Vue) => Vue.component(TableButtons.name, TableButtons),
	(Vue) => Vue.component(Columns.name, Columns),
	(Vue) => Vue.component(Search.name, Search),
	(Vue) => Vue.component(Basic.name, Basic),
	(Vue) => Vue.component(Core.name, Core)
]
