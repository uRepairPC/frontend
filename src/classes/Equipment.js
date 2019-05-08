'use strict'

import sections from '@/data/sections'
import store from '@/store'
import axios from 'axios'

/** @type {string} */
export const API_POINT = 'equipments'

export default class Equipment {

  /**
	 * @param {object} obj - Equipment object
	 */
  constructor(obj) {
    this.equipment = obj
  }

  /* | ------------------------------------------------------------------------------------------------
	 * | - Sidebar History -
	 * | ------------------------------------------------------------------------------------------------
	 */

  static sidebar() {
    return {
      get(id) {
        const equipments = store.state.template.sidebar[sections.equipments] || {}

        return equipments[id]
      },
      add(equipment) {
        store.commit('template/ADD_SIDEBAR_ITEM', {
          section: sections.equipments,
          data: equipment
        })
      },
      remove(id) {
        store.commit('template/REMOVE_SIDEBAR_ITEM', {
          section: sections.equipments,
          id
        })
      }
    }
  }

  /* | ------------------------------------------------------------------------------------------------
	 * | - Requests -
	 * | ------------------------------------------------------------------------------------------------
	 */

  /**
	 * Get resource list.
	 *
	 * @param {AxiosRequestConfig} config
	 * @return {Promise<AxiosPromise<any>>}
	 */
  static fetchAll(config = null) {
    return axios.get(API_POINT, config)
  }

  /**
	 * Get resource by id and working with leftSidebar.
	 *
	 * @param {number} id
	 * @param {AxiosRequestConfig} config
	 * @return {Promise<AxiosPromise<any>>}
	 */
  static fetchOne(id, config = null) {
    return axios.get(`${API_POINT}/${id}`, config)
      .then((response) => {
        Equipment.sidebar().add(response.data.equipment)
        return response
      })
      .catch((err) => {
        Equipment.sidebar().remove(id)
        throw err
      })
  }

  /**
	 * Edit resource data by id and working with leftSidebar.
	 *
	 * @param {number} id
	 * @param {*} data
	 * @param {AxiosRequestConfig} config
	 * @return {Promise<AxiosPromise<any>>}
	 */
  static fetchEdit(id, data = null, config = null) {
    return axios.put(`${API_POINT}/${id}`, data, config)
      .then((response) => {
        Equipment.sidebar().add(response.data.equipment)
        return response
      })
  }

  /**
	 * Store resource and working with leftSidebar.
	 *
	 * @param {*} data
	 * @param {AxiosRequestConfig} config
	 * @return {Promise<AxiosPromise<any>>}
	 */
  static fetchStore(data = null, config = null) {
    return axios.post(API_POINT, data, config)
      .then((response) => {
        Equipment.sidebar().add(response.data.equipment)
        return response
      })
  }

  /**
	 * Delete resource by id and working with leftSidebar.
	 *
	 * @param {number} id
	 * @param {AxiosRequestConfig} config
	 * @return {Promise<AxiosPromise<any>>}
	 */
  static fetchDelete(id, config = null) {
    return axios.delete(`${API_POINT}/${id}`, config)
      .then((response) => {
        Equipment.sidebar().remove(id)
        return response
      })
  }

  /* | ------------------------------------------------------------------------------------------------
	 * | - Getters -
	 * | ------------------------------------------------------------------------------------------------
	 */

  /** @return {string} */
  get title() {
    return `${this.equipment.serial_number || '-'} / ${this.equipment.inventory_number || '-'}`
  }
}
