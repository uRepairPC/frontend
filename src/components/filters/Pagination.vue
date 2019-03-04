<template>
	<filter-basic
		v-if="hasPagination"
		title="Дані"
		class="filter-pagination"
	>
		<el-alert
			title="Кількість даних, які є на сервері."
			type="info"
		/>
		<div class="filter-pagination__circles">
			<circle-progress
				class="left"
				:text="`${pagination.current_page} / ${pagination.last_page}`"
				sub-text="Сторінок"
				:value="100 * (pagination.current_page / pagination.last_page)"
			/>
			<circle-progress
				class="right"
				:text="textData"
				sub-text="Даних"
				:value="100 * ((pagination.current_page * pagination.per_page) / pagination.total)"
			/>
		</div>
	</filter-basic>
</template>

<script>
import CircleProgress from '@/components/CircleProgress'

export default {
	name: 'FilterPagination',
	components: {
		CircleProgress
	},
	props: {
		pagination: {
			type: Object,
			required: true
		}
	},
	computed: {
		hasPagination() {
			return !!Object.keys(this.pagination).length
		},
		textData() {
			let val = this.pagination.current_page * this.pagination.per_page

			if (val > this.pagination.total) {
				val = this.pagination.total
			}

			return `${val} / ${this.pagination.total}`
		}
	}
}
</script>

<style lang="scss" scoped>
.left {
	color: #67C23A;
}

.right {
	color: #F56C6C;
}
</style>
