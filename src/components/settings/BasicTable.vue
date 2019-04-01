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
						@click="openDialog('edit', scope.row)"
					>
						Редагувати
					</el-button>
					<el-button
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
		getDate(date) {
			if (!date) {
				return null
			}

			return moment(date).format('LL')
		},
		isColumnDate(prop) {
			return COLUMNS_DATES.includes(prop)
		},
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
