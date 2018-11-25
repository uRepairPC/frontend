<template>
	<div id="auth">
		<div class="logo">
			<img src="https://stat.knteu.kiev.ua/img/pre-style/knteu_logo_200.png" alt="logo" />
		</div>
		<el-input placeholder="Login" v-model="form.login" ref="login">
			<template slot="prepend"><i class="material-icons">face</i></template>
		</el-input>
		<el-input placeholder="Password" v-model="form.password" type="password">
			<template slot="prepend"><i class="material-icons">lock</i></template>
		</el-input>
		<el-button type="primary" :loading="loading" @click="onClick">Login</el-button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			loading: false,
			form: {
				login: 'admin',
				password: 'admin123'
			}
		}
	},
	mounted() {
		this.$refs.login.focus()
	},
	methods: {
		onClick() {
			this.loading = true

			this.$axios.post('auth', this.form)
				.then(res => {
					if (res.data && res.data.success) {
						localStorage.setItem('user', JSON.stringify(res.data.user))
						this.$store.commit('SET_USER', res.data.user)
						this.$router.push({ name: 'dashboard' })
					}

					// TODO Connect to websocket

					this.loading = false
				})
				.catch(() => {
					this.loading = false
				})
		}
	}
}
</script>

<style lang="scss" scoped>
#auth {
	max-width: 400px;
	margin: 0 auto;
	padding: 40px;
	background: #fff;
	box-shadow: 0 1px 3px 0 rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12)
}

.logo {
	text-align: center;
	margin-bottom: 40px;
	> img {
		max-width: 200px;
	}
}

.el-input {
	margin-bottom: 20px;
	> /deep/ .el-input-group__prepend {
		padding: 0 15px;
		> i {
			display: flex;
			align-items: center;
			font-size: 20px;
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
