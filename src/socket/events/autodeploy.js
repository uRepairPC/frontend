'use strict'

import { runLoadingService } from '@/scripts/dom'
import Message from 'element-ui/lib/message'
import { WEB as APP_WEB } from '@/enum/apps'
import types from '@/enum/types'
import io from '@/socket/io'

// TODO Only 1 module!! (no name)

/**
 * @type {object}
 *  key - app name, String
 *  value - { name: String, process: Boolean, loading: ElLoadingComponent }
 */
const modules = {}

/** @return {boolean} */
const hasActiveModule = () => Object.values(modules).some(mod => mod.process)

/** @return {any} */
const findActiveModule = () => Object.values(modules).find(mod => mod.process)

/**
 * @param {string} name
 * @returns {ElLoadingComponent}
 */
const startLoading = (name) => runLoadingService(`Оновлення ${name} модуля`)

/** @param {string} moduleName */
export const tryCloseLoading = (moduleName) => {
  if (modules[moduleName]) {
    modules[moduleName].loading.close()

    // For Web module - show message (build dist to server module)
    if (moduleName === APP_WEB) {
      Message({
        message: 'Необхідно оновити сторінку для оновлення інтерфейсу',
        type: types.INFO
      })
    }

    delete modules[moduleName]

    // Set loading for another module if exists
    const findModule = findActiveModule()
    if (findModule) {
      findModule.loading = startLoading(findModule.name)
    }
  }
}

io.on('autodeploy.status', (payload) => {
  if (payload.data.process) {
    modules[payload.data.name] = {
      name: payload.data.name,
      process: true,
      loading: hasActiveModule() ? null : startLoading(payload.data.name)
    }
  } else {
    tryCloseLoading(payload.data.name)
  }
})
