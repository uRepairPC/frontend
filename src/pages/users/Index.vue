<template>
	<template-page>
		<template slot="left-column">
			<table-component
				slot="left-column"
				v-scroll="onScroll"
				:columns="filterColumns"
				:list="users"
				:loading="loading"
				:loading-type="loadingType"
				@row-click="onRowClick"
				@sort-change="onSortChange"
			/>
		</template>
		<filter-core slot="right-column">
			<filter-action
				:section="sectionName"
			/>
			<filter-search
				v-model="search"
				@submit="fetchList"
			/>
			<filter-pagination
				:pagination="list"
			/>
			<filter-columns
				:columns="columns"
				@change="onChangeColumn"
			/>
			<filter-fixed
				v-model="fixed"
				:columns="columns"
			/>
			<filter-table-buttons
				ref="buttons"
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
import sections from '@/data/sections'

export default {
	name: 'Users',
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
			sectionName: sections.users,
			columns: columnsUsers(),
			loadingType: 'rows',
			fixed: null,
			search: '',
			sort: {}
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
			const columns = []

			for (const column of this.columns) {
				if (column.model) {
					columns.push({ ...column, fixed: this.fixed === column.prop })
				}
			}

			return columns
		},
		loading() {
			return this.$store.state.users.loading
		},
		activeColumnProps() {
			return this.filterColumns.map(c => c.prop)
		}
	},
	mounted() {
		this.fetchList()
	},
	methods: {
		fetchList(page = 1) {
			this.loadingType = page === 1 && this.users.length ? 'directive' : 'rows'

			if (this.loadingType === 'directive') {
				this.$refs.buttons.scrollTop()
			}

			this.$store.dispatch('users/fetchList', {
				page,
				sortColumn: this.sort.column,
				sortOrder: this.sort.order,
				columns: this.activeColumnProps,
				search: this.search || null
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
		onRowClick(user) {
			if (user.disable) {
				return
			}

			this.$store.dispatch('template/addSidebarItem', {
				section: sections.users,
				data: user
			})
			this.$router.push({ name: 'users-id', params: { id: user.id } })
		},
		onSortChange({ prop: column, order }) {
			this.sort = { column, order }
			this.fetchList()
		}
	}
}
</script>
