<template>
	<div class="home">
		<section-menu
			:menu="menuWithoutHomePage"
		/>
	</div>
</template>

<script>
import breadcrumbs from '@/mixins/breadcrumbs'
import sections from '@/data/sections'
import { mapGetters } from 'vuex'

export default {
	name: 'Home',
	components: {
		SectionMenu: () => import('@/components/sections/SectionMenu')
	},
	mixins: [
		breadcrumbs
	],
	computed: {
		...mapGetters({
			menu: 'template/menu'
		}),
		menuWithoutHomePage() {
			const list = {}

			Object.entries(this.menu).filter(([key, val]) => {
				if (key !== sections.home) {
					list[key] = val
				}
			})

			return list
		}
	}
}
</script>

<style lang="scss" scoped>
.home {
	padding: 20px;
}
</style>
