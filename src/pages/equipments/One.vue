<template>
	<div>
		{{ $route.params.id }}
	</div>
</template>

<script>
import breadcrumbs from '@/mixins/breadcrumbs'
import sections from '@/data/sections'
import menu from '@/data/menu'

export default {
	breadcrumbs: [
		{ title: menu[sections.equipments].title, routeName: sections.equipments },
		{ title: route => `ID: ${route.params.id}` }
	],
	mixins: [
		breadcrumbs
	]
}
</script>
