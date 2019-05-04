<template>
	<filter-basic
		title="Основні дії"
		class="filter-table-buttons"
	>
		<el-button
			size="small"
			icon="el-icon-refresh"
			type="success"
			circle
			@click="onUpdateClick"
		/>
		<el-button
			v-if="actionAdd"
			size="small"
			icon="el-icon-plus"
			type="primary"
			circle
			@click="actionAdd.action"
		/>
	</filter-basic>
</template>

<script>
import menu from '@/data/menu'

export default {
	name: 'FilterTableButtons',
	components: {
		FilterBasic: () => import('@/components/filters/Basic')
	},
	props: {
		section: {
			type: String,
			default: ''
		}
	},
	computed: {
		actionAdd() {
			if (!this.section) {
				return null
			}

			const childrenItems = menu[this.section].children || {}

			return childrenItems.add
		}
	},
	methods: {
		onUpdateClick() {
			this.$emit('update')
		}
	}
}
</script>
