<template>
	<el-table
		:data="dataList"
		:class="{ loading }"
		stripe
		v-bind="$attrs"
	>
		<el-table-column
			v-for="(column, index) in columns"
			:key="index"
			v-bind="column"
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
		}
	},
	computed: {
		dataList() {
			if (this.loading) {
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

/deep/ th .cell {
	white-space: nowrap;
}
</style>


