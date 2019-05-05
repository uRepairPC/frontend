<template>
	<select-simple
		:items="list"
		label-attr="name"
		value-attr="id"
		placeholder="Пріорітет"
		v-bind="$attrs"
		v-on="listeners"
	/>
</template>

<script>
export default {
	inheritAttrs: false,
	components: {
		SelectSimple: () => import('@/components/SelectSimple')
	},
	computed: {
		list() {
			return this.$store.state.requestPriorities.list
		},
		init() {
			return this.$store.state.requestPriorities.init
		},
		listeners() {
			return {
				...this.$listeners,
				focus: () => {
					if (this.init) {
						this.$store.dispatch('requestPriorities/fetchList')
					}
				}
			}
		}
	}
}
</script>
