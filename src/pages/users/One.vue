<template>
	<template-one
		:buttons="buttons"
		:table-data="tableData"
		:loading="loading"
	>
		<user-image
			slot="header"
			:user="model"
		/>
		<div
			slot="table"
			slot-scope="{ row }"
		>
			<span v-if="row.prop === 'roles'">
				<role-tag
					v-for="(role, index) in row.value"
					:key="index"
					:role="role"
				/>
			</span>
			<span v-else>{{ row.value }}</span>
		</div>
	</template-one>
</template>

<script>
import EditPasswordDialog from '@/components/users/dialogs/EditPassword'
import DeletePhotoDialog from '@/components/users/dialogs/DeleteImage'
import EditRolesDialog from '@/components/users/dialogs/EditRoles'
import EditPhotoDialog from '@/components/users/dialogs/EditImage'
import EditEmailDialog from '@/components/users/dialogs/EditEmail'
import DeleteDialog from '@/components/users/dialogs/Delete'
import EditDialog from '@/components/users/dialogs/Edit'
import TemplateOne from '@/components/template/One'
import * as permissions from '@/enum/permissions'
import TopButtons from '@/components/TopButtons'
import UserImage from '@/components/users/Image'
import breadcrumbs from '@/mixins/breadcrumbs'
import RoleTag from '@/components/roles/Tag'
import sections from '@/data/sections'
import onePage from '@/mixins/onePage'
import * as types from '@/enum/types'
import User from '@/classes/User'

// !id -> { loadings: ['general'] }
// !roles -> { loadings: ['general', 'roles'] }

export default {
	components: {
		UserImage, TopButtons, RoleTag, TemplateOne
	},
	mixins: [
		breadcrumbs, onePage(sections.users)
	],
	data() {
		return {
			loading: false
		}
	},
	computed: {
		profile() {
			return this.$store.state.profile.user
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
					permissions: permissions.USERS_EDIT,
					action: () => this.openDialog(EditDialog)
				},
				{
					title: 'Редагувати пароль',
					type: types.PRIMARY,
					permissions: permissions.USERS_EDIT,
					action: () => this.openDialog(EditPasswordDialog)
				},
				{
					title: 'Редагувати зображення',
					type: types.PRIMARY,
					permissions: permissions.USERS_EDIT,
					action: () => this.openDialog(EditPhotoDialog)
				},
				{
					title: 'Редагувати email',
					type: types.PRIMARY,
					permissions: permissions.USERS_EDIT,
					action: () => this.openDialog(EditEmailDialog)
				},
				{
					title: 'Редагування ролей',
					type: types.PRIMARY,
					disabled: this.profile.id === this.model.id,
					permissions: permissions.ROLES_MANAGE,
					action: () => this.openDialog(EditRolesDialog)
				},
				{
					title: 'Видалити зображення',
					type: types.WARNING,
					disabled: !this.model.image,
					permissions: permissions.USERS_EDIT,
					action: () => this.openDialog(DeletePhotoDialog)
				},
				{
					title: 'Видалити користувача',
					type: types.DANGER,
					disabled: this.profile.id === this.model.id,
					permissions: permissions.USERS_DELETE,
					action: () => this.openDialog(DeleteDialog)
				}
			]
				.map((obj) => {
					if (this.profile.id === this.model.id && obj.permissions === permissions.USERS_EDIT) {
						return { ...obj, permissions: [obj.permissions, permissions.PROFILE_EDIT] }
					}

					return obj
				})
		},
		tableData() {
			return [
				{ name: 'Ролі', prop: 'roles', permissions: permissions.ROLES_VIEW },
				{ name: 'E-mail', prop: 'email' },
				{ name: 'Опис', prop: 'description' },
				{ name: 'Телефон', prop: 'phone' },
				{ name: 'Створений', prop: 'created_at' },
				{ name: 'Останнє оновлення', prop: 'updated_at' }
			]
				.reduce((result, obj) => {
					result.push({ ...obj, value: this.model[obj.prop] })
					return result
				}, [])
		}
	},
	methods: {
		fetchData() {
			if (!this.model.id) {
				this.fetchRequest()
			}
		},
		fetchRequest() {
			this.loading = true

			User.fetchOne(+this.$route.params.id)
				.catch(() => {
					this.$router.push({ name: sections.users })
				})
				.finally(() => {
					this.loading = false
				})
		},
		openDialog(component) {
			this.$store.commit('template/OPEN_DIALOG', {
				component,
				attrs: {
					user: this.model
				},
				events: {
					delete: () => {
						this.$router.push({ name: sections.users })
					}
				}
			})
		}
	}
}
</script>
