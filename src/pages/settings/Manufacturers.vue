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
import { equipmentTypes as columns } from '@/data/columns'
import Basic from '@/components/settings/Basic'
import { mapState } from 'vuex'

export default {
	components: {
		Basic
	},
	data() {
		return {
			columns
		}
	},
	computed: {
		...mapState({
			loading: state => state.manufacturers.loading,
			list: state => state.manufacturers.list
		})
	},
	mounted() {
		if (!this.list.length) {
			this.fetchRequest()
		}
	},
	methods: {
		fetchRequest() {
			this.$store.dispatch('manufacturers/fetchList')
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
