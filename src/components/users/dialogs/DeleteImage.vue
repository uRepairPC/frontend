<template>
	<basic-delete
		title="Видалення зображення"
		:loading="loading"
		v-on="listeners"
		v-bind="$attrs"
	>
		<template slot="content-top">
			Ви дійсно хочете видалити зображення?
		</template>
	</basic-delete>
</template>

<script>
import BasicDelete from '@/components/dialogs/BasicDelete'
import sections from '@/data/sections'

export default {
	inheritAttrs: false,
	components: {
		BasicDelete
	},
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
