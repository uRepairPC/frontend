<template>
	<basic-table
		:list="list"
		:loading="loading"
		:columns="columns"
		:dialogs="dialogs"
		:permission-create="permissions.EQUIPMENTS_CONFIG_CREATE"
		:permission-edit="permissions.EQUIPMENTS_CONFIG_EDIT"
		:permission-delete="permissions.EQUIPMENTS_CONFIG_DELETE"
		@update="fetchRequest"
	/>
</template>

<script>
import CreateDialog from '@/components/equipments/models/dialogs/Create'
import DeleteDialog from '@/components/equipments/models/dialogs/Delete'
import EditDialog from '@/components/equipments/models/dialogs/Edit'
import { equipmentModels as columns } from '@/data/columns'
import BasicTable from '@/components/settings/BasicTable'
import * as permissions from '@/enum/permissions'
import breadcrumbs from '@/mixins/breadcrumbs'
import sections from '@/data/sections'
import { mapState } from 'vuex'
import menu from '@/data/menu'

export default {
	name: 'EquipmentModels',
	breadcrumbs: [
		{ title: menu[sections.settings].title, routeName: sections.settings },
		{ title: menu[sections.settings].children[sections.equipmentsModels].title }
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
			permissions,
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
