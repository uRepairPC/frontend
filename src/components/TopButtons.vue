<template>
	<div class="top-buttons">
		<el-button
			v-for="(btn, index) in list"
			:key="index"
			size="mini"
			:disabled="btn.disabled || disabled"
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
		},
		disabled: {
			type: Boolean,
			default: false
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
@import "~scss/_colors";

.top-buttons {
	padding: 5px;
	background: #fff;
	border-bottom: 1px solid $defaultBorder;
	> button {
		margin: 5px;
	}
}
</style>
