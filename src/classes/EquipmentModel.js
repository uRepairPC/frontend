'use strict'

import Api from '@/common/classes/Api'

export default class EquipmentModel extends Api {

  static get __API_POINT() {
    return 'equipments/models'
  }
}
