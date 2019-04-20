'use strict'

/*
 * NOTE: fetchRequest function is reserved!
 */

import { isObject } from '@/scripts/helpers'

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
			this.sockets.unsubscribe(`${section}-${this.id}`)
		},
		methods: {
			_subscribe() {
				this.sockets.subscribe(`${section}-${this.id}`, (data) => {
					if (!isObject(data)) {
						return
					}

					switch (data.action) {
					case 'update':
						if (typeof this.fetchRequest === 'function') {
							this.fetchRequest()
						}
						break
					case 'delete':
						this.$router.push({ name: section })
						break
					}
				})
			}
		}
	}
}
