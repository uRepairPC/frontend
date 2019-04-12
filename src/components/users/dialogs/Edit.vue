<template>
	<basic-edit
		title="Редагування користувача"
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
				prop="first_name"
				label="Ім'я"
			>
				<el-input
					v-model="form.first_name"
					placeholder="Ім'я"
				/>
			</el-form-item>
			<el-form-item
				prop="middle_name"
				label="По-батькові"
			>
				<el-input
					v-model="form.middle_name"
					placeholder="По-батькові"
				/>
			</el-form-item>
			<el-form-item
				prop="last_name"
				label="Прізвище"
			>
				<el-input
					v-model="form.last_name"
					placeholder="Прізвище"
				/>
			</el-form-item>
			<el-form-item
				prop="phone"
				label="Телефон"
			>
				<el-input
					v-model="form.phone"
					placeholder="Телефон"
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
import BasicEdit from '@/components/dialogs/BasicEdit'
import { required } from '@/data/rules'
import User from '@/classes/User'

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
		const form = {
			first_name: this.user.first_name,
			middle_name: this.user.middle_name,
			last_name: this.user.last_name,
			description: this.user.description,
			phone: this.user.phone
		}

		return {
			form,
			loading: false,
			rules: {
				first_name: required,
				last_name: required
			}
		}
	},
	computed: {
		profile() {
			return this.$store.state.profile.user
		},
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

			User.fetchEdit(this.user.id, this.form)
				.then(() => {
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
