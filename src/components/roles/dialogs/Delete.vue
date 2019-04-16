<template>
	<basic-delete
		:title="role.display_name"
		:confirm="role.id"
		:loading="loading"
		v-bind="$attrs"
		v-on="listeners"
	/>
</template>

<script>
import BasicDelete from '@/components/dialogs/BasicDelete'
import Role from '@/classes/Role'

export default {
	components: {
		BasicDelete
	},
	inheritAttrs: false,
	props: {
		role: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			loading: false,
			filesDelete: true
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

			Role.fetchDelete(this.role.id)
				.then(() => {
					this.$emit('delete')
					this.$emit('close')
				})
				.finally(() => {
					this.loading = false
				})
		}
	}
}
</script>
