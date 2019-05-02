<template>
	<el-form
		ref="form"
		:model="form"
		class="form--full"
		status-icon
		@submit.native.prevent="onSubmit"
	>
		<el-form-item
			v-for="(item, key) in formFilterHide"
			:key="key"
			:prop="`${key}.value`"
			:rules="item.rules"
			:label="item.label"
		>
			<component
				:is="item.component"
				v-model="item.value"
				v-bind="item.attrs"
				v-on="item.events"
			/>
		</el-form-item>
		<slot />
		<div
			v-if="hasBtn"
			class="wrap-btn"
		>
			<el-button
				native-type="submit"
				type="primary"
				:loading="loading"
				:disabled="loading"
			>
				<slot name="button" />
			</el-button>
		</div>
		<button
			v-else
			class="hide"
			type="submit"
		/>
	</el-form>
</template>

<script>
export default {
	inheritAttrs: false,
	props: {
		/**
		 * @example {
		 *   name: {
		 *     component: 'el-input',
		 *     value: '', // v-model
		 *     hide: false, // hide this properties from loop
		 *     label: 'Label', // <el-form-item />
		 *     rules: { ... }, // <el-form-item />
		 *     attrs: { ... }, // v-bind to component
		 *     events: { ... } // v-on to component
		 *   },
		 *   ...
		 * }
		 */
		form: {
			type: Object,
			required: true
		},
		loading: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		hasBtn() {
			return !!this.$slots.button
		},
		formFilterHide() {
			const result = {}

			Object.entries(this.form).forEach(([key, obj]) => {
				if (!obj.hide) {
					result[key] = obj
				}
			})

			return result
		}
	},
	methods: {
		onSubmit() {
			if (this.loading) {
				return
			}

			this.$refs.form.validate((valid) => {
				if (!valid) {
					this.$emit('failed')
					return
				}

				this.$emit('submit', this.getValues())
			})
		},
		getValues() {
			const result = {}

			Object.entries(this.form).forEach(([key, obj]) => {
				result[key] = obj.value
			})

			return result
		}
	}
}
</script>

<style lang="scss" scoped>
.wrap-btn {
	text-align: center;
	button {
		max-width: 200px;
		width: 100%;
	}
}

/deep/ .el-form-item__content {
	line-height: inherit;
}
</style>
