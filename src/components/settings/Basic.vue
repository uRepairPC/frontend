<template>
	<div>
		<div class="header">
			<div class="title">{{ title }}</div>
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
			<el-table-column
				fixed="right"
				width="120">
				<template slot-scope="scope">
					<el-button
						type="text"
						size="small"
						@click="onEdit"
					>
						Редагувати
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
import { listMenu } from '@/data/template'
import sections from '@/data/sections'

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
		title() {
			const action = listMenu[sections.settings].actions[this.$route.name]
			return action ? action.text : ''
		}
	},
	methods: {
		onAdd() {
			this.$emit('add')
		},
		onUpdate() {
			this.$emit('update')
		},
		onEdit() {
			this.$emit('edit')
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
