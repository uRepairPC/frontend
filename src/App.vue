<template>
	<div id="app">
		<router-view />
		<store-dialogs />
	</div>
</template>

<script>
import StoreDialogs from '@/components/root/StoreDialogs'

export default {
	components: {
		StoreDialogs
	}
}
</script>
