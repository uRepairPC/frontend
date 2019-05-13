'use strict'

import { syncEvents } from '@/socket/functions'
import io from '@/socket/io'
import store from '@/store'
import axios from 'axios'

/** @type {string} */
export const SOCKET_HEADER = 'X-Socket-ID'

io.on('connect', () => {
  // Append socketId to every request to the server (API)
  axios.defaults.headers[SOCKET_HEADER] = io.id

  if (store.state.profile.isLogin) {
    // Join to default rooms for listen events
    syncEvents()
  }
})

io.on('disconnect', () => {
  // Remove socketId from axios
  axios.defaults.headers[SOCKET_HEADER] = null
})
