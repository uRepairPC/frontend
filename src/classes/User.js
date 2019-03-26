'use strict'

import StorageData from '@/classes/StorageData'

export default class User {

	/**
	 * @param {object} obj - user
	 */
	constructor(obj) {
		this.user = obj
	}

	/** @return {string} */
	get fullName() {
		let name = `${this.user.last_name} ${this.user.first_name}`

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
			const path = encodeURIComponent(this.user.image)
			const token = StorageData.token

			return `background-image: url(/api/users/get/image?path=${path}&token=${token})`
		}

		return null
	}
}
