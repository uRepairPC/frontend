<template>
	<basic-delete
		:title="item.name"
		:confirm="item.id"
		:loading="loading"
		v-bind="$attrs"
		v-on="listeners"
	/>
</template>

<script>
import BasicDelete from '@/components/dialogs/BasicDelete'

export default {
	components: {
		BasicDelete
	},
	inheritAttrs: false,
	props: {
		item: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			loading: false
		}
	},
	computed: {
		listeners() {
			return {
				...this.$listeners,
				submit: this.fetchRequest
			}
		}
	},
	methods: {
		fetchRequest() {
			this.loading = true

			this.$axios.delete(`equipments/models/${this.item.id}`)
				.then(() => {
					this.$store.dispatch('equipmentModels/fetchList')
					this.$emit('input', false)
				})
				.finally(() => {
					this.loading = false
				})
		}
	}
}
</script>
