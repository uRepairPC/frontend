<template>
	<div class="top-buttons">
		<el-button
			v-for="(btn, index) in buttons"
			:key="index"
			v-if="typeof btn.show === 'undefined' || btn.show"
			size="small"
			:disabled="btn.disabled"
			:loading="btn.loading"
			:type="btn.type"
			plain
			@click="btn.action"
		>
			{{ btn.text }}
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
