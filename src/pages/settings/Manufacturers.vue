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
import CreateDialog from '@/components/equipments/manufacturers/dialogs/Create'
import DeleteDialog from '@/components/equipments/manufacturers/dialogs/Delete'
import EditDialog from '@/components/equipments/manufacturers/dialogs/Edit'
import { equipmentManufacturers as columns } from '@/data/columns'
import BasicTable from '@/components/settings/BasicTable'
import * as permissions from '@/enum/permissions'
import breadcrumbs from '@/mixins/breadcrumbs'
import sections from '@/data/sections'
import { mapState } from 'vuex'
import menu from '@/data/menu'

export default {
	name: 'Manufacturers',
	breadcrumbs: [
		{ title: menu[sections.settings].title, routeName: sections.settings },
		{ title: menu[sections.settings].children[sections.settingsManufacturers].title }
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
			loading: state => state.equipmentManufacturers.loading,
			list: state => state.equipmentManufacturers.list
		})
	},
	mounted() {
		if (!this.list.length) {
			this.fetchRequest()
		}
	},
	methods: {
		fetchRequest() {
			this.$store.dispatch('equipmentManufacturers/fetchList')
		}
	}
}
</script>
