'use strict'

import sections from '@/data/sections'
import store from '@/store'
import axios from 'axios'

/** @type {string} */
export const API_POINT = 'roles'

export default class Role {

	/* | ------------------------------------------------------------------------------------------------
	 * | - Sidebar History -
	 * | ------------------------------------------------------------------------------------------------
	 */

	static sidebar() {
		return {
			get(id) {
				const roles = store.state.template.sidebar[sections.roles] || {}

				return roles[id]
			},
			add(role) {
				store.commit('template/ADD_SIDEBAR_ITEM', {
					section: sections.roles,
					data: role
				})
			},
			remove(id) {
				store.commit('template/REMOVE_SIDEBAR_ITEM', {
					section: sections.roles,
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
	 * Get resource.
	 *
	 * @param {AxiosRequestConfig} config
	 * @return {Promise<AxiosPromise<any>>}
	 */
	static fetchAll(config = null) {
		return axios.get(API_POINT, config)
	}

	/**
	 * Get resource by id.
	 *
	 * @param {number} id
	 * @param {AxiosRequestConfig} config
	 * @return {Promise<AxiosPromise<any>>}
	 */
	static fetchOne(id, config = null) {
		return axios.get(`${API_POINT}/${id}`, config)
			.then((response) => {
				Role.sidebar().add(response.data.role)
				return response
			})
			.catch((err) => {
				Role.sidebar().remove(id)
				throw err
			})
	}

	/**
	 * Store resource.
	 *
	 * @param {*} data
	 * @param {AxiosRequestConfig} config
	 * @return {Promise<AxiosPromise<any>>}
	 */
	static fetchStore(data = null, config = null) {
		return axios.post(API_POINT, data, config)
			.then((response) => {
				Role.sidebar().add(response.data.role)
				return response
			})
	}
}
