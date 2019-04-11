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
import FrontendItem from '@/components/settings/FrontendItem'
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
		FrontendItem
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
				component: StoreDialog
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.global-settings {
	max-width: 600px;
	margin: 20px auto;
}

.title {
	text-align: center;
	font-size: 1.4rem;
	font-weight: bold;
	margin-bottom: 30px;
}

/deep/ .el-timeline-item__timestamp {
	font-size: .9rem;
}

/deep/ .el-card__body {
	background: #fafafa;
	line-height: 1.5;
	img {
		max-width: 100px;
		max-height: 100px;
	}
}

.btn-block {
	margin-top: 15px;
	text-align: center;
	button {
		max-width: 300px;
		width: 100%;
	}
}
</style>
