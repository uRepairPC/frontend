<template>
	<div class="top-buttons">
		<el-button
			v-for="(btn, index) in list"
			:key="index"
			size="mini"
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
import { includePermission } from '@/scripts/utils'

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
				return includePermission(obj.permissions) && !obj.hide
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.top-buttons {
	padding: 5px;
	background: #fff;
	border-bottom: 1px solid #e6e6e6;
	> button {
		margin: 5px;
	}
}
</style>
