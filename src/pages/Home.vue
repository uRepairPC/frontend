<template>
	<div class="home">
		<div class="items">
			<div
				v-for="(item, index) in menu"
				:key="index"
				class="item"
			>
				{{ item }}
			</div>
		</div>
	</div>
</template>

<script>
import { menu } from '@/data/template'

export default {
	name: 'Home',
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
