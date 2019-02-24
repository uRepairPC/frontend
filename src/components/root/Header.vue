<template>
	<el-header>
		<div
			class="header--left"
			@click="onClickLeftHeader">
			<img
				src="../../images/knteu_logo_200.png"
				alt="logo"
			>
			<span>КНТЕУ</span>
		</div>
		<el-button
			size="small"
			round
			@click="onClickCreateRequest">
			<i class="material-icons">
				add
			</i>
			Створити заявку
		</el-button>
	</el-header>
</template>

<script>
import { DEFAULT_ROUTE_NAME } from '@/router'

export default {
	methods: {
		onClickLeftHeader() {
			this.$router.push({ name: DEFAULT_ROUTE_NAME })
		},
		onClickCreateRequest() {
			this.$router.push({ name: 'requests-create' })
		}
	}
}
</script>

<style lang="scss" scoped>
/* TODO Mobile design */

.el-header {
	display: flex;
	align-items: center;
	background: #fff;
	border-bottom: 1px solid #e6e6e6;
}

.header--left {
	display: flex;
	align-items: center;
	margin-right: 25px;
	cursor: pointer;
	&:hover {
		> span {
			opacity: 1;
		}
	}
	> img {
		height: 45px;
	}
	> span {
		font-weight: bold;
		margin-left: 15px;
		font-size: 1.2em;
		border-bottom: 2px solid #555;
		color: #333;
		opacity: .8;
		transition: opacity .2s;
	}
}

.el-button {
	> /deep/ span {
		display: flex;
		align-items: center;
		justify-content: center;
		> i {
			margin-right: 5px;
		}
	}
}
</style>
