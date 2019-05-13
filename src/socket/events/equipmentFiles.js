'use strict'

import socketTypes from '@/enum/socketTypes'
import { isArray } from '@/scripts/helpers'
import sections from '@/enum/sections'
import io from '@/socket/io'
import store from '@/store'

io.on('equipment_files', (payload) => {
  const sidebar = store.state.template.sidebar[sections.equipments]
  if (!payload.params.equipment_id) {
    return
  }

  const sidebarItem = sidebar[payload.params.equipment_id]
  if (!sidebarItem) {
    return
  }

  if ((payload.type === socketTypes.UPDATE || payload.type === socketTypes.DELETE)
    && isArray(sidebarItem.files) && payload.params.id) {

    // Find file by id in array and change or delete
    const files = [...sidebarItem.files]
    const findIndex = files.findIndex(item => item.id === payload.params.id)

    if (~findIndex) {
      if (payload.type === socketTypes.UPDATE) {
        files[findIndex] = { ...files[findIndex], ...payload.data }
      } else {
        files.splice(findIndex, 1)
      }

      store.commit('template/ADD_SIDEBAR_ITEM', {
        section: sections.equipments,
        data: { ...sidebarItem, files }
      })
    }
  }

  if (payload.type === socketTypes.CREATE) {
    store.commit('template/ADD_SIDEBAR_ITEM', {
      section: sections.equipments,
      data: { ...sidebarItem, files: [...payload.data, ...sidebarItem.files] }
    })
  }
})
