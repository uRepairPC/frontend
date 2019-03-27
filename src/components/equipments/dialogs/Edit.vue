<template>
	<el-dialog
		:title="`${equipment.serial_number} / ${equipment.inventory_number}`"
		:visible="value"
		class="dialog--default"
		v-bind="$attrs"
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
import EquipmentCascader from '@/components/equipments/Cascader'
import { required } from '@/data/rules'
import sections from '@/data/sections'

export default {
	inheritAttrs: false,
	components: {
		EquipmentCascader
	},
	props: {
		value: {
			type: Boolean,
			default: false
		},
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
				'update:visible': this.close
			}
		}
	},
	methods: {
		fetchRequest() {
			this.loading = true

			this.$axios.put(`equipments/${this.equipment.id}`, {
				...this.form,
				type_id: this.form.equipment[0] || null,
				manufacturer_id: this.form.equipment[1] || null,
				model_id: this.form.equipment[2] || null
			})
				.then(({ data }) => {
					this.$store.dispatch('template/addSidebarItem', {
						section: sections.equipments,
						data: data.equipment
					})
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
