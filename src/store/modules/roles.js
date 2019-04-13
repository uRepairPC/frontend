'use strict'

import StorageData from '@/classes/StorageData'
import Role from '@/classes/Role'
import Vue from 'vue'

const state = {
	loading: false,
	popover: {},
	list: {}
}

const mutations = {
	SET_LOADING(state, toggle) {
		state.loading = toggle
	},
	SET_LIST(state, arr) {
		state.list = arr
	},
	APPEND_POPOVER(state, { id, permissions }) {
		Vue.set(state.popover, id, permissions)
	}
}

const actions = {
	fetchList({ commit }, params) {
		commit('SET_LOADING', true)

		Role.fetchAll({ params })
			.then(({ data }) => {
				commit('SET_LIST', data)
			})
			.finally(() => {
				commit('SET_LOADING', false)
			})
	},
	fetchPopover({ commit }, id) {
		return Role.fetchOne(id)
			.then(({ data }) => {
				commit('APPEND_POPOVER', { id, permissions: data.permissions })
			})
	}
}

const getters = {
	/**
	 * Display on table.
	 * Attributes:
	 *  - disableSearch |Boolean| - disable send column on list of resources
	 *  - customType |String| - transform value depends on type (bool, timestamp)
	 *  - hideList |Boolean| - display column on page (Index)
	 * @returns {(*|{model: boolean})[]}
	 */
	columns() {
		const defaultActive = ['name', 'display_name']

		const columns = [
			{ prop: 'id', label: 'ID', 'min-width': 70, sortable: 'custom' },
			{ prop: 'color', label: 'Колір', 'min-width': 100, disableSearch: true },
			{ prop: 'name', label: 'Ім\'я', 'min-width': 200, sortable: 'custom' },
			{ prop: 'display_name', label: 'Відображене ім\'я', 'min-width': 200, sortable: 'custom' },
			{ prop: 'default', label: 'За замовчуванням', 'min-width': 100, sortable: 'custom', customType: 'bool' },
			{ prop: 'updated_at', label: 'Оновлено', 'min-width': 150, sortable: 'custom', customType: 'timestamp' },
			{ prop: 'created_at', label: 'Створений', 'min-width': 150, sortable: 'custom', customType: 'timestamp' }
		]

		const data = StorageData.columnRoles.length ? StorageData.columnRoles : defaultActive

		return columns
			.map((column) => {
				return { ...column, model: data.includes(column.prop) }
			})
	}
}

export default {
	state, mutations, actions, getters
}
