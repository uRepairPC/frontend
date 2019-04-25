<template>
	<template-list>
		<template slot="left-column">
			<table-component
				slot="left-column"
				v-scroll="onScroll"
				:columns="filterColumns"
				:list="roles"
				:loading="loading"
				:loading-type="loadingType"
				@row-click="onRowClick"
				@sort-change="onSortChange"
			/>
		</template>
		<filter-core slot="right-column">
			<filter-table-buttons
				ref="buttons"
				@update="fetchList"
			/>
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
		</filter-core>
	</template-list>
</template>

<script>
import TemplateList from '@/components/template/List'
import scrollTableMixin from '@/mixins/scrollTable'
import StorageData from '@/classes/StorageData'
import TableComponent from '@/components/Table'
import breadcrumbs from '@/mixins/breadcrumbs'
import sections from '@/data/sections'
import Role from '@/classes/Role'
import { mapGetters } from 'vuex'
import menu from '@/data/menu'

export default {
	name: 'Roles',
	breadcrumbs: [
		{ title: menu[sections.roles].title }
	],
	components: {
		TableComponent, TemplateList
	},
	mixins: [
		scrollTableMixin, breadcrumbs
	],
	data() {
		return {
			sectionName: sections.roles,
			columns: [],
			loadingType: 'rows',
			fixed: null,
			search: '',
			sort: {}
		}
	},
	computed: {
		...mapGetters({
			'roleColumns': 'roles/columns'
		}),
		list() {
			return this.$store.state.roles.list
		},
		roles() {
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
			return this.$store.state.roles.loading
		},
		activeColumnProps() {
			return this.filterColumns
				.filter(c => !c.disableSearch)
				.map(c => c.prop)
		}
	},
	watch: {
		roleColumns: {
			handler(arr) {
				this.columns = arr
					.filter(obj => !obj.hideList)
			},
			immediate: true
		}
	},
	mounted() {
		this.fetchList()
	},
	methods: {
		fetchList(page = 1) {
			this.loadingType = page === 1 && this.roles.length ? 'directive' : 'rows'

			if (this.loadingType === 'directive') {
				this.$refs.buttons.scrollTop()
			}

			this.$store.dispatch('roles/fetchList', {
				page,
				sortColumn: this.sort.column,
				sortOrder: this.sort.order,
				columns: this.activeColumnProps,
				search: this.search || null
			})
		},
		onChangeColumn() {
			StorageData.columnRoles = this.filterColumns.map(i => i.prop)
		},
		onScroll() {
			if (!this.loading && this.list.current_page < this.list.last_page) {
				this.fetchList(this.list.current_page + 1)
			}
		},
		onRowClick(role) {
			if (role.disable) {
				return
			}

			Role.sidebar().add(role)
			this.$router.push({ name: `${sections.roles}-id`, params: { id: role.id } })
		},
		onSortChange({ prop: column, order }) {
			this.sort = { column, order }
			this.fetchList()
		}
	}
}
</script>
