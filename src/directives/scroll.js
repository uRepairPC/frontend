'use strict'

/** @var {number} - px */
const OFFSET_BOTTOM = 500

/** @var {number} - milliseconds */
const WAIT_TIMEOUT = 100

export default {
	bind(el, binding) {
		// Callback function not exists
		if (!binding.value && typeof binding.value !== 'function') {
			return
		}

		// Table is not from library
		if (!el.classList.contains('el-table')) {
			return
		}

		const wrapperEl = el.querySelector('.el-table__body-wrapper')

		if (!wrapperEl) {
			return
		}

		let _timeout

		wrapperEl.addEventListener('scroll', () => {
			clearTimeout(_timeout)

			_timeout = setTimeout(() => {
				if (wrapperEl.scrollTop + wrapperEl.offsetHeight >= wrapperEl.scrollHeight - OFFSET_BOTTOM) {
					binding.value()
				}
			}, WAIT_TIMEOUT)
		})
	}
}
