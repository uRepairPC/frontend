<template>
	<basic-delete
		title="Видалення користувача"
		:confirm="user.id"
		:loading="loading"
		v-on="listeners"
		v-bind="$attrs"
	/>
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

			this.$axios.delete(`users/${this.user.id}`)
				.then(() => {
					this.$store.commit('template/REMOVE_SIDEBAR_ITEM', {
						section: sections.users,
						id: this.user.id
					})
					this.loading = false
					this.$emit('input', false)
					this.$router.push({ name: sections.users })
				})
				.catch(() => {
					this.loading = false
				})
		}
	}
}
</script>
