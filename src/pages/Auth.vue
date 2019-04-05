<template>
	<div id="auth">
		<div class="logo">
			<img
				v-if="settings.logo_auth"
				:src="logo"
				alt="logo"
			/>
			<span
				v-else
				class="title"
			>
				{{ settings.app_name }}
			</span>
		</div>
		<el-form
			ref="form"
			:model="form"
			:rules="rules"
			status-icon
			@submit.native.prevent="onSubmit"
		>
			<el-form-item prop="email">
				<el-input
					ref="email"
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
import { isProd, server } from '@/data/env'
import * as rules from '@/data/rules'

export default {
	data() {
		return {
			form: {
				email: isProd ? '' : 'admin@example.com',
				password: isProd ? '' : 'admin123'
			},
			rules: {
				email: rules.email,
				password: rules.password
			}
		}
	},
	computed: {
		settings() {
			return this.$store.state.template.settings
		},
		logo() {
			return server + this.settings.logo_auth
		},
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
		max-width: 250px;
		max-height: 200px;
	}
	.title {
		display: block;
		font-weight: bold;
		font-size: 1.5rem;
		margin: 30px 0 70px;
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
