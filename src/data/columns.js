'use strict'

import StorageData from '@/classes/StorageData'
import * as roles from '@/enum/roles'

/** @type {array} */
export const COLUMNS_DATES = ['updated_at', 'created_at']

/** @return {array} */
function userData() {
	const defaultActive = ['first_name', 'last_name', 'email', 'phone']

	const columns = [
		{ prop: 'id', label: 'ID', 'min-width': 70, sortable: true },
		{ prop: 'first_name', label: 'Ім\'я', 'min-width': 150, sortable: true },
		{ prop: 'middle_name', label: 'По-батькові', 'min-width': 150, sortable: true },
		{ prop: 'last_name', label: 'Прізвище', 'min-width': 150, sortable: true },
		{ prop: 'role', label: 'Роль', 'min-width': 150, access: [roles.ADMIN], sortable: true },
		{ prop: 'email', label: 'E-mail', 'min-width': 250, sortable: true },
		{ prop: 'phone', label: 'Телефон', 'min-width': 150, sortable: true },
		{ prop: 'updated_at', label: 'Оновлено', 'min-width': 150, sortable: true },
		{ prop: 'created_at', label: 'Створений', 'min-width': 150, sortable: true }
	]

	const data = StorageData.columnUsers.length ? StorageData.columnUsers : defaultActive

	return columns.map((column) => {
		return { ...column, model: data.includes(column.prop) }
	})
}

/** @return {array} */
function equipmentData() {
	const defaultActive = ['serial_number', 'inventory_number', 'type_name', 'manufacturer_name', 'model_name']

	const columns = [
		{ prop: 'id', label: 'ID', 'min-width': 70, sortable: true },
		{ prop: 'serial_number', label: 'Серійний номер', 'min-width': 200, sortable: true },
		{ prop: 'inventory_number', label: 'Інвертарний номер', 'min-width': 200, sortable: true },
		{ prop: 'type_name', label: 'Тип', 'min-width': 150, sortable: true },
		{ prop: 'manufacturer_name', label: 'Виробник', 'min-width': 150, sortable: true },
		{ prop: 'model_name', label: 'Модель', 'min-width': 150, sortable: true },
		{ prop: 'updated_at', label: 'Оновлено', 'min-width': 150, sortable: true },
		{ prop: 'created_at', label: 'Створений', 'min-width': 150, sortable: true }
	]

	const data = StorageData.columnEquipments.length ? StorageData.columnEquipments : defaultActive

	return columns.map((column) => {
		return { ...column, model: data.includes(column.prop) }
	})
}

/*
 * Export
 */

/** @return {array} */
export const users = userData()

/** @return {array} */
export const equipments = equipmentData()

/** @return {array} */
export const equipmentTypes = [
	{ prop: 'id', label: 'ID', 'min-width': 70, sortable: true },
	{ prop: 'name', label: 'Назва', 'min-width': 150, sortable: true },
	{ prop: 'description', label: 'Опис', 'min-width': 200, sortable: false },
	{ prop: 'updated_at', label: 'Оновлено', 'min-width': 150, sortable: true },
	{ prop: 'created_at', label: 'Створений', 'min-width': 150, sortable: true }
]

/** @return {array} */
export const equipmentManufacturers = [
	{ prop: 'id', label: 'ID', 'min-width': 70, sortable: true },
	{ prop: 'name', label: 'Назва', 'min-width': 150, sortable: true },
	{ prop: 'description', label: 'Опис', 'min-width': 200, sortable: false },
	{ prop: 'updated_at', label: 'Оновлено', 'min-width': 150, sortable: true },
	{ prop: 'created_at', label: 'Створений', 'min-width': 150, sortable: true }
]

/** @return {array} */
export const equipmentModels = [
	{ prop: 'id', label: 'ID', 'min-width': 70, sortable: true },
	{ prop: 'name', label: 'Назва', 'min-width': 150, sortable: true },
	{ prop: 'manufacturer_name', label: 'Виробник', 'min-width': 150, sortable: true },
	{ prop: 'type_name', label: 'Тип', 'min-width': 150, sortable: true },
	{ prop: 'description', label: 'Опис', 'min-width': 200, sortable: false },
	{ prop: 'updated_at', label: 'Оновлено', 'min-width': 150, sortable: true },
	{ prop: 'created_at', label: 'Створений', 'min-width': 150, sortable: true }
]
