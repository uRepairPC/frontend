'use strict'

import socketTypes from '@/enum/socketTypes'
import { isArray } from '@/scripts/helpers'
import sections from '@/enum/sections'
import io from '@/socket/io'
import store from '@/store'

/*
 * NOTE: Attr must be Array!
 */

Array(
  { event: 'equipment_files', section: sections.equipments, sectionAttrId: 'equipment_id', attr: 'files' },
  { event: 'request_files', section: sections.requests, sectionAttrId: 'request_id', attr: 'files' },
  { event: 'request_comments', section: sections.requests, sectionAttrId: 'request_id', attr: 'comments' }
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
        isArray(sidebarItem[obj.attr]) && payload.params.id) {

        // Find [obj.attr] by id in array and change or delete
        const sidebarItemData = [...sidebarItem[obj.attr]]
        const findIndex = sidebarItemData.findIndex(item => item.id === payload.params.id)

        if (~findIndex) {
          if (payload.type === socketTypes.UPDATE) {
            sidebarItemData[findIndex] = { ...sidebarItemData[findIndex], ...payload.data }
          } else {
            sidebarItemData.splice(findIndex, 1)
          }

          store.commit('template/ADD_SIDEBAR_ITEM', {
            section: obj.section,
            data: { ...sidebarItem, [obj.attr]: sidebarItemData }
          })
        }
      }

      if (payload.type === socketTypes.CREATE) {
        const payloadDataArray = isArray(payload.data) ? payload.data : [payload.data]

        store.commit('template/ADD_SIDEBAR_ITEM', {
          section: obj.section,
          data: { ...sidebarItem, [obj.attr]: [...payloadDataArray, ...sidebarItem[obj.attr] || []] }
        })
      }
    })
  })
