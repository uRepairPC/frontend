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
					@click="onAdd"
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
			/>
			<el-table-column width="200">
				<template slot-scope="scope">
					<el-button
						type="text"
						size="small"
						@click="onEdit(scope.$index, scope.row)"
					>
						Редагувати
					</el-button>
					<el-button
						type="text"
						size="small"
						class="danger"
						@click="onDelete(scope.$index, scope.row)"
					>
						Видалити
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
import sections from '@/data/sections'
import { mapGetters } from 'vuex'

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
	methods: {
		onAdd() {
			this.$emit('add')
		},
		onUpdate() {
			this.$emit('update')
		},
		onEdit(index, obj) {
			this.$emit('edit', obj, index)
		},
		onDelete(index, obj) {
			this.$emit('delete', obj, index)
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
