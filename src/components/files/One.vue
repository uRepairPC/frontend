<template>
	<div class="file">
		<div class="file__left">
			<i class="material-icons">
				cloud_download
			</i>
		</div>
		<div class="file__center">
			<div class="file__center__top">
				{{ top }}
			</div>
			<div class="file__center__bottom">
				{{ bottom }}
			</div>
		</div>
		<div class="file__right">
<!--			TODO Edit, delete-->
		</div>
	</div>
</template>

<script>
import { formatBytes } from '@/scripts/utils'

export default {
	props: {
		file: {
			type: Object,
			required: true
		}
	},
	computed: {
		top() {
			return `${this.file.name}.${this.file.ext}`
		},
		bottom() {
			const size = formatBytes(this.file.size).toLowerCase()

			return `${this.file.last_name} ${this.file.first_name}, ${size}`
		}
	}
}
</script>

<style lang="scss" scoped>
@import "~scss/_colors";

$transition: .15s;

.file {
	display: flex;
	align-items: center;
	padding: 10px;
	border-bottom: 1px solid #e6e6e6;
	user-select: none;
	transition: $transition;
	cursor: pointer;
	&:hover {
		box-shadow: 0 0 10px 2px rgba(0, 0, 0, .12);
		.file__left,
		.file__center__top {
			color: $primary;
		}
	}
	&:last-child {
		margin-bottom: 0;
	}
}

.file__left {
	width: 40px;
	margin-right: 10px;
	text-align: center;
	line-height: 0;
	transition: color $transition;
}

.file__center__top {
	color: $primaryText;
	font-weight: 600;
	margin-bottom: 3px;
	font-size: .9rem;
	transition: color $transition;
}

.file__center__bottom {
	color: $secondaryText;
	font-size: .8rem;
}
</style>
