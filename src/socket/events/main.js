'use strict'

import { syncEvents } from '@/socket/functions'
import socketTypes from '@/enum/socketTypes'
import sections from '@/enum/sections'
import logout from '@/scripts/logout'
import router from '@/router'
import io from '@/socket/io'
import store from '@/store'

Array(
  { event: 'server.equipments', store: 'equipments', section: sections.equipments },
  { event: 'server.users', store: 'users', section: sections.users },
  { event: 'server.roles', store: 'roles', section: sections.roles },
  { event: 'server.requests', store: 'requests', section: sections.requests }
)
  .forEach((obj) => {
    io.on(obj.event, (payload) => {
      if (payload.type === socketTypes.CREATE) {
        handleCreate(payload, obj)
        return
      }

      const sidebar = store.state.template.sidebar[obj.store]
      if (!payload.params || !payload.params.id) {
        return
      }

      // Current user (profile)
      if (obj.section === sections.users && store.state.profile.user.id === payload.params.id) {
        // If the current user is deleted - logout
        if (payload.type === socketTypes.DELETE) {
          logout()
          return
        }

        handleCurrentUser(payload)
      }

      // Sidebar/SidebarItem can empty, but user see list of items (Index.vue)
      // Update general list
      if (payload.type === socketTypes.UPDATE) {
        // Some data may not have id
        store.commit(`${obj.section}/UPDATE_ITEM`, { ...payload.data, id: payload.params.id })
      } else {
        store.commit(`${obj.section}/DELETE_ITEM`, payload.params.id)
      }

      // Section in sidebar not found
      if (!sidebar) {
        return
      }

      // Element in sidebar section not found
      const sidebarItem = sidebar[payload.params.id]
      if (!sidebarItem) {
        return
      }

      if (payload.type === socketTypes.UPDATE) {
        handleUpdate(payload, obj)
      } else {
        handleDelete(payload, obj)
      }
    })
  })

function handleCreate(payload, obj) {
  store.commit(`${obj.section}/APPEND_DATA`, payload.data)
}

function handleCurrentUser(payload) {
  // If the current user is deleted - logout
  if (payload.type === socketTypes.DELETE) {
    logout()
    return
  }

  // Set new data to the current user
  store.commit('profile/SET_USER', payload.data)

  // Update permissions
  if (payload.data.permissions) {
    store.commit('profile/SET_PERMISSIONS', payload.data.permissions)
  }

  // And refresh events
  syncEvents()
}

function handleUpdate(payload, obj) {
  store.commit('template/ADD_SIDEBAR_ITEM', {
    section: obj.section,
    data: { id: payload.params.id, ...payload.data }
  })
}

function handleDelete(payload, obj) {
  const route = router.currentRoute

  /*
   * Item is deleted and user is stay on this page - leave the page
   */
  if (`${obj.section}-id` === route.name && payload.params.id === +route.params.id) {
    router.push({ name: obj.section })
  }

  store.commit('template/REMOVE_SIDEBAR_ITEM', {
    section: obj.section,
    id: payload.params.id
  })
}
