import axios from 'axios'

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

		axios.get('users')
			.then(({ data }) => {
				commit('SET_LOADING', false)
				commit('SET_LIST', data)
			})
			.catch(() => commit('SET_LOADING', false))
	}
}

export default {
	state, mutations, actions
}
