<template>
	<basic-delete
		:title="file.name"
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
		equipment: {
			type: Object,
			required: true
		},
		file: {
			type: Object,
			required: true
		},
		index: {
			type: Number,
			default: 0
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

			this.$axios.delete(`equipments/${this.equipment.id}/files/${this.file.id}`)
				.then(() => {
					this.$emit('delete-file', this.index)
					this.$emit('close')
				})
				.finally(() => {
					this.loading = false
				})
		}
	}
}
</script>
