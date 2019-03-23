'use strict'

import axios from 'axios'

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
	}
}

const actions = {
	fetchList({ commit }) {
		commit('SET_LOADING', true)

		axios.get('workers')
			.then(({ data }) => {
				commit('SET_LIST', data)
				commit('SET_LOADING', false)
			})
			.catch(() => {
				commit('SET_LOADING', false)
			})
	}
}

export default {
	state, mutations, actions
}
