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
import CreateDialog from '@/components/requests/types/dialogs/Create'
import DeleteDialog from '@/components/requests/types/dialogs/Delete'
import EditDialog from '@/components/requests/types/dialogs/Edit'
import BasicTable from '@/components/settings/BasicTable'
import { requestTypes as columns } from '@/data/columns'
import * as permissions from '@/enum/permissions'
import breadcrumbs from '@/mixins/breadcrumbs'
import sections from '@/data/sections'
import { mapState } from 'vuex'
import menu from '@/data/menu'

export default {
	name: 'Request-Types',
	breadcrumbs: [
		{ title: menu[sections.settings].title, routeName: sections.settings },
		{ title: menu[sections.settings].children[sections.requestsTypes].title }
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
			loading: state => state.requestTypes.loading,
			list: state => state.requestTypes.list
		})
	},
	mounted() {
		if (!this.list.length) {
			this.fetchRequest()
		}
	},
	methods: {
		fetchRequest() {
			this.$store.dispatch('requestTypes/fetchList')
		}
	}
}
</script>
