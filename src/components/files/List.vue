<template>
	<div class="files-list">
		<loading v-if="loading" />
		<div
			class="items"
			v-else
		>
			<one-file
				v-for="(file, index) in files"
				:key="index"
				:file="file"
				:url-download="urlDownload"
			/>
		</div>
	</div>
</template>

<script>
import Loading from '@/components/files/Loading'
import OneFile from '@/components/files/One'

export default {
	components: {
		OneFile, Loading
	},
	props: {
		files: {
			type: [Array, Object],
			required: true
		},
		loading: {
			type: Boolean,
			required: true
		},
		urlDownload: {
			type: Function,
			default: null
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
