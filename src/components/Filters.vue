<template>
	<div class="filters">
		<div class="filters__inner">
			<el-checkbox-group
				:value="listSelected"
				v-for="(column, index) in columns"
				:key="index"
				class="filter">
				<el-checkbox
					:label="column.label"
				  border
				  size="small"
				  @change="onChange(column, $event)" />
			</el-checkbox-group>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		columns: {
			type: Array,
			default: () => []
		}
	},
	computed: {
		listSelected() {
			return this.columns.filter(c => !!c.model).map(c => c.label)
		}
	},
	methods: {
		onChange(column, toggle) {
			this.$set(column, 'model', toggle)
		}
	}
}
</script>

<style lang="scss" scoped>
.filters {
	width: 250px;
	border-left: 1px solid #e6e6e6;
}

.filters__inner {
	position: sticky;
	top: 10px;
}

.filter {
	margin: 10px;
	.el-checkbox.is-bordered {
		display: flex;
		align-items: center;
	}
}
</style>
