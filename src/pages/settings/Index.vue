<template>
	<el-tabs
		:value="routeName"
		type="border-card"
		@tab-click="onTabClick"
	>
		<el-tab-pane
			v-for="(tab, index) in tabs"
			:key="index"
			:label="tab.label"
			:name="`${sections.settings}-${tab.name}`"
		>
			<router-view />
		</el-tab-pane>
	</el-tabs>
</template>

<script>
import ManufacturersItem from '@/components/settings/Manufacturers'
import sections from '@/data/sections'

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
			sections,
			tabs: [
				{ label: 'Виробники обладнання', name: 'manufacturers' },
				{ label: 'Моделі обладнання', name: 'models' },
				{ label: 'Типи обладнання', name: 'types' }
			]
		}
	},
	computed: {
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
