'use strict'

import router, { DEFAULT_ROUTE_NAME } from '@/router'
import { runLoadingService } from '@/scripts/dom'
import StorageData from '@/classes/StorageData'
import sections from '@/data/sections'
import axios from 'axios'

const state = {
	loading: false,
	isLogin: false,
	user: {},
	permissions: []
}

const mutations = {
	SET_USER(state, obj) {
		state.user = obj
		StorageData.profile = obj
	},
	SET_PERMISSIONS(state, arr) {
		state.permissions = arr
		StorageData.permissions = arr
	},
	SET_LOADING(state, toggle) {
		state.loading = toggle
	},
	SET_IS_LOGIN(state, toggle) {
		state.isLogin = toggle
	},
	CLEAR_ALL(state) {
		// Clear data from axios
		axios.defaults.headers['Authorization'] = null

		// Clear data from localStorage
		StorageData.removeToken()
		StorageData.removeProfile()
		StorageData.removePermissions()

		// FIXME Clear all data on exit? - list of users, roles, etc..

		// Clear data from store
		state.isLogin = false

		router.push({ name: sections.auth })
	}
}

const actions = {
	/**
	 * Get data from localStorage and set init config.
	 */
	init({ commit }) {
		const profile = StorageData.profile
		const token = StorageData.token

		if (!profile.id || !token) {
			commit('CLEAR_ALL')
			return router.push({ name: sections.auth })
		}

		axios.defaults.headers['Authorization'] = `Bearer ${token}`
		commit('SET_USER', profile)
		commit('SET_PERMISSIONS', StorageData.permissions)
		commit('SET_IS_LOGIN', true)
	},
	auth({ commit }, data) {
		commit('SET_LOADING', true)

		return axios.post('auth/login', data)
			.then(({ data }) => {
				axios.defaults.headers['Authorization'] = `Bearer ${data.token}`
				StorageData.token = data.token
				commit('SET_USER', data.user)
				commit('SET_PERMISSIONS', data.permissions)
				commit('SET_IS_LOGIN', true)
				router.push({ name: DEFAULT_ROUTE_NAME })
			})
			.finally(() => {
				commit('SET_LOADING', false)
			})
	},
	update({ state, commit }) {
		if (!state.user.id) {
			return
		}

		axios.get(`users/${state.user.id}`)
			.then(({ data }) => {
				commit('SET_USER', data.user)
				commit('SET_PERMISSIONS', data.permissions)
			})
			.finally(() => {
				commit('SET_LOADING', false)
			})
	},
	logout({ commit }) {
		const loadingService = runLoadingService('Виходимо з системи')

		axios.post('auth/logout')
			.then(() => {
				commit('CLEAR_ALL')
			})
			.finally(() => {
				loadingService.close()
			})
	}
}

export default {
	state, mutations, actions
}
