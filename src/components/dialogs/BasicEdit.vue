<template>
	<el-dialog
		class="dialog--default"
		v-bind="$attrs"
		v-on="$listeners"
	>
		<div class="content">
			<slot />
		</div>
		<span slot="footer">
			<el-button @click="onClose">Закрити</el-button>
			<el-button
				type="primary"
				:loading="loading"
				:disabled="loading"
				@click="onSubmit"
			>
				{{ saveBtn }}
			</el-button>
		</span>
	</el-dialog>
</template>

<script>
export default {
	inheritAttrs: false,
	computed: {
		loading() {
			return this.$attrs.loading
		},
		saveBtn() {
			return this.$attrs['save-btn'] || 'Зберегти'
		}
	},
	methods: {
		onSubmit() {
			this.$emit('submit')
		},
		onClose() {
			this.$emit('close')
		}
	}
}
</script>
