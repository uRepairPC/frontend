<template>
	<el-table :data="list">
		<el-table-column
			v-for="(column, index) in columns"
			:key="index"
			:prop="column.prop"
			:label="column.label" />
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
		}
	}
	// TODO Make general?
	// TODO config to editable columns
	// column, prop, is_visible
}
</script>
