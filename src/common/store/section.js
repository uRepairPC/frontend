'use strict'

import Vue from 'vue'

const state = {
  init: true,
  loading: false,
  // Paginate from server (Laravel)
  list: {}
}

const mutations = {
  SET_LOADING(state, toggle) {
    state.loading = toggle
  },
  SET_LIST(state, obj) {
    state.init = false
    state.list = obj
  },
  APPEND_LIST(state, obj) {
    Object.entries(obj).forEach(([key, val]) => {
      if (key !== 'data') {
        Vue.set(state.list, key, val)
      }
    })

    state.list.data.push(...obj.data)
  },
  CLEAR_ALL(state) {
    state.init = true
    state.loading = false
    state.list = {}
  }
}

const actions = {
  //
}

export default {
  state, mutations, actions
}
