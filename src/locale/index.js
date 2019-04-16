/**
 * Vue I18n is internationalization plugin.
 * @see https://kazupon.github.io/vue-i18n/
 */
'use strict'

import languages from '@/locale/languages'
import VueI18n from 'vue-i18n'
import Vue from 'vue'

/*
 * TODO Translate
 * - [ ] element-ui
 * - [ ] moment
 * - [ ] init locale (browser)
 */

Vue.use(VueI18n)

export default new VueI18n({
	locale: 'en-US',
	messages: languages
})
