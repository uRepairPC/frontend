<template>
	<basic-edit
		title="Редагування ролі"
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
import BasicEdit from '@/components/dialogs/BasicEdit'
import GenerateForm from '@/components/GenerateForm'
import { required } from '@/data/rules'
import Role from '@/classes/Role'

export default {
	components: {
		BasicEdit, GenerateForm
	},
	inheritAttrs: false,
	props: {
		role: {
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
					value: this.role.name,
					label: 'Ім\'я',
					rules: required,
					attrs: {
						placeholder: 'Ім\'я'
					}
				},
				display_name: {
					component: 'el-input',
					value: this.role.display_name,
					label: 'Відображуване ім\'я',
					rules: required,
					attrs: {
						placeholder: 'Відображуване ім\'я'
					}
				},
				color: {
					component: 'el-color-picker',
					value: this.role.color,
					label: 'Колір'
				},
				default: {
					component: 'el-checkbox',
					value: this.role.default,
					attrs: {
						label: 'За замовчуванням'
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

			Role.fetchEdit(this.role.id, form)
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
