<template>
	<div class="user">
		<div class="user__wrap">
			<top-buttons
				:buttons="buttons"
				:disabled="loading"
			/>
			<div class="header max--width">
				<user-image :user="user" />
			</div>
			<div
				v-loading="loading"
				class="content max--width"
			>
				<el-table
					:data="tableData"
					style="width: 100%"
				>
					<el-table-column
						prop="name"
						label="Назва"
						width="200"
					/>
					<el-table-column
						prop="value"
						label="Значення"
					>
						<template slot-scope="scope">
							<span v-if="scope.row.key === 'roles'">
								<role-tag
									v-for="(role, index) in scope.row.value"
									:key="index"
									:role="role"
								/>
							</span>
							<span v-else>{{ scope.row.value }}</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>

<script>
import EditPasswordDialog from '@/components/users/dialogs/EditPassword'
import DeletePhotoDialog from '@/components/users/dialogs/DeleteImage'
import EditRolesDialog from '@/components/users/dialogs/EditRoles'
import EditPhotoDialog from '@/components/users/dialogs/EditImage'
import EditEmailDialog from '@/components/users/dialogs/EditEmail'
import DeleteDialog from '@/components/users/dialogs/Delete'
import EditDialog from '@/components/users/dialogs/Edit'
import { includePermission } from '@/scripts/utils'
import * as permissions from '@/enum/permissions'
import TopButtons from '@/components/TopButtons'
import UserImage from '@/components/users/Image'
import breadcrumbs from '@/mixins/breadcrumbs'
import { COLUMNS_DATES } from '@/data/columns'
import RoleTag from '@/components/roles/Tag'
import UserClass from '@/classes/User'
import sections from '@/data/sections'
import * as types from '@/enum/types'
import menu from '@/data/menu'
import moment from 'moment'

export default {
	breadcrumbs: [
		{ title: menu[sections.users].title, routeName: sections.users },
		{ title: route => `ID: ${route.params.id || -1}` }
	],
	components: {
		UserImage, TopButtons, RoleTag
	},
	mixins: [
		breadcrumbs
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
		user() {
			const users = this.$store.state.template.sidebar[sections.users]
			const id = this.$route.params.id

			if (users && users[id]) {
				return users[id]
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
					permissions: permissions.ROLES_MANAGE,
					action: () => this.openDialog(EditRolesDialog)
				},
				{
					title: 'Видалити зображення',
					type: types.WARNING,
					disabled: !this.user.image,
					permissions: permissions.USERS_EDIT,
					action: () => this.openDialog(DeletePhotoDialog)
				},
				{
					title: 'Видалити користувача',
					type: types.DANGER,
					disabled: this.profile.id === this.user.id,
					permissions: permissions.USERS_DELETE,
					action: () => this.openDialog(DeleteDialog)
				}
			]
				.map((obj) => {
					if (this.profile.id === this.user.id && obj.permissions === permissions.USERS_EDIT) {
						return { ...obj, permissions: [obj.permissions, permissions.PROFILE_EDIT] }
					}

					return obj
				})
		},
		tableData() {
			return [
				{ name: 'Ролі', key: 'roles', permissions: permissions.ROLES_VIEW },
				{ name: 'E-mail', key: 'email' },
				{ name: 'Опис', key: 'description' },
				{ name: 'Телефон', key: 'phone' },
				{ name: 'Створений', key: 'created_at' },
				{ name: 'Останнє оновлення', key: 'updated_at' }
			]
				.filter(obj => includePermission(obj.permissions))
				.reduce((result, obj) => {
					const value = COLUMNS_DATES.includes(obj.key)
						? moment(this.user[obj.key]).format('LLL')
						: this.user[obj.key]

					result.push({ ...obj, value })
					return result

				}, [])
		}
	},
	watch: {
		'$route'() {
			if (!this.user.id) {
				this.fetchRequest()
			}
		}
	},
	created() {
		if (!this.user.id) {
			this.fetchRequest()
		}
	},
	methods: {
		fetchRequest() {
			this.loading = true

			UserClass.fetchOne(+this.$route.params.id)
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
					user: this.user
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

<style lang="scss" scoped>
.header,
.content {
	margin-top: 20px;
	padding: 20px;
}

.header {
	padding: 30px;
	text-align: center;
}

.content {
	margin-bottom: 30px;
	background: #fff;
	border: 1px solid #e6e6e6;
}

.max--width {
	max-width: 900px;
	margin-left: auto;
	margin-right: auto;
}
</style>
