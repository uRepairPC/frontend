<template>
	<template-list>
		<template slot="left-column">
			<table-component
				slot="left-column"
				:columns="filterColumns"
				:list="list"
				:loading="loading"
				@fetch="fetchList"
				@row-click="onRowClick"
				@sort-change="onSortChange"
			/>
		</template>
		<filter-core slot="right-column">
			<filter-table-buttons
				ref="buttons"
				:section="sections.requests"
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
import scrollTableMixin from '@/mixins/scrollTable'
import StorageData from '@/classes/StorageData'
import breadcrumbs from '@/mixins/breadcrumbs'
import sections from '@/data/sections'
import Request from '@/classes/Request'
import { mapGetters } from 'vuex'
import menu from '@/data/menu'

export default {
	name: 'Requests',
	breadcrumbs: [
		{ title: menu[sections.requests].title }
	],
	components: {
		FilterTableButtons: () => import('@/components/filters/TableButtons'),
		FilterPagination: () => import('@/components/filters/Pagination'),
		FilterColumns: () => import('@/components/filters/Columns'),
		FilterAction: () => import('@/components/filters/Action'),
		FilterSearch: () => import('@/components/filters/Search'),
		TemplateList: () => import('@/components/template/List'),
		FilterFixed: () => import('@/components/filters/Fixed'),
		FilterCore: () => import('@/components/filters/Core'),
		TableComponent: () => import('@/components/Table')
	},
	mixins: [
		scrollTableMixin, breadcrumbs
	],
	data() {
		return {
			sections,
			sectionName: sections.requests,
			columns: [],
			fixed: null,
			search: '',
			sort: {}
		}
	},
	computed: {
		...mapGetters({
			'requestColumns': 'requests/columns'
		}),
		list() {
			return this.$store.state.requests.list
		},
		requests() {
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
			return this.$store.state.requests.loading
		},
		activeColumnProps() {
			return this.filterColumns
				.filter(c => !c.disableSearch)
				.map(c => c.prop)
		}
	},
	watch: {
		requestColumns: {
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
			this.$store.dispatch('requests/fetchList', {
				page,
				sortColumn: this.sort.column,
				sortOrder: this.sort.order,
				columns: this.activeColumnProps,
				search: this.search || null
			})
		},
		onChangeColumn() {
			StorageData.columnRequests = this.filterColumns.map(i => i.prop)
		},
		onRowClick(request) {
			Request.sidebar().add(request)
			this.$router.push({ name: `${sections.requests}-id`, params: { id: request.id } })
		},
		onSortChange({ prop: column, order }) {
			this.sort = { column, order }
			this.fetchList()
		}
	}
}
</script>
