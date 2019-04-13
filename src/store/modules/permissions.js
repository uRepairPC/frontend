'use strict'

import Permission from '@/classes/Permission'

const state = {
	list: [],
	listGrouped: {},
	loading: false
}

const mutations = {
	SET_LIST(state, arr) {
		state.list = arr
	},
	SET_LIST_GROUPED(state, obj) {
		state.listGrouped = obj
	},
	SET_LOADING(state, bool) {
		state.loading = bool
	}
}

const actions = {
	fetchList({ commit }) {
		commit('SET_LOADING', true)

		Permission.fetchAll()
			.then(({ data }) => {
				commit('SET_LIST', data)
			})
			.finally(() => {
				commit('SET_LOADING', false)
			})
	},
	fetchListGrouped({ commit }) {
		commit('SET_LOADING', true)

		Permission.fetchAll({
			params: {
				group: 1
			}
		})
			.then(({ data }) => {
				commit('SET_LIST_GROUPED', data)
			})
			.finally(() => {
				commit('SET_LOADING', false)
			})
	}
}

export default {
	state, mutations, actions
}
