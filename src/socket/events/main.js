'use strict'

import { syncEvents } from '@/socket/functions'
import socketTypes from '@/enum/socketTypes'
import sections from '@/enum/sections'
import logout from '@/scripts/logout'
import router from '@/router'
import io from '@/socket/io'
import store from '@/store'

Array(
  { event: 'equipments', store: 'equipments', section: sections.equipments },
  { event: 'users', store: 'users', section: sections.users },
  { event: 'roles', store: 'roles', section: sections.roles },
  { event: 'requests', store: 'requests', section: '' }
)
  .forEach((obj) => {
    io.on(obj.event, (payload) => {
      const sidebar = store.state.template.sidebar[obj.store]
      if (!payload.params.id) {
        return
      }

      if (obj.section === sections.users && store.state.profile.user.id === payload.params.id) {
        // If the current user is deleted - logout
        if (payload.type === socketTypes.DELETE) {
          logout()
          return
        }

        // Set new data to the current user
        store.commit('profile/SET_USER', payload.data)

        // And refresh events
        syncEvents()
      }

      if ((payload.type !== socketTypes.UPDATE && payload.type !== socketTypes.DELETE) || !sidebar) {
        return
      }

      const sidebarItem = sidebar[payload.params.id]

      /*
       * On update or delete - change the current item
       */
      if (sidebarItem) {
        if (payload.type === socketTypes.UPDATE) {
          store.commit('template/ADD_SIDEBAR_ITEM', {
            section: obj.section,
            data: { id: payload.params.id, ...payload.data }
          })
        } else {
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
      }
    })
  })
