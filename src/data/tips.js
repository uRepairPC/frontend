'use strict'

import { list as roleList} from '@/data/roles'
import * as roles from '@/enum/roles'

const adminUser = `<strong class="${roleList[roles.ADMIN].color}">${roleList[roles.ADMIN].name}</strong>`

/**
 * @var {array}
 * @example
 *  - text (string)
 *  - access (array of enum roles)
 */
export default [
	{
		text: '<strong>Ctrl + Shift + F / Esc</strong> - закрити глобальний пошук.'
	},
	{
		text: '<strong>Shift + Mouse Wheel</strong> - переміщати горизонтальний скролл.'
	},
	{
		text: '<strong>Ctrl + Shift + F</strong> - відкрити глобальний пошук.'
	},
	{
		text: `Тільки ${adminUser} має можливість бачити ролі інших користувачів.`,
		access: [roles.ADMIN]
	},
	{
		text: `${adminUser} не може змінювати пароль користувача вручну, тільки сгенерувати.`,
		access: [roles.ADMIN, roles.WORKER]
	},
	{
		text: 'Всі фотографії на сайті доступні тільки для зареєстрованих користувачів.',
		access: [roles.ADMIN, roles.WORKER]
	}
]
