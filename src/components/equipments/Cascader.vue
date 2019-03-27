<template>
	<el-cascader
		:value="value"
		:options="options"
		:props="{ label: 'name', value: 'id' }"
		change-on-select
		v-bind="$attrs"
		v-on="listeners"
	/>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
	inheritAttrs: false,
	props: {
		value: {
			type: Array,
			default: () => []
		}
	},
	mounted() {
		if (!this.listTypes.length && this.value.length >= 1) {
			this.$store.dispatch('equipmentTypes/fetchList')
		}

		if (!this.listModels.length && this.value.length >= 2) {
			this.$store.dispatch('equipmentModels/fetchList')
		}
	},
	computed: {
		...mapState({
			listTypes: state => state.equipmentTypes.list,
			listModels: state => state.equipmentModels.list
		}),
		...mapGetters({
			options: 'equipments/cascaderOptions'
		}),
		listeners() {
			return {
				...this.$listeners,
				input: (val) => {
					this.$emit('input', val)

				  if (val.length === 1 && !this.listModels.length) {
						this.$store.dispatch('equipmentModels/fetchList')
					}
				},
				focus: () => {
					if (!this.listTypes.length) {
						this.$store.dispatch('equipmentTypes/fetchList')
					}
				}
			}
		}
	}
}
</script>
