<template>
	<div class="layout layout_not_authorized">
		<el-container>
			<el-header>
				<!--TODO Right button for download service, etc-->
			</el-header>
			<el-main>
				<router-view />
			</el-main>
			<el-footer>
				<!--TODO Copyright-->
			</el-footer>
		</el-container>
	</div>
</template>

<script>
export default {
	beforeCreate() {
		const data = localStorage.getItem('user')

		if (data) {
			this.$router.push({ name: 'dashboard' })
		}
	}
}
</script>
