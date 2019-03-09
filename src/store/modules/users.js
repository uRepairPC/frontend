'use strict'

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

		axios.get('users', { params })
			.then(({ data }) => {
				if (params.page > 1) {
					commit('APPEND_LIST', data)
				} else {
					commit('SET_LIST', data)
				}

				commit('SET_LOADING', false)
			})
			.catch(() => commit('SET_LOADING', false))
	}
}

export default {
	state, mutations, actions
}
