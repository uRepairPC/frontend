'use strict'

export default class User {
	constructor(obj) {
		this.user = obj
	}

	get fullName() {
		let name = `${this.user.last_name} ${this.user.first_name}`

		if (this.user.middle_name) {
			return name `${name} ${this.user.middle_name}`
		}

		return name
	}

	get initials() {
		if (this.user.last_name && this.user.first_name) {
			return `${this.user.last_name[0]}. ${this.user.first_name[0]}.`
		}

		return null
	}

	get backgroundImage() {
		if (this.user.image) {
			return `background-image: url(${this.user.image})`
		}

		return null
	}
}
