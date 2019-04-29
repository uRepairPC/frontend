<template>
	<div class="layout layout_default">
		<el-container direction="vertical">
			<header-box />
			<el-container :class="['container-content',
				{ 'search--open': openSearch }
			]">
				<sidebar-box />
				<el-main>
					<breadcrumbs-box />
					<keep-alive :include="keepAliveRoutesName">
						<router-view
							ref="content"
							:key="$route.params.id"
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
import { root as keepAliveRoutesName } from '@/data/keepAliveComponents'

export default {
	components: {
		BreadcrumbsBox: () => import('@/components/root/Breadcrumbs'),
		SidebarBox: () => import('@/components/root/Sidebar'),
		HeaderBox: () => import('@/components/root/Header'),
		SearchBox: () => import('@/components/root/Search')
	},
	data() {
		return {
			keepAliveRoutesName
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
		'$route'() {
			if (this.openSearch) {
				this.$store.commit('template/CLOSE_SEARCH')
			}
		}
	},
	mounted() {
		document.addEventListener('keypress', this.hotKeys)
	},
	beforeDestroy() {
		document.removeEventListener('keypress', this.hotKeys)
	},
	methods: {
		hotKeys(evt) {
			// Open/Close Global Search - Ctrl + Shift + F
			if (evt.ctrlKey && evt.shiftKey && evt.code === 'KeyF') {
				if (this.openSearch) {
					this.$store.commit('template/CLOSE_SEARCH')
				} else {
					this.$store.commit('template/OPEN_SEARCH')
				}
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import "~scss/mobile/_sizes";
@import "~scss/_variables";
@import "~scss/_colors";

.el-breadcrumb {
	padding: 10px;
	background: #fff;
	border-bottom: 1px solid $defaultBorder;
}

.el-main {
	padding: 0;
}

.container-content {
	will-change: filter;
	height: calc(100% - #{$headerHeight});
}

.page {
	height: calc(100% - #{$breadcrumbsHeight});
	overflow: auto;
}

.search--open {
	transition: $searchTransition;
	filter: blur(5px);
}

@media only screen and (max-width: $laptopL) {
	.el-main {
		border-left: 1px solid $defaultBorder;
		background: #fbfbfb;
	}
}
</style>
