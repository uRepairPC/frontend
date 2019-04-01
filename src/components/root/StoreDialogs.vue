<template>
	<component
		:visible="visible"
		:is="component"
		v-bind="dialog.attrs"
		v-on="listeners"
	/>
</template>

<script>
export default {
	data() {
		return {
			visible: false,
			component: null
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
		dialog(val) {
			if (val.component) {
				this.component = { ...val.component }
				this.visible = true
			}
		}
	}
}
</script>
