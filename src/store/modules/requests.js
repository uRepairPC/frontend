'use strict'

import StorageData from '@/classes/StorageData'
import Request from '@/classes/Request'
import Vue from 'vue'

const state = {
  loading: false,
  list: {}
}

const mutations = {
  SET_LOADING(state, toggle) {
    state.loading = toggle
  },
  SET_LIST(state, obj) {
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
    state.loading = false
    state.list = []
  }
}

const actions = {
  fetchList({ commit }, params = {}) {
    commit('SET_LOADING', true)

    Request.fetchAll({ params })
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
    const defaultActive = ['title']

    const columns = [
      { prop: 'id', label: 'ID', 'min-width': 70, sortable: 'custom' },
      { prop: 'title', label: 'Назва', 'min-width': 150, sortable: 'custom' },
      { prop: 'user_name', label: 'Створив', 'min-width': 150 },
      { prop: 'assign_name', label: 'Виконує', 'min-width': 150 },
      { prop: 'type_name', label: 'Тип', 'min-width': 120, disableSearch: true },
      { prop: 'priority_name', label: 'Пріорітет', 'min-width': 120, disableSearch: true, sortable: 'custom' },
      { prop: 'status_name', label: 'Статус', 'min-width': 120, disableSearch: true },
      { prop: 'equipment_name', label: 'Обладнання', 'min-width': 150 },
      { prop: 'equipment_serial_number', label: 'Серійний номер', 'min-width': 120 },
      { prop: 'equipment_inventory_number', label: 'Інвертарний номер', 'min-width': 120 },
      { prop: 'updated_at', label: 'Оновлено', 'min-width': 150, sortable: 'custom', customType: 'timestamp' },
      { prop: 'created_at', label: 'Створений', 'min-width': 150, sortable: 'custom', customType: 'timestamp' }
    ]

    const data = StorageData.columnRequests.length ? StorageData.columnRequests : defaultActive

    return columns
      .map((column) => {
        return { ...column, model: data.includes(column.prop) }
      })
  }
}

export default {
  state, mutations, actions, getters
}
