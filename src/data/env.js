/* eslint-disable */
'use strict'

// FIXME Only one server

/** @return {boolean} */
export const isDev = ['dev', 'development'].includes(process.env.NODE_ENV)

/** @return {string} */
export const serverProd = process.env.SERVER_PROD || 'http://localhost'

/** @return {string} */
export const serverDev = process.env.SERVER_DEV || 'http://localhost'

/** @return {string} */
export const server = isDev ? serverDev : serverProd
