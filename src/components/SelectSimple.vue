<template>
	<el-select
		v-bind="$attrs"
		v-on="$listeners"
	>
		<el-option
			v-for="item in items"
			:key="item.value"
			:label="item.label"
			:value="item.value"
		/>
	</el-select>
</template>

<script>
export default {
	props: {
		items: {
			type: Array,
			default: () => []
		}
	}
}
</script>
