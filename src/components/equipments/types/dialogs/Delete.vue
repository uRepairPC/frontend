<template>
	<basic-delete
		:title="item.name"
		:confirm="item.id"
		:loading="loading"
		v-on="listeners"
		v-bind="$attrs"
	/>
</template>

<script>
import BasicDelete from '@/components/dialogs/BasicDelete'

export default {
	inheritAttrs: false,
	components: {
		BasicDelete
	},
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

			this.$axios.delete(`equipments/types/${this.item.id}`)
				.then(() => {
					this.$store.dispatch('equipmentTypes/fetchList')
					this.loading = false
					this.$emit('input', false)
				})
				.catch(() => {
					this.loading = false
				})
		}
	}
}
</script>
