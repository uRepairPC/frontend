'use strict'

import Api from '@/common/classes/Api'

export default class RequestPriority extends Api {

  static get __API_POINT() {
    return 'requests/priorities'
  }
}
