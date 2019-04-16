<template>
	<basic-edit
		:title="userObj.fullName"
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
import User from '@/classes/User'

export default {
	components: {
		BasicEdit, GenerateForm
	},
	inheritAttrs: false,
	props: {
		user: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			loading: false,
			form: {
				first_name: {
					component: 'el-input',
					value: this.user.first_name,
					label: 'Ім\'я',
					rules: required,
					attrs: {
						placeholder: 'Ім\'я'
					}
				},
				middle_name: {
					component: 'el-input',
					value: this.user.middle_name,
					label: 'По-батькові',
					attrs: {
						placeholder: 'По-батькові'
					}
				},
				last_name: {
					component: 'el-input',
					value: this.user.last_name,
					label: 'Прізвище',
					rules: required,
					attrs: {
						placeholder: 'Прізвище'
					}
				},
				phone: {
					component: 'el-input',
					value: this.user.phone,
					label: 'Телефон',
					attrs: {
						placeholder: 'Телефон'
					}
				},
				description: {
					component: 'el-input',
					value: this.user.description,
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
		userObj() {
			return new User(this.user)
		}
	},
	methods: {
		fetchRequest(form) {
			this.loading = true

			User.fetchEdit(this.user.id, form)
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
