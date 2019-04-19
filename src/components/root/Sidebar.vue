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
import History from '@/components/root/History'
import { mapGetters } from 'vuex'

export default {
	components: {
		History
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
@import "~scss/_colors";

.el-aside {
	border-right: solid 1px $defaultBorder;
	background: #fff;
	height: 100%;
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
</style>
