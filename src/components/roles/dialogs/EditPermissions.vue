<template>
	<basic-edit
		title="Редагування ролі"
		:loading="loading"
		v-bind="$attrs"
		v-on="listeners"
	>
		<list-checkboxes
			v-model="form.permissions"
			:permissions-grouped="role.permissions_grouped"
		/>
	</basic-edit>
</template>

<script>
import ListCheckboxes from '@/components/permissions/ListCheckboxes'
import BasicEdit from '@/components/dialogs/BasicEdit'
import GenerateForm from '@/components/GenerateForm'
import Role from '@/classes/Role'

export default {
	components: {
		BasicEdit, GenerateForm, ListCheckboxes
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
				permissions: []
			}
		}
	},
	computed: {
		listeners() {
			return {
				...this.$listeners,
				submit: this.fetchRequest
			}
		}
	},
	methods: {
		fetchRequest() {
			this.loading = true

			Role.fetchEditPermissions(this.role.id, this.form)
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
