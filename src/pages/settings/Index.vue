<template>
	<div class="settings">
		{{ pages }}
	</div>
</template>

<script>
import breadcrumbs from '@/mixins/breadcrumbs'
import sections from '@/data/sections'
import { mapGetters } from 'vuex'
import menu from '@/data/menu'

export default {
	name: 'Settings',
	breadcrumbs: [
		{ title: menu[sections.settings].title }
	],
	mixins: [
		breadcrumbs
	],
	computed: {
		...mapGetters({
			menu: 'template/menu'
		}),
		pages() {
			const actions = this.menu[sections.settings].children
			const arr = []

			Object.entries(actions).forEach(([key, obj]) => {
				if (obj.tag === 'page') {
					arr.push({ label: obj.title, name: key })
				}
			})

			return arr
		}
	}
}
</script>
