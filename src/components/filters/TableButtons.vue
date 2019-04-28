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
		<el-button
			size="small"
			icon="el-icon-arrow-up"
			type="info"
			circle
			class="top"
			@click="scrollTop"
		/>
	</filter-basic>
</template>

<script>
import { TABLE_SELECTOR } from '@/mixins/scrollTable'
import menu from '@/data/menu'

export default {
	name: 'FilterTableButtons',
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
		scrollTop() {
			const el = document.querySelector(TABLE_SELECTOR)

			if (el) {
				el.scrollTop = 0
			}
		},
		onUpdateClick() {
			this.$emit('update')
		}
	}
}
</script>
