<template>
	<basic-edit
		:title="equipmentObj.title"
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
				prop="equipment"
				label="Тип, Виробник, Модель"
			>
				<equipment-cascader v-model="form.equipment" />
			</el-form-item>
			<el-form-item
				prop="name"
				label="Серійний номер"
			>
				<el-input
					v-model="form.serial_number"
					placeholder="Серійний номер"
				/>
			</el-form-item>
			<el-form-item
				prop="name"
				label="Інвертарний номер"
			>
				<el-input
					v-model="form.inventory_number"
					placeholder="Інвертарний номер"
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
	</basic-edit>
</template>

<script>
import EquipmentCascader from '@/components/equipments/Cascader'
import BasicEdit from '@/components/dialogs/BasicEdit'
import Equipment from '@/classes/Equipment'
import { required } from '@/data/rules'

export default {
	components: {
		EquipmentCascader, BasicEdit
	},
	inheritAttrs: false,
	props: {
		equipment: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			loading: false,
			form: {
				serial_number: this.equipment.serial_number,
				inventory_number: this.equipment.inventory_number,
				equipment: [this.equipment.type_id, this.equipment.manufacturer_id, this.equipment.model_id],
				description: this.equipment.description
			},
			rules: {
				equipment: required
			}
		}
	},
	computed: {
		listeners() {
			return {
				...this.$listeners,
				submit: this.onSubmit
			}
		},
		equipmentObj() {
			return new Equipment(this.equipment)
		}
	},
	methods: {
		fetchRequest() {
			this.loading = true

			Equipment.fetchEdit(this.equipment.id, {
				...this.form,
				type_id: this.form.equipment[0] || null,
				manufacturer_id: this.form.equipment[1] || null,
				model_id: this.form.equipment[2] || null
			})
				.then(() => {
					this.$emit('edit')
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
