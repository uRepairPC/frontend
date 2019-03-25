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
								<tag-role :role="scope.row.value" />
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
import TagRole from '@/components/users/TagRole'
import UserImage from '@/components/users/Image'
import breadcrumbs from '@/mixins/breadcrumbs'
import { COLUMNS_DATES } from '@/data/columns'
import { isArray } from '@/scripts/helpers'
import sections from '@/data/sections'
import * as types from '@/enum/types'
import * as roles from '@/enum/roles'
import menu from '@/data/menu'
import moment from 'moment'

export default {
	breadcrumbs: [
		{ title: menu[sections.users].title, routeName: sections.users },
		{ title: route => `ID: ${route.params.id}` }
	],
	components: {
		UserImage, TopButtons, TagRole
	},
	mixins: [
		breadcrumbs
	],
	data() {
		return {
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

			if (users && users[id]) {
				return users[id]
			}

			return {}
		},
		isAdmin() {
			if (!this.user.id) {
				return false
			}

			return this.profile.role === roles.ADMIN
		},
		canBasicOperation() {
			return this.isAdmin || this.profile.id === this.user.id
		},
		buttons() {
			return [
				{
					title: 'Оновити',
					type: types.SUCCESS,
					action: this.fetchUser,
					disabled: this.loading
				},
				{
					title: 'Редагувати дані',
					type: types.PRIMARY,
					show: this.canBasicOperation,
					action: () => this.openDialog(EditDialog)
				},
				{
					title: 'Редагувати пароль',
					type: types.PRIMARY,
					show: this.canBasicOperation,
					action: () => this.openDialog(EditPasswordDialog)
				},
				{
					title: 'Редагувати зображення',
					type: types.PRIMARY,
					show: this.canBasicOperation,
					action: () => this.openDialog(EditPhotoDialog)
				},
				{
					title: 'Редагувати email',
					type: types.PRIMARY,
					show: this.canBasicOperation,
					action: () => this.openDialog(EditEmailDialog)
				},
				{
					title: 'Видалити зображення',
					type: types.WARNING,
					show: this.canBasicOperation,
					disabled: !this.user.image,
					action: () => this.openDialog(DeletePhotoDialog)
				},
				{
					title: 'Видалити користувача',
					type: types.DANGER,
					show: this.isAdmin && this.profile.id !== this.user.id,
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
					if (isArray(obj.access)) {
						return obj.access.includes(this.profile.role)
					}

					return true
				})
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
		'dialog.value'(val) {
			if (!val) {
				this.closeDialog()
			}
		},
		'$route'() {
			if (!this.user.id) {
				this.fetchUser()
			}
		}
	},
	created() {
		if (!this.user.id) {
			this.fetchUser()
		}
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
