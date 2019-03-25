<template>
	<transition
		name="tips-anim"
		mode="out-in"
	>
		<!--eslint-disable vue/no-v-html-->
		<div
			:key="index"
			class="tips"
			v-html="currentTip.text"
		/>
	</transition>
</template>

<script>
import { isArray } from '@/scripts/helpers'
import tips from '@/data/tips'

/** @type {number} - milliseconds */
const INTERVAL = 8000

export default {
	data() {
		return {
			index: 0,
			currentTip: ''
		}
	},
	computed: {
		profile() {
			return this.$store.state.profile.user
		},
		len() {
			return this.tipsList.length
		},
		tipsList() {
			return tips.filter((tip) => {
				if (isArray(tip.access)) {
					return tip.access.includes(this.profile.role)
				}

				return true
			})
		}
	},
	watch: {
		tipsList: {
			handler(arr) {
				this.currentTip = ''

				const setCurrentTip = () => {
					this.index = this.index + 1 >= this.len ? 0 : this.index + 1
					this.currentTip = arr[this.index]
				}

				setCurrentTip()

				this._interval = setInterval(setCurrentTip, INTERVAL)
			},
			immediate: true
		}
	},
	beforeDestroy() {
		clearInterval(this._interval)
	}
}
</script>

<style lang="scss" scoped>
@import "~scss/_colors";

.tips {
	text-align: center;
	color: $regularText;
	font-size: .9rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

// <animation>

.tips-anim-enter-active {
	opacity: 0;
	transform: translateY(-10px);
	transition: .3s;
}

.tips-anim-enter-to {
	transform: translateY(0);
	opacity: 1;
}

.tips-anim-leave-active {
	transform: translateY(0);
	opacity: 1;
	transition: .3s;
}

.tips-anim-leave-to {
	transform: translateY(10px);
	opacity: 0;
}
</style>
