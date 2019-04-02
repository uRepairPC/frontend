<template>
	<el-dialog
		class="dialog--default delete"
		v-bind="$attrs"
		v-on="$listeners"
	>
		<div class="content">
			<slot name="content-top" />
			<slot name="content-alert">
				<el-alert
					title="Ви дійсно хочете видалити ці дані?"
					:description="confirm ? 'Для підтвердження - введіть ID елемента.' : ''"
					:closable="false"
					type="error"
				/>
			</slot>
			<slot name="content-after-alert" />
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
	data() {
		return {
			input: ''
		}
	},
	computed: {
		confirm() {
			return this.$attrs.confirm
		},
		loading() {
			return this.$attrs.loading
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
			this.$emit('close')
		}
	}
}
</script>

<style lang="scss" scoped>
.el-input-number {
	display: block;
}
</style>
