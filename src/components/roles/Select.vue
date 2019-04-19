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
		v-bind="$attrs"
		@focus="onFocus"
		v-on="$listeners"
	>
		<el-option
			v-for="item in list"
			:key="item.name"
			:label="item.name"
			:value="item.name"
			:style="{
				'background-color': item.color + '10',
				color: item.color
			}"
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
	mounted() {
		this.list = []
	},
	methods: {
		fetchRequest(query) {
			const params = { count: 10 }
			this.loading = true

			if (query && query.trim()) {
				params.search = query
				params.columns = ['name']
			}

			Role.fetchAll({ params })
				.then(({ data }) => {
					this.list = data.data
				})
				.finally(() => {
					this.loading = false
				})
		},
		onFocus() {
			if (!this.list.length) {
				this.fetchRequest()
			}
		}
	}
}
</script>
