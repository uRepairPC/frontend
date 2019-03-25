<template>
	<div class="settings">
		{{ pages }}
	</div>
</template>

<script>
import breadcrumbs from '@/mixins/breadcrumbs'
import sections from '@/data/sections'
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
		pages() {
			const actions = menu[sections.settings].actions
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
