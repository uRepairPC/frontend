'use strict'
/* eslint-disable */

import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'

axios.interceptors.response.use(
	(resp) => {
		console.log(resp)
		return resp
	},
	(err) => {
		console.log(err)

		if (err.status === 401) {
			// TODO move to auth page, remove token, etc
		}

		return Promise.reject(err)
	}
)
