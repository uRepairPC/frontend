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
			@click.prevent="onClick"
		/>
	</transition>
</template>

<script>
import { isArray, getRndInteger } from '@/scripts/helpers'
import tips from '@/data/tips'

export default {
	data() {
		return {
			index: 0,
			currentTip: ''
		}
	},
	created() {
		this.changeTip()
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
	methods: {
		onClick() {
			this.changeTip()
		},
		changeTip() {
			let newIndex = getRndInteger(0, this.len - 1)

			if (newIndex === this.index) {
				newIndex = ++newIndex >= this.len ? 0 : newIndex
			}

			this.index = newIndex
			this.currentTip = this.tipsList[this.index]
		}
	}
}
</script>

<style lang="scss" scoped>
@import "~scss/_colors";

.tips {
	color: $regularText;
	font-size: .9rem;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow-x: hidden;
	cursor: pointer;
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
