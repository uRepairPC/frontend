<template>
	<div class="files-loading">
		<div
			class="file-loading"
			v-for="i in 6"
			:key="i"
		>
			<div class="file-loading-icon" />
			<div class="file-loading-content">
				<div
					class="top"
					:style="{
						width: getRndInteger(30, 50) + '%'
					}"
				/>
				<div
					class="bottom"
					:style="{
						width: getRndInteger(20, 30) + '%'
					}"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { getRndInteger } from '@/scripts/helpers'

export default {
	methods: { getRndInteger }
}
</script>

<style lang="scss" scoped>
@import "~scss/keyframes";

.file-loading {
	display: flex;
	align-items: center;
	height: 58px;
	padding: 10px 15px;
	border-bottom: 1px solid #e6e6e6;
	&:last-child {
		border-bottom: 0;
	}
}

.file-loading-icon {
	width: 18px;
	height: 18px;
	border-radius: 50%;
	margin: 0 10px 0 2px;
	@include contentLoader;
}

.file-loading-content {
	width: 100%;
	.top {
		width: 20%;
		height: 10px;
		margin-bottom: 5px;
		@include contentLoader;
	}
	.bottom {
		width: 20%;
		height: 10px;
		@include contentLoader;
	}
}
</style>
