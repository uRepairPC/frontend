<template>
	<basic
		:list="list"
		:loading="loading"
		:columns="columns"
		@add="onAdd"
		@edit="onEdit"
		@update="fetchRequest"
	/>
</template>

<script>
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
			columns
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
		},
		onAdd() {
			// TODO
		},
		onEdit() {
			// TODO
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
