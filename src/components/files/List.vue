<template>
	<div class="files-list">
		<loading-files v-if="loading" />
		<div class="content">
			<!--TODO Add file-->
			<div
				v-if="hasFiles && !loading"
				class="items"
			>
				<one-file
					v-for="(file, index) in files"
					:key="index"
					:file="file"
					:url-download="urlDownload"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import LoadingFiles from '@/components/files/Loading'
import OneFile from '@/components/files/One'

export default {
	components: {
		OneFile, LoadingFiles
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
	},
	computed: {
		hasFiles() {
			return !!this.files.length
		}
	}
}
</script>

<style lang="scss" scoped>
.files-list {
	.items {
		background: #fff;
		border: 1px solid #e6e6e6;
	}
}
</style>
