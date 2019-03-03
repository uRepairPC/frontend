'use strict'

const state = {
	pagesScroll: {}
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
	}
}

const actions = {
	//
}

export default {
	state, mutations, actions
}
