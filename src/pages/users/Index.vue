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
			<!--
				TODO Filter Configuration
				Example: Size table
								 Fixed orw
			-->
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
			columns: columnsUsers(),
			loadingType: 'rows',
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
			return this.columns.filter(c => !!c.model)
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
		onRowClick(obj) {
			this.$store.commit('template/ADD_SIDEBAR_USER', obj)
			this.$router.push({ name: 'users-id', params: { id: obj.id } })
		},
		onSortChange({ prop: column, order }) {
			this.sort = { column, order }
			this.fetchList()
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
