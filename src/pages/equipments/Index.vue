<template>
	<template-list>
		<template slot="left-column">
			<table-component
				slot="left-column"
				v-scroll="onScroll"
				:columns="filterColumns"
				:list="equipments"
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
	</template-list>
</template>

<script>
import TemplateList from '@/components/template/List'
import scrollTableMixin from '@/mixins/scrollTable'
import EquipmentClass from '@/classes/Equipment'
import StorageData from '@/classes/StorageData'
import TableComponent from '@/components/Table'
import breadcrumbs from '@/mixins/breadcrumbs'
import sections from '@/data/sections'
import { mapGetters } from 'vuex'
import menu from '@/data/menu'

export default {
	name: 'Requests',
	breadcrumbs: [
		{ title: menu[sections.equipments].title }
	],
	components: {
		TableComponent, TemplateList
	},
	mixins: [
		scrollTableMixin, breadcrumbs
	],
	data() {
		return {
			sectionName: sections.equipments,
			columns: [],
			loadingType: 'rows',
			fixed: null,
			search: '',
			sort: {}
		}
	},
	computed: {
		...mapGetters({
			'userColumns': 'equipments/columns'
		}),
		list() {
			return this.$store.state.equipments.list
		},
		equipments() {
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
			return this.$store.state.equipments.loading
		},
		activeColumnProps() {
			return this.filterColumns
				.filter(c => !c.disableSearch)
				.map(c => c.prop)
		}
	},
	watch: {
		userColumns: {
			handler(arr) {
				this.columns = arr
			},
			immediate: true
		}
	},
	mounted() {
		this.fetchList()
	},
	methods: {
		fetchList(page = 1) {
			this.loadingType = page === 1 && this.equipments.length ? 'directive' : 'rows'

			if (this.loadingType === 'directive') {
				this.$refs.buttons.scrollTop()
			}

			this.$store.dispatch('equipments/fetchList', {
				page,
				sortColumn: this.sort.column,
				sortOrder: this.sort.order,
				columns: this.activeColumnProps,
				search: this.search || null
			})
		},
		onChangeColumn() {
			StorageData.columnEquipments = this.filterColumns.map(i => i.prop)
		},
		onScroll() {
			if (!this.loading && this.list.current_page < this.list.last_page) {
				this.fetchList(this.list.current_page + 1)
			}
		},
		onRowClick(equipment) {
			if (equipment.disable) {
				return
			}

			EquipmentClass.sidebar().add(equipment)
			this.$router.push({ name: `${sections.equipments}-id`, params: { id: equipment.id } })
		},
		onSortChange({ prop: column, order }) {
			this.sort = { column, order }
			this.fetchList()
		}
	}
}
</script>
