'use strict'

/* eslint-disable */

import { isArray, isObject } from '@/scripts/helpers'
import { serverSocket } from '@/data/env'
import io from 'socket.io-client'
import router from '@/router'
import store from '@/store'
import axios from 'axios'

export const SOCKET_HEADER = 'X-Socket-ID'

const socket = io(serverSocket)

// TODO Update currentId => syncEvents()

socket.on('connect', () => {
  // Append socketId to every request to the server (API)
  axios.defaults.headers[SOCKET_HEADER] = socket.id

  if (store.state.profile.isLogin) {
    syncEvents()
  }
})

socket.on('disconnect', () => {
  // Remove socketId from axios
  axios.defaults.headers[SOCKET_HEADER] = null
})

/*
 * Settings Events.
 */

socket.on('settings.global', (payload) => {
  store.commit('settings/SET_GLOBAL', payload.data)
})

socket.on('settings.manifest', (payload) => {
  store.commit('settings/SET_MANIFEST', payload.data)
})

/*
 * Settings events
 */
Array(
  { event: 'request_types', store: 'requestTypes' },
  { event: 'request_statuses', store: 'requestStatuses' },
  { event: 'request_priorities', store: 'requestPriorities' },
  { event: 'equipment_types', store: 'equipmentTypes' },
  { event: 'equipment_manufacturers', store: 'equipmentManufacturers' },
  { event: 'equipment_models', store: 'equipmentModels' }
)
  .forEach((obj) => {
    socket.on(obj.event, (payload) => {
      const storeData = store.state[obj.store]
      if (storeData.init) {
        return
      }

      if ((payload.type === 'update' || payload.type === 'delete') && payload.params.id) {
        const findIndex = storeData.list.findIndex(item => item.id === payload.params.id)
        if (~findIndex) {
          if (payload.type === 'update') {
            store.commit(`${obj.store}/REPLACE_ITEM`, { index: findIndex, data: payload.data })
          } else {
            store.commit(`${obj.store}/DELETE_ITEM`, findIndex)
          }
        }
      }

      if (payload.type === 'create') {
        store.commit(`${obj.store}/APPEND_ITEM`, payload.data)
      }
    })
  })

/*
 * Sections
 */
Array(
  { event: 'equipments', store: 'equipments', section: 'equipments' }
)
  .forEach((obj) => {
    socket.on(obj.event, (payload) => {
      const sidebar = store.state.template.sidebar[obj.store]

      if ((payload.type === 'update' || payload.type === 'delete') && payload.params.id) {
        const sidebarItem = sidebar[payload.params.id]
        if (sidebarItem) {
          if (payload.type === 'update') {
            store.commit('template/ADD_SIDEBAR_ITEM', {
              section: obj.section,
              data: payload.data
            })
          } else {
            const route = router.currentRoute
            if (`${obj.section}-id` === route.name && payload.params.id === +route.params.id) {
              router.push({ name: obj.section })
            }

            store.commit('template/REMOVE_SIDEBAR_ITEM', {
              section: obj.section,
              id: payload.params.id
            })
          }
        }
      }

      if (payload.type === 'create') {
        // TODO ???
      }
    })
  })

socket.on('equipment_files', (payload) => {
  const sidebar = store.state.template.sidebar.equipments
  if (!payload.params.equipment_id) {
    return
  }

  const sidebarItem = sidebar[payload.params.equipment_id]
  if (!sidebarItem) {
    return
  }

  if ((payload.type === 'update' || payload.type === 'delete') && isArray(sidebarItem.files) && payload.params.id) {
    // Find file by id in array and change or delete
    const files = [...sidebarItem.files]
    const findIndex = files.findIndex(item => item.id === payload.params.id)
    if (~findIndex) {
      if (payload.type === 'update') {
        files[findIndex] = { ...files[findIndex], ...payload.data }
      } else {
        files.splice(findIndex, 1)
      }
      store.commit('template/ADD_SIDEBAR_ITEM', {
        section: 'equipments',
        data: { ...sidebarItem, files }
      })
    }
  }

  if (payload.type === 'create') {
    store.commit('template/ADD_SIDEBAR_ITEM', {
      section: 'equipments',
      data: { ...sidebarItem, files: [...payload.data, ...sidebarItem.files] }
    })
  }
})

/**
 * Get multiple rooms from section if can.
 *
 * @param {string} section
 * @param {number} id
 * @return {array}
 */
function generateRooms(section, id) {
  const rooms = [`${section}.${id}`]

  switch (section) {
  case 'equipments':
    rooms.push(`equipment_files.${id}`)
    break
  case 'requests':
    rooms.push(`request_files.${id}`)
    rooms.push(`request_comments.${id}`)
    break
  }

  return rooms
}

/**
 * Sync rooms by permissions on socket server.
 */
export function syncEvents() {
  const sidebar = store.state.template.sidebar
  const rooms = []

  Object.entries(sidebar).forEach(([key, obj]) => {
    if (isObject(obj)) {
      Object.keys(obj).forEach((itemKey) => {
        rooms.push(...generateRooms(key, itemKey))
      })
    }
  })

  axios.post('listeners/sync', { rooms })
}

/**
 * @param {string} section - enum
 * @param {number} id
 */
export function onEventDynamic(section, id) {
  axios.post('listeners/join', { rooms: generateRooms(section, id) })
}

/**
 * @param {string} section - enum
 * @param {number} id
 */
export function offEventDynamic(section, id) {
  socket.emit('leave', generateRooms(section, id))
}

export default socket
