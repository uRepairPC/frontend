'use strict'

import Role from '@/classes/Role'
import Vue from 'vue'

const state = {
	loading: false,
	popover: {},
	list: []
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
	fetchList({ commit }) {
		commit('SET_LOADING', true)

		Role.fetchAll()
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

export default {
	state, mutations, actions
}
