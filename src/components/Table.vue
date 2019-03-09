<template>
	<el-table
		v-loading="loading && loadingType === 'directive'"
		:data="dataList"
		:class="{ loading }"
		stripe
		height="calc(100vh - 96px)"
		v-bind="$attrs"
		v-on="$listeners"
	>
		<el-table-column
			v-for="(column, index) in columns"
			:key="index"
			v-bind="column"
			sortable="custom"
		/>
	</el-table>
</template>

<script>
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
				return [...this.list, ...Array(10).fill({})]
			}

			return this.list
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../styles/keyframes";

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
