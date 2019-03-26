<template>
	<el-tag
		:type="color"
		:size="size"
	>
		{{ name }}
	</el-tag>
</template>

<script>
import { list } from '@/data/roles'

export default {
	props: {
		role: {
			type: String,
			required: true
		},
		size: {
			type: String,
			default: 'medium'
		}
	},
	computed: {
		name() {
			return list[this.role].name
		},
		color() {
			return list[this.role].color
		}
	}
}
</script>
