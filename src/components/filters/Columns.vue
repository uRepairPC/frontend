<template>
	<filter-basic
		title="Колонки"
		class="filter-columns">
		<el-checkbox-group
			:value="listSelected"
			v-for="(column, index) in columns"
			:key="index">
			<el-checkbox
				:label="column.label"
				border
				size="small"
				@change="onChange(column, $event)" />
		</el-checkbox-group>
	</filter-basic>
</template>

<script>
import FilterBasic from './Basic'

export default {
	name: 'FilterColumns',
	components: {
		FilterBasic
	},
	props: {
		columns: {
			type: Array,
			default: () => []
		}
	},
	computed: {
		listSelected() {
			return this.columns
				.filter(c => !!c.model)
				.map(c => c.label)
		}
	},
	methods: {
		onChange(column, toggle) {
			this.$set(column, 'model', toggle)
		}
	}
}
</script>
