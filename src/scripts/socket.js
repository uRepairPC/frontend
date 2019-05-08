'use strict'

import StorageData from '@/classes/StorageData'
import { isObject } from '@/scripts/helpers'
import { Notification } from 'element-ui'
import { serverSocket } from '@/data/env'
import io from 'socket.io-client'
import router from '@/router'
import store from '@/store'

const socket = io(serverSocket)

socket.on('connect', () => {
  // Auth in socket server for join rooms
  socket.emit('auth', StorageData.token)
})

/**
 * Disable update data for the current user (ID).
 *
 * @param {string} section - enum
 * @param {number} id
 */
export function onEventDynamic(section, id) {
  socket.on(`${section}-${id}`, (payload) => {
    if (!isObject(payload)) {
      return
    }

    if (store.state.profile.user.id !== payload.from.id) {
      switch (payload.action) {
      case 'delete':
        if (`${section}-id` === router.currentRoute.name && id === +router.currentRoute.params.id) {
          router.push({ name: section })
        }
        store.commit('template/REMOVE_SIDEBAR_ITEM', { section, id })
        break
      default:
        payload.data.id = id
        store.commit('template/ADD_SIDEBAR_ITEM', { section, data: payload.data })
      }

      Notification.info({
        title: `Socket - ${payload.title}`,
        message: payload.message
      })
    }
  })
}

/**
 * @param {string} section - enum
 * @param {number} id
 */
export function offEventDynamic(section, id) {
  socket.off(`${section}-${id}`)
}

export default socket
