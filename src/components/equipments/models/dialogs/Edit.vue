<template>
	<basic-edit
		:title="item.name"
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
				<type-select
					v-model="form.type_id"
				/>
			</el-form-item>
			<el-form-item
				prop="manufacturer_id"
				label="Виробник обладнання"
			>
				<manufacturer-select
					v-model="form.manufacturer_id"
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
import ManufacturerSelect from '@/components/equipments/manufacturers/Select'
import TypeSelect from '@/components/equipments/types/Select'
import BasicEdit from '@/components/dialogs/BasicEdit'
import EquipmentModel from '@/classes/EquipmentModel'
import { required } from '@/data/rules'

export default {
	components: {
		TypeSelect, ManufacturerSelect, BasicEdit
	},
	inheritAttrs: false,
	props: {
		item: {
			type: Object,
			required: true
		}
	},
	data() {
		const form = {}

		Object.entries(this.item).forEach(([key, val]) => {
			form[key] = val
		})

		return {
			loading: false,
			form,
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

			EquipmentModel.fetchEdit(this.item.id, this.form)
				.then(() => {
					this.$store.dispatch('equipmentModels/fetchList')
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
