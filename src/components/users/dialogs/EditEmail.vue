<template>
	<basic-edit
		title="Редагування E-mail"
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
			<el-form-item prop="email">
				<el-input
					v-model="form.email"
					placeholder="E-mail"
				>
					<i
						slot="prepend"
						class="material-icons"
					>
						email
					</i>
				</el-input>
			</el-form-item>
		</el-form>
	</basic-edit>
</template>

<script>
import BasicEdit from '@/components/dialogs/BasicEdit'
import UserClass from '@/classes/User'
import * as rules from '@/data/rules'

export default {
	components: {
		BasicEdit
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
				email: ''
			},
			rules: {
				email: rules.email
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

			UserClass.fetchEditEmail(this.user.id, this.form)
				.then(() => {
					this.$emit('edit-email')
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
