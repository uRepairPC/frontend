<template>
	<el-dialog
		title="Додати модель обладнання"
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
				class="form--full"
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
					prop="type_id"
					label="Тип обладнання"
				>
					<type-select v-model="form.type_id" />
				</el-form-item>
				<el-form-item
					prop="manufacturer_id"
					label="Виробник обладнання"
				>
					<manufacturer-select v-model="form.manufacturer_id" />
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
import ManufacturerSelect from '@/components/equipments/manufacturers/Select'
import TypeSelect from '@/components/equipments/types/Select'
import { required } from '@/data/rules'

export default {
	components: {
		TypeSelect, ManufacturerSelect
	},
	inheritAttrs: false,
	props: {
		value: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			loading: false,
			form: {
				name: '',
				description: ''
			},
			rules: {
				name: required,
				type_id: required,
				manufacturer_id: required
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

			this.$axios.post('equipments/models', this.form)
				.then(() => {
					this.$store.dispatch('equipmentModels/fetchList')
					this.close()
				})
				.finally(() => {
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
