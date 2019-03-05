<template>
	<div id="auth">
		<div class="logo">
			<img
				src="../images/logo.png"
				alt="logo"
			>
		</div>
		<el-form
			ref="form"
			:model="form"
			status-icon
			:rules="rules"
			@submit.native.prevent="onSubmit"
		>
			<el-form-item prop="email">
				<el-input
					ref="email"
					v-model="form.email"
					placeholder="E-mail"
					autocomplete="off"
				>
					<i
						slot="prepend"
						class="material-icons"
					>
						email
					</i>
				</el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input
					v-model="form.password"
					type="password"
					placeholder="Пароль"
					autocomplete="off"
				>
					<i
						slot="prepend"
						class="material-icons"
					>
						lock
					</i>
				</el-input>
			</el-form-item>
			<el-form-item>
				<el-button
					native-type="submit"
					type="primary"
					:loading="loading"
				>
					Увійти
				</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { isProd } from '@/data/env'

export default {
	data() {
		return {
			form: {
				email: isProd ? '' : 'admin@example.com',
				password: isProd ? '' : 'admin123'
			},
			rules: {
				// TODO Move to external scripts?
				email: [
					{ required: true, message: 'Будь ласка, введіть E-mail' },
					{ type: 'email', message: 'Введіть правильну адресу електронної пошти' }
				],
				password: [
					{ required: true, message: 'Будь ласка, введіть пароль' },
					{ min: 6, message: 'Пароль повинен бути більше, ніж 5 символів' }
				]
			}
		}
	},
	computed: {
		loading() {
			return this.$store.state.profile.loading
		}
	},
	mounted() {
		this.$refs.email.focus()
	},
	methods: {
		onSubmit() {
			this.$refs.form.validate((valid) => {
				if (!valid) {
					return
				}

				this.$store.dispatch('profile/auth', this.form)
			})
		}
	}
}
</script>

<style lang="scss" scoped>
#auth {
	width: 100%;
	max-width: 450px;
	margin: 50px auto;
	padding: 40px;
	background: #fff;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 2px 1px -1px rgba(0, 0, 0, .12);
}

.logo {
	text-align: center;
	margin-bottom: 40px;
	> img {
		max-width: 200px;
	}
}

.el-input {
	> /deep/ .el-input-group__prepend {
		padding: 0 12px;
		> i {
			display: flex;
			align-items: center;
			font-size: 18px;
		}
	}
}

.el-button {
	width: 100%;
}

@media only screen and (max-width: 600px) {
	#auth {
		max-width: none;
		padding: 20px;
	}
}
</style>
