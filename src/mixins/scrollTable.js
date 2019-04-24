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
			const scroll = this.$store.state.template.pagesScroll[this.$route.name]

			if (!scroll) {
				return
			}

			// Wait x milliseconds, because child
			// component may not be initialized
			setTimeout(() => {
				const el = document.querySelector(TABLE_SELECTOR)
				if (el) {
					el.scrollTop = scroll
				}
			}, WAIT_UPDATE_SCROLL)
		},
		saveScrollTablePosition() {
			const el = document.querySelector(TABLE_SELECTOR)

			if (!el) {
				return
			}

			this.$store.commit('template/SET_PAGE_SCROLL', {
				pageName: this.$route.name,
				scroll: el.scrollTop
			})
		}
	}
}
