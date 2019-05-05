<template>
	<select-simple
		:items="list"
		label-attr="name"
		value-attr="id"
		placeholder="Тип"
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
			return this.$store.state.requestTypes.list
		},
		init() {
			return this.$store.state.requestTypes.init
		},
		listeners() {
			return {
				...this.$listeners,
				focus: () => {
					if (this.init) {
						this.$store.dispatch('requestTypes/fetchList')
					}
				}
			}
		}
	}
}
</script>
