'use strict'

import { isArray } from '@/scripts/helpers'
import sections from '@/data/sections'
import menu from '@/data/menu'
import Vue from 'vue'

const state = {
	openSearch: false,
	breadcrumbs: [],
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
	SET_BREADCRUMBS(state, arr) {
		state.breadcrumbs = arr
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

const getters = {
	/**
	 * Filter global menu (sidebar, another places)
	 * by depends user role.
	 */
	menu(state, getters, rootState) {
		const userRole = rootState.profile.user.role
		const result = {}

		for (const [key, obj] of Object.entries(menu)) {
			if (isArray(obj.access)) {
				if (!obj.access.includes(userRole)) {
					continue
				}
			}

			if (obj.children && typeof obj.children === 'object') {
				Object.entries(obj.children).forEach(([actionKey, action]) => {
					if (isArray(action.access) && !action.access.includes(userRole)) {
						delete obj.children[actionKey]
					}
				})
			}

			result[key] = obj
		}

		return result
	}
}

export default {
	state, mutations, actions, getters
}
