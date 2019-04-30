<template>
	<div>
		<template v-if="imgApi">
			<img
				v-if="value"
				:src="imgApi"
				:alt="attr"
			>
			<span v-else>-</span>
		</template>
		<template v-else-if="type === 'bool'">
			{{ value ? 'Так' : 'Ні' }}
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
				return ~['text', 'img', 'bool'].indexOf(val)
			}
		},
		attr: {
			type: String,
			required: true
		}
	},
	computed: {
		imgApi() {
			if (this.type !== 'img') {
				return null
			}

			return server + this.value
		}
	}
}
</script>
