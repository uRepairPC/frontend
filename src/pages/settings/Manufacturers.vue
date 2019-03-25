<template>
	<basic
		:list="list"
		:loading="loading"
		:columns="columns"
		:dialogs="dialogs"
		@update="fetchRequest"
	/>
</template>

<script>
import CreateDialog from '@/components/settings/dialogs/manufacturers/Create'
import DeleteDialog from '@/components/settings/dialogs/manufacturers/Delete'
import EditDialog from '@/components/settings/dialogs/manufacturers/Edit'
import { equipmentManufacturers as columns } from '@/data/columns'
import Basic from '@/components/settings/Basic'
import breadcrumbs from '@/mixins/breadcrumbs'
import sections from '@/data/sections'
import { mapState } from 'vuex'
import menu from '@/data/menu'

export default {
	name: 'Manufacturers',
	breadcrumbs: [
		{ title: menu[sections.settings].title, routeName: sections.settings },
		{ title: menu[sections.settings].actions[sections.settingsManufacturers].title }
	],
	components: {
		Basic
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

<style lang="scss" scoped>
.header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20px;
}

.title {
	font-size: 1.2rem;
	font-weight: bold;
}

.actions {
	button {
		min-width: 120px;
	}
}
</style>
