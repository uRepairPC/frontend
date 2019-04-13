<template>
	<template-list>
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
			>
				<template slot-scope="{ column, row }">
					<template v-if="column.prop === 'roles'">
						<role-tag
							v-for="(role, index) in row"
							:key="index"
							:role="role"
						/>
					</template>
					<template v-else>
						{{ row }}
					</template>
				</template>
			</table-component>
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
import StorageData from '@/classes/StorageData'
import TableComponent from '@/components/Table'
import breadcrumbs from '@/mixins/breadcrumbs'
import RoleTag from '@/components/roles/Tag'
import sections from '@/data/sections'
import User from '@/classes/User'
import { mapGetters } from 'vuex'
import menu from '@/data/menu'

export default {
	name: 'Users',
	breadcrumbs: [
		{ title: menu[sections.users].title }
	],
	components: {
		TableComponent, TemplateList, RoleTag
	},
	mixins: [
		scrollTableMixin, breadcrumbs
	],
	data() {
		return {
			sectionName: sections.users,
			columns: [],
			loadingType: 'rows',
			fixed: null,
			search: '',
			sort: {}
		}
	},
	computed: {
		...mapGetters({
			'userColumns': 'users/columns'
		}),
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
			return this.filterColumns
				.filter(c => !c.disableSearch)
				.map(c => c.prop)
		}
	},
	watch: {
		userColumns: {
			handler(arr) {
				this.columns = arr
					.filter(obj => obj.prop !== 'description')
			},
			immediate: true
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
			StorageData.columnUsers = this.filterColumns.map(i => i.prop)
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

			User.sidebar().add(user)
			this.$router.push({ name: `${sections.users}-id`, params: { id: user.id } })
		},
		onSortChange({ prop: column, order }) {
			this.sort = { column, order }
			this.fetchList()
		}
	}
}
</script>
