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
				<span>{{ sectionRequestMenuActions.add.title }}</span>
			</el-button>
		</div>
		<div class="header--center">
			<tips />
		</div>
		<div class="header--right">
			<el-button
				size="mini"
				:type="openSearch ? 'danger' : 'default'"
				@click="onClickSearch"
			>
				<i class="material-icons">{{ openSearch ? 'close' : 'search' }}</i>
				<span>Глобальний пошук</span>
			</el-button>
			<div
				class="user"
				@click="onClickEmail"
			>
				<i class="material-icons">
					person
				</i>
				<span>{{ user.email }}</span>
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
@import "~scss/mobile/_sizes";
@import "~scss/_colors";

.el-header {
	display: flex;
	align-items: center;
	background: #fff;
	border-bottom: 1px solid $defaultBorder;
	user-select: none;
	overflow: hidden;
}

.el-button {
	> /deep/ span {
		display: flex;
		align-items: center;
		justify-content: center;
		i {
			margin-right: 5px;
		}
	}
}

.header--left {
	display: flex;
	align-items: center;
	justify-content: center;
	.el-button {
		margin-left: 25px;
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
	.el-button {
		i {
			font-size: .9rem;
		}
	}
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

@media only screen and (max-width: $laptop) {
	.el-button {
		/deep/ span {
			i {
				margin-right: 0;
			}
			span {
				display: none;
			}
		}
	}
	.user {
		height: auto;
		padding: 7px 15px;
		margin-left: 10px;
		> i {
			margin-right: 0;
		}
		span {
			display: none;
		}
	}
}

@media only screen and (max-width: $tablet) {
	.header--left {
		.el-button {
			display: none;
		}
	}
	.header--center {
		display: none;
	}
	.header--right {
		flex: 1 1 auto;
		justify-content: flex-end;
		margin-left: 20px;
	}
}

@media only screen and (max-width: $mobileL) {
	.logo {
		width: 100px;
		/deep/ img + div {
			display: none;
		}
		/deep/ .custom {
			g.logo {
				display: none;
			}
		}
	}
}
</style>
