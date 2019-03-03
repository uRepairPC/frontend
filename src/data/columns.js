'use strict'

import { getColumnUsers } from './storage'

/** @return {Object} - prop, label, model */
export function users() {
	const defaultActive = ['first_name', 'last_name', 'email', 'phone']

	const columns = [
		{ prop: 'id', label: 'ID' },
		{ prop: 'first_name', label: 'Ім\'я' },
		{ prop: 'middle_name', label: 'По-батькові' },
		{ prop: 'last_name', label: 'Прізвище' },
		{ prop: 'email', label: 'E-mail' },
		{ prop: 'phone', label: 'Телефон' },
		{ prop: 'updated_at', label: 'Оновлено' },
		{ prop: 'created_at', label: 'Створений' }
	]

	const data = getColumnUsers() || defaultActive

	return columns.map((column) => {
		return { ...column, model: data.includes(column.prop) }
	})
}
