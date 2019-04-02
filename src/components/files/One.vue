<template>
	<div class="file">
		<div
			class="file__left"
			title="Завантажити"
			@click="onClickDownload"
		>
			<i class="material-icons file-icon-download">
				cloud_download
			</i>
			<div class="file-center">
				<div class="file-center__top">
					{{ top }}
				</div>
				<div class="file-center__bottom">
					{{ bottom }}
				</div>
			</div>
		</div>
		<div class="file__right">
			<i
				class="material-icons edit"
				title="Редагувати"
				@click="onClickEdit"
			>
				edit
			</i>
			<i
				class="material-icons delete"
				title="Видалити"
				@click="onClickDelete"
			>
				delete
			</i>
		</div>
	</div>
</template>

<script>
import { formatBytes, getSeverUrlAuth } from '@/scripts/utils'
import moment from 'moment'

export default {
	props: {
		file: {
			type: Object,
			required: true
		},
		urlDownload: {
			type: Function,
			default: null
		}
	},
	computed: {
		top() {
			return `${this.file.name}.${this.file.ext}`
		},
		bottom() {
			const size = formatBytes(this.file.size).toLowerCase()

			return `${this.file.last_name} ${this.file.first_name}, ${this.createdAt}, ${size}`
		},
		createdAt() {
			return moment(this.file.created_at).calendar().toLowerCase()
		}
	},
	methods: {
		onClickDownload() {
			if (this.urlDownload) {
				window.open(getSeverUrlAuth(this.urlDownload(this.file)), '_blank')
			}
		},
		onClickEdit() {
			this.$emit('edit', this.file)
		},
		onClickDelete() {
			this.$emit('delete', this.file)
		}
	}
}
</script>


<style lang="scss" scoped>
@import "~scss/_colors";

$transition: .15s;

.flex-center-100 {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
}

.file {
	display: flex;
	border-bottom: 1px solid #e6e6e6;
	user-select: none;
	transition: $transition;
	&:hover {
		box-shadow: 0 0 10px 2px rgba(0, 0, 0, .12);
		.file__right {
			opacity: 1;
		}
	}
	&:last-child {
		border-bottom: 0;
	}
}

.file__left {
	display: flex;
	align-items: center;
	flex: 1 1 auto;
	padding: 10px 0;
	transition: color $transition;
	cursor: pointer;
	&:hover {
		&,
		.file-center__top {
			color: $primary;
		}
	}
}

.file-icon-download {
	width: 50px;
	min-width: 50px;
	text-align: center;
}

.file-center__top {
	color: $primaryText;
	font-weight: 600;
	margin-bottom: 5px;
	font-size: .9rem;
	transition: color $transition;
}

.file-center__bottom {
	color: $secondaryText;
	font-size: .8rem;
}

.file__right {
	display: flex;
	align-items: center;
	padding: 0 10px;
	opacity: 0;
	transition: opacity $transition;
	> i {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 25px;
		height: 30px;
		margin: 0 5px;
		cursor: pointer;
		color: $secondaryText;
		transition: color .1s;
		&:hover {
			&.edit {
				color: $primary;
			}
			&.delete {
				color: $danger;
			}
		}
	}
}
</style>
