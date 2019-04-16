'use strict'

/*
 * Display on table.
 * Some columns are in store
 *
 * Attributes:
 *  - disableSearch |Boolean| - disable send column on list of resources
 *  - customType |String| - transform value depends on type (bool, timestamp)
 *  - hideList |Boolean| - display column on page (Index)
 */

/** @return {array} */
export const equipmentTypes = [
	{ prop: 'id', label: 'ID', 'min-width': 70, sortable: true },
	{ prop: 'name', label: 'Назва', 'min-width': 150, sortable: true },
	{ prop: 'description', label: 'Опис', 'min-width': 200 },
	{ prop: 'updated_at', label: 'Оновлено', 'min-width': 200, sortable: true, customType: { key: 'timestamp', value: 'LLL' } },
	{ prop: 'created_at', label: 'Створений', 'min-width': 200, sortable: true, customType: { key: 'timestamp', value: 'LLL' } }
]

/** @return {array} */
export const equipmentManufacturers = [
	{ prop: 'id', label: 'ID', 'min-width': 70, sortable: true },
	{ prop: 'name', label: 'Назва', 'min-width': 150, sortable: true },
	{ prop: 'description', label: 'Опис', 'min-width': 200 },
	{ prop: 'updated_at', label: 'Оновлено', 'min-width': 200, sortable: true, customType: { key: 'timestamp', value: 'LLL' } },
	{ prop: 'created_at', label: 'Створений', 'min-width': 200, sortable: true, customType: { key: 'timestamp', value: 'LLL' } }
]

/** @return {array} */
export const equipmentModels = [
	{ prop: 'id', label: 'ID', 'min-width': 70, sortable: true },
	{ prop: 'name', label: 'Назва', 'min-width': 150, sortable: true },
	{ prop: 'manufacturer_name', label: 'Виробник', 'min-width': 150, sortable: true },
	{ prop: 'type_name', label: 'Тип', 'min-width': 150, sortable: true },
	{ prop: 'description', label: 'Опис', 'min-width': 200 },
	{ prop: 'updated_at', label: 'Оновлено', 'min-width': 200, sortable: true, customType: { key: 'timestamp', value: 'LLL' } },
	{ prop: 'created_at', label: 'Створений', 'min-width': 200, sortable: true, customType: { key: 'timestamp', value: 'LLL' } }
]
