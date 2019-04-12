<template>
	<div class="template template-one">
		<div class="template__wrap">
			<top-buttons
				v-if="buttons"
				:buttons="buttons"
				:disabled="loading"
			/>
			<div
				v-if="!!$slots.header"
				class="template-header max--width"
			>
				<slot name="header" />
			</div>
			<div
				v-if="tableData"
				v-loading="loading"
				class="template-table max--width"
			>
				<el-table
					:data="tableData"
					style="width: 100%"
				>
					<el-table-column
						prop="name"
						label="Назва"
						width="200"
					/>
					<el-table-column
						prop="value"
						label="Значення"
					>
						<template slot-scope="{ row }">
							<column-data :row="row">
								<slot
									name="table"
									:row="row"
								>
									{{ row.value }}
								</slot>
							</column-data>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<slot />
		</div>
	</div>
</template>

<script>
import { includePermission } from '@/scripts/utils'
import ColumnData from '@/components/ColumnData'
import TopButtons from '@/components/TopButtons'

export default {
	components: {
		TopButtons, ColumnData
	},
	props: {
		buttons: {
			type: Array,
			default: null
		},
		loading: {
			type: Boolean,
			default: false
		},
		tableData: {
			type: Array,
			default: null
		}
	},
	computed: {
		columns() {
			return this.tableData
				.filter(obj => includePermission(obj.permissions))
		}
	}
}
</script>

<style lang="scss" scoped>
.template-header,
.template-table {
	margin-top: 20px;
	padding: 20px;
}

.template-header {
	padding: 30px;
	text-align: center;
}

.template-table {
	margin-bottom: 30px;
	background: #fff;
	border: 1px solid #e6e6e6;
}

.max--width {
	max-width: 900px;
	margin-left: auto;
	margin-right: auto;
}
</style>
