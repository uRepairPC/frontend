<template>
	<el-dialog
		title="Відкриті сторінки"
		class="dialog--default"
		v-bind="$attrs"
		v-on="$listeners"
	>
		<history-collapse @click-item="onClose" />
		<el-button
			slot="footer"
			type="primary"
			size="small"
			@click="onClose"
		>
			Закрити
		</el-button>
	</el-dialog>
</template>

<script>
export default {
	inheritAttrs: false,
	components: {
		HistoryCollapse: () => import('@/components/history/Collapse')
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

<style lang="scss" scoped>
.dialog--default {
	/deep/ .el-dialog__footer {
		text-align: center;
		.el-button {
			min-width: 200px;
		}
	}
}
</style>
