<template>
	<div class="top-buttons">
		<el-button
			v-for="(btn, index) in list"
			:key="index"
			size="small"
			:disabled="btn.disabled"
			:loading="btn.loading"
			:type="btn.type"
			plain
			@click="btn.action"
		>
			{{ btn.title }}
		</el-button>
	</div>
</template>

<script>
export default {
	props: {
		buttons: {
			type: Array,
			required: true
		}
	},
	computed: {
		list() {
			return this.buttons.filter((obj) => {
				return typeof obj.show === 'undefined' || obj.show
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.top-buttons {
	padding: 10px;
	background: #fff;
	border-bottom: 1px solid #e6e6e6;
	> button {
		margin: 5px;
	}
}
</style>
