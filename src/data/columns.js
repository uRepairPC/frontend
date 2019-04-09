'use strict'

import * as permissions from '@/enum/permissions'
import StorageData from '@/classes/StorageData'

/** @type {array} */
export const COLUMNS_DATES = ['updated_at', 'created_at']

/**
 * Get from store.
 * - Support permissions -
 * @return {array}
 */
function userData() {
	const defaultActive = ['first_name', 'last_name', 'email', 'phone']

	const columns = [
		{ prop: 'id', label: 'ID', 'min-width': 70, sortable: 'custom' },
		{ prop: 'first_name', label: 'Ім\'я', 'min-width': 150, sortable: 'custom' },
		{ prop: 'middle_name', label: 'По-батькові', 'min-width': 150, sortable: 'custom' },
		{ prop: 'last_name', label: 'Прізвище', 'min-width': 150, sortable: 'custom' },
		{ prop: 'roles', label: 'Ролі', 'min-width': 150, permissions: permissions.ROLES_VIEW, disableSearch: true },
		{ prop: 'email', label: 'E-mail', 'min-width': 250, sortable: 'custom' },
		{ prop: 'phone', label: 'Телефон', 'min-width': 150, sortable: 'custom' },
		{ prop: 'updated_at', label: 'Оновлено', 'min-width': 150, sortable: 'custom' },
		{ prop: 'created_at', label: 'Створений', 'min-width': 150, sortable: 'custom' }
	]

	const data = StorageData.columnUsers.length ? StorageData.columnUsers : defaultActive

	return columns.map((column) => {
		return { ...column, model: data.includes(column.prop) }
	})
}

/**
 * Get from store.
 * - Support permissions -
 * @return {array}
 */
function equipmentData() {
	const defaultActive = ['serial_number', 'inventory_number', 'type_name', 'manufacturer_name', 'model_name']

	const columns = [
		{ prop: 'id', label: 'ID', 'min-width': 70, sortable: 'custom' },
		{ prop: 'serial_number', label: 'Серійний номер', 'min-width': 200, sortable: 'custom' },
		{ prop: 'inventory_number', label: 'Інвертарний номер', 'min-width': 200, sortable: 'custom' },
		{ prop: 'type_name', label: 'Тип', 'min-width': 150, sortable: 'custom' },
		{ prop: 'manufacturer_name', label: 'Виробник', 'min-width': 150, sortable: 'custom' },
		{ prop: 'model_name', label: 'Модель', 'min-width': 150, sortable: 'custom' },
		{ prop: 'updated_at', label: 'Оновлено', 'min-width': 150, sortable: 'custom' },
		{ prop: 'created_at', label: 'Створений', 'min-width': 150, sortable: 'custom' }
	]

	const data = StorageData.columnEquipments.length ? StorageData.columnEquipments : defaultActive

	return columns.map((column) => {
		return { ...column, model: data.includes(column.prop) }
	})
}

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
export const users = userData()

/** @return {array} */
export const equipments = equipmentData()

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
