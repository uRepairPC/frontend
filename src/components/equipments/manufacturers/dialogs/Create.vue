<template>
	<basic-create
		title="Додати виробника"
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
	</basic-create>
</template>

<script>
import EquipmentManufacturer from '@/classes/EquipmentManufacturer'
import BasicCreate from '@/components/dialogs/BasicCreate'
import GenerateForm from '@/components/GenerateForm'
import { required } from '@/data/rules'

export default {
	components: {
		BasicCreate, GenerateForm
	},
	inheritAttrs: false,
	data() {
		return {
			loading: false,
			form: {
				name: {
					component: 'el-input',
					value: '',
					label: 'Назва',
					rules: required,
					attrs: {
						placeholder: 'Назва'
					}
				},
				description: {
					component: 'el-input',
					value: '',
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
		}
	},
	methods: {
		fetchRequest(form) {
			this.loading = true

			EquipmentManufacturer.fetchStore(form)
				.then(() => {
					this.$store.dispatch('equipmentManufacturers/fetchList')
					this.$emit('create')
					this.$emit('close')
				})
				.finally(() => {
					this.loading = false
				})
		}
	}
}
</script>
