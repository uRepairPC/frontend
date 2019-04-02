'use strict'

import { equipments as equipmentColumns } from '@/data/columns'
import { isArray } from '@/scripts/helpers'
import axios from 'axios'
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

		axios.get('equipments', { params })
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
	/*
	 * Display on table.
	 */
	columns(state, getters, rootState) {
		const userRole = rootState.profile.user.role

		return equipmentColumns.filter((column) => {
			if (isArray(column.access)) {
				return column.access.includes(userRole)
			}

			return true
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
