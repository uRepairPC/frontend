<template>
	<div class="user">
		User {{ $route.params.id }}
	</div>
</template>

<script>
export default {
	breadcrumbs: [
		{ title: 'Користувачі', route: { name: 'users' } },
		{ title: route => `ID: ${route.params.id}` }
	],
	computed: {
		list() {
			return this.$store.state.template.sidebar.users
		}
	},
	activated() {
		console.log(this.list, this.$route.params.id)

		if (!this.list[this.$route.params.id]) {
			// TODO Fetch the user from API
			// this.$store.commit('template/ADD_SIDEBAR_USER', obj)
		}

		// TODO User not found -> move to 404 page?
		console.log(this.list[this.$route.params.id])
	}
}
</script>
