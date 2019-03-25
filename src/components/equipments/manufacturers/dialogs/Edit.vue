<template>
	<el-dialog
		:title="item.name"
		:visible="value"
		class="dialog--default"
		v-on="listeners"
	>
		<div class="content">
			<el-form
				ref="form"
				:model="form"
				:rules="rules"
				status-icon
				@submit.native.prevent="onSubmit"
			>
				<el-form-item
					prop="name"
					label="Назва"
				>
					<el-input
						v-model="form.name"
						placeholder="Назва"
					/>
				</el-form-item>
				<el-form-item
					prop="description"
					label="Опис"
				>
					<el-input
						v-model="form.description"
						type="textarea"
						:autosize="{ minRows: 3 }"
						placeholder="Опис"
					/>
				</el-form-item>
			</el-form>
		</div>
		<span slot="footer">
			<el-button @click="close">Закрити</el-button>
			<el-button
				type="primary"
				:loading="loading"
				:disabled="loading"
				@click="onSubmit"
			>
				Додати
			</el-button>
		</span>
	</el-dialog>
</template>

<script>
import { required } from '@/data/rules'

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
			form: {
				name: this.item.name,
				description: this.item.description
			},
			rules: {
				name: required
			}
		}
	},
	computed: {
		listeners() {
			return {
				...this.$listeners,
				'update:visible': this.close
			}
		}
	},
	methods: {
		fetchRequest() {
			this.loading = true

			this.$axios.put(`equipments/manufacturers/${this.item.id}`, this.form)
				.then(() => {
					this.$store.dispatch('equipmentManufacturers/fetchList')
					this.loading = false
					this.close()
				})
				.catch(() => {
					this.loading = false
				})
		},
		onSubmit() {
			this.$refs.form.validate((valid) => {
				if (!valid) {
					return
				}

				this.fetchRequest()
			})
		},
		close() {
			this.$emit('input', false)
		}
	}
}
</script>
