<template>
	<filter-basic
		title="Колонки"
		class="filter-columns"
	>
		<el-checkbox-group
			v-for="(column, index) in columns"
			:key="index"
			:value="listSelected"
		>
			<el-checkbox
				:label="column.label"
				@change="onChange(column, $event)"
			/>
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
			this.$emit('change', column, toggle)
		}
	}
}
</script>
