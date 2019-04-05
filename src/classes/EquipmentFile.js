'use strict'

import { API_POINT as API_POINT_EQUIPMENT } from '@/classes/Equipment'
import axios from 'axios'

/**
 * @param {number} equipmentId
 * @return {string}
 */
export function API_POINT(equipmentId) {
	return `${API_POINT_EQUIPMENT}/${equipmentId}/files`
}

export default class EquipmentFile {

	/* | ------------------------------------------------------------------------------------------------
	 * | - Requests -
	 * | ------------------------------------------------------------------------------------------------
	 */

	/**
	 * Get resource.
	 *
	 * @param {number} equipmentId
	 * @param {AxiosRequestConfig} config
	 * @return {Promise<AxiosPromise<any>>}
	 */
	static fetchAll(equipmentId, config = null) {
		return axios.get(API_POINT(equipmentId), config)
	}

	/**
	 * Edit resource data by id.
	 *
	 * @param {number} equipmentId
	 * @param {number} id
	 * @param {*} data
	 * @param {AxiosRequestConfig} config
	 * @return {Promise<AxiosPromise<any>>}
	 */
	static fetchEdit(equipmentId, id, data = null, config = null) {
		return axios.put(`${API_POINT(equipmentId)}/${id}`, data, config)
	}

	/**
	 * Store resource by id.
	 *
	 * @param {number} equipmentId
	 * @param {*} data
	 * @param {AxiosRequestConfig} config
	 * @return {Promise<AxiosPromise<any>>}
	 */
	static fetchStore(equipmentId, data = null, config = null) {
		return axios.post(API_POINT(equipmentId), data, config)
	}

	/**
	 * Delete resource by id.
	 *
	 * @param {number} equipmentId
	 * @param {number} id
	 * @param {AxiosRequestConfig} config
	 * @return {Promise<AxiosPromise<any>>}
	 */
	static fetchDelete(equipmentId, id, config = null) {
		return axios.delete(`${API_POINT(equipmentId)}/${id}`, config)
	}

}
