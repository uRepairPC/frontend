'use strict'

import { isArray, isObject } from '@/scripts/helpers'
import sections from '@/data/sections'
import menu from '@/data/menu'
import Vue from 'vue'

const state = {
	openSearch: false,
	// Uses on every page for display path
	breadcrumbs: [],
	// Restore user scroll on Page template
	pagesScroll: {},
	// History on left sidebar
	// Required id property
	sidebar: {},
	// Set dialog global on all pages (in layout)
	dialog: {}
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
	 * @param state
	 * @param {string} section - name (users, equipments, etc)
	 * @param {number|string} id
	 */
	REMOVE_SIDEBAR_ITEM(state, { section, id }) {
		if (typeof id === 'undefined' || !state.sidebar[section]) {
			return
		}

		Vue.delete(state.sidebar[section], id)
	},
	/**
	 * @param state
	 * @param {string} section - name (users, equipments, etc)
	 * @param {number|string} id
	 * @param {string} key
	 * @param {*} data
	 */
	APPEND_SIDEBAR_ITEM_DATA(state, { section, id, key, data }) {
		Vue.set(state.sidebar[section][id], key, data)
	},
	/**
	 * @param state
	 * @param { component, attrs, events } data
	 */
	OPEN_DIALOG(state, data) {
		state.dialog = data
	},
	CLOSE_DIALOG(state) {
		state.dialog = {}
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

			if (isObject(obj.children)) {
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
