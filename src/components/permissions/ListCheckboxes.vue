<template>
	<div
		v-loading="loading"
		class="permissions-list-checkboxes"
	>
		<div>
			<group-checkbox
				v-for="(item, key) in list"
				:key="key"
				v-model="permissions[key]"
				:name="key"
				:items="item"
				:only-view="onlyView"
			/>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	components: {
		GroupCheckbox: () => import('@/components/permissions/GroupCheckbox')
	},
	inheritAttrs: false,
	props: {
		// active names of permissions
		value: {
			type: Array,
			default: () => []
		},
		permissionsGrouped: {
			type: Object,
			required: true
		},
		onlyView: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			permissions: { ...this.permissionsGrouped }
		}
	},
	computed: {
		...mapState({
			list: state => state.permissions.listGrouped,
			loading: state => state.permissions.loading
		}),
		hasItems() {
			return !!Object.keys(this.list).length
		}
	},
	watch: {
		permissionsGrouped(obj) {
			this.permissions = { ...obj }
		},
		permissions: {
			handler(obj) {
				const names = []

				Object.values(obj).forEach((arr) => {
					arr.forEach(item => names.push(item.name))
				})

				this.$emit('input', names)
			},
			deep: true,
			immediate: true
		}
	},
	mounted() {
		if (!this.hasItems) {
			this.fetchList()
		}
	},
	methods: {
		fetchList() {
			this.$store.dispatch('permissions/fetchListGrouped')
		}
	}
}
</script>

<style lang="scss" scoped>
.permissions-list-checkboxes {
	min-height: 200px;
}
</style>
