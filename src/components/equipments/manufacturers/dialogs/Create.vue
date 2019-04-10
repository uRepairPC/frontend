<template>
	<basic-create
		title="Додати виробника"
		:loading="loading"
		v-bind="$attrs"
		v-on="listeners"
	>
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
	</basic-create>
</template>

<script>
import EquipmentManufacturerClass from '@/classes/EquipmentManufacturer'
import BasicCreate from '@/components/dialogs/BasicCreate'
import { required } from '@/data/rules'

export default {
	components: {
		BasicCreate
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
				name: required
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

			EquipmentManufacturerClass.fetchStore(this.form)
				.then(() => {
					this.$store.dispatch('equipmentManufacturers/fetchList')
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
