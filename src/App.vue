<template>
	<div id="app">
		<RouterView />
	</div>
</template>

<script>
export default {
	computed: {
		isLogin() {
			return this.$store.state.profile.isLogin
		}
	},
	watch: {
    isLogin(val) {
			this.$router.push({ name: val ? 'dashboard' : 'auth' })
		}
	}
}
</script>
