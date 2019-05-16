'use strict'

import socketTypes from '@/enum/socketTypes'
import { isArray } from '@/scripts/helpers'
import sections from '@/enum/sections'
import io from '@/socket/io'
import store from '@/store'

Array(
  { event: 'equipment_files', section: sections.equipments, sectionAttrId: 'equipment_id' },
  { event: 'request_files', section: sections.requests, sectionAttrId: 'request_id' }
)
  .forEach((obj) => {
    io.on(obj.event, (payload) => {
      const sidebar = store.state.template.sidebar[obj.section]
      if (!payload.params[obj.sectionAttrId]) {
        return
      }

      const sidebarItem = sidebar[payload.params[obj.sectionAttrId]]
      if (!sidebarItem) {
        return
      }

      if ((payload.type === socketTypes.UPDATE || payload.type === socketTypes.DELETE) &&
        isArray(sidebarItem.files) && payload.params.id) {

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
            section: obj.section,
            data: { ...sidebarItem, files }
          })
        }
      }

      if (payload.type === socketTypes.CREATE) {
        store.commit('template/ADD_SIDEBAR_ITEM', {
          section: obj.section,
          data: { ...sidebarItem, files: [...payload.data, ...sidebarItem.files || []] }
        })
      }
    })
  })
