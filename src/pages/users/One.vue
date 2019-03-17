<template>
	<div class="user">
		<div class="user__wrap">
			<top-buttons :buttons="buttons" />
			<div
				v-loading="loading"
				class="header max--width"
			>
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
							<span v-if="scope.row.key === 'role' && scope.row.value">
								<el-tag
									:type="listRoles[scope.row.value].color"
									size="medium"
								>
									{{ listRoles[scope.row.value].name }}
								</el-tag>
							</span>
							<span v-else>{{ scope.row.value }}</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>

		<!-- DIALOGS -->
		<component
			:is="dialog.component"
			v-model="dialog.value"
			:user="user"
		/>
	</div>
</template>

<script>
import EditPasswordDialog from '@/components/users/dialogs/EditPassword'
import DeletePhotoDialog from '@/components/users/dialogs/DeleteImage'
import EditPhotoDialog from '@/components/users/dialogs/EditImage'
import EditEmailDialog from '@/components/users/dialogs/EditEmail'
import DeleteDialog from '@/components/users/dialogs/Delete'
import EditDialog from '@/components/users/dialogs/Edit'
import TopButtons from '@/components/TopButtons'
import { list as listRoles } from '@/data/roles'
import UserImage from '@/components/users/Image'
import sections from '@/data/sections'
import * as roles from '@/enum/roles'
import moment from 'moment'

export default {
	breadcrumbs: [
		{ title: 'Користувачі', route: { name: sections.users } },
		{ title: route => `ID: ${route.params.id}` }
	],
	components: {
		UserImage, TopButtons
	},
	data() {
		return {
			listRoles,
			loading: false,
			dialog: {
				value: false,
				component: null
			}
		}
	},
	computed: {
		profile() {
			return this.$store.state.profile.user
		},
		user() {
			const users = this.$store.state.template.sidebar[sections.users]
			const id = this.$route.params.id

			if (users[id]) {
				return users[id]
			}

			return {}
		},
		canAccess() {
			return this.profile.role === roles.ADMIN || this.profile.id === this.user.id
		},
		buttons() {
			return [
				{
					text: 'Оновити',
					type: 'success',
					action: this.fetchUser,
					disabled: this.loading
				},
				{
					text: 'Редагувати дані',
					type: 'primary',
					show: this.canAccess,
					action: () => this.openDialog(EditDialog)
				},
				{
					text: 'Редагувати пароль',
					type: 'primary',
					show: this.canAccess,
					action: () => this.openDialog(EditPasswordDialog)
				},
				{
					text: 'Редагувати зображення',
					type: 'primary',
					show: this.canAccess,
					action: () => this.openDialog(EditPhotoDialog)
				},
				{
					text: 'Редагувати email',
					type: 'primary',
					show: this.canAccess,
					action: () => this.openDialog(EditEmailDialog)
				},
				{
					text: 'Видалити зображення',
					type: 'warning',
					show: this.canAccess,
					disabled: !this.user.image,
					action: () => this.openDialog(DeletePhotoDialog)
				},
				{
					text: 'Видалити користувача',
					type: 'danger',
					show: this.profile.role === roles.ADMIN && this.profile.id !== this.user.id,
					action: () => this.openDialog(DeleteDialog)
				}
			]
		},
		tableData() {
			const displayProps = [
				{ name: 'Роль', key: 'role', access: [roles.ADMIN] },
				{ name: 'E-mail', key: 'email' },
				{ name: 'Опис', key: 'description' },
				{ name: 'Телефон', key: 'phone' },
				{ name: 'Створений', key: 'created_at' },
				{ name: 'Останнє оновлення', key: 'updated_at' }
			]

			return displayProps
				.filter((obj) => {
					if (obj.access && typeof obj.access === 'object' && Array.isArray(obj.access)) {
						return obj.access.includes(this.profile.role)
					}

					return true
				})
				.reduce((result, obj) => {
					const value = ['updated_at', 'created_at'].includes(obj.key)
						? moment(this.user[obj.key]).format('LLL')
						: this.user[obj.key]

					result.push({ ...obj, value })
					return result

				}, [])
		}
	},
	watch: {
		'dialog.value'(val) {
			if (!val) {
				this.closeDialog()
			}
		}
	},
	activated() {
		if (!this.user.id && this.$route.name === 'users-id') {
			this.fetchUser()
		}
	},
	deactivated() {
		this.closeDialog()
	},
	methods: {
		fetchUser() {
			this.loading = true

			this.$axios.get(`users/${this.$route.params.id}`)
				.then(({ data }) => {
					this.$store.dispatch('template/addSidebarItem', {
						section: sections.users,
						data: data.user
					})
					this.loading = false
				})
				.catch(() => {
					this.$router.push({ name: sections.users })
					this.loading = false
				})
		},
		openDialog(component) {
			this.$set(this.dialog, 'component', component)
			this.$set(this.dialog, 'value', true)
		},
		closeDialog() {
			this.$set(this.dialog, 'value', false)
			this.$set(this.dialog, 'component', null)
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
