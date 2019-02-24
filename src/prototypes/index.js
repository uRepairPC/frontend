'use strict'

// eslint-disable-next-line
const files = require.context('.', false, /\.js$/)
const prototypes = []

files.keys().forEach(key => {
	if (key === './index.js') {
		return
	}

	prototypes.push(files(key).default)
})

export default prototypes
