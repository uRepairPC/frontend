<template>
	<div>Global</div>
</template>

<script>
import breadcrumbs from '@/mixins/breadcrumbs'
import sections from '@/data/sections'
import menu from '@/data/menu'

export default {
	name: 'Global',
	breadcrumbs: [
		{ title: menu[sections.settings].title, routeName: sections.settings },
		{ title: menu[sections.settings].children[sections.settingsGlobal].title }
	],
	mixins: [
		breadcrumbs
	]
}
</script>
