'use strict'

import StorageData from '@/classes/StorageData'
import Role from '@/classes/Role'
import Vue from 'vue'

const state = {
  loading: false,
  list: {}
}

const mutations = {
  SET_LOADING(state, toggle) {
    state.loading = toggle
  },
  SET_LIST(state, arr) {
    state.list = arr
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
    state.loading = false
    state.popover = {}
    state.list = {}
  }
}

const actions = {
  fetchList({ commit }, params = {}) {
    commit('SET_LOADING', true)

    Role.fetchAll({ params })
      .then(({ data }) => {
        if (params.page > 1) {
          commit('APPEND_LIST', data)
        } else {
          commit('SET_LIST', data)
        }
      })
      .finally(() => {
        commit('SET_LOADING', false)
      })
  }
}

const getters = {
  /**
   * Display on table.
   * Attributes:
   *  - disableSearch |Boolean| - disable send column on list of resources
   *  - customType |String| - transform value depends on type (bool, timestamp)
   *  - hideList |Boolean| - display column on page (Index)
   * @returns {(*|{model: boolean})[]}
   */
  columns() {
    const defaultActive = ['color', 'name']

    const columns = [
      { prop: 'id', label: 'ID', 'min-width': 70, sortable: 'custom' },
      { prop: 'color', label: 'Колір', 'min-width': 100, disableSearch: true, customType: 'color' },
      { prop: 'name', label: 'Ім\'я', 'min-width': 200, sortable: 'custom' },
      { prop: 'default', label: 'За замовчуванням', 'min-width': 150, sortable: 'custom', customType: 'bool' },
      { prop: 'updated_at', label: 'Оновлено', 'min-width': 150, sortable: 'custom', customType: 'timestamp' },
      { prop: 'created_at', label: 'Створений', 'min-width': 150, sortable: 'custom', customType: 'timestamp' }
    ]

    const data = StorageData.columnRoles.length ? StorageData.columnRoles : defaultActive

    return columns
      .map((column) => {
        return { ...column, model: data.includes(column.prop) }
      })
  }
}

export default {
  state, mutations, actions, getters
}
