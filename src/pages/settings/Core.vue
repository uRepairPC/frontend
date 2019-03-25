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
		/>
		<keep-alive>
			<router-view />
		</keep-alive>
	</el-tabs>
</template>

<script>
import breadcrumbs from '@/mixins/breadcrumbs'
import sections from '@/data/sections'
import menu from '@/data/menu'

export default {
	name: 'Settings',
	breadcrumbs: [
		{ title: menu[sections.settings].title }
	],
	mixins: [
		breadcrumbs
	],
	computed: {
		sectionMenu() {
			const actions = menu[sections.settings].actions
			const arr = []

			Object.entries(actions).forEach(([key, obj]) => {
				if (obj.tag === 'page') {
					arr.push({ label: obj.title, name: key })
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
