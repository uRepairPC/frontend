'use strict'

import SettingsGlobal from '@/classes/SettingsGlobal'
import socketTypes from '@/enum/socketTypes'
import io from '@/socket/io'
import store from '@/store'

/*
 * Global data (title, logo, etc)
 */
io.on('server.settings.global', (payload) => {
  store.commit('settings/SET_GLOBAL', payload.data)
  SettingsGlobal.updateDOM(payload.data)
})

/*
 * PWA
 */
io.on('server.settings.manifest', (payload) => {
  store.commit('settings/SET_MANIFEST', payload.data)
})

/*
 * Other sections with the same structure.
 */
Array(
  { event: 'server.request_types', store: 'requestTypes' },
  { event: 'server.request_statuses', store: 'requestStatuses' },
  { event: 'server.request_priorities', store: 'requestPriorities' },
  { event: 'server.equipment_types', store: 'equipmentTypes' },
  { event: 'server.equipment_manufacturers', store: 'equipmentManufacturers' },
  { event: 'server.equipment_models', store: 'equipmentModels' }
)
  .forEach((obj) => {
    io.on(obj.event, (payload) => {
      const storeData = store.state[obj.store]

      /*
       * If the user has not yet loaded any data
       * from this storage - exit.
       */
      if (storeData.init) {
        return
      }

      /*
       * On update and delete - find item by id from list of items
       * and replace/delete this item if exists.
       */
      if ((payload.type === socketTypes.UPDATE || payload.type === socketTypes.DELETE) && payload.params.id) {
        const findIndex = storeData.list.findIndex(item => item.id === payload.params.id)
        if (~findIndex) {
          if (payload.type === socketTypes.UPDATE) {
            store.commit(`${obj.store}/REPLACE_ITEM`, { index: findIndex, data: payload.data })
          } else {
            store.commit(`${obj.store}/DELETE_ITEM`, findIndex)
          }
        }
      }

      /*
       * On create - just append new data to array.
       */
      if (payload.type === socketTypes.CREATE) {
        store.commit(`${obj.store}/APPEND_ITEM`, payload.data)
      }
    })
  })
