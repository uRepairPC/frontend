'use strict'

import { getColumnUsers } from './storage'

/** @type {array} */
export const COLUMNS_DATES = ['updated_at', 'created_at']

/** @return {Object} - prop, label, model */
export function users() {
	const defaultActive = ['first_name', 'last_name', 'email', 'phone']

	// TODO Column width

	const columns = [
		{ prop: 'id', label: 'ID', sortable: true },
		{ prop: 'first_name', label: 'Ім\'я', sortable: true },
		{ prop: 'middle_name', label: 'По-батькові', sortable: true },
		{ prop: 'last_name', label: 'Прізвище', sortable: true },
		{ prop: 'email', label: 'E-mail', sortable: true },
		{ prop: 'phone', label: 'Телефон', sortable: true },
		{ prop: 'updated_at', label: 'Оновлено', sortable: true },
		{ prop: 'created_at', label: 'Створений', sortable: true }
	]

	const data = getColumnUsers() || defaultActive

	return columns.map((column) => {
		return { ...column, model: data.includes(column.prop) }
	})
}
