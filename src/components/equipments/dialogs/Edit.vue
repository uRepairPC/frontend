<template>
	<basic-edit
		:title="equipmentObj.title"
		:loading="loading"
		v-bind="$attrs"
		v-on="listeners"
	>
		<generate-form
			ref="form"
			:form="form"
			:loading="loading"
			@submit="fetchRequest"
		/>
	</basic-edit>
</template>

<script>
import EquipmentCascader from '@/components/equipments/Cascader'
import BasicEdit from '@/components/dialogs/BasicEdit'
import GenerateForm from '@/components/GenerateForm'
import Equipment from '@/classes/Equipment'
import { required } from '@/data/rules'

export default {
	components: {
		EquipmentCascader, BasicEdit, GenerateForm
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
				equipment: {
					component: EquipmentCascader,
					value: [this.equipment.type_id, this.equipment.manufacturer_id, this.equipment.model_id],
					label: 'Тип, Виробник, Модель',
					rules: required
				},
				serial_number: {
					component: 'el-input',
					value: this.equipment.serial_number,
					label: 'Серійний номер',
					attrs: {
						placeholder: 'Серійний номер'
					}
				},
				inventory_number: {
					component: 'el-input',
					value: this.equipment.inventory_number,
					label: 'Інвертарний номер',
					attrs: {
						placeholder: 'Інвертарний номер'
					}
				},
				description: {
					component: 'el-input',
					value: this.equipment.description,
					label: 'Опис',
					attrs: {
						type: 'textarea',
						autosize: { minRows: 3 },
						placeholder: 'Опис'
					}
				}
			}
		}
	},
	computed: {
		listeners() {
			return {
				...this.$listeners,
				submit: () => {
					this.$refs.form.onSubmit()
				}
			}
		},
		equipmentObj() {
			return new Equipment(this.equipment)
		}
	},
	methods: {
		fetchRequest(form) {
			this.loading = true

			Equipment.fetchEdit(this.equipment.id, {
				...form,
				type_id: form.equipment[0] || null,
				manufacturer_id: form.equipment[1] || null,
				model_id: form.equipment[2] || null
			})
				.then(() => {
					this.$emit('edit')
					this.$emit('close')
				})
				.finally(() => {
					this.loading = false
				})
		}
	}
}
</script>
