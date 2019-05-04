'use strict'

import sections from '@/data/sections'
import store from '@/store'
import axios from 'axios'

/** @type {string} */
export const API_POINT = 'requests'

export default class Request {

	/* | ------------------------------------------------------------------------------------------------
	 * | - Sidebar History -
	 * | ------------------------------------------------------------------------------------------------
	 */

	static sidebar() {
		return {
			get(id) {
				const requests = store.state.template.sidebar[sections.requests] || {}

				return requests[id]
			},
			add(section) {
				store.commit('template/ADD_SIDEBAR_ITEM', {
					section: sections.requests,
					data: section
				})
			},
			remove(id) {
				store.commit('template/REMOVE_SIDEBAR_ITEM', {
					section: sections.requests,
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
				Request.sidebar().add(response.data.section)
				return response
			})
			.catch((err) => {
				Request.sidebar().remove(id)
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
				Request.sidebar().add(response.data.section)
				return response
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
				Request.sidebar().add(response.data.section)
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
				Request.sidebar().remove(id)
				return response
			})
	}
}
