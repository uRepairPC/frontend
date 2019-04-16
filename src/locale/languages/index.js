'use strict'

/**
 * All translations.
 * @type {Array}
 */
const languages = []

// eslint-disable-next-line
const files = require.context('.', true, /\.js$/)

files.keys().forEach(key => {
	if (key === './index.js') {
		return
	}

	// Ex. ['en-US', 'folder', 'fileName]
	const split = key.substring(2)
		.replace(/.js/g, '')
		.split('/')

	const len = split.length
	let current = languages

	// We pass an array and collect an object from it
	for (let i = 0; i < len - 1; i++) {
		if (typeof current[split[i]] === 'undefined') {
			current[split[i]] = {}
		}
		current = current[split[i]]
	}
	current[split[len - 1]] = files(key).default
})

export default languages
