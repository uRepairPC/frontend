'use strict'

import * as perm from '@/enum/perm'

/**
 * @var {array}
 * @example
 *  - text (string)
 *  - permissions (array of enum permissions)
 */
export default [
  {
    text: '<code>Shift + Mouse Wheel</code> - переміщати горизонтальний скролл.'
  },
  {
    text: 'Ви можете призначати декілька ролей на одного користувача.',
    permissions: perm.ROLES_EDIT_ALL
  },
  {
    text: '<code>Esc</code> - закрити модальне вікно'
  },
  {
    text: 'Користувач після створення має <strong>ролі за замовчуванням</strong>',
    permissions: perm.ROLES_VIEW_SECTION
  }
]
