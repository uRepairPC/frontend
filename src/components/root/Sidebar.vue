<template>
	<el-aside width="250px">
		<el-menu
			router
			:default-active="defaultRoute"
		>
			<el-menu-item
				v-for="(item, index) in menu"
				:key="index"
				:index="item.route.name"
				:route="item.route">
				<i class="material-icons">{{ item.icon }}</i>
				<span>{{ item.title }}</span>
			</el-menu-item>
		</el-menu>
	</el-aside>
</template>

<script>
export default {
	data() {
		return {
			// TODO Role visible
			menu: [
				{ icon: 'description', title: 'Заявки', route: { name: 'requests' } },
				{ icon: 'people_outline', title: 'Користувачі', route: { name: 'users' } },
				{ icon: 'storage', title: 'Обладнання', route: { name: 'equipments' } },
				{ icon: 'people', title: 'Працівники', route: { name: 'workers' } },
				{ icon: 'settings', title: 'Конфігурація', route: { name: 'config' } }
			]
		}
	},
	computed: {
		defaultRoute() {
			return this.$route.name
		}
	}
}
</script>

<style lang="scss" scoped>
.el-menu {
	height: 100%;
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
