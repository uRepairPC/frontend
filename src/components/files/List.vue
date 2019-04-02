<template>
	<div class="files-list">
		<div class="actions">
			<div
				class="file-refresh"
				@click="onRefresh"
			>
				<i class="material-icons">refresh</i>
				Оновити
			</div>
			<div
				class="file-add"
				@click="onAdd"
			>
				<i class="material-icons">cloud_upload</i>
				Завантажити файл
			</div>
		</div>
		<loading-files v-if="loading" />
		<div
			v-else
			class="content"
		>
			<div class="items">
				<one-file
					v-for="(file, index) in files"
					:key="index"
					:file="file"
					:url-download="urlDownload"
					@edit="onEdit($event, index)"
					@delete="onDelete($event, index)"
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
			type: Array,
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
	},
	methods: {
		onAdd() {
			this.$emit('add')
		},
		onEdit(...data) {
			this.$emit('edit', ...data)
		},
		onDelete(...data) {
			this.$emit('delete', ...data)
		},
		onRefresh() {
			this.$emit('refresh')
		}
	}
}
</script>

<style lang="scss" scoped>
@import "~scss/_colors";

.files-list {
	.items {
		background: #fff;
		border: 1px solid #e6e6e6;
	}
}

.actions {
	display: flex;
	justify-content: flex-end;
	> div {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
		padding: 5px 10px;
		font-size: .9rem;
		color: $secondaryText;
		transition: color .15s;
		cursor: pointer;
		&:hover {
			color: $primary;
		}
		> i {
			margin-right: 5px;
		}
	}
}
</style>
