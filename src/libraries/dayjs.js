'use strict'

import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import dayjs from 'dayjs'
import 'dayjs/locale/uk'

dayjs.extend(LocalizedFormat)
dayjs.locale('uk')

export default dayjs
