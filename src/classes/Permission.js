'use strict'

import axios from 'axios'

/** @type {string} */
export const API_POINT = 'permissions'

export default class Permission {

  /* | ------------------------------------------------------------------------------------------------
	 * | - Requests -
	 * | ------------------------------------------------------------------------------------------------
	 */

  /**
	 * Get resource.
	 *
	 * @param {AxiosRequestConfig} config
	 * @return {Promise<AxiosPromise<any>>}
	 */
  static fetchAll(config = null) {
    return axios.get(API_POINT, config)
  }
}
