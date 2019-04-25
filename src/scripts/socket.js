'use strict'

import StorageData from '@/classes/StorageData'
import { serverSocket } from '@/data/env'
import io from 'socket.io-client'

export default io(serverSocket, {
	query: {
		token: StorageData.token
	}
})
