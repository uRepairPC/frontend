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
			<el-button
				size="small"
				round
				@click="onClickCreateRequest">
				<i class="material-icons">add</i>
				Створити заявку
			</el-button>
		</div>
		<div class="header--center" />
		<div class="header--right">
			<!--TODO Move to component-->
			<el-input
				size="mini"
				placeholder="Пошук">
				<i slot="suffix" class="el-input__icon el-icon-search"></i>
			</el-input>
			<!--TODO Move to component-->
			<div class="user">
				<i class="material-icons">person</i>
				{{ user.email }}
			</div>
			<div class="quit">
				<i class="material-icons">exit_to_app</i>
			</div>
		</div>
	</el-header>
</template>

<script>
import { DEFAULT_ROUTE_NAME } from '@/router'

export default {
	computed: {
		user() {
			return this.$store.state.profile.user
		}
	},
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
	.el-button {
		margin-left: 25px;
		> /deep/ span {
			display: flex;
			align-items: center;
			justify-content: center;
			> i {
				margin-right: 5px;
			}
		}
	}
}

.header--center {
	flex: 1 1 auto;
}

.header--right {
	display: flex;
	align-items: center;
	justify-content: center;
}

.user, .quit {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 20px;
	margin-left: 20px;
	cursor: pointer;
}

.user {
	white-space: nowrap;
	> i {
		margin-right: 5px;
	}
}

.quit {
	color: #555;
}
</style>
