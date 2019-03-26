<template>
	<el-dialog
		:title="title"
		:visible="value"
		class="dialog--default delete"
		v-on="listeners"
	>
		<div class="content">
			<slot name="content-top">
				<el-alert
					title="Інші дані, в яких є взязок з цим об'єктом - також видаляться!"
					description="Для підтвердження - введіть ID елемента."
					:closable="false"
					type="error"
				/>
			</slot>
			<el-input-number
				v-if="confirm"
				ref="input"
				v-model="input"
				:controls="false"
				:min="0"
			/>
			<slot name="content-bottom" />
		</div>
		<span slot="footer">
			<el-button @click="close">Відмінити</el-button>
			<el-button
				type="danger"
				:loading="loading"
				:disabled="btnDisabled"
				@click="onSubmit"
			>
				Видалити
			</el-button>
		</span>
	</el-dialog>
</template>

<script>
export default {
	inheritAttrs: false,
	props: {
		value: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: ''
		},
		confirm: {
			type: [String, Number],
			default: null
		},
		loading: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			input: ''
		}
	},
	computed: {
		listeners() {
			return {
				...this.$listeners,
				'update:visible': this.close
			}
		},
		btnDisabled() {
			if (this.loading) {
				return true
			}

			if (this.confirm) {
				return this.input !== this.confirm
			}

			return false
		}
	},
	methods: {
		onSubmit() {
			this.$emit('submit')
		},
		close() {
			this.$emit('input', false)
		}
	}
}
</script>
