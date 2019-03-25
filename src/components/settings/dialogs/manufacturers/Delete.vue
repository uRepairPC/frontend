<template>
	<el-dialog
		:title="item.name"
		:visible="value"
		class="dialog--default delete"
		v-on="listeners"
	>
		<div class="content">
			<div>Ви дійсно хочете <strong>видалити</strong> цього виробника?</div>
			<div>Для підтвердження - введіть ID виробника.</div>
			<el-input-number
				ref="input"
				v-model="input"
				:controls="false"
				:min="0"
			/>
		</div>
		<span slot="footer">
			<el-button @click="close">Відмінити</el-button>
			<el-button
				type="danger"
				:loading="loading"
				:disabled="btnDisabled"
				@click="fetchRequest"
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
		item: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			loading: false,
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

			return !this.input || this.input !== this.item.id
		}
	},
	methods: {
		fetchRequest() {
			this.loading = true

			this.$axios.delete(`equipments/manufacturers/${this.item.id}`)
				.then(() => {
					this.$store.dispatch('equipmentManufacturers/fetchList')
					this.loading = false
					this.close()
				})
				.catch(() => {
					this.loading = false
				})
		},
		close() {
			this.$emit('input', false)
		}
	}
}
</script>
