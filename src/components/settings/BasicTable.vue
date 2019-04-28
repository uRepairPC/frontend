<template>
	<div>
		<div class="header">
			<div class="title">
				{{ title }}
			</div>
			<div class="actions">
				<el-button
					:loading="loading"
					:disabled="loading"
					size="small"
					@click="onUpdate"
				>
					Оновити
				</el-button>
				<el-button
					v-if="includePermission(permissionCreate)"
					size="small"
					type="primary"
					@click="openDialog('create')"
				>
					Додати
				</el-button>
			</div>
		</div>

		<el-table
			v-loading="loading"
			:data="list"
			stripe
		>
			<el-table-column
				v-for="(column, index) in columns"
				:key="index"
				v-bind="column"
			>
				<column-data
					slot-scope="{ row }"
					:column="column"
					:value="row[column.prop]"
				/>
			</el-table-column>
			<el-table-column
				v-if="includePermission([permissionEdit, permissionDelete])"
				width="200"
			>
				<template slot-scope="scope">
					<el-button
						v-if="includePermission(permissionEdit)"
						type="text"
						size="small"
						@click="openDialog('edit', scope.row)"
					>
						Редагувати
					</el-button>
					<el-button
						v-if="includePermission(permissionDelete)"
						type="text"
						size="small"
						class="danger"
						@click="openDialog('delete', scope.row)"
					>
						Видалити
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
import { includePermission } from '@/scripts/utils'
import sections from '@/data/sections'
import { mapGetters } from 'vuex'

export default {
	components: {
		ColumnData: () => import('@/components/ColumnData')
	},
	props: {
		loading: {
			type: Boolean,
			required: true
		},
		list: {
			type: Array,
			required: true
		},
		columns: {
			type: Array,
			required: true
		},
		dialogs: {
			type: Object,
			required: true
		},
		permissionCreate: {
			type: String,
			default: null
		},
		permissionEdit: {
			type: String,
			default: null
		},
		permissionDelete: {
			type: String,
			default: null
		}
	},
	computed: {
		...mapGetters({
			menu: 'template/menu'
		}),
		title() {
			const action = this.menu[sections.settings].children[this.$route.name]
			return action ? action.title : ''
		}
	},
	methods: {
		includePermission,
		openDialog(dialogProperty, item = null) {
			this.$store.commit('template/OPEN_DIALOG', {
				component: this.dialogs[dialogProperty],
				attrs: { item }
			})
		},
		onUpdate() {
			this.$emit('update')
		}
	}
}
</script>

<style lang="scss" scoped>
.header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20px;
}

.title {
	font-size: 1.2rem;
	font-weight: bold;
}

.actions {
	button {
		min-width: 120px;
	}
}
</style>
