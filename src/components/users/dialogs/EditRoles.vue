<template>
	<basic-edit
		title="Редагування ролей"
		:loading="loading"
		v-bind="$attrs"
		v-on="listeners"
	>
		<el-form
			ref="form"
			:model="form"
			status-icon
			class="form--full"
			@submit.native.prevent="onSubmit"
		>
			<el-form-item
				prop="name"
				label="Оберіть ролі"
			>
				<select-roles
					v-model="form.roles"
					:default-roles="defaultRoles"
				/>
			</el-form-item>
		</el-form>
	</basic-edit>
</template>

<script>
import BasicEdit from '@/components/dialogs/BasicEdit'
import SelectRoles from '@/components/roles/Select'
import User from '@/classes/User'

export default {
	components: {
		BasicEdit, SelectRoles
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
			defaultRoles: this.user.roles,
			form: {}
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

			User.fetchEditRoles(this.user.id, this.form)
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
