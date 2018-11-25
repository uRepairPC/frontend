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
import axios from 'axios'

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

			axios.post('auth', this.form)
				.then(res => {
					// TODO Success && store token
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
	border: 1px solid #e7e7e7;
	padding: 40px;
	background: #fff;
	border-radius: 10px;
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
		border-radius: 0;
	}
}
</style>
