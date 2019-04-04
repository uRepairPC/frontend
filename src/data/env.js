/* eslint-disable */
'use strict'

import { withoutLastSlash } from '@/scripts/utils'

/** @return {boolean} */
export const isProd = !['dev', 'development'].includes(process.env.NODE_ENV)

/** @return {string} */
export const serverProd = withoutLastSlash(process.env.SERVER_PROD) || 'http://localhost'

/** @return {string} */
export const serverDev = withoutLastSlash(process.env.SERVER_DEV) || 'http://localhost'

/** @return {string} */
export const server = isProd ? serverProd : serverDev
