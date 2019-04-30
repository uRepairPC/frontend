'use strict'

/** @type {string} */
export const TABLE_SELECTOR = '.el-table__body-wrapper'

/** @type {number} - milliseconds */
const WAIT_UPDATE_SCROLL = 400

export default {
	activated() {
		this.updateScrollTablePosition()
	},
	beforeRouteLeave(to, from, next) {
		this.saveScrollTablePosition()
		next()
	},
	methods: {
		updateScrollTablePosition() {
			const pageScroll = this.$store.state.template.pagesScroll[this.$route.name]

			if (!pageScroll || !pageScroll.scroll) {
				return
			}

			// Wait x milliseconds, because child
			// elements may not be display
			setTimeout(() => {
				if (pageScroll.mob) {
					document.documentElement.scrollTop = pageScroll.scroll
				}
				else {
					const el = document.querySelector(TABLE_SELECTOR)
					if (el) {
						el.scrollTop = pageScroll.scroll
					}
				}
			}, WAIT_UPDATE_SCROLL)
		},
		saveScrollTablePosition() {
			let mob = false
			let scroll = 0

			// Desktop
			const el = document.querySelector(TABLE_SELECTOR)
			if (el) {
				scroll = el.scrollTop
			}

			// Mobile
			const documentScrollTop = document.documentElement.scrollTop || document.body.scrollTop
			if (documentScrollTop) {
				mob = true
				scroll = documentScrollTop
			}

			this.$store.commit('template/SET_PAGE_SCROLL', {
				pageName: this.$route.name,
				scroll,
				mob
			})
		}
	}
}
