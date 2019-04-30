'use strict'

import { email as emailRegex } from '@/scripts/regex'
import i18n from '@/locale'

/** @type {{validator: validator, trigger: string}[]} */
export const email = [
	{
		validator: (rule, value, callback) => {
			const valTrim = value.trim()

			if (!valTrim.trim()) {
				callback(i18n.t('form.rules.email.required'))
			} else if (!valTrim.match(emailRegex)) {
				callback(i18n.t('form.rules.email.type'))
			} else {
				callback()
			}
		},
		trigger: 'blur'
	}
]

/** @type {{validator: validator, trigger: string}[]} */
export const password = [
	{
		validator: (rule, value, callback) => {
			const valTrim = value.trim()

			if (!valTrim) {
				callback(i18n.t('form.rules.password.required'))
			} else if (valTrim.length < 6) {
				callback(i18n.t('form.rules.password.len'))
			} else {
				callback()
			}
		},
		trigger: 'blur'
	}
]

/** @type {{validator: validator, trigger: string}[]} */
export const required = [
	{
		validator: (rule, value, callback) => {
			const valTrim = value.trim()

			if (!valTrim) {
				callback(i18n.t('form.rules.required'))
			} else {
				callback()
			}
		},
		trigger: 'blur'
	}
]
