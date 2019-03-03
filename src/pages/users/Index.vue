<template>
	<template-page>
		<template slot="left-column">
			<table-component
				slot="left-column"
				v-scroll="onScroll"
				:columns="filterColumns"
				:list="users"
				:loading="loading"
				height="calc(100vh - 96px)"
				@row-click="onRowClick"
			/>
		</template>
		<filter-core slot="right-column">
			<filter-search />
			<filter-pagination :pagination="list" />
			<filter-columns
				:columns="columns"
				@change="onChangeColumn"
			/>
			<filter-table-buttons
				slot="bottom"
				@update="fetchList"
			/>
		</filter-core>
	</template-page>
</template>

<script>
import { users as columnsUsers } from '@/data/columns'
import TemplatePage from '@/components/template/Page'
import scrollTableMixin from '@/mixins/scrollTable'
import { setColumnUsers } from '@/data/storage'
import TableComponent from '@/components/Table'

export default {
	breadcrumbs: [
		{ title: 'Користувачі' }
	],
	components: {
		TableComponent, TemplatePage
	},
	mixins: [
		scrollTableMixin
	],
	data() {
		return {
			columns: columnsUsers()
		}
	},
	computed: {
		list() {
			return this.$store.state.users.list
		},
		users() {
			return this.list.data || []
		},
		filterColumns() {
			return this.columns.filter(c => !!c.model)
		},
		loading() {
			return this.$store.state.users.loading
		}
	},
	mounted() {
		this.fetchList()
	},
	methods: {
		fetchList(page = 1) {
			// TODO Filters
			this.$store.dispatch('users/fetchList', {
				page
			})
		},
		onChangeColumn() {
			setColumnUsers(this.filterColumns.map(i => i.prop))
		},
		onScroll() {
			if (!this.loading && this.list.current_page < this.list.last_page) {
				this.fetchList(this.list.current_page + 1)
			}
		},
		onRowClick(obj) {
			this.$router.push({ name: 'user', params: { id: obj.id } })
		}
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
