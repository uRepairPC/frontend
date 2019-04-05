'use strict'

import EquipmentModelClass from '@/classes/EquipmentModel'

const state = {
	loading: false,
	list: []
}

const mutations = {
	SET_LOADING(state, toggle) {
		state.loading = toggle
	},
	SET_LIST(state, arr) {
		state.list = arr
	}
}

const actions = {
	fetchList({ commit }) {
		commit('SET_LOADING', true)

		EquipmentModelClass.fetchAll()
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
