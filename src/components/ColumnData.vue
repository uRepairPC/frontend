<template>
	<div v-if="isDate">
		{{ dateValue }}
	</div>
	<div v-else-if="isBool">
		{{ value ? 'Так' : 'Ні' }}
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
		},
		value: {
			type: [Array, Object, Number, String],
			default: null
		}
	},
	computed: {
		typeIsObject() {
			return isObject(this.column.customType)
		},
		type() {
			if (this.typeIsObject) {
				return this.column.customType.key
			}

			return this.column.customType
		},
		isBool() {
			return this.type === 'bool' || this.type === 'boolean'
		},
		isDate() {
			return this.type === 'timestamp'
		},
		dateValue() {
			let format = 'LL'

			if (this.typeIsObject && this.column.customType.value) {
				format = this.column.customType.value
			}

			return moment(this.value).format(format)
		}
	}
}
</script>
