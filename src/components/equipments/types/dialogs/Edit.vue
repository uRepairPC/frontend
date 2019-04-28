<template>
	<basic-edit
		:title="item.name"
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
import EquipmentType from '@/classes/EquipmentType'
import { required } from '@/data/rules'

export default {
	components: {
		GenerateForm: () => import('@/components/GenerateForm'),
		BasicEdit: () => import('@/components/dialogs/BasicEdit')
	},
	inheritAttrs: false,
	props: {
		item: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			loading: false,
			form: {
				name: {
					component: 'el-input',
					value: this.item.name,
					label: 'Назва',
					rules: required,
					attrs: {
						placeholder: 'Назва'
					}
				},
				description: {
					component: 'el-input',
					value: this.item.description,
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

			EquipmentType.fetchEdit(this.item.id, form)
				.then(() => {
					this.$store.dispatch('equipmentTypes/fetchList')
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
