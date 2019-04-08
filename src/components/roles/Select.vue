<template>
	<el-select
		:value="value"
		multiple
		filterable
		remote
		reserve-keyword
		default-first-option
		placeholder="Введіть текст для отримання списку"
		:remote-method="fetchRequest"
		:loading="loading"
		v-on="$listeners"
		v-bind="$attrs"
	>
		<el-option
			v-for="(item, index) in list"
			:key="index"
			:label="item.display_name"
			:value="item.name"
		/>
	</el-select>
</template>

<script>
import Role from '@/classes/Role'

export default {
	props: {
		value: {
			type: Array,
			default: () => []
		},
		defaultRoles: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			list: [],
			loading: false
		}
	},
	created() {
		this.list = this.defaultRoles
		this.$emit('input', this.list.map(item => item.name))
	},
	methods: {
		fetchRequest(query) {
			const params = { count: 10 }
			this.loading = true

			if (query) {
				params.search = query
				params.columns = ['display_name']
			}

			Role.fetchAll({ params })
				.then(({ data }) => {
					this.list = data.data
				})
				.finally(() => {
					this.loading = false
				})
		}
	}
}
</script>
