<template>
	<basic-edit
		title="Редагування ролей"
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
import SelectRoles from '@/components/roles/Select'
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
				roles: {
					component: SelectRoles,
					value: [],
					label: 'Оберіть ролі (введіть текст для отримання списку)',
					attrs: {
						defaultRoles: this.user.roles
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

			User.fetchEditRoles(this.user.id, form)
				.then(() => {
					this.$emit('edit-roles')
					this.$emit('close')
				})
				.finally(() => {
					this.loading = false
				})
		}
	}
}
</script>
