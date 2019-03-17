<template>
	<div class="search">
		<div class="wrap">
			<!--TODO-->
			Search
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			input: ''
		}
	}
}
</script>

<style lang="scss" scoped>
.search {
	position: absolute;
	top: 60px;
	height: calc(100% - 60px);
	width: 100%;
	overflow: auto;
}

.wrap {
	padding: 20px;
}
</style>
