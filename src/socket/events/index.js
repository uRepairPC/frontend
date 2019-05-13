'use strict'

// eslint-disable-next-line
const files = require.context('.', false, /\.js$/)

files.keys().forEach((key) => {
  if (key === './index.js') {
    return
  }

  files(key)
})
