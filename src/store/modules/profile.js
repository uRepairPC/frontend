'use strict'

import router from '@/router'
import axios from 'axios'

// localStorage
const STORE_TOKEN = 'token'
const STORE_USER = 'user'

const state = {
	loading: false,
	isLogin: false,
	user: {}
}

const mutations = {
	SET_USER(state, obj) {
		state.user = obj
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
		localStorage.removeItem(STORE_TOKEN)
		localStorage.removeItem(STORE_USER)

		// Clear data from store
		state.user = {}
		state.isLogin  =false

		router.push({ name: 'auth' })
	}
}

const actions = {
	/**
	 * Get data from localStorage and set init config.
	 */
	init({ commit }) {
		const storageUserData = localStorage.getItem(STORE_USER)
		const token = localStorage.getItem(STORE_TOKEN)

		if (!storageUserData || !token) {
			commit('CLEAR_ALL')
			return router.push({ name: 'auth' })
		}

		try {
			const user = JSON.parse(storageUserData)

			axios.defaults.headers['Authorization'] = `Bearer ${token}`
			commit('SET_USER', user)
			commit('SET_IS_LOGIN', true)

		} catch (e) {
			commit('CLEAR_ALL')
		}
	},
	auth({ commit }, data) {
		commit('SET_LOADING', true)

		axios.post('auth/login', data)
			.then(async res => {
				axios.defaults.headers['Authorization'] = `Bearer ${res.data.token}`
				localStorage.setItem(STORE_TOKEN, res.data.token)
				localStorage.setItem(STORE_USER, JSON.stringify(res.data.user))
				commit('SET_IS_LOGIN', true)
				commit('SET_LOADING', false)
			})
			.catch(() => {
				commit('SET_LOADING', false)
			})
	},
	logout({ commit }) {
		commit('SET_LOADING', true)

		axios.post('auth/logout')
			.then(() => {
				commit('CLEAR_ALL')
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
