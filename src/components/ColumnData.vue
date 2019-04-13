<template>
	<div v-if="isDate">
		{{ dateValue }}
	</div>
	<div v-else-if="isBool">
		{{ column.value ? 'Так' : 'Ні' }}
	</div>
	<div v-else>
		<slot />
	</div>
</template>

<script>
import { isObject } from '@/scripts/helpers'
import moment from 'moment'

export default {
	props: {
		column: {
			type: Object,
			required: true
		}
	},
	computed: {
		typeIsObject() {
			return isObject(this.column['value-type'])
		},
		type() {
			if (this.typeIsObject) {
				return this.column['value-type'].key
			}

			return this.column['value-type']
		},
		isBool() {
			return this.type === 'bool' || this.type === 'boolean'
		},
		isDate() {
			return this.type === 'timestamp' || this.type === 'date'
		},
		dateValue() {
			let format = 'LLL'

			if (this.typeIsObject && this.column['value-type'].value) {
				format = this.column['value-type'].value
			}

			return moment(this.column.value).format(format)
		}
	}
}
</script>
