<template>
	<div class="home">
		<div
			v-for="(item, index) in menu"
			:key="index"
			class="item"
		>
			{{ item }}
		</div>
	</div>
</template>

<script>
import { menu } from '@/data/template'

export default {
	data() {
		return {
			menu
		}
	}
}
</script>

<style lang="scss" scoped>
.home {
	padding: 20px;
}
</style>
