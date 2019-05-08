'use strict'

import * as permissions from '@/enum/permissions'

/**
 * @var {array}
 * @example
 *  - text (string)
 *  - permissions (array of enum permissions)
 */
export default [
  {
    text: '<code>Ctrl + Shift + F / Esc</code> - закрити глобальний пошук.'
  },
  {
    text: '<code>Shift + Mouse Wheel</code> - переміщати горизонтальний скролл.'
  },
  {
    text: '<code>Ctrl + Shift + F</code> - відкрити глобальний пошук.'
  },
  {
    text: 'Ви можете призначати декілька ролей на одного користувача.',
    permissions: permissions.ROLES_MANAGE
  },
  {
    text: '<code>Esc</code> - закрити модальне вікно'
  },
  {
    text: 'Користувач після створення має <strong>ролі за замовчуванням</strong>',
    permissions: permissions.ROLES_VIEW
  }
]
