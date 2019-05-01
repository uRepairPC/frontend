<template>
	<div class="global-settings">
		<div class="title">
			{{ title }}
		</div>
		<el-timeline>
			<el-timeline-item
				v-for="(row, index) in rows"
				:key="index"
				:timestamp="row.title"
				placement="top"
			>
				<el-card shadow="none">
					<frontend-item
						:value="settings[row.attr]"
						:type="row.type"
						:attr="row.attr"
					/>
				</el-card>
			</el-timeline-item>
		</el-timeline>
		<div class="btn-block">
			<el-button
				type="primary"
				@click="onClickEdit"
			>
				Редагувати
			</el-button>
		</div>
	</div>
</template>

<script>
import SettingsFrontend from '@/classes/SettingsFrontend'
import breadcrumbs from '@/mixins/breadcrumbs'
import sections from '@/data/sections'
import menu from '@/data/menu'

export default {
	name: 'Global',
	breadcrumbs: [
		{ title: menu[sections.settings].title, routeName: sections.settings },
		{ title: menu[sections.settings].children[sections.settingsGlobal].title }
	],
	components: {
		FrontendItem: () => import('@/components/settings/FrontendItem')
	},
	mixins: [
		breadcrumbs
	],
	data() {
		return {
			rows: SettingsFrontend.rows
		}
	},
	computed: {
		settings() {
			return this.$store.state.template.settings
		},
		title() {
			return menu[sections.settings].children[sections.settingsGlobal].title
		}
	},
	methods: {
		onClickEdit() {
			this.$store.commit('template/OPEN_DIALOG', {
				component: () => import('@/components/settings/dialogs/Store')
			})
		}
	}
}
</script>
