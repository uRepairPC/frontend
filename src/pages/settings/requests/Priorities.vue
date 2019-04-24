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
import CreateDialog from '@/components/requests/priorities/dialogs/Create'
import DeleteDialog from '@/components/requests/priorities/dialogs/Delete'
import EditDialog from '@/components/requests/priorities/dialogs/Edit'
import { requestPriorities as columns } from '@/data/columns'
import BasicTable from '@/components/settings/BasicTable'
import * as permissions from '@/enum/permissions'
import breadcrumbs from '@/mixins/breadcrumbs'
import sections from '@/data/sections'
import { mapState } from 'vuex'
import menu from '@/data/menu'

export default {
	name: 'Request-Priorities',
	breadcrumbs: [
		{ title: menu[sections.settings].title, routeName: sections.settings },
		{ title: menu[sections.settings].children[sections.requestsPriorities].title }
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
			loading: state => state.requestPriorities.loading,
			list: state => state.requestPriorities.list
		})
	},
	mounted() {
		if (!this.list.length) {
			this.fetchRequest()
		}
	},
	methods: {
		fetchRequest() {
			this.$store.dispatch('requestPriorities/fetchList')
		}
	}
}
</script>
