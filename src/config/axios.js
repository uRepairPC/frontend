'use strict'
/* eslint-disable */

import { Message } from 'element-ui'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'

axios.interceptors.response.use(
	(resp) => {
		return resp
	},
	(err) => {
		if (err.status === 401) {
			// TODO move to auth page, remove token, etc
		}

		if (err.response && err.response.data && err.response.data.message) {
			Message.error(err.response.data.message)
		}

		return Promise.reject(err)
	}
)
