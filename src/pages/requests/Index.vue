<template>
	<div>
		All Request
	</div>
</template>

<script>
import breadcrumbs from '@/mixins/breadcrumbs'
import sections from '@/data/sections'
import menu from '@/data/menu'

export default {
	name: 'Requests',
	breadcrumbs: [
		{ title: menu[sections.requests].title }
	],
	mixins: [
		breadcrumbs
	]
}
</script>
