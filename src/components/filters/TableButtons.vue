<template>
	<div class="filter filter-table-buttons">
		<el-button
			size="small"
			icon="el-icon-refresh"
			type="success"
			circle
			@click="onUpdateClick"
		/>
		<el-button
			size="small"
			icon="el-icon-arrow-up"
			type="info"
			circle
			@click="scrollTop"
		/>
	</div>
</template>

<script>
import { TABLE_SELECTOR } from '@/mixins/scrollTable'

export default {
	name: 'FilterTableButtons',
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
