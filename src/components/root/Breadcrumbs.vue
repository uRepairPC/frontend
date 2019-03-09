<template>
	<el-breadcrumb separator-class="el-icon-arrow-right">
		<el-breadcrumb-item
			v-for="(item, index) in list"
			:key="index"
			:to="item.route"
		>
			{{ getTitle(item.title) }}
		</el-breadcrumb-item>
	</el-breadcrumb>
</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			required: true
		}
	},
	methods: {
		getTitle(val) {
			return typeof val === 'function' ? val(this.$route) : val
		}
	}
}
</script>

<style lang="scss" scoped>
.el-breadcrumb {
	display: flex;
	align-items: center;
	height: 36px;
	white-space: nowrap;
}
</style>
