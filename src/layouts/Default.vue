<template>
	<div class="layout layout_default">
		{{ user }}
		<router-view />
	</div>
</template>

<script>
export default {
	computed: {
		user() {
			return this.$store.state.profile.user
		}
	}
}
</script>
