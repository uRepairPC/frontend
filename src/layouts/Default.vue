<template>
	<div class="layout layout_default">
		<el-container direction="vertical">
			<header-box />
			<el-container :class="{ 'search--open': openSearch }">
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
import BreadcrumbsBox from '@/components/root/Breadcrumbs'
import SidebarBox from '@/components/root/Sidebar'
import HeaderBox from '@/components/root/Header'
import SearchBox from '@/components/root/Search'

export default {
	components: {
		BreadcrumbsBox, SidebarBox, HeaderBox, SearchBox
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

.el-container {
	will-change: filter;
}

.page {
	height: calc(100vh - #{$headerHeight + $breadcrumbsHeight});
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
