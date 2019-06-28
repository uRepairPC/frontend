'use strict'

// Import locale from element-ui framework
import ru from 'element-ui/lib/locale/lang/ru-RU'
import en from 'element-ui/lib/locale/lang/en'
import uk from 'element-ui/lib/locale/lang/ua'

/**
 * All translations.
 * @type {Object}
 */
const languages = {
  ru, en, uk
}

// eslint-disable-next-line
const files = require.context('.', true, /\.json$/)

files.keys().forEach(key => {
  // Ex. ['en', 'folder', 'fileName']
  const split = key.substring(2)
    .replace(/.json/g, '')
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
  current[split[len - 1]] = { ...current[split[len - 1]], ...files(key) }
})

export default languages
