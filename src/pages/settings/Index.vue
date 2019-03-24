<template>
	<div>
		<el-tabs type="border-card" v-model="activeName">
			<el-tab-pane label="Виробники обладнання" name="manufacturers">
				<manufacturers-item />
			</el-tab-pane>
			<el-tab-pane label="Моделі обладнання" name="models">models</el-tab-pane>
			<el-tab-pane label="Типи обладнання" name="types">types</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import ManufacturersItem from '@/components/settings/Manufacturers'

export default {
	name: 'Settings',
	breadcrumbs: [
		{ title: 'Конфігурація' }
	],
	components: {
		ManufacturersItem
	},
	data() {
		return {
			activeName: 'manufacturers'
		}
	}
}
</script>

<style lang="scss" scoped>
/deep/ .el-tabs--border-card {
	border: none;
	box-shadow: none;
	height: 100%;
	.el-tabs__content {
		min-height: calc(100% - 39px);
		background: #fff;
	}
}

/deep/ .el-tabs__nav {
	user-select: none;
}
</style>
