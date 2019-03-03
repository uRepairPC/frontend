<template>
	<template-page>
		<template slot="left-column">
			<table-component
				slot="left-column"
				:columns="filterColumns"
				:list="users"
				:loading="loading"
				height="calc(100vh - 96px)"
			/>
		</template>
		<filter-core slot="right-column">
			<filter-search />
			<filter-columns :columns="columns" />
		</filter-core>
	</template-page>
</template>

<script>
import TemplatePage from '@/components/template/Page'
import TableComponent from '@/components/Table'

export default {
	breadcrumbs: [
		{ title: 'Користувачі' }
	],
	components: {
		TableComponent, TemplatePage
	},
	data() {
		return {
			columns: [
				{ prop: 'id', label: 'ID', model: false },
				{ prop: 'first_name', label: 'Ім\'я', model: true },
				{ prop: 'middle_name', label: 'По-батькові', model: false },
				{ prop: 'last_name', label: 'Прізвище', model: false },
				{ prop: 'email', label: 'E-mail', model: true },
				{ prop: 'phone', label: 'Телефон', model: true },
				{ prop: 'updated_at', label: 'Оновлено', model: false },
				{ prop: 'created_at', label: 'Створений', model: false }
			]
		}
	},
	computed: {
		users() {
			return this.$store.state.users.list.data || []
		},
		filterColumns() {
			return this.columns.filter(c => !!c.model)
		},
		loading() {
			return this.$store.state.users.loading
		}
	},
	mounted() {
		this.$store.dispatch('users/fetchList')
	}
}
</script>

<style lang="scss" scoped>
.users {
	display: flex;
	flex-direction: row;
}

.table--overflow {
	flex: 1 1 auto;
	height: calc(100vh - 96px);
	overflow: auto;
}
</style>
