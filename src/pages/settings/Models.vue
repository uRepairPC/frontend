<template>
	<basic-table
		:list="list"
		:loading="loading"
		:columns="columns"
		:dialogs="dialogs"
		@update="fetchRequest"
	/>
</template>

<script>
import CreateDialog from '@/components/equipments/models/dialogs/Create'
import DeleteDialog from '@/components/equipments/models/dialogs/Delete'
import EditDialog from '@/components/equipments/models/dialogs/Edit'
import { equipmentModels as columns } from '@/data/columns'
import BasicTable from '@/components/settings/BasicTable'
import breadcrumbs from '@/mixins/breadcrumbs'
import sections from '@/data/sections'
import { mapState } from 'vuex'
import menu from '@/data/menu'

export default {
	name: 'Models',
	breadcrumbs: [
		{ title: menu[sections.settings].title, routeName: sections.settings },
		{ title: menu[sections.settings].actions[sections.settingsModels].title }
	],
	components: {
		BasicTable
	},
	mixins: [
		breadcrumbs
	],
	data() {
		return {
			columns,
			dialogs: {
				create: CreateDialog,
				edit: EditDialog,
				delete: DeleteDialog
			}
		}
	},
	computed: {
		...mapState({
			loading: state => state.equipmentModels.loading,
			list: state => state.equipmentModels.list
		})
	},
	mounted() {
		if (!this.list.length) {
			this.fetchRequest()
		}
	},
	methods: {
		fetchRequest() {
			this.$store.dispatch('equipmentModels/fetchList')
		}
	}
}
</script>
