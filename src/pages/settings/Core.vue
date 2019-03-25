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
import sections from '@/data/sections'
import { mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters({
			menu: 'template/menu'
		}),
		sectionMenu() {
			const actions = this.menu[sections.settings].children

			const arr = [
				{ label: 'Головна', name: sections.settings }
			]

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
}

/deep/ .el-tabs__nav {
	user-select: none;
}
</style>
