<template>
	<template-one
		:buttons="buttons"
		:table-data="tableData"
		:loading="loading"
	>
		<template slot="header">
			<div class="title">
				{{ model.display_name }}
			</div>
			<div
				v-if="model.color"
				class="color"
				:style="{ 'background-color': model.color }"
			/>
		</template>
		<div
			v-loading="loadingPermissions || loadingPermissionsStore"
			class="page--width"
		>
			<div class="divider">
				<span>Доступи</span>
			</div>
			<div>
			<!--TODO-->
				{{ loadingPermissionsStore }}
				{{ permissions }}
			</div>
		</div>
		<!--TODO Users-->
	</template-one>
</template>

<script>
import EditPermissionsDialog from '@/components/roles/dialogs/EditPermissions'
import DeleteDialog from '@/components/roles/dialogs/Delete'
import EditDialog from '@/components/roles/dialogs/Edit'
import TemplateOne from '@/components/template/One'
import * as permissions from '@/enum/permissions'
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
			loading: false,
			loadingPermissions: false
		}
	},
	computed: {
		permissions() {
			return this.$store.state.permissions.listGrouped
		},
		loadingPermissionsStore() {
			return this.$store.state.permissions.loading
		},
		buttons() {
			return [
				{
					title: 'Оновити',
					type: types.SUCCESS,
					action: this.fetchRequest,
					disabled: this.loading
				},
				{
					title: 'Редагувати дані',
					type: types.PRIMARY,
					permissions: permissions.ROLES_MANAGE,
					action: () => this.openDialog(EditDialog)
				},
				{
					title: 'Редагувати доступи',
					type: types.PRIMARY,
					disabled: this.model.id === 1,
					permissions: permissions.ROLES_MANAGE,
					action: () => this.openDialog(EditPermissionsDialog)
				},
				{
					title: 'Видалити роль',
					type: types.DANGER,
					disabled: this.model.id === 1,
					permissions: permissions.ROLES_MANAGE,
					action: () => this.openDialog(DeleteDialog)
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
			if (!this.model.id) {
				this.fetchRequest('loading')
			} else if (!this.model.permissions) {
				this.fetchRequest('loadingPermissions')
			}

			if (!Object.keys(this.permissions).length) {
				this.$store.dispatch('permissions/fetchListGrouped')
			}
		},
		fetchRequest(loadingAttr) {
			this[loadingAttr] = true

			Role.fetchOne(+this.$route.params.id)
				.catch(() => {
					this.$router.push({ name: sections.roles })
				})
				.finally(() => {
					this[loadingAttr] = false
				})
		},
		openDialog(component, attrs = {}) {
			this.$store.commit('template/OPEN_DIALOG', {
				component,
				attrs: {
					role: this.model,
					...attrs
				},
				events: {
					delete: () => {
						this.$router.push({ name: sections.roles })
					}
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
	border-radius: 5px;
}
</style>
