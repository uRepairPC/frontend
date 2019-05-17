'use strict'

import Permission from '@/classes/Permission'

const state = {
  list: [],
  listGrouped: {},
  loading: false
}

const mutations = {
  SET_LIST(state, arr) {
    state.list = arr
  },
  SET_LIST_GROUPED(state, obj) {
    state.listGrouped = obj
  },
  SET_LOADING(state, bool) {
    state.loading = bool
  },
  CLEAR_ALL(state) {
    state.loading = false
    state.list = []
    state.listGrouped = {}
  }
}

const actions = {
  fetchList({ commit }) {
    commit('SET_LOADING', true)

    return Permission.fetchAll()
      .then(({ data }) => {
        commit('SET_LIST', data)
      })
      .finally(() => {
        commit('SET_LOADING', false)
      })
  },
  fetchListGrouped({ state, commit }) {
    if (state.loading) {
      return
    }

    commit('SET_LOADING', true)

    return Permission.fetchAll({
      params: {
        group: 1
      }
    })
      .then(({ data }) => {
        commit('SET_LIST_GROUPED', data)
      })
      .finally(() => {
        commit('SET_LOADING', false)
      })
  }
}

export default {
  state,
  mutations,
  actions,
  namespaced: true
}
