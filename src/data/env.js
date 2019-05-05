/* eslint-disable */
'use strict'

/** @return {boolean} */
export const isDev = ['dev', 'development'].includes(process.env.NODE_ENV)

/** @return {string} */
export const proxyTarget = process.env.PROXY_TARGET || 'http://localhost'

/** @return {string} */
export const serverSocketDev = process.env.SERVER_SOCKET_DEV || 'http://localhost:3000'

/** @return {string} */
export const serverSocketProd = process.env.SERVER_SOCKET_PROD || 'http://localhost:3000'

/** @return {string} */
export const serverSocket = isDev ? serverSocketDev : serverSocketProd

/** @return {string} */
export const server = isDev ? proxyTarget : location.origin
