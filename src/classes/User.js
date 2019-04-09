'use strict'

import StorageData from '@/classes/StorageData'
import sections from '@/data/sections'
import store from '@/store'
import axios from 'axios'

/** @type {string} */
export const API_POINT = 'users'

export default class User {

	/**
	 * @param {object} obj - User object
	 */
	constructor(obj) {
		this.user = obj
	}

	/* | ------------------------------------------------------------------------------------------------
	 * | - Sidebar History -
	 * | ------------------------------------------------------------------------------------------------
	 */

	static sidebar() {
		return {
			get(id) {
				const users = store.state.template.sidebar[sections.users] || {}

				return users[id]
			},
			add(user) {
				if (store.state.profile.user.id === user.id) {
					// Prevent delete custom attributes (relationship), like roles
					store.commit('profile/SET_USER', {
						...user,
						...store.state.profile.user
					})
				}

				store.commit('template/ADD_SIDEBAR_ITEM', {
					section: sections.users,
					data: user
				})
			},
			remove(id) {
				store.commit('template/REMOVE_SIDEBAR_ITEM', {
					section: sections.users,
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
				User.sidebar().add(response.data.user)
				return response
			})
			.catch((err) => {
				User.sidebar().remove(id)
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
				User.sidebar().add(response.data.user)
				return response
			})
	}

	/**
	 * Edit resource email by id and working with leftSidebar.
	 *
	 * @param {number} id
	 * @param {*} data
	 * @param {AxiosRequestConfig} config
	 * @return {Promise<AxiosPromise<any>>}
	 */
	static fetchEditEmail(id, data = null, config = null) {
		return axios.put(`${API_POINT}/${id}/email`, data, config)
			.then((response) => {
				User.sidebar().add(response.data.user)
				return response
			})
	}

	/**
	 * Edit resource image by id and working with leftSidebar.
	 *
	 * @param {number} id
	 * @param {*} data
	 * @param {AxiosRequestConfig} config
	 * @return {Promise<AxiosPromise<any>>}
	 */
	static fetchEditImage(id, data = null, config = null) {
		return axios.post(`${API_POINT}/${id}/image`, data, config)
			.then((response) => {
				const user = User.sidebar().get(id)

				if (user) {
					User.sidebar().add({ ...user, image: response.data.image })
				}

				return response
			})
	}

	/**
	 * Edit resource password by id.
	 *
	 * @param {number} id
	 * @param {*} data
	 * @param {AxiosRequestConfig} config
	 * @return {Promise<AxiosPromise<any>>}
	 */
	static fetchEditPassword(id, data = null, config = null) {
		return axios.put(`${API_POINT}/${id}/password`, data, config)
	}

	/**
	 * Edit resource password by id.
	 *
	 * @param {number} id
	 * @param {*} data
	 * @param {AxiosRequestConfig} config
	 * @return {Promise<AxiosPromise<any>>}
	 */
	static fetchEditRoles(id, data = null, config = null) {
		return axios.put(`${API_POINT}/${id}/roles`, data, config)
			.then((response) => {
				const user = User.sidebar().get(id)

				if (user) {
					User.sidebar().add(response.data.user)
				}

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
				User.sidebar().add(response.data.user)
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
				User.sidebar().remove(id)
				return response
			})
	}

	/**
	 * Delete resource image by id and working with leftSidebar.
	 *
	 * @param {number} id
	 * @param {AxiosRequestConfig} config
	 * @return {Promise<AxiosPromise<any>>}
	 */
	static fetchDeleteImage(id, config = null) {
		return axios.delete(`${API_POINT}/${id}/image`, config)
			.then((response) => {
				const user = User.sidebar().get(id)

				if (user) {
					User.sidebar().add({ ...user, image: null })
				}

				return response
			})
	}

	/* | ------------------------------------------------------------------------------------------------
	 * | - Getters -
	 * | ------------------------------------------------------------------------------------------------
	 */

	/** @return {string} */
	get fullName() {
		const name = `${this.user.last_name} ${this.user.first_name}`

		if (this.user.middle_name) {
			return `${name} ${this.user.middle_name}`
		}

		return name
	}

	/** @return {string|null} */
	get initials() {
		if (this.user.last_name && this.user.first_name) {
			return `${this.user.last_name[0].toUpperCase()}. ${this.user.first_name[0].toUpperCase()}.`
		}

		return null
	}

	/** @return {string|null} */
	get backgroundImage() {
		if (this.user.image) {
			const token = StorageData.token

			return `background-image: url(/api/users/${this.user.id}/image?token=${token})`
		}

		return null
	}
}
