<template>
	<div class="users">
		<users-table
			:columns="filterColumns"
			:list="users" />
		<filters :columns="columns" />
	</div>
</template>

<script>
import UsersTable from '@/components/users/Table'
import Filters from '@/components/Filters'

export default {
	breadcrumbs: [
		{ title: 'Користувачі' }
	],
	components: {
		UsersTable, Filters
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
				{ prop: 'role', label: 'Роль', model: true }, // TODO permissions
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
