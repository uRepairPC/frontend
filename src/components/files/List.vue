<template>
	<div class="files-list">
		<div class="items">
			<one-file
				v-for="(file, index) in files"
				:key="index"
				:file="file"
			/>
		</div>
	</div>
</template>

<script>
import OneFile from '@/components/files/One'

export default {
	components: {
		OneFile
	},
	props: {
		files: {
			type: [Array, Object],
			required: true
		}
	}
}
</script>

<style lang="scss" scoped>
.files-list {
	background: #fff;
	border: 1px solid #e6e6e6;
}
</style>
