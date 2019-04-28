<template>
	<div class="section-menu">
		<div
			v-for="(item, index) in menu"
			:key="index"
			class="section-menu-item"
		>
			<section-menu-header :item="item" />
			<section-menu-action-list
				v-if="item.children"
				:list="item.children"
			/>
		</div>
	</div>
</template>

<script>
import SectionMenuActionList from '@/components/sections/SectionMenuActionList'
import SectionMenuHeader from '@/components/sections/SectionMenuHeader'

export default {
	components: {
		SectionMenuHeader, SectionMenuActionList
	},
	props: {
		menu: {
			type: [Array, Object],
			required: true
		}
	}
}
</script>

<style lang="scss" scoped>
.section-menu {
	display: flex;
	flex-wrap: wrap;
	user-select: none;
}

.section-menu-item {
	width: 340px;
	padding: 10px;
	margin: 10px;
}
</style>
