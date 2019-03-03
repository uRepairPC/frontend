<template>
	<div class="filter-table-top">
		<div>
			<el-button
				type="warning"
				size="small"
				@click="onUpdateClick"
			>
				Оновити дані
			</el-button>
		</div>
		<div>
			<el-button
				class="filter-table-top"
				size="small"
				type="primary"
				@click="onClick"
			>
				Стрибнути вгору
			</el-button>
		</div>
	</div>
</template>

<script>
import { TABLE_SELECTOR } from '@/mixins/scrollTable'

export default {
	name: 'FilterTableButtons',
	methods: {
		onClick() {
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
