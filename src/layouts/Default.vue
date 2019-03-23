<template>
	<div class="layout layout_default">
		<el-container direction="vertical">
			<header-box />
			<el-container :class="{ 'search--open': openSearch }">
				<sidebar-box />
				<el-main>
					<breadcrumbs-box :list="breadcrumbs" />
					<keep-alive :include="keepAliveRoutesName">
						<router-view
							ref="content"
							class="page"
						/>
					</keep-alive>
				</el-main>
			</el-container>
		</el-container>
		<search-box />
	</div>
</template>

<script>
import BreadcrumbsBox from '@/components/root/Breadcrumbs'
import SidebarBox from '@/components/root/Sidebar'
import HeaderBox from '@/components/root/Header'
import SearchBox from '@/components/root/Search'
import { DEFAULT_ROUTE_NAME } from '@/router'

export default {
	components: {
		BreadcrumbsBox, SidebarBox, HeaderBox, SearchBox
	},
	data() {
		return {
			keepAliveRoutesName: [
				'Home', 'Requests', 'Users', 'Workers', 'Settings'
			],
			breadcrumbs: []
		}
	},
	computed: {
		openSearch() {
			return this.$store.state.template.openSearch
		}
	},
	watch: {
		/*
		 * On update $route - we update breadcrumbs
		 * from ref="content" component.
		 */
		'$route': {
			handler() {
				if (this.openSearch) {
					this.$store.commit('template/CLOSE_SEARCH')
				}

				this.$nextTick(() => {
					if (!this.$refs.content || !this.$refs.content.$options.breadcrumbs) {
						this.breadcrumbs = [this.getFirstBreadcrumb(false)]
						return
					}

					this.breadcrumbs = [
						this.getFirstBreadcrumb(true),
						...this.$refs.content.$options.breadcrumbs
					]
				})
			},
			immediate: true
		}
	},
	methods: {
		/**
		 * Get first item - Home page
		 * @param {Boolean} hasLink
		 * @return {Object}
		 * @example
		 *  - title {String}
		 *  - route - RouterLink
		 */
		getFirstBreadcrumb(hasLink) {
			const title = 'Головна сторінка'

			if (hasLink) {
				return { title, route: { name: DEFAULT_ROUTE_NAME } }
			}

			return { title }
		}
	}
}
</script>

<style lang="scss" scoped>
.el-breadcrumb {
	padding: 10px;
	background: #fff;
	border-bottom: 1px solid #e6e6e6;
}

.el-main {
	padding: 0;
}

.page {
	height: calc(100% - 36px);
	overflow: auto;
}

.search--open {
	transition: .2s;
	filter: blur(5px);
}
</style>
