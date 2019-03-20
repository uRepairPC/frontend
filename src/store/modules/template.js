'use strict'

import sections from '@/data/sections'
import Vue from 'vue'

const state = {
	openSearch: false,
	pagesScroll: {},
	// History on left sidebar
	// Required id property
	sidebar: {}
}

const mutations = {
	OPEN_SEARCH(state) {
		state.openSearch = true
	},
	CLOSE_SEARCH(state) {
		state.openSearch = false
	},
	/**
	 * @param state
	 * @param {string} pageName
	 * @param {number} scroll
	 */
	SET_PAGE_SCROLL(state, { pageName, scroll }) {
		state.pagesScroll[pageName] = scroll
	},
	/**
	 * @param state
	 * @param {string} pageName
	 */
	REMOVE_PAGE_SCROLL(state, pageName) {
		Vue.delete(state.pagesScroll, pageName)
	},
	/** @see actions */
	ADD_SIDEBAR_ITEM(state, { section, data }) {
		if (!state.sidebar[section]) {
			Vue.set(state.sidebar, section, {})
		}

		Vue.set(state.sidebar[section], data.id, data)
	},
	/**
	 *
	 * @param state
	 * @param {string} section - name (users, equipments, etc)
	 * @param {object} data
	 */
	REMOVE_SIDEBAR_ITEM(state, { section, data }) {
		Vue.delete(state.sidebar[section], data.id)
	}
}

const actions = {
	/**
	 * @param commit
	 * @param rootState
	 * @param {string} section - name (users, equipments, etc)
	 * @param {Object} data
	 */
	addSidebarItem({ commit, rootState }, { section, data }) {
		commit('ADD_SIDEBAR_ITEM', { section, data })

		// Update the current user if move to profile page
		if (section === sections.users && data.id === rootState.profile.user.id) {
			commit('profile/SET_USER', data, { root: true })
		}
	}
}

export default {
	state, mutations, actions
}
