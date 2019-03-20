<template>
	<el-header>
		<div class="header--left">
			<div
				class="logo"
				@click="onClickLogo"
			>
				<img
					src="@/images/logo.png"
					alt="logo"
				>
				<span>КНТЕУ</span>
			</div>
			<el-button
				type="success"
				size="mini"
				@click="onClickCreateRequest"
			>
				<i class="material-icons">
					add
				</i>
				Створити заявку
			</el-button>
		</div>
		<div class="header--center" />
		<div class="header--right">
			<el-button
				size="mini"
				:type="openSearch ? 'primary' : 'default'"
				:icon="`el-icon-${openSearch ? 'close' : 'search'}`"
				@click="onClickSearch"
			>
				<span>Глобальний пошук</span>
			</el-button>
			<div
				class="user"
				@click="onClickEmail"
			>
				<i class="material-icons">
					person
				</i>
				{{ user.email }}
			</div>
			<div
				class="quit"
				@click="onClickLogout"
			>
				<i class="material-icons">
					exit_to_app
				</i>
			</div>
		</div>
	</el-header>
</template>

<script>
import { DEFAULT_ROUTE_NAME } from '@/router'
import sections from '@/data/sections'

export default {
	computed: {
		user() {
			return this.$store.state.profile.user
		},
		openSearch() {
			return this.$store.state.template.openSearch
		}
	},
	methods: {
		onClickLogout() {
			this.$store.dispatch('profile/logout')
		},
		onClickLogo() {
			this.$router.push({ name: DEFAULT_ROUTE_NAME })
		},
		onClickCreateRequest() {
			this.$router.push({ name: 'requests-create' })
		},
		onClickSearch() {
			if (this.openSearch) {
				this.$store.commit('template/CLOSE_SEARCH')
			} else {
				this.$store.commit('template/OPEN_SEARCH')
			}
		},
		onClickEmail() {
			this.$store.dispatch('template/addSidebarItem', {
				section: sections.users,
				data: this.user
			})
			this.$router.push({ name: 'users-id', params: { id: this.user.id } })
		}
	}
}
</script>

<style lang="scss" scoped>
.el-header {
	display: flex;
	align-items: center;
	background: #fff;
	border-bottom: 1px solid #e6e6e6;
	user-select: none;
}

.header--left {
	display: flex;
	align-items: center;
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

.logo {
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
