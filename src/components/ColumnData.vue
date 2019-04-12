<template>
	<div v-if="isDate">
		{{ dateValue }}
	</div>
	<div v-else-if="isBool">
		{{ this.row.value ? 'Так' : 'Ні' }}
	</div>
	<div v-else>
		<slot />
	</div>
</template>

<script>
import moment from 'moment'

export default {
	props: {
		row: {
			type: Object,
			required: true
		}
	},
	computed: {
		type() {
			if (typeof this.row.type === 'object') {
				return this.row.type.key
			}

			return this.row.type
		},
		isBool() {
			return this.type === 'bool' || this.type === 'boolean'
		},
		isDate() {
			return this.type === 'timestamp' || this.type === 'date'
		},
		dateValue() {
			let format = 'LLL'

			if (typeof this.row.type === 'object' && this.row.type.value) {
				format = this.row.type.value
			}

			return moment(this.row.value).format(format)
		}
	}
}
</script>
