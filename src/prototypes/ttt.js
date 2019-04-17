'use strict'

/* | ------------------------------------------------------------------------------------------
 * | - Locale -
 * | ------------------------------------------------------------------------------------------
 */

import VueI18n from 'vue-i18n'
import i18n from '@/locale'

/**
 * Auxiliary function that facilitates the collection of transfers.
 * With utils/locale helps automatically generate translation files.
 *
 * @param {VueI18n.Path} text
 * @param {VueI18n.Values} values
 * @return {VueI18n.TranslateResult}
 * @example
 * export default {
 *   localeKey: {String},
 *   methods: {
 *     output() { console.log(this.$ttt({String})) }
 *   }
 * }
 */
export function ttt(text, values = null) {
	if (this && this.$options && this.$options.localeKey) {
		return i18n.t(`${this.$options.localeKey}.${text}`, values)
	}

	return i18n.t(text, values)
}

export default (Vue) => Vue.prototype.$ttt = ttt
