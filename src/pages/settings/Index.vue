<template>
	<div>
		<el-tabs type="border-card" v-model="activeName">
			<el-tab-pane label="Виробники обладнання" name="manufacturers">manufacturers</el-tab-pane>
			<el-tab-pane label="Моделі обладнання" name="models">models</el-tab-pane>
			<el-tab-pane label="Типи обладнання" name="types">types</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
export default {
	name: 'Settings',
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
		height: calc(100% - 39px);
	}
}

/deep/ .el-tabs__nav {
	user-select: none;
}
</style>
