'use strict'

import router, { DEFAULT_ROUTE_NAME } from '@/router'
import { runLoadingService } from '@/scripts/dom'
import StorageData from '@/classes/StorageData'
import logout from '@/scripts/logout'
import socket from '@/scripts/socket'
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
	}
}

const actions = {
	/**
	 * Get data from localStorage and set init config.
	 */
	init({ commit }) {
		const profile = StorageData.profile
		const token = StorageData.token

		// Check if values is exists on localStorage
		// permissions can be empty
		if (!profile.id || !token) {
			return logout()
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
				// Update axios and localStorage
				axios.defaults.headers['Authorization'] = `Bearer ${data.token}`
				StorageData.token = data.token

				// Auth in socket server
				socket.emit('auth', data.token)

				// Update store
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
				// Refresh user rooms
				socket.emit('auth', data.token)

				commit('SET_USER', data.user)
				commit('SET_PERMISSIONS', data.permissions)
			})
			.finally(() => {
				commit('SET_LOADING', false)
			})
	},
	logout() {
		const loadingService = runLoadingService('Виходимо з системи')

		// Logout from the socket server
		socket.emit('logout')

		axios.post('auth/logout')
			.finally(() => {
				logout()
				loadingService.close()
			})
	}
}

export default {
	state, mutations, actions
}
