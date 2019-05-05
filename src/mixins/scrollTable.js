'use strict'

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

			if (!pageScroll) {
				return
			}

			// Wait x milliseconds, because child
			// elements may not be display
			setTimeout(() => {
				document.documentElement.scrollTop = pageScroll
			}, WAIT_UPDATE_SCROLL)
		},
		saveScrollTablePosition() {
			let scroll = 0

			const documentScrollTop = document.documentElement.scrollTop || document.body.scrollTop
			if (documentScrollTop) {
				scroll = documentScrollTop
			}

			this.$store.commit('template/SET_PAGE_SCROLL', {
				pageName: this.$route.name,
				scroll
			})
		}
	}
}
