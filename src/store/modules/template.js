'use strict'

import Vue from 'vue'

const state = {
	pagesScroll: {},
	sidebar: {
		users: {},
		requests: {},
		equipments: {}
	}
}

const mutations = {
	/**
	 * @param state
	 * @param {String} pageName
	 * @param {Number} scroll
	 */
	SET_PAGE_SCROLL(state, { pageName, scroll }) {
		state.pagesScroll[pageName] = scroll
	},
	REMOVE_PAGE_SCROLL(state, pageName) {
		delete state.pagesScroll[pageName]
	},
	ADD_SIDEBAR_USER(state, obj) {
		Vue.set(state.sidebar.users, obj.id, obj)
	},
	REMOVE_SIDEBAR_USER(state, num) {
		Vue.delete(state.sidebar.users, num)
	},
	ADD_SIDEBAR_REQUEST(state, obj) {
		Vue.set(state.sidebar.requests, obj.id, obj)
	},
	REMOVE_SIDEBAR_REQUEST(state, num) {
		Vue.delete(state.sidebar.requests, num)
	},
	ADD_SIDEBAR_EQUIPMENT(state, obj) {
		Vue.set(state.sidebar.equipments, obj.id, obj)
	},
	REMOVE_SIDEBAR_EQUIPMENT(state, num) {
		Vue.delete(state.sidebar.equipments, num)
	}
}

const actions = {
	//
}

export default {
	state, mutations, actions
}
