<template>
	<div id="app">
		<router-view />
		<store-dialogs />
	</div>
</template>

<script>
import StoreDialogs from '@/components/root/StoreDialogs'
import { DEFAULT_ROUTE_NAME } from '@/router'

export default {
	components: {
		StoreDialogs
	},
	watch: {
		'$store.state.profile.isLogin'(val) {
			this.$router.push({ name: val ? DEFAULT_ROUTE_NAME : 'auth' })
		}
	}
}
</script>
