<template>
	<div id="app">
		<!--TODO Remove-->
		{{ $t('efwg.wergreh.erhre.global.name') }}
		{{ $tc('efwg.wergreh.erhre.global.name1') }}
		{{ $tc('efwg.wergreh.erhre.global.name2') }}
		{{ $tc('efwg.wergreh.erhre.global.name3') }}
		{{ $tc('efwg.w.erhre.global.name3') }}
		<router-view />
		<store-dialogs />
	</div>
</template>

<script>
import StoreDialogs from '@/components/root/StoreDialogs'

export default {
	components: {
		StoreDialogs
	},
	// TODO Remove
	mounted() {
		console.log(this.$t('global.name'))
		console.log(this.$t('global.name'))
		console.log(this.$t('global.name'))
		console.log(this.$t('global.name2'))
	}
}
</script>
