'use strict'

import TableTop from './TableTop'
import Columns from './Columns'
import Search from './Search'
import Basic from './Basic'
import Core from './Core'

/*
 * Do not use require.context due to the fact
 * that components are not visible ide.
 */

export default [
	(Vue) => Vue.component(TableTop.name, TableTop),
	(Vue) => Vue.component(Columns.name, Columns),
	(Vue) => Vue.component(Search.name, Search),
	(Vue) => Vue.component(Basic.name, Basic),
	(Vue) => Vue.component(Core.name, Core)
]
