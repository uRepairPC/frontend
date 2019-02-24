<template>
	<div class="layout layout_default">
		<el-container direction="vertical">
			<header-box />
			<el-container>
				<sidebar-box />
				<el-main>
					<router-view />
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
import SidebarBox from '@/components/root/Sidebar'
import HeaderBox from '@/components/root/Header'

export default {
	components: {
		SidebarBox, HeaderBox
	}
}
</script>
