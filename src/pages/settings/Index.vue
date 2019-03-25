<template>
	<div>Головна сторінка - конфігурація</div>
</template>

<script>
import breadcrumbs from '@/mixins/breadcrumbs'
import sections from '@/data/sections'
import menu from '@/data/menu'

export default {
	breadcrumbs: [
		{ title: menu[sections.settings].title }
	],
	mixins: [
		breadcrumbs
	]
}
</script>
