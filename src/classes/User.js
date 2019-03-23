'use strict'

export default class User {
	constructor(obj) {
		this.user = obj
	}

	get fullName() {
		let name = `${this.user.last_name} ${this.user.first_name}`

		if (this.user.middle_name) {
			return `${name} ${this.user.middle_name}`
		}

		return name
	}

	get initials() {
		if (this.user.last_name && this.user.first_name) {
			return `${this.user.last_name[0].toUpperCase()}. ${this.user.first_name[0].toUpperCase()}.`
		}

		return null
	}

	get backgroundImage() {
		if (this.user.image) {
			const path = encodeURIComponent(this.user.image)
			const token = localStorage.getItem('token')

			return `background-image: url(/api/users/get/image?path=${path}&token=${token})`
		}

		return null
	}
}
