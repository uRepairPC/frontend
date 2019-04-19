'use strict'

/**
 * All translations.
 * @type {Array}
 */
const languages = []

// eslint-disable-next-line
const files = require.context('.', false, /\.js$/)

files.keys().forEach(key => {
	if (key === './index.js') {
		return
	}

	const lang = key.substring(2, key.length - 3)
	languages[lang] = files(key).default
})

export default languages
