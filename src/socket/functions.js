'use strict'

import sections from '@/enum/sections'
import io from '@/socket/io'
import axios from 'axios'

/**
 * Sync rooms by permissions on socket server.
 */
export function syncEvents() {
  axios.post('listeners/sync')
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
export function offEventDynamic(section, id) {
  io.emit('leave', generateRooms(section, id))
}
