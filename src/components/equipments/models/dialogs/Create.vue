<template>
	<basic-create
		title="Додати модель обладнання"
		:loading="loading"
		v-bind="$attrs"
		v-on="listeners"
	>
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
	</basic-create>
</template>

<script>
import ManufacturerSelect from '@/components/equipments/manufacturers/Select'
import TypeSelect from '@/components/equipments/types/Select'
import EquipmentModelClass from '@/classes/EquipmentModel'
import BasicCreate from '@/components/dialogs/BasicCreate'
import { required } from '@/data/rules'

export default {
	components: {
		TypeSelect, ManufacturerSelect, BasicCreate
	},
	inheritAttrs: false,
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
				submit: this.onSubmit
			}
		}
	},
	methods: {
		fetchRequest() {
			this.loading = true

			EquipmentModelClass.fetchStore(this.form)
				.then(() => {
					this.$store.dispatch('equipmentModels/fetchList')
					this.$emit('create')
					this.$emit('close')
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
		}
	}
}
</script>
