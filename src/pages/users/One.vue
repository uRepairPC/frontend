<template>
	<div class="user">
		<div class="user__wrap">
			<div class="actions">
				<el-button
					v-for="(btn, index) in buttons"
					:key="index"
					v-if="typeof btn.show === 'undefined' || btn.show"
					size="small"
					:disabled="btn.disabled"
					:loading="btn.loading"
					:type="btn.type"
					plain
					@click="btn.action"
				>
					{{ btn.text }}
				</el-button>
			</div>
			<div
				v-loading="loading"
				class="header"
			>
				<div
					:class="['image', {
						'image_has': !!user.image
					}]"
					:style="userClass.backgroundImage"
				>
					<template v-if="!user.image">
						<i class="material-icons">face</i>
						{{ userClass.initials }}
					</template>
				</div>
				<div class="name">
					{{ userClass.fullName }}
				</div>
			</div>
			<div
				v-loading="loading"
				class="content"
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
									:type="COLORS[scope.row.value]"
									size="medium"
								>
									{{ scope.row.value }}
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
			v-model="dialog.value"
			:is="dialog.component"
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
import UserClass from '@/classes/User'
import * as roles from '@/enum/roles'
import { COLORS } from '@/data/roles'
import moment from 'moment'

export default {
	breadcrumbs: [
		{ title: 'Користувачі', route: { name: 'users' } },
		{ title: route => `ID: ${route.params.id}` }
	],
	components: {
		DeleteDialog
	},
	data() {
		return {
			COLORS,
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
			const users = this.$store.state.template.sidebar.users
			const id = this.$route.params.id

			return users[id] || {}
		},
		userClass() {
			return new UserClass(this.user)
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
					loading: this.loading,
					disabled: this.loading
				},
				{
					text: 'Редагувати дані',
					type: 'primary',
					show: this.canAccess,
					action: () => {}
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
		'$route': {
			handler() {
				this.closeDialog()
				if (!this.user.id && this.$route.name === 'users-id') {
					this.fetchUser()
				}
			},
			immediate: true
		},
		'dialog.value'(val) {
			if (!val) {
				this.closeDialog()
			}
		}
	},
	methods: {
		fetchUser() {
			this.loading = true

			this.$axios.get(`users/${this.$route.params.id}`)
				.then(({ data }) => {
					this.$store.dispatch('template/addSidebarUser', data.user)
					this.loading = false
				})
				.catch(() => {
					this.$router.push({ name: 'users' })
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
.user__wrap {
	max-width: 700px;
	margin: 0 auto;
	> div {
		background: #fff;
		border: 1px solid #e6e6e6;
	}
}

.header,
.content {
	margin-top: 20px;
	padding: 20px;
}

.actions {
	margin-top: 30px;
	padding: 10px;
	> button {
		margin: 5px;
	}
}

.header {
	padding: 50px;
	text-align: center;
}

.content {
	margin-bottom: 30px;
}

.image {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	font-weight: bold;
	font-size: 2rem;
	width: 150px;
	height: 150px;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50% 50%;
	border-radius: 50%;
	margin: 0 auto;
	color: #000000;
	border: 3px solid;
	> i {
		margin-bottom: 10px;
	}
	&.image_has {
		border: 0;
	}
}

.name {
	margin-top: 40px;
	font-weight: bold;
	font-size: 1.5rem;
}
</style>
