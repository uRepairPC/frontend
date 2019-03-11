<template>
	<el-dialog
		title="Видалення зображення"
		:visible="value"
		class="dialog--default"
		v-on="listeners"
	>
		<div class="content">
			Ви дійсно хочете видалити зображення?
		</div>
		<span slot="footer">
			<el-button @click="close">Відмінити</el-button>
			<el-button
				type="danger"
				:loading="loading"
				:disabled="loading"
				@click="fetchRequest"
			>
				Видалити
			</el-button>
		</span>
	</el-dialog>
</template>

<script>
export default {
	inheritAttrs: false,
	props: {
		value: {
			type: Boolean,
			default: false
		},
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
				'update:visible': this.close
			}
		}
	},
	methods: {
		fetchRequest() {
			this.loading = true

			this.$axios.delete(`users/${this.user.id}/image`)
				.then(() => {
					this.$store.dispatch('template/addSidebarUser', { ...this.user, image: null })
					this.loading = false
					this.close()
				})
				.catch(() => {
					this.loading = false
				})
		},
		close() {
			this.$emit('input', false)
		}
	}
}
</script>
