'use strict'

// TODO Global in store

/*
 * NOTE: fetchRequest function is reserved!
 */

import { isObject } from '@/scripts/helpers'
import { Notification } from 'element-ui'
import store from '@/store'

export default (section) => {
	return {
		data() {
			return {
				id: +this.$route.params.id
			}
		},
		mounted() {
			this._subscribe()
		},
		beforeDestroy() {
			delete this.$options.sockets[`${section}-${this.id}`]
		},
		methods: {
			_subscribe() {
				this.$options.sockets[`${section}-${this.id}`] = (data) => {
					if (!isObject(data) || store.state.profile.user.id === data.from.id) {
						return
					}

					Notification.info({
						title: `Socket - ${data.title}`,
						message: data.message
					})
					// TODO change history
				}
			}
		}
	}
}
