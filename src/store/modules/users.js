'use strict'

import { users as userColumns } from '@/data/columns'
import { isArray } from '@/scripts/helpers'
import UserClass from '@/classes/User'
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

		UserClass.fetchAll({ params })
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

		return userColumns.filter((column) => {
			if (isArray(column.access)) {
				return column.access.includes(userRole)
			}

			return true
		})
	}
}

export default {
	state, mutations, actions, getters
}
