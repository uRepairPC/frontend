<template>
	<el-tabs
		:value="routeName"
		type="border-card"
		@tab-click="onTabClick"
	>
		<el-tab-pane
			v-for="(tab, index) in sectionMenu"
			:key="index"
			:label="tab.label"
			:name="tab.name"
		>
			<router-view />
		</el-tab-pane>
	</el-tabs>
</template>

<script>
import { listMenu } from '@/data/template'
import sections from '@/data/sections'

export default {
	name: 'Settings',
	breadcrumbs: [
		{ title: 'Конфігурація' }
	],
	computed: {
		sectionMenu() {
			const actions = listMenu[sections.settings].actions
			const arr = []

			Object.entries(actions).forEach(([key, obj]) => {
				if (obj.tag === 'page') {
					arr.push({ label: obj.text, name: key })
				}
			})

			return arr
		},
		routeName() {
			return this.$route.name
		}
	},
	methods: {
		onTabClick(component) {
			this.$router.push({ name: component.name })
		}
	}
}
</script>

<style lang="scss" scoped>
.el-tabs--border-card {
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
