<template>
	<el-table
		v-loading="loadingDirective"
		:data="dataList"
		:class="{ loading: loadingRows }"
		stripe
		height="100%"
		v-bind="$attrs"
		v-on="$listeners"
	>
		<el-table-column
			v-for="(column, index) in columns"
			:key="index"
			v-bind="column"
			sortable="custom"
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
	</el-table>
</template>

<script>
import { COLUMNS_DATES } from '@/data/columns'
import moment from 'moment'

export default {
	props: {
		list: {
			type: Array,
			required: true
		},
		columns: {
			type: Array,
			required: true
		},
		loading: {
			type: Boolean,
			default: false
		},
		loadingType: {
			type: String,
			default: 'rows',
			validator: (val) => {
				return ~['rows', 'directive'].indexOf(val)
			}
		}
	},
	computed: {
		dataList() {
			if (this.loading && this.loadingType === 'rows') {
				return [...this.list, ...Array(10).fill({ disable: true })]
			}

			return this.list
		},
		loadingRows() {
			return this.loading && this.loadingType === 'rows'
		},
		loadingDirective() {
			return this.loading && this.loadingType === 'directive'
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
		}
	}
}
</script>

<style lang="scss" scoped>
@import "~scss/keyframes";

.loading {
	/deep/ .el-table__row {
		height: 48px;
	}
	/deep/ tbody tr:nth-last-child(-n + 10) .cell {
		width: 80%;
		height: 10px;
		margin: 0 auto;
		@include contentLoader;
	}
}

/deep/ .el-table__row {
	cursor: pointer;
}

/deep/ th .cell {
	white-space: nowrap;
}
</style>
