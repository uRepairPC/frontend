<template>
	<template-one
		:buttons="buttons"
		:table-data="tableData"
		:loading="loading"
	>
		<template slot="header">
			<div class="title">
				{{ role.display_name }}
			</div>
			<div
				v-if="role.color"
				class="color"
				:style="{ 'background-color': role.color }"
			/>
		</template>
	</template-one>
</template>

<script>
import TemplateOne from '@/components/template/One'
import sections from '@/data/sections'
import onePage from '@/mixins/onePage'
import * as types from '@/enum/types'
import Role from '@/classes/Role'

export default {
	components: {
		TemplateOne
	},
	mixins: [
		onePage(sections.roles)
	],
	data() {
		return {
			loading: false
		}
	},
	computed: {
		role() {
			const roles = this.$store.state.template.sidebar[sections.roles]
			const id = this.$route.params.id

			if (roles && roles[id]) {
				return roles[id]
			}

			return {}
		},
		buttons() {
			return [
				{
					title: 'Оновити',
					type: types.SUCCESS,
					action: this.fetchRequest,
					disabled: this.loading
				}
			]
		},
		tableData() {
			const props = ['name', 'color', 'default', 'created_at', 'updated_at']
			const result = []

			this.$store.getters['roles/columns']
				.forEach((obj) => {
					if (props.includes(obj.prop)) {
						const customType = obj.customType === 'timestamp'
							? { key: 'timestamp', value: 'LLL' }
							: obj.customType

						result.push({ ...obj, customType, value: this.model[obj.prop] })
					}
				})

			return result
		}
	},
	methods: {
		fetchData() {
			if (!this.role.id) {
				this.fetchRequest()
			}
		},
		fetchRequest() {
			this.loading = true

			Role.fetchOne(+this.$route.params.id)
				.catch(() => {
					this.$router.push({ name: sections.roles })
				})
				.finally(() => {
					this.loading = false
				})
		},
		openDialog(component, attrs = {}) {
			this.$store.commit('template/OPEN_DIALOG', {
				component,
				attrs: {
					role: this.role,
					...attrs
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.title {
	font-size: 1.5rem;
	font-weight: bold;
}

.color {
	width: 100px;
	height: 5px;
	margin: 15px auto 0;
}
</style>
