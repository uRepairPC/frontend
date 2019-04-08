<template>
	<component
		:visible="visible"
		:is="dialog.component"
		v-bind="dialog.attrs"
		v-on="listeners"
	/>
</template>

<script>
export default {
	data() {
		return {
			visible: false
		}
	},
	computed: {
		dialog() {
			return this.$store.state.template.dialog
		},
		listeners() {
			return {
				...this.dialog.events,
				close: () => {
					this.visible = false
				},
				closed: this.closeDialog
			}
		}
	},
	methods: {
		closeDialog() {
			this.component = null
			this.$store.commit('template/CLOSE_DIALOG')
		}
	},
	watch: {
		/**
		 * FIXME Temporary fix problem
		 * @see https://stackoverflow.com/a/49122742/9612245
		 */
		dialog(val) {
			if (val.component) {
				this.$store._committing = true
				this.visible = true
			} else {
				this.$store._committing = false
			}
		}
	}
}
</script>
