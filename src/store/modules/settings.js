'use strict'

import SettingsManifest from '@/classes/SettingsManifest'
import SettingsGlobal from '@/classes/SettingsGlobal'

const state = {
	loadingGlobal: false,
	loadingManifest: false,
	// Global settings for the website (logo, title, etc)
	global: {},
	// PWA
	manifest: {}
}

const mutations = {
	SET_GLOBAL(state, obj) {
		state.global = obj
	},
	SET_LOADING_GLOBAL(state, bool) {
		state.loadingGlobal = bool
	},
	SET_MANIFEST(state, obj) {
		state.manifest = obj
	},
	SET_LOADING_MANIFEST(state, bool) {
		state.loadingManifest = bool
	}
}

const actions = {
	fetchGlobal({ commit }, params) {
		commit('SET_LOADING_GLOBAL', true)

		SettingsGlobal.fetchGet({ params })
			.then(({ data }) => {
				commit('SET_GLOBAL', data)
			})
			.finally(() => {
				commit('SET_LOADING_GLOBAL', false)
			})
	},
	fetchManifest({ commit }, params) {
		commit('SET_LOADING_MANIFEST', true)

		SettingsManifest.fetchGet({ params })
			.then(({ data }) => {
				commit('SET_MANIFEST', data)
			})
			.finally(() => {
				commit('SET_LOADING_MANIFEST', false)
			})
	}
}

export default {
	state, mutations, actions
}
