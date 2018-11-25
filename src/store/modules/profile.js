'use strict'

const state = {
	user: null
}

const mutations = {
	SET_USER(state, obj) {
		state.user = obj
	},
	CLEAR_USER(state) {
		state.user = null
	}
}

const actions = {

}

export default {
	state, mutations, actions
}
