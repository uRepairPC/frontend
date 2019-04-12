<template>
	<el-header>
		<div class="header--left">
			<header-logo />
			<el-button
				v-if="sectionRequestMenuActions.add"
				:type="sectionRequestMenuActions.add.type"
				size="mini"
				@click="onClickCreateRequest"
			>
				<i class="material-icons">
					{{ sectionRequestMenuActions.add.icon }}
				</i>
				{{ sectionRequestMenuActions.add.title }}
			</el-button>
		</div>
		<div class="header--center">
			<tips />
		</div>
		<div class="header--right">
			<el-button
				size="mini"
				:type="openSearch ? 'danger' : 'default'"
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
import HeaderLogo from '@/components/root/HeaderLogo'
import Tips from '@/components/root/Tips'
import sections from '@/data/sections'
import User from '@/classes/User'
import { mapGetters } from 'vuex'

export default {
	components: {
		Tips, HeaderLogo
	},
	computed: {
		...mapGetters({
			menu: 'template/menu'
		}),
		user() {
			return this.$store.state.profile.user
		},
		openSearch() {
			return this.$store.state.template.openSearch
		},
		sectionRequestMenuActions() {
			const section = this.menu[sections.requests] || {}

			return section.children || {}
		}
	},
	methods: {
		onClickLogout() {
			this.$store.dispatch('profile/logout')
		},
		onClickCreateRequest() {
			this.$router.push({ name: `${sections.requests}-create` })
		},
		onClickSearch() {
			if (this.openSearch) {
				this.$store.commit('template/CLOSE_SEARCH')
			} else {
				this.$store.commit('template/OPEN_SEARCH')
			}
		},
		onClickEmail() {
			User.sidebar().add(this.user)
			this.$router.push({ name: `${sections.users}-id`, params: { id: this.user.id } })
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
	justify-content: center;
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
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1 1 auto;
	padding: 0 15px;
	height: 100%;
	overflow-x: hidden;
	overflow-y: visible;
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
