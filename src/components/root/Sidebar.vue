<template>
	<el-aside width="250px">
		<el-menu
			ref="menu"
			router
			:default-active="defaultRoute"
		>
			<el-menu-item
				v-for="(item, index) in menu"
				:key="index"
				:index="item.route.name"
				:route="item.route"
			>
				<i class="material-icons">
					{{ item.icon }}
				</i>
				<span>{{ item.title }}</span>
			</el-menu-item>
		</el-menu>
		<history />
	</el-aside>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	components: {
		History: () => import('@/components/root/History')
	},
	computed: {
		...mapGetters({
			menu: 'template/menu'
		}),
		defaultRoute() {
			return this.$route.name
		},
		routeNames() {
			return Object.values(this.menu).map(m => m.route.name)
		}
	},
	watch: {
		'$route'() {
			if (!this.routeNames.includes(this.defaultRoute)) {
				this.$refs.menu.activeIndex = null
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import "~scss/mobile/_sizes";
@import "~scss/_variables";
@import "~scss/_colors";

.el-aside {
	border-right: solid 1px $defaultBorder;
	background: #fff;
	height: calc(100vh - #{$headerHeight});
	user-select: none;
}

.el-menu {
	border: 0;
	background: none;
}

.el-menu-item {
	display: flex;
	align-items: center;
	> .material-icons {
		margin-right: 10px;
		font-size: 1.2em;
	}
}

@media only screen and (max-width: $laptop) {
	.el-aside {
		position: sticky;
		top: 0;
		border-right: 0;
		height: 100vh;
		width: 64px !important;
	}
	.el-menu-item {
		justify-content: center;
		> .material-icons {
			margin-right: 0;
		}
		> span {
			display: none;
		}
	}
}
</style>
