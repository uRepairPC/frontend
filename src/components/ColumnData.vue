<template>
	<div v-if="isDate">
		{{ dateValue }}
	</div>
	<div v-else-if="isBool">
		{{ value ? 'Так' : 'Ні' }}
	</div>
	<div
		v-else-if="isColor"
		class="cell--color"
		:style="{ 'background-color': value }"
	/>
	<div v-else>
		<slot>
			{{ value }}
		</slot>
	</div>
</template>

<script>
import { isObject } from '@/scripts/helpers'
import dayjs from 'dayjs'

export default {
	props: {
		column: {
			type: Object,
			required: true
		},
		value: {
			type: [Array, Object, Number, String, Boolean],
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
		isColor() {
			return this.type === 'color'
		},
		dateValue() {
			let format = 'LL'

			if (this.typeIsObject && this.column.customType.value) {
				format = this.column.customType.value
			}

			return dayjs(this.value).format(format)
		}
	}
}
</script>
