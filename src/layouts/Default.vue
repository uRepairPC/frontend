<template>
	<div class="layout layout_default">
		<el-container direction="vertical">
			<header-box />
			<el-container :class="{ 'search--open': openSearch }">
				<sidebar-box />
				<el-main>
					<breadcrumbs-box />
					<transition
						name="root-anim"
						mode="out-in"
					>
						<keep-alive :include="keepAliveRoutesName">
							<router-view
								ref="content"
								:key="$route.params.id"
								class="page"
							/>
						</keep-alive>
					</transition>
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
@import "~scss/_variables";

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
	transition: $searchTransition;
	filter: blur(5px);
}

// <animation>
.root-anim-enter-active {
	transition: .15s;
	opacity: 0;
}

.root-anim-enter-to {
	opacity: 1;
}

.root-anim-leave-active {
	transition: .05s;
	opacity: 1;
}

.root-anim-leave-to {
	opacity: 0;
}
</style>
