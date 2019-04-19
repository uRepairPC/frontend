'use strict'

/**
 * | ------------------------------------------------------------------------------------------
 * | - Automatically Generate Translation Files -
 * | ------------------------------------------------------------------------------------------
 * |
 * | NOTE:
 * |  - No multiline support.
 * |  - No variable support.
 * |  - No array support.
 * |
 * @example
 *  <div v-t="'global.name'">
 *    {{ $t('global.name') }}
 *    {{ $tc('global.name') }}
 *    {{ $te('global.name') }}
 *  </div>
 */

/* | ------------------------------------------------------------------------------------------
 * | - Import -
 * | ------------------------------------------------------------------------------------------
 */

const path = require('path')
const fs = require('fs')

/* | ------------------------------------------------------------------------------------------
 * | - Const -
 * | ------------------------------------------------------------------------------------------
 */

/** @type {string} */
const SRC_DIR = path.resolve(__dirname, '../src')

/** @type {string} */
const OUTPUT_FOLDER = path.resolve(__dirname, '../src/locale/languages')

/** @type {string} */
const DEFAULT_LANG = 'en-US'

/** @type {array} - not include DEFAULT_LANG */
const SUPPORT_LANG = ['uk_UA', 'ru_RU']

/** @type {RegExp} */
const REGEX_METHOD = /([$.]t[ce]?\(|v-t=)['`"]{1,2}([^'`")]+)['`"]{1,2}/gm

/** @type {number} */
const REGEX_METHOD_MAX_LEN = 3

/** @type {array} */
const SUPPORT_EXT = ['.vue', '.js']

/** @type {string} */
const ENCODING = 'UTF-8'

/* | ------------------------------------------------------------------------------------------
 * | - Logic -
 * | ------------------------------------------------------------------------------------------
 */

const json = {}

getFilesRecursive(SRC_DIR, (uri) => {
	const files = getKeysFromFile(uri)
	generateJSON(removeBaseUri(uri), files, json)
})

// Main language
const outputUri = OUTPUT_FOLDER + path.sep + DEFAULT_LANG + '.js'
getDataFromFile(outputUri)

// Other languages
// SUPPORT_LANG.forEach((lang) => {
// 	const outputUri = OUTPUT_FOLDER + path.sep + lang + '.js'
// 	const data = getDataFromFile(outputUri)
// 	// console.log(data)
//
// 	let output = '/* eslint-disable */\n\n' +
// 		'export default {\n'
// 	output += generateFile(json)
// 	output += '}\n'
// 	fs.writeFileSync(outputUri, output, { encoding: ENCODING })
// })


/* | ------------------------------------------------------------------------------------------
 * | - Functions -
 * | ------------------------------------------------------------------------------------------
 */

/**
 * @param {string} uri - filePath
 * @param {function} cb - callback
 */
function getFilesRecursive(uri, cb) {
	const lstat = fs.lstatSync(uri)

	if (lstat.isDirectory()) {
		fs.readdirSync(uri).forEach((fileUri) => {
			getFilesRecursive(uri + path.sep + fileUri, cb)
		})
	}

	const ext = path.extname(uri)

	if (SUPPORT_EXT.includes(ext)) {
		cb(uri)
	}
}

/**
 * @param {string} uri - filePath
 * @return {array}
 * @example
 * [{
 *  uri: 'App.vue',
 *  keys: [
 *    { line, key, index }
 *  ]
 * }]
 */
function getKeysFromFile(uri) {
	const text = fs.readFileSync(uri, { encoding: ENCODING })
	const match = text.match(REGEX_METHOD)
	const result = []

	if (match) {
		const keys = []
		let lastPos = 0
		let execRegex

		while ((execRegex = REGEX_METHOD.exec(text)) !== null) {
			let linePos = text.substr(lastPos, execRegex.index).match(/\n/g)
			linePos = linePos ? linePos.length + 1 : 1
			lastPos = linePos

			keys.push({
				line: linePos,
				key: execRegex[REGEX_METHOD_MAX_LEN - 1],
				index: execRegex.index
			})
		}

		result.push({ uri: removeBaseUri(uri), keys })
	}

	return result
}

/**
 * @param {string} uri
 * @return {string | *}
 */
function removeBaseUri(uri) {
	return uri.substr(SRC_DIR.length + 1)
}

/**
 * { _info: Array } - last object
 * @param {string} uri
 * @param {array} files
 * @param {object} json
 * @return {void} - fill json Object
 */
function generateJSON(uri, files, json) {
	files.forEach((file) => {
		file.keys.forEach((obj) => {
			const keysSplit = obj.key.split('.')
			const lastKey = keysSplit.pop()
			let current = json

			keysSplit.forEach((name) => {
				if (typeof current[name] === 'undefined') {
					current[name] = {}
				}

				current = current[name]
			})

			if (typeof current[lastKey] === 'undefined') {
				current[lastKey] = { _info: [] }
			}

			current[lastKey]._info.push({
				uri,
				line: obj.line,
				index: obj.index
			})
		})
	})
}

// TODO
function getDataFromFile(uri) {
	if (!fs.existsSync(uri)) {
		return null
	}

	// [\\t]+(.+)\:\W*`(.*)\W*`
	const file = fs.readFileSync(uri, { encoding: ENCODING })
	console.log(file.split('\n'))

	return null
}

// TODO Comments, check changes (md5*), before get original file
function generateFile(json, deep = 1) {
	const tab = '\t'.repeat(deep)
	let output = ''

	Object.entries(json).forEach((([key, obj]) => {
		// Last element
		if (obj._info) {
			obj._info.forEach((findFile) => {
				output += `${tab}// ${findFile.uri}: ${findFile.line} line\n`
			})
			output += `${tab}${key}: \`\`,\n`
		} else {
			output += `${tab}${key}: {\n`
			output += generateFile(obj, deep + 1)
			output += `${tab}},\n`
		}
	}))

	return output
}
