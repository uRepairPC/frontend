<template>
	<el-dialog
		title="Редагування пароля"
		:visible="value"
		class="dialog--default"
		v-on="listeners"
	>
		<div class="content">
			<el-form
				v-if="profile.id === user.id"
				ref="form"
				:model="form"
				:rules="rules"
				status-icon
				@submit.native.prevent="onSubmit"
			>
				<el-form-item prop="password">
					<el-input
						v-model="form.password"
						type="password"
						placeholder="Пароль"
					>
						<i
							slot="prepend"
							class="material-icons"
						>
							lock
						</i>
					</el-input>
				</el-form-item>
				<el-form-item prop="repeat_password">
					<el-input
						v-model="form.repeat_password"
						type="password"
						placeholder="Повторити пароль"
					>
						<i
							slot="prepend"
							class="material-icons"
						>
							repeat
						</i>
					</el-input>
				</el-form-item>
			</el-form>
			<template v-else>
				Ви дійсно хочете згенерувати новий пароль і відправити його на пошту користувача?
			</template>
		</div>
		<span slot="footer">
			<el-button @click="close">Відмінити</el-button>
			<el-button
				type="danger"
				:loading="loading"
				:disabled="loading || !passwordEqual"
				@click="onSubmit"
			>
				Скинути пароль
			</el-button>
		</span>
	</el-dialog>
</template>

<script>
import * as rules from '@/data/rules'

export default {
	inheritAttrs: false,
	props: {
		value: {
			type: Boolean,
			default: false
		},
		user: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			loading: false,
			form: {
				password: '',
				repeat_password: ''
			},
			rules: {
				password: rules.password,
				repeat_password: rules.password
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
				'update:visible': this.close
			}
		},
		passwordEqual() {
			return this.form.password === this.form.repeat_password
		}
	},
	methods: {
		fetchRequest() {
			this.loading = true

			this.$axios.post(`users/${this.user.id}/password`, this.form)
				.then(() => {
					this.loading = false
					this.close()
				})
				.catch(() => {
					this.loading = false
				})
		},
		onSubmit() {
			if (this.profile.id === this.user.id) {
				if (!this.passwordEqual) {
					return
				}

				this.$refs.form.validate((valid) => {
					if (!valid) {
						return
					}

					this.fetchRequest()
				})
			} else {
				this.fetchRequest()
			}
		},
		close() {
			this.$emit('input', false)
		}
	}
}
</script>
