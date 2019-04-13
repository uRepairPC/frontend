'use strict'

import StorageData from '@/classes/StorageData'

// TODO Move all function/const to store

/**
 * @type {array}
 * @deprecated
 */
export const COLUMNS_DATES = ['updated_at', 'created_at']

/**
 * Get from store.
 * @return {array}
 */
function roleData() {
	const defaultActive = ['name', 'display_name']

	const columns = [
		{ prop: 'id', label: 'ID', 'min-width': 70, sortable: 'custom' },
		{ prop: 'name', label: 'Ім\'я', 'min-width': 200, sortable: 'custom' },
		{ prop: 'display_name', label: 'Відображене ім\'я', 'min-width': 200, sortable: 'custom' },
		{ prop: 'default', label: 'За замовчуванням', 'min-width': 100, sortable: 'custom' },
		{ prop: 'updated_at', label: 'Оновлено', 'min-width': 150, sortable: 'custom' },
		{ prop: 'created_at', label: 'Створений', 'min-width': 150, sortable: 'custom' }
	]

	const data = StorageData.columnRoles.length ? StorageData.columnRoles : defaultActive

	return columns.map((column) => {
		return { ...column, model: data.includes(column.prop) }
	})
}

/*
 * Export const
 */

/** @return {array} */
export const roles = roleData()

/** @return {array} */
export const equipmentTypes = [
	{ prop: 'id', label: 'ID', 'min-width': 70, sortable: true },
	{ prop: 'name', label: 'Назва', 'min-width': 150, sortable: true },
	{ prop: 'description', label: 'Опис', 'min-width': 200 },
	{ prop: 'updated_at', label: 'Оновлено', 'min-width': 150, sortable: true },
	{ prop: 'created_at', label: 'Створений', 'min-width': 150, sortable: true }
]

/** @return {array} */
export const equipmentManufacturers = [
	{ prop: 'id', label: 'ID', 'min-width': 70, sortable: true },
	{ prop: 'name', label: 'Назва', 'min-width': 150, sortable: true },
	{ prop: 'description', label: 'Опис', 'min-width': 200 },
	{ prop: 'updated_at', label: 'Оновлено', 'min-width': 150, sortable: true },
	{ prop: 'created_at', label: 'Створений', 'min-width': 150, sortable: true }
]

/** @return {array} */
export const equipmentModels = [
	{ prop: 'id', label: 'ID', 'min-width': 70, sortable: true },
	{ prop: 'name', label: 'Назва', 'min-width': 150, sortable: true },
	{ prop: 'manufacturer_name', label: 'Виробник', 'min-width': 150, sortable: true },
	{ prop: 'type_name', label: 'Тип', 'min-width': 150, sortable: true },
	{ prop: 'description', label: 'Опис', 'min-width': 200 },
	{ prop: 'updated_at', label: 'Оновлено', 'min-width': 150, sortable: true },
	{ prop: 'created_at', label: 'Створений', 'min-width': 150, sortable: true }
]
