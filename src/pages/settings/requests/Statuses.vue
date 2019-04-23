<template>
	<basic-table
		:list="list"
		:loading="loading"
		:columns="columns"
		:dialogs="dialogs"
		:permission-create="permissions.REQUESTS_CONFIG_CREATE"
		:permission-edit="permissions.REQUESTS_CONFIG_EDIT"
		:permission-delete="permissions.REQUESTS_CONFIG_DELETE"
		@update="fetchRequest"
	/>
</template>

<script>
import CreateDialog from '@/components/requests/statuses/dialogs/Create'
import DeleteDialog from '@/components/requests/statuses/dialogs/Delete'
import EditDialog from '@/components/requests/statuses/dialogs/Edit'
import { requestStatuses as columns } from '@/data/columns'
import BasicTable from '@/components/settings/BasicTable'
import * as permissions from '@/enum/permissions'
import breadcrumbs from '@/mixins/breadcrumbs'
import sections from '@/data/sections'
import { mapState } from 'vuex'
import menu from '@/data/menu'

export default {
	name: 'Statuses',
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
			loading: state => state.requestStatuses.loading,
			list: state => state.requestStatuses.list
		})
	},
	mounted() {
		if (!this.list.length) {
			this.fetchRequest()
		}
	},
	methods: {
		fetchRequest() {
			this.$store.dispatch('requestStatuses/fetchList')
		}
	}
}
</script>
