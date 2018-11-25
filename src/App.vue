<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
export default {
	beforeCreate() {
		const data = localStorage.getItem('user')

		if (!data) {
			return this.$router.push({ name: 'auth' })
		}

		try {
			const user = JSON.parse(data)

			this.$store.commit('SET_USER', user)
			// TODO Connect to websocket

		} catch (e) {
			localStorage.removeItem('user')
			this.$router.push({ name: 'auth' })
		}
	}
}
</script>
