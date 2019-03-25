<template>
	<div>
		<basic
			:list="list"
			:loading="loading"
			:columns="columns"
			@add="onAdd"
			@edit="onEdit"
			@update="fetchRequest"
			@delete="onDelete"
		/>

		<!-- DIALOGS -->
		<component
			:is="dialog.component"
			v-model="dialog.value"
			:item="dialog.item"
		/>
	</div>
</template>

<script>
import CreateDialog from '@/components/settings/dialogs/types/Create'
import EditDialog from '@/components/settings/dialogs/types/Edit'
import { equipmentTypes as columns } from '@/data/columns'
import Basic from '@/components/settings/Basic'
import breadcrumbs from '@/mixins/breadcrumbs'
import sections from '@/data/sections'
import { mapState } from 'vuex'
import menu from '@/data/menu'

export default {
	name: 'Types',
	breadcrumbs: [
		{ title: menu[sections.settings].title, routeName: sections.settings },
		{ title: menu[sections.settings].actions[sections.settingsTypes].title }
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
			dialog: {
				value: false,
				component: null,
				item: null
			}
		}
	},
	computed: {
		...mapState({
			loading: state => state.equipmentTypes.loading,
			list: state => state.equipmentTypes.list
		})
	},
	mounted() {
		if (!this.list.length) {
			this.fetchRequest()
		}
	},
	methods: {
		fetchRequest() {
			this.$store.dispatch('equipmentTypes/fetchList')
		},
		onAdd() {
			this.openDialog(CreateDialog)
		},
		onEdit(obj) {
			this.dialog.item = obj
			this.openDialog(EditDialog)
		},
		onDelete(obj) {
			this.dialog.item = obj
			// this.openDialog(DeleteDialog)
		},
		openDialog(component) {
			this.dialog.component = component
			this.dialog.value = true
		},
		closeDialog() {
			this.dialog.value = false
			this.dialog.component = null
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
