<template>
	<el-button
		class="filter-table-top"
		size="small"
		type="primary"
		@click="onClick"
	>
		Стрибнути вгору
	</el-button>
</template>

<script>
import { TABLE_SELECTOR } from '@/mixins/scrollTable'

export default {
	name: 'FilterTableTop',
	methods: {
		onClick() {
			const el = document.querySelector(TABLE_SELECTOR)

			if (el) {
				el.scrollTop = 0
			}
		}
	}
}
</script>
