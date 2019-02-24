<template>
	<div class="users">
		<users-table
			:columns="columns"
			:list="users" />
	</div>
</template>

<script>
import UsersTable from '@/components/users/Table'

export default {
	breadcrumbs: [
		{ title: 'Користувачі' }
	],
	components: {
		UsersTable
	},
	data() {
		return {
			// TODO Send all column
			columns: [
				{ prop: 'first_name', label: 'Ім\'я' },
				{ prop: 'last_name', label: 'Прізвище' },
				{ prop: 'email', label: 'E-mail' }
			]
		}
	},
	computed: {
		users() {
			return this.$store.state.users.list.data || []
		}
	},
	mounted() {
		// TODO Filter only users
		// FIXME Remove store? keep-alive
		this.$store.dispatch('users/fetchList')
	}
}
</script>
