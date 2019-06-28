/**
 * Vue I18n is internationalization plugin.
 * @see https://kazupon.github.io/vue-i18n/
 */
'use strict'

import languages from '@/locale/languages'
import VueI18n from 'vue-i18n'
import Vue from 'vue'

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'en',
  dateTimeFormats: {
    en: {
      short: {
        year: 'numeric', month: 'short', day: 'numeric'
      },
      long: {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric'
      }
    },
    ru: {
      short: {
        year: 'numeric', month: 'short', day: 'numeric'
      },
      long: {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric', hour12: false
      }
    },
    uk: {
      short: {
        year: 'numeric', month: 'short', day: 'numeric'
      },
      long: {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric', hour12: false
      }
    }
  },
  messages: languages
})
