/* eslint-disable */
'use strict'

/** @return {boolean} */
export const isProd = !['dev', 'development'].includes(process.env.NODE_ENV)

/** @return {string} */
export const serverProd = process.env.SERVER_PROD || 'http://localhost/'
