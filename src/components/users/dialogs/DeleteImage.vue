<template>
	<basic-delete
		title="Видалення зображення"
		:loading="loading"
		v-bind="$attrs"
		v-on="listeners"
	>
		<template slot="content-alert">
			Ви дійсно хочете видалити зображення?
		</template>
	</basic-delete>
</template>

<script>
import BasicDelete from '@/components/dialogs/BasicDelete'
import sections from '@/data/sections'

export default {
	components: {
		BasicDelete
	},
	inheritAttrs: false,
	props: {
		user: {
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

			this.$axios.delete(`users/${this.user.id}/image`)
				.then(() => {
					this.$store.dispatch('template/addSidebarItem', {
						section: sections.users,
						data: { ...this.user, image: null }
					})
					this.$emit('close')
				})
				.finally(() => {
					this.loading = false
				})
		}
	}
}
</script>
