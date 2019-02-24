<template>
	<div id="app">
		<RouterView />
	</div>
</template>

<script>
import { DEFAULT_ROUTE_NAME } from '@/router'

export default {
	computed: {
		isLogin() {
			return this.$store.state.profile.isLogin
		}
	},
	watch: {
		isLogin(val) {
			this.$router.push({ name: val ? DEFAULT_ROUTE_NAME : 'auth' })
		}
	}
}
</script>
