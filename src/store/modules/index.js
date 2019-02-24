'use strict'

// eslint-disable-next-line
const files = require.context('.', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
	if (key === './index.js') {
		return
	}

	const mod = files(key).default
	mod.namespaced = true

	modules[key.replace(/(\.\/|\.js)/g, '')] = mod
})

export default modules
