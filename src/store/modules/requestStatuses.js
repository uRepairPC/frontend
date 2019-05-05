'use strict'

import RequestStatus from '@/classes/RequestStatus'

const state = {
	init: true,
	loading: false,
	list: []
}

const mutations = {
	SET_LOADING(state, toggle) {
		state.loading = toggle
	},
	SET_LIST(state, arr) {
		state.init = false
		state.list = arr
	},
	CLEAR_ALL(state) {
		state.init = true
		state.loading = false
		state.list = []
	}
}

const actions = {
	fetchList({ commit }) {
		commit('SET_LOADING', true)

		RequestStatus.fetchAll()
			.then(({ data }) => {
				commit('SET_LIST', data)
			})
			.finally(() => {
				commit('SET_LOADING', false)
			})
	}
}

export default {
	state, mutations, actions
}
