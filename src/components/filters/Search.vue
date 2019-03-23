<template>
	<filter-basic
		title="Пошук"
		class="filter-search"
	>
		<el-alert
			title="Пошук відбувається по всім колонках, які відображені в таблиці."
			type="info"
		/>
		<el-input
			:value="value"
			size="small"
			placeholder="Пошук по таблиці"
			clearable
			v-bind="$attrs"
			v-on="listeners"
			@keyup.enter.native="submit"
		/>
	</filter-basic>
</template>

<script>
/** @type {number} - milliseconds */
const TIMEOUT = 500

export default {
	name: 'FilterSearch',
	inheritAttrs: false,
	props: {
		value: {
			type: String,
			default: ''
		}
	},
	computed: {
		listeners() {
			return {
				...this.$listeners,
				input: (val) => {
					this.$emit('input', val)
				}
			}
		}
	},
	watch: {
		value() {
			clearTimeout(this._timeout)

			this._timeout = setTimeout(() => {
				this.$emit('submit')
			}, TIMEOUT)
		}
	},
	methods: {
		submit() {
			clearTimeout(this._timeout)
			this.$emit('submit')
		}
	}
}
</script>
