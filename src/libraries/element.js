'use strict'

import ElementUI from 'element-ui'
import i18n from '@/locale'
import Vue from 'vue'

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
