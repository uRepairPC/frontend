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
import { requestStatuses as columns } from '@/data/columns'
import * as permissions from '@/enum/permissions'
import breadcrumbs from '@/mixins/breadcrumbs'
import sections from '@/data/sections'
import { mapState } from 'vuex'
import menu from '@/data/menu'

export default {
	name: 'RequestStatuses',
	breadcrumbs: [
		{ title: menu[sections.settings].title, routeName: sections.settings },
		{ title: menu[sections.settings].children[sections.requestsStatuses].title }
	],
	components: {
		BasicTable: () => import('@/components/settings/BasicTable')
	},
	mixins: [
		breadcrumbs
	],
	data() {
		return {
			columns,
			permissions,
			dialogs: {
				create: () => import('@/components/requests/statuses/dialogs/Create'),
				edit: () => import('@/components/requests/statuses/dialogs/Edit'),
				delete: () => import('@/components/requests/statuses/dialogs/Delete')
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
