'use strict'

import { includePermission } from '@/scripts/utils'
import StorageData from '@/classes/StorageData'
import Equipment from '@/classes/Equipment'
import Vue from 'vue'

const state = {
	loading: false,
	list: {}
}

const mutations = {
	SET_LOADING(state, toggle) {
		state.loading = toggle
	},
	SET_LIST(state, obj) {
		state.list = obj
	},
	APPEND_LIST(state, obj) {
		Object.entries(obj).forEach(([key, val]) => {
			if (key !== 'data') {
				Vue.set(state.list, key, val)
			}
		})

		state.list.data.push(...obj.data)
	}
}

const actions = {
	fetchList({ commit }, params) {
		commit('SET_LOADING', true)

		Equipment.fetchAll({ params })
			.then(({ data }) => {
				if (params.page > 1) {
					commit('APPEND_LIST', data)
				} else {
					commit('SET_LIST', data)
				}
			})
			.finally(() => {
				commit('SET_LOADING', false)
			})
	}
}

const getters = {
	/**
	 * Display on table.
	 * Attributes:
	 *  - disableSearch |Boolean| - disable send column on list of resources
	 *  - value-type |String, Object { key, value }| - transform value depends on type (bool, timestamp)
	 * @returns {(*|{model: boolean})[]}
	 */
	columns() {
		const defaultActive = ['serial_number', 'inventory_number', 'type_name', 'manufacturer_name', 'model_name']

		const columns = [
			{ prop: 'id', label: 'ID', 'min-width': 70, sortable: 'custom' },
			{ prop: 'serial_number', label: 'Серійний номер', 'min-width': 200, sortable: 'custom' },
			{ prop: 'inventory_number', label: 'Інвертарний номер', 'min-width': 200, sortable: 'custom' },
			{ prop: 'type_name', label: 'Тип', 'min-width': 150, sortable: 'custom' },
			{ prop: 'manufacturer_name', label: 'Виробник', 'min-width': 150, sortable: 'custom' },
			{ prop: 'model_name', label: 'Модель', 'min-width': 150, sortable: 'custom' },
			{ prop: 'description', label: 'Опис', 'min-width': 250, disableSearch: true },
			{ prop: 'updated_at', label: 'Оновлено', 'min-width': 150, sortable: 'custom', 'value-type': { key: 'date', value: 'LL' } },
			{ prop: 'created_at', label: 'Створений', 'min-width': 150, sortable: 'custom', 'value-type': { key: 'date', value: 'LL' } }
		]

		const data = StorageData.columnEquipments.length ? StorageData.columnEquipments : defaultActive

		return columns
			.filter(column => includePermission(column.permissions))
			.map((column) => {
				return { ...column, model: data.includes(column.prop) }
			})
	},
	// Type -> Manufacturer -> Model
	cascaderOptions(state, getters, rootState) {
		const types = rootState.equipmentTypes.list
			.map(item => ({ children: [], ...item }))

		// Has model and manufacturer
		rootState.equipmentModels.list.forEach((model) => {
			for (const type of types) {
				if (type.id === model.type_id) {
					let findManufacturer = false

					// Disable double manufacturers
					for (const manufacturer of type.children) {
						if (manufacturer.id === model.manufacturer_id) {
							manufacturer.children.push({ name: model.name, id: model.id })
							findManufacturer = true
							break
						}
					}

					if (!findManufacturer) {
						type.children.push({
							name: model.manufacturer_name,
							id: model.manufacturer_id,
							children: [
								{ name: model.name, id: model.id }
							]
						})
					}
					break
				}
			}
		})

		return types
	}
}

export default {
	state, mutations, actions, getters
}
