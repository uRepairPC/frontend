'use strict'

import { isObject } from '@/scripts/helpers'
import sections from '@/enum/sections'
import io from '@/socket/io'
import store from '@/store'
import axios from 'axios'

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
 * Get multiple rooms from section if can.
 * @param {string} section
 * @param {number} id
 * @return {array}
 */
function generateRooms(section, id) {
  const rooms = [`${section}.${id}`]

  switch (section) {
  case sections.equipments:
    rooms.push(`equipment_files.${id}`)
    break
  case sections.requests:
    rooms.push(`request_files.${id}`)
    rooms.push(`request_comments.${id}`)
    break
  }

  return rooms
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
  io.emit('leave', generateRooms(section, id))
}
