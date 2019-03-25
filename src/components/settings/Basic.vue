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
					size="small"
					type="primary"
					@click="onCreate"
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
				<template slot-scope="scope">
					<template v-if="isColumnDate(column.prop)">
						{{ getDate(scope.row[column.prop]) }}
					</template>
					<template v-else>
						{{ scope.row[column.prop] }}
					</template>
				</template>
			</el-table-column>
			<el-table-column width="200">
				<template slot-scope="scope">
					<el-button
						type="text"
						size="small"
						@click="onEdit(scope.row)"
					>
						Редагувати
					</el-button>
					<el-button
						type="text"
						size="small"
						class="danger"
						@click="onDelete(scope.row)"
					>
						Видалити
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!-- DIALOGS -->
		<component
			:is="dialog.component"
			v-model="dialog.value"
			:item="dialog.item"
		/>
	</div>
</template>

<script>
import { COLUMNS_DATES } from '@/data/columns'
import sections from '@/data/sections'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
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
		}
	},
	data() {
		return {
			dialog: {
				value: false,
				component: null,
				item: null
			}
		}
	},
	computed: {
		...mapGetters({
			menu: 'template/menu'
		}),
		title() {
			const action = this.menu[sections.settings].actions[this.$route.name]
			return action ? action.title : ''
		}
	},
	watch: {
		'dialog.value'(val) {
			if (!val) {
				this.closeDialog()
			}
		}
	},
	methods: {
		getDate(date) {
			if (!date) {
				return null
			}

			return moment(date).format('LL')
		},
		isColumnDate(prop) {
			return COLUMNS_DATES.includes(prop)
		},
		onCreate() {
			this.openDialog(this.dialogs.create)
		},
		onUpdate() {
			this.$emit('update')
		},
		onEdit(obj) {
			this.dialog.item = obj
			this.openDialog(this.dialogs.edit)
		},
		onDelete(obj) {
			this.dialog.item = obj
			this.openDialog(this.dialogs.delete)
		},
		openDialog(component) {
			if (!component) {
				return
			}

			this.dialog.component = component
			this.dialog.value = true
		},
		closeDialog() {
			this.dialog.value = false
			this.dialog.component = null
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
