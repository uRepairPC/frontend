/* eslint-disable */
'use strict'

/** @see https://webpack.js.org/guides/dependency-management/ */
const files = require.context('./', true, /\.scss$/)

// Execute files
files.keys().forEach(key => files(key))
