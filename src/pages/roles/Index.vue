<template>
	<div>All roles</div>
</template>

<script>
import breadcrumbs from '@/mixins/breadcrumbs'
import sections from '@/data/sections'
import menu from '@/data/menu'

export default {
	name: 'Roles',
	breadcrumbs: [
		{ title: menu[sections.roles].title }
	],
	mixins: [
		breadcrumbs
	]
}
</script>
