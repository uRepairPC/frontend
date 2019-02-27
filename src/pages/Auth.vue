<template>
	<div id="auth">
		<div class="logo">
			<img
				src="../images/knteu_logo_200.png"
				alt="logo"
			>
		</div>
		<el-input
			ref="email"
			v-model="form.email"
			placeholder="Email"
		>
			<i
				slot="prepend"
				class="material-icons">
				email
			</i>
		</el-input>
		<el-input
			v-model="form.password"
			placeholder="Password"
			type="password"
		>
			<i
				slot="prepend"
				class="material-icons">
				lock
			</i>
		</el-input>
		<el-button
			type="primary"
			:loading="loading"
			@click="onClick"
		>
			Login
		</el-button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			form: {
				email: 'admin@example.com',
				password: 'admin123'
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
		onClick() {
			this.$store.dispatch('profile/auth', this.form)
		}
	}
}
</script>

<style lang="scss" scoped>
#auth {
	max-width: 500px;
	margin: 50px auto;
	padding: 40px;
	background: #fff;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 2px 1px -1px rgba(0, 0, 0, .12)
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
