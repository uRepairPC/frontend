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
import CreateDialog from '@/components/settings/manufacturers/Create'
import { equipmentManufacturers as columns } from '@/data/columns'
import Basic from '@/components/settings/Basic'
import breadcrumbs from '@/mixins/breadcrumbs'
import sections from '@/data/sections'
import { mapState } from 'vuex'
import menu from '@/data/menu'

export default {
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
			dialog: {
				value: false,
				component: null,
				item: null
			}
		}
	},
	computed: {
		...mapState({
			loading: state => state.equipmentManufacturers.loading,
			list: state => state.equipmentManufacturers.list
		})
	},
	watch: {
		'dialog.value'(val) {
			if (!val) {
				this.closeDialog()
			}
		}
	},
	mounted() {
		if (!this.list.length) {
			this.fetchRequest()
		}
	},
	methods: {
		fetchRequest() {
			this.$store.dispatch('equipmentManufacturers/fetchList')
		},
		onAdd() {
			this.openDialog(CreateDialog)
		},
		onEdit(obj) {
			this.dialog.item = obj
			// this.openDialog(EditDialog)
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
