<template>
	<div class="users">
		<table-component
			:columns="filterColumns"
			:list="users"
			:loading="loading"
		/>
		<filter-core>
			<filter-columns :columns="columns" />
		</filter-core>
	</div>
</template>

<script>
import TableComponent from '@/components/Table'

export default {
	breadcrumbs: [
		{ title: 'Користувачі' }
	],
	components: {
		TableComponent
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
		// TODO Filter only users
		// FIXME Remove store? keep-alive
		this.$store.dispatch('users/fetchList')
	}
}
</script>

<style lang="scss" scoped>
.users {
	display: flex;
	flex-direction: row;
}
</style>
