<template>
	<div>
		<template v-if="type === 'img'">
			<img
				v-if="value"
				:src="server + value"
				:alt="attr"
			>
			<span v-else>-</span>
		</template>
		<template v-else>
			{{ value }}
		</template>
	</div>
</template>

<script>
import { server } from '@/data/env'

export default {
	props: {
		value: {
			type: [String, Number],
			default: ''
		},
		type: {
			type: String,
			required: true,
			validator: (val) => {
				return ~['text', 'img'].indexOf(val)
			}
		},
		attr: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			server
		}
	}
}
</script>
