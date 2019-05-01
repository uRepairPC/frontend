<template>
	<div class="global-settings">
		<div class="title">
			{{ title }}
		</div>
		<el-alert
			title="Інформація про маніфест"
			type="info"
			class="mb-30"
			:closable="false"
			show-icon
		>
			<a
				href="https://developer.mozilla.org/en-US/docs/Web/Manifest"
				rel="nofollow"
				target="_blank"
			>
				Mozilla Manifest
			</a>
		</el-alert>
		<el-timeline v-loading="loading">
			<el-timeline-item
				v-for="(row, index) in rows"
				:key="index"
				:timestamp="row.title"
				placement="top"
			>
				<el-card shadow="none">
					<item
						:value="manifest[row.attr]"
						:type="row.type"
						:attr="row.attr"
					/>
				</el-card>
			</el-timeline-item>
			<el-timeline-item
				timestamp="Іконки"
				placement="top"
			>
				<el-card shadow="none">
					<div class="icons">
						<div
							v-for="(obj, index) in manifest.icons"
							:key="index"
							class="icon"
						>
							<div class="size">{{ obj.sizes }} - {{ obj.type }}</div>
							<img :src="`${server}/${obj.src}`" :alt="`${obj.sizes} - ${obj.type}`" />
						</div>
					</div>
				</el-card>
			</el-timeline-item>
		</el-timeline>
		<div class="btn-block">
			<el-button
				type="primary"
				:disabled="loading"
				@click="onClickEdit"
			>
				Редагувати
			</el-button>
		</div>
	</div>
</template>

<script>
import SettingsManifest from '@/classes/SettingsManifest'
import breadcrumbs from '@/mixins/breadcrumbs'
import sections from '@/data/sections'
import { server } from '@/data/env'
import menu from '@/data/menu'

export default {
	name: 'Manifest',
	breadcrumbs: [
		{ title: menu[sections.settings].title, routeName: sections.settings },
		{ title: menu[sections.settings].children[sections.settingsManifest].title }
	],
	components: {
		Item: () => import('@/components/settings/Item')
	},
	mixins: [
		breadcrumbs
	],
	data() {
		return {
			server,
			rows: SettingsManifest.rows
		}
	},
	mounted() {
		this.$store.dispatch('settings/fetchManifest')
	},
	computed: {
		manifest() {
			return this.$store.state.settings.manifest
		},
		loading() {
			return this.$store.state.settings.loadingManifest
		},
		title() {
			return menu[sections.settings].children[sections.settingsManifest].title
		}
	},
	methods: {
		onClickEdit() {
			this.$store.commit('template/OPEN_DIALOG', {
				component: () => import('@/components/settings/dialogs/Manifest')
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@import "~scss/_colors";

.icon {
	padding: 10px;
	img {
		max-width: 100%;
		max-height: none;
	}
	.size {
		background: #fff;
		border: 1px solid $defaultBorder;
		padding: 5px;
	}
}
</style>
